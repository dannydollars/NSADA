module.exports = async function (context, req) {
 try { const body = JSON.parse(req.body)
    context.log(body)}
    catch (error) {context.log(error)}
 
 
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'success'
     };
 };