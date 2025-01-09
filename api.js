const { log } = require("console");
var express=require("express")
var conStr="mongodb://127.0.0.1:27017"
var mongoClient =require("mongodb").MongoClient
///express():This function initializes an Express application and returns an object.
var app=express();
//get(path,callback)
app.get('/',(req,res)=>{
  res.send("<h2>API Home Page</h2>")  
})
app.get('/men',(req,res)=>{
    res.send("<h2>Men's Fashion</h2>")
})
app.get('/women',(req,res)=>{
    res.send("<h2>Women's Fashion</h2>")
})
//to get categories from database and return
//create communication with database
app.get('/categories',(req,res)=>{
    mongoClient.connect(conStr)
    .then(clientObj=>{
        var database=clientObj.db("videolibrary");
        database.collection("categories").find({}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        });
    });    
})
app.get('/products/:category',(req,res)=>{
    mongoClient.connect(conStr)
    .then(clientObj=>{
        var database=clientObj.db("admin");
        database.collection("products").find({category:req.params.category}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        });
    });    
})

app.get('*',(req,res)=>{
    res.send("Requested Path Not Found");
})

app.listen(4000);
console.log(`API Started: http://127.0.0.1:4000`);