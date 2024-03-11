module.exports = async function (context, req) {
 
context.log(req.body)
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };