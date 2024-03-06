module.exports = async function (context, req) {
    context.log('Azure Function triggered.');

    // Your code logic goes here

    context.res = {
        status: 200,
        body: 'Azure Function executed successfully.'
    };
};