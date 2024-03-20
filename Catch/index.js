const {getAssociates,prepList,retrieveCompanies, retrievePosts,loadOnePost,deleteOnePost} = require('../shared.js');
const wordpressPostUrl = process.env["WORDPRESS_POST_URL"];
const HubspotAPI = process.env["HUBSPOT_API_KEY"];
const opts = process.env["OPTS"];
const axios = require('axios');

async function getDetailsFromHubspot (HubspotID){
    const url = process.env["SINGLE_URL"]+HubspotID+opts;
    const token = 'Bearer ' + process.env["HUBSPOT_API_KEY"];
    try{
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
        return response.data;}
        catch(err) {console.log(err.code)}

}
module.exports = async function (context, req) {
    const wordpressPostUrl = process.env["WORDPRESS_POST_URL"];

  const HubspotID = req.body[0].objectId;
  const subtype = req.body[0].subscriptionType;
  const field = req.body[0].propertyName;
  console.log(field)
 
  switch(subtype) {
   case "company.propertyChange" :
   if (field==="associate_member_or_dealer_member") {
    try {
        const curitem = await getDetailsFromHubspot(HubspotID);
        if (curitem.properties.associate_member_or_dealer_member!=="Associate") {
console.log("nolongerassociate")
const wpposts = await retrievePosts(1,[]);
console.log(HubspotID)
 const filtered = wpposts.filter(item => {
     return item.HubspotID == HubspotID;
 });
 deleteOnePost(wordpressPostUrl+"/"+filtered[0].id);
   }}
catch(err) {console.error(err.code)}
}

 try {
    const curitem = await getDetailsFromHubspot(HubspotID);
 if (curitem.properties.associate_member_or_dealer_member==="Associate") {
      
    const wpposts = await retrievePosts(1,[]);
   console.log(HubspotID)
    const filtered = wpposts.filter(item => {
        return item.HubspotID == HubspotID;
    });
    const deets = {
        title:curitem.properties.name,
        City:curitem.properties.city,
        Website:curitem.properties.website,
        HubspotID:curitem.id
        }
        loadOnePost(wordpressPostUrl+"/"+filtered[0].id,deets);     
    }}
    
 
    catch (err) {console.error(err.code)}
    break;
}  
    
    


     context.res = {
         status: 200,
         body: 'success'
     };
 };