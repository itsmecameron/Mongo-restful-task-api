var express = require('express');
var app = express();
// var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
// var flash = require('express-flash');

//naming the database
mongoose.connect('mongodb://localhost/basic_mongoose');
// mongoose.Promise = global.Promise;



app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// app.use(flash());
// app.use(session({
//     secret: 'GET IN MAH BELLY!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 60000
//     }
// }))

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

app.get('/tasks', (req, res) => {
    Task.find({}, function (err, all_tasks) {
        if (err) {
            console.log('something went wrong', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully displaying all tasks');
            res.json({
                message: 'Success',
                data: all_tasks
            });
        };
    });
});

app.post('/tasks', (req, res) => {
    console.log('*****************************************')
    console.log(req.body)
    console.log('*****************************************')
    Task.create(req.body, (err, new_task) => {
        if (err) {
            console.log('You werent able to create', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully added a new tast!', new_task);
            res.json({
                message: 'Success',
                data: new_task
            });
        };
    });
});

app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            console.log('You werent able to delete', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully deleted a task!');
            res.json({
                message: 'Success',
            });
        };
    });
});

app.get('/tasks/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }, (err,task) => {
        if (err) {
            console.log('You werent able to find task', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully got the task', task);
            res.json({
                message: 'Success',
                data: task
            });
        };
    });
});

app.put('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({ 
        _id: req.params.id
    }, req.body, (err, task) => {
        if (err) {
            console.log('You werent able to find task', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully updated', task);
            res.json({
                message: 'Successful update',
                data: task
            });
        };
    });
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
	response.send("404")
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})