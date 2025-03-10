//using the mongodb Node.js driver to connect to a MongoDB database.
const { MongoClient } = require("mongodb");
// allows your Express app to accept requests from different origins (domains, ports, or protocols).
var cors=require("cors")
//imports the Express framework
var express= require("express")
//creates an instance of an Express application (app), which is used to define routes, middleware, and start a server.
var app=express()

// This middleware parses incoming URL-encoded data (like form submissions).
//{ extended: true } allows parsing complex objects and nested data (using the qs library instead of querystring).
//{ extended: false } → Only allows simple key-value pairs (uses the querystring library).
app.use(express.urlencoded({extended:true}))

app.use(express.json())

// Route to add a new product
//When a client (frontend or API tool like Postman) sends a request,the function inside is executed.
//req (request) → Contains the data sent by the client.
//resp (response) → Used to send a response back to the client.
app.post('/add-product',(req,resp)=>{
// Connect to MongoDB
MongoClient.connect("mongodb://127.0.0.1:27017")
.then(clientObj=>{
    var database=clientObj.db("demodb") // Select database

    database.collection("tblproducts").insertOne({
        id:parseInt(req.body.id),Name:req.body.Name,Price:parseInt(req.body.Price)
         }).then(()=>{
        console.log("Record Inserted Successfully...");
        resp.end();
        
    })
})
});

app.listen(6000)
console.log('server started at 6000 port');

