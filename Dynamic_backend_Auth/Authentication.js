// Creating Basic Authentication using JWT

const express = require("express");
const jwt = require ("jsonwebtoken");
const jwtPassword ="12345678";

const app = express();

app.use (express.json());


const All_users =[
{
    username: "rohit69@gmail.com",
    password: "123",
    name: "Rohit",
},

{
    username: "ajay69@gmail.com",
    password: "12345",            
    name: "Ajjay",
},

{
    username: "vijay69@gmail.com",
    password: "12355",            
    name: "Vijjay",
},
];

function userExists(username, password){
    for(let i=0; i<All_users.length; i++){
        if (All_users[i].username === username &&  All_users[i].password === password){
            return true;
        }
    }    
    
};

app.post("/signin", (req, res) => {
    const username =req.body.username;
    const password = req.body.password;
     
    if (!userExists(username, password)){
        return res.status(403).json({
            msg: "User doesnot exist in our database"
        });
}else{
    const token = jwt.sign({ username:username},"jwtPassword");
    return res.json({

        token: token,
    });
}
});


app.get("/user", (req, res) => {
    const token = req.headers.authorization;
try{
    const decoded = jwt.verify(token, "jwtPassword");
    const username = decoded.username;

for(let i=0; i<All_users.length; i++){
    if (All_users[i].username === username){
        return res.json({
            name: All_users[i].name,
        });
    }
}        
        
}
catch(err){
    return res.status(403).json ({
        msg : "Invalid token"
    })
  }
});
app.listen(3000);
console.log("Listening on port 3000");
