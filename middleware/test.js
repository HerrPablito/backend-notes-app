
function test {
  app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', JSON.stringify(req.headers));
    console.log('Request Body:', JSON.stringify(req.body));
    next();
  });  
}
module.exports ={test}