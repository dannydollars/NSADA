const axios = require('axios');
const url ='https://api.hubspot.com/crm/v3/objects/companies?limit=100&properties=hs_lastmodifieddate,name,address,address2,city,state,region,website,associate_member_or_dealer_member,country,zip,hs_object_id,group,nsada_member_responsible,phone,presides_dinner_report_notes'

async function getAssociates(token,url,array) {
    if (url !== undefined) {
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    });
    array.push(...response.data.results);
const nextpage = response.data.paging?.next?.link;
if (nextpage !== undefined) {
    await getAssociates(token,nextpage,array);

}
}}

module.exports = async function (context, req) {
    const allComps = [];
const associates = [];
const dealers = [];
const neither = []
    const token = 'Bearer ' + process.env["HUBSPOT_API_KEY"];
    context.log('Azure Function triggered.');
try {const ass= await getAssociates(token,url,allComps);
    for (item of allComps)
    {
       if (item.properties.associate_member_or_dealer_member==='Associate')
       {associates.push(item)}
       if (item.properties.associate_member_or_dealer_member==='Dealer'){
        dealers.push(item)
    }
}
}



catch (err){context.log(err)}
function prepList (array){
    const prepped = []
for (item of array){
const deets = {
name:item.properties.name,
city:item.properties.city,
website:item.properties.website
}
prepped.push(deets)    
}
prepped.sort((a, b) => a.name.localeCompare(b.name));

return prepped;
}
function makeHTML (array)
{
    let list = '<div class="associates">';
for (item of array){
const HTML = `<div class="associate"><div class="name">${item.name}</div><div class="city">${item.city}</div><div class="website">${item.website}</div></div>`
list += HTML;
}
list += '</div>'
return list

}

    context.res = {
        status: 200,
        body: makeHTML(prepList(associates))
    };

};