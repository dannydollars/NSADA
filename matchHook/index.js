const axios = require('axios');
const {getAssociates,prepList,retrieveCompanies,matchFromHook} = require('../shared.js');
const wordpressPostUrl = process.env["WORDPRESS_POST_URL"];

module.exports = async function (context, req) {
context.log(context)
const content = context.req.body[0];
   const whatrec = await matchFromHook(content.objectId,content.subscriptionType,content.propertyName,content.propertyValue);
   context.res = {
        status: 200,
        body: 'Azure Function executed successfully.'
    };
};

