module.exports = async function (context, req) {
   
 
 
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: req.body
     };
 };