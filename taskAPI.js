var mongoClient = require("mongodb").MongoClient;
var conStr = "mongodb://127.0.0.1:27017";
var cors = require("cors");

var express = require("express");
var app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//create routes
// app.get('/users', (req, resp) => {
//     mongoClient.connect(conStr) //newly connect to database
//         .then(clientObj => {         //on successful connection
//             var database = clientObj.db("taskdb")
//             database.collection("users").find({}).toArray()
//                 .then(documents => {
//                     resp.send(documents);
//                     resp.end();
//                 })
//         })
// })
app.get('/users', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("users").find({}).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})

app.get('/tasks', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").find({}).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})
// get task based on id.
app.get('/tasks/:id', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").find({ TaskId: parseInt(req.params.id) }).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})

app.get('/categories', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("categories").find({}).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})

//get task based on category
app.get('/tasks/category/:categoryid', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").find({ CategoryId: parseInt(req.params.categoryid) }).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})

app.get('/priorities', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("priorities").find({}).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})

//get task based on priority
app.get('/tasks/priority/:priorityid', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").find({ PriorityId: parseInt(req.params.priorityid) }).toArray()
                .then(documents => {
                    resp.send(documents);
                    resp.end();
                })
        })
})


app.post('/register-user', (req, resp) => {
    // console.log('Received Data:', req.body); // Debugging Log

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email
    }
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("users").insertOne(user)
                .then(() => {
                    console.log('User Registered');
                    resp.end();

                })
        })
})

app.post('/add-task', (req, resp) => {
    var task = {
        TaskId: parseInt(req.body.TaskId),
        TaskName: req.body.TaskName,
        Description: req.body.Description,
        CategoryId: parseInt(req.body.CategoryId),
        PriorityId: parseInt(req.body.PriorityId),
        Deadline: new Date(req.body.Deadline)
    }
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").insertOne(task)
                .then(() => {
                    console.log('Task Added ');
                    resp.end();

                })
        })
})

app.put('/edit-task/:id', (req, resp) => {
    var task = {
        TaskId: parseInt(req.body.TaskId),
        TaskName: req.body.TaskName,
        Description: req.body.Description,
        CategoryId: parseInt(req.body.CategoryId),
        PriorityId: parseInt(req.body.PriorityId),
        Deadline: new Date(req.body.Deadline)
    }
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").updateOne({ TaskId: parseInt(req.params.id) }, { $set: task })
                .then(() => {
                    console.log('Task Updated');
                    resp.end();

                })
        })
})

app.delete('/delete-task/:id', (req, resp) => {
    mongoClient.connect(conStr)
        .then(clientObj => {
            var database = clientObj.db("taskdb")
            database.collection("tasks").deleteOne({ TaskId: parseInt(req.params.id) })
                .then(() => {
                    console.log('Task Deleted');
                    resp.end();
                })
        })
})

app.listen(5000,()=>{
    console.log(`Server Started http://127.0.0.1:5000`);
})



// Since x-www-form-urlencoded only supports string values, use one of the following formats:

// ✔ "2025-08-01T00:00:00Z" (ISO 8601) ✅ Best format
// ✔ "2025-08-01" (YYYY-MM-DD) ✅ Works fine
// ✔ "August 1, 2025" (Readable format) ✅ May work

