var express = require("express")
var conStr = "mongodb://127.0.0.1:27017"
var cors = require("cors")

var mongoClient = require("mongodb").MongoClient
///express():This function initializes an Express application and returns an object.
var app = express();
// Allow to convert the incoming data into any format you want
app.use(express.urlencoded({ extended: true }))
//
app.use(express.json())
app.use(cors())

//get(path,callback)
app.get('/', (req, res) => {
    res.send("<h2>API Home Page</h2>")
})
app.get('/men', (req, res) => {
    res.send("<h2>Men's Fashion</h2>")
})
app.get('/women', (req, res) => {
    res.send("<h2>Women's Fashion</h2>")
})
//to get categories from database and return
//create communication with database
app.get('/categories', (req, res) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("videolibrary");
            database.collection("categories").find({}).toArray()
                .then(documents => {
                    res.send(documents);
                    res.end();
                });
        });
})
// to add category: post() method
//connect with categories table and  insert data in categories table which is present in our MongoDB
app.post("/add-category", (req, res) => {
    //collect data
    //this is server side and value comes from client form/ReactForm/AngularForm
    //default form method is "post".request object will collect this data//
    //get method:form data will be in query string
    //post method:form data will be in form-body
    var category = {
        CategoryId: parseInt(req.body.CategoryId),
        CategoryName: req.body.CategoryName
    }

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("videolibrary")

        database.collection("categories").insertOne(category)
            .then(() => {
                console.log('Category added successfully...');
                res.end();
                //"--post--" method we cannot test through address bar we have to use postman tool
            })
    })
})

//to update category: put() method
//update method expecting two queries one is find then update
//based on id we have to find it and update it--> parameter
app.put('/edit-category/:id', (req, res) => {

    var id = parseInt(req.params.id);
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("videolibrary");
            database.collection("categories").updateOne({ CategoryId: id }, { $set: { CategoryId: parseInt(req.body.CategoryId), CategoryName: req.body.CategoryName } })
            console.log("category updated successfully...");
            res.end();
        })

})
//delete category
app.delete('/delete-category/:id', (req, res) => {

    mongoClient.connect(conStr).then(clientObj => {

        var database = clientObj.db("videolibrary");

        database.collection('categories').deleteOne({CategoryId: parseInt(req.params.id) }).then (() => {
                console.log("category deleted successfully...");
                res.end();
            })

    })
})

app.get('/products/:category', (req, res) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("admin");
            database.collection("products").find({ category: req.params.category }).toArray()
                .then(documents => {
                    res.send(documents);
                    res.end();
                });
        });
})

app.get('*', (req, res) => {
    res.send("<h2>Requested Path Not Found</h2>");
})

app.listen(4000);
console.log(`API Started: http://127.0.0.1:4000`);