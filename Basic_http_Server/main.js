const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());

app.post ('/', function(req, res){
    console.log(req.body)
    console.log(req.headers['authorization'])
    res.send('ok')
    })

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
// ``  Template Literals , ${port} ---> Embedding Expressions
// means  you can include variables, function calls, or 
//any valid JavaScript expression directly inside a string literal.