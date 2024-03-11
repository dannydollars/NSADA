module.exports = async function (context, req) {
 
 async function parsereq(req) {
context.log(req)

 }

 parsereq(req);
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };