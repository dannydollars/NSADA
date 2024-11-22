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

async function retrievePosts(page,array) {
    const allPosts = array;
    console.log(page);
    if(page==1) {console.log(page)}
const url = process.env["WORDPRESS_POST_URL"]+'?per_page=100'+'&page='+page;
console.log(url)
res = await axios.get(url)
allPosts.push(...res.data);
if(res.headers['x-wp-totalpages']>page){
return retrievePosts(page+1,allPosts);

}
else {
    return allPosts;}
}

async function loadOnePost(url,company){
    const username = process.env["USER"];
    company.status='publish';
    JSON.stringify(company)
const password = process.env["PASS"];
const uncoded = username+":"+password;
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

try { const response = await axios.post(url,JSON.stringify(company),{headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
    }},    
    );
    return response;}
    catch (error) {
        console.error(error);
    }
}
async function getDetailsFromHubspot (HubspotID){
    const url = process.env["SINGLE_URL"]+HubspotID+"?properties=name,city,website,associate_member_or_dealer_member";
    const token = 'Bearer ' + process.env["HUBSPOT_API_KEY"];
    try{
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
        return response.data;}
        catch(err) {return undefined}

}

async function deleteOnePost(url){
    const username = process.env["USER"];
const password = process.env["PASS"];
const uncoded = username+":"+password;
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

try { const response = await axios.delete(url,{headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
    }},    
    );
    return response;}
    catch (error) {
        console.error(error);
    }
}

async function matchFromHook(company,action,propertyName,propertyValue)
{
    if (action==="company.deletion") {
        const wpposts = await retrievePosts(1,[]);
        const matchingAssociate = wpposts.find(associate => associate.HubspotID == company);
        !matchingAssociate ? console.log('no match') : console.log(matchingAssociate.id)
        if(matchingAssociate){
            console.log("deleting")
        return await deleteOnePost(process.env["WORDPRESS_POST_URL"]+'/'+matchingAssociate.id);}
    }

const comp = await getDetailsFromHubspot(company);

if(!comp) {return undefined}

if (action==="company.propertyChange" )
{
    if(comp.properties.associate_member_or_dealer_member === "Associate")
{
    const deets = {
        title:comp.properties.name,
        City:comp.properties.city,
        Website:comp.properties.website,
        HubspotID:comp.id
        }
        const wpposts = await retrievePosts(1,[]);
        const matchingAssociate = wpposts.find(associate => associate.HubspotID === deets.HubspotID);
if(matchingAssociate){
        await loadOnePost(process.env["WORDPRESS_POST_URL"]+'/'+matchingAssociate.id,deets);}
  else {await loadOnePost(process.env["WORDPRESS_POST_URL"],deets);}
    }
}
// if (action==="company.creation") {
//     const deets = {
//         title:comp.properties.name,
//         City:comp.properties.city,
//         Website:comp.properties.website,
//         HubspotID:comp.id
//         }
//     return await loadOnePost(process.env["WORDPRESS_POST_URL"],deets);}


}




module.exports = {retrieveCompanies, retrievePosts,getAssociates,prepList,loadOnePost,getDetailsFromHubspot,deleteOnePost,matchFromHook}