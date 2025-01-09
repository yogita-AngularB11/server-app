var http=require("http")

var app=http.createServer((req,res)=>{
    res.writeHead('200','application/json');
    res.write(JSON.stringify([{Name:'TV',Price:66000},{Name:'Mobile',Price:42000}]))
    res.end();
})

app.listen(5000)
console.log(`Server started:http://127.0.0.1:5000`);