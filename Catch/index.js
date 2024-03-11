module.exports = async function (context, req) {

 context.log(req.body[0].objectId)
 
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };