module.exports = async function (context, req) {
  const body = JSON.parse(req.body)
    context.log(body)
 
 
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };