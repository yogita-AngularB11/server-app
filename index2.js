// var http=require("http")

// var app=http.createServer((req,res)=>{
//     res.writeHead('200','application/json');
//     res.write(JSON.stringify([{Name:'TV',Price:66000},{Name:'Mobile',Price:42000}]))
//     res.end();
// })

// app.listen(5000)
// console.log(`Server started:http://127.0.0.1:5000`);
// ----------------------------------------------------


const { error } = require("console");
var http = require("http")

// mongodb driver-->mongodb module-->MongoClient class
//MongoClient class to communicate with database 
var mongoClient = require("mongodb").MongoClient;

var app = http.createServer((req, res) => {
    res.writeHead('200', 'application/json');
    mongoClient.connect("mongodb://127.0.0.1:27017")
        .then(clientObject => {
            var database = clientObject.db("videolibrary");
            
            database.collection("categories").find({}).toArray()
            .then(documents => {
                res.write(JSON.stringify(documents))
                res.end();
            })
        })
        .catch(error => {
            console.log(error);
        })
    });
    app.listen(4000)
    console.log(`Server started:http://127.0.0.1:4000`);