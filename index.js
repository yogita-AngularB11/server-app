// console.log("welcome to node JS");
// --------------------------------------------------
// var os=require("os")
// console.log(os.cpus());
// for (property in os){
//     console.log(property); 
// }
// --------------------------------------------------

var http=require("http");

// for (property in http){
//         console.log(property);      
//     }
//You have created server in memory.What is memory allocated for server we don't know so,"var app"
var app=http.createServer((request,response)=>{
    // response.write("Welcome to Node Server Side Web Application")
    //how to design an app with multiple request and multiple response---> Server Side Routing
    //for every route what response should be send? here we are sending plain text as response
    // response.write("<h2>Welcome to Node Server Side Web Application</h2>")
    //it is not transforming into heading.
    //server not telling what type of response it is sending.for that response uses "writeHead()" method
    response.writeHead(200,{'content-type':'text/html'})
     response.write("<h2>Welcome to Node Server Side Web Application</h2>")
    response.end();
})
//You have created server in memory where to start this application(run the server).Run on which location i.e.port number
app.listen(5000); 
// Client-side we are using 3000
console.log(`Server started:http://127.0.0.1:5000`);
