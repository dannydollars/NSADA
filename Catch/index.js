module.exports = async function (context, req) {
 
 async function parsereq(req) {
const deets = JSON.parse(req.body);
context.log(deets.objectId)

 }

 parsereq(req);
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };