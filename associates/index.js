const axios = require('axios');

const {getAssociates,prepList,retrieveCompanies} = require('../shared.js');

console.log(getAssociates)
// async function getAssociates(token,url,array) {
//     if (url !== undefined) {
//     const response = await axios.get(url, {
//         headers: {
//             Authorization: token
//         }
//     });
//     array.push(...response.data.results);
// const nextpage = response.data.paging?.next?.link;
// if (nextpage !== undefined) {
//     await getAssociates(token,nextpage,array);

// }
// }}

module.exports = async function (context, req) {
  
  const comps =await retrieveCompanies('associates');
      context.res = {
        status: 200,
        body: prepList(comps)
  }
    
};
