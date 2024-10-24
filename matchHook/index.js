const axios = require('axios');
const {getAssociates,prepList,retrieveCompanies,matchFromHook} = require('../shared.js');
const wordpressPostUrl = process.env["WORDPRESS_POST_URL"];

module.exports = async function (context, req) {
const content = context.req.body[0];
context.log(content)

   const whatrec = await matchFromHook(content.objectId,content.subscriptionType,content.propertyName,content.propertyValue);
   context.log(whatrec)
   context.res = {
        status: 200,
        body: 'Azure Function executed successfully.'
    };
};

