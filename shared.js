const axios = require ('axios');
const url = process.env["URL"]
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

function prepList (array){
    const prepped = []
for (item of array){
const deets = {
title:item.properties.name,
City:item.properties.city,
Website:item.properties.website,
HubspotID:item.id
}
prepped.push(deets)    
}
prepped.sort((a, b) => a.title.localeCompare(b.title));

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

async function retrieveCompanies(type){
const allComps = [];
const associates = [];
const dealers = [];
const neither = []
    const token = 'Bearer ' + process.env["HUBSPOT_API_KEY"];
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

catch (err){console.log(err)}
if (type==="associates"){
return associates};
if (type==="dealers"){
    return dealers};
}

module.exports = {retrieveCompanies,getAssociates,prepList}