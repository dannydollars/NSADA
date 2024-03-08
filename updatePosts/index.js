const axios = require('axios');
const {getAssociates,prepList,retrieveCompanies} = require('../shared.js');
const wordpressPostUrl = process.env["WORDPRESS_POST_URL"];

async function loadToWordPress(url, array){

for(item of array){ const response = await axios.post(url, {
    type:type,
    data:item
})};

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
async function retrievePosts(page,array) {
    const allPosts = array;
    console.log(page);
    if(page==1) {console.log(page)}
const url = process.env["WORDPRESS_POST_URL"]+'?per_page=100'+'&page='+page;
res = await axios.get(url)
allPosts.push(...res.data);
if(res.headers['x-wp-totalpages']>page){
return retrievePosts(page+1,allPosts);

}
else {console.log(allPosts.length);
    return allPosts;}
}
async function main() {
const Associates = await retrieveCompanies('associates');
const Dealers = await retrieveCompanies('dealers');
const preppedAss = prepList(Associates);
const preppedDealers = prepList(Dealers);
const wpposts = await retrievePosts(1,[]);

for (item of wpposts){
console.log(item.title.rendered + item.HubspotID);
const matchingAssociate = preppedAss.find(associate => associate.HubspotID === item.HubspotID);
    if (matchingAssociate) {
      const post = await loadOnePost(wordpressPostUrl+"/"+item.id,matchingAssociate);
      console.log(post);
    }
    else {const post = await loadOnePost(wordpressPostUrl,matchingAssociate)}

}

}
module.exports = async function (context, req) {
   main();


 // Your code logic goes here

    context.res = {
        status: 200,
        body: 'Azure Function executed successfully.'
    };
};