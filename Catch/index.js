module.exports = async function (context, req) {
    main();
 
 
  // Your code logic goes here
 
     context.res = {
         status: 200,
         body: 'Azure Function executed successfully.'
     };
 };