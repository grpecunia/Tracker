const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 4000;
let Users = require("./models/users.js")
let Entries = require("./models/entries.js")

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("TimeTracker database connection established successfully");
});

app.listen(PORT, () => {
  console.log("Node Server is running on Port: " + PORT);
});

// Route for Getting ALL Users
app.get('/api/users', (req, res) => {
  Users.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

//Route to Create / Add NEW Users
app.post('/api/users',(req, res) => {
    let user = new Users(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'TimeTracker': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new User failed. Check for errors!');
        });
});

//Route for pull all available time entries
app.get('/api/entries',(req, res) => {
    Entries.find((err, entries) => {
        if (err) {
            console.log(err);
        } else {
            res.json(entries);
        }
    });
});

//Route to DELETE individual Users
app.delete('/api/users/:id',(req, res) => {
    let id = req.params.id;
    Users.findByIdAndDelete({ _id: id }, (err, users) => {
        res.json("User has been successfully deleted!");
    });
});

//Route to pull specific User Entries
app.get('/api/entries/:id', (req, res) => {
    let id = req.params.id
    Readings.findById({_id : id},(err, entries) => {
        if (err) {
            console.log(err);
        } else {
            res.json(entries);
        }
    });
});

//Route to DELETE individual Entries
app.get('/api/entries/:id',(req, res) => {
    let id = req.params.id;
    Entries.findByIdAndDelete(id, (err, entries) => {
        res.json("Entry has been deleted!");
    });
});

//Route for Adding Entries to individual Users
app.post('/api/:id/entries/',(req, res) => {
    let id = req.params.id
    Entries.find({user_id : id }, (err, entries) => {
        if (!entries)
            res.status(404).send("Error TimeTracker-Fellow! Check with support group.");
        else
            entries.user_id = req.body.user_id;
            entries.datestamp = req.body.datestamp;
            entries.activity = req.body.activity;
            entries.fund = req.body.fund;
            entries.duration = req.body.duration;
            entries.notes = req.body.notes;

            let entry = new Entries(req.body)
            entry.save().then(entry => {
                res.json('New entry has been submitted!');
            })
            .catch(err => {
                res.status(400).send("Time entry was not possible. Check for errors!");
            });
    });
});

//Entry List Route for individual Users
app.get('/api/:id/entries',(req, res) => {
  let id = req.params.id;
  Entries.find({user_id : id}, (err, entries) => {
    res.json(entries);
  }).sort({datestamp : -1})
});

//Route for individual Users
app.get('/api/users/:id', (req, res) => {
    let id = req.params.id;
    Users.findById(id, (err, users) => {
        res.json(users);
    });
});

//Route for updating individual Users
app.post('/update/:id', (req, res) => {
    Users.findById(req.params.id, (err, users) => {
        if (!users)
            res.status(404).send("Error TimeTracker-Fellow! Check with support group.");
        else
            users.firstName = req.body.firstName;
            users.middleName = req.body.middleName;
            users.lastName = req.body.lastName;
            users.jobTitle = req.body.jobTitle;
            users.department = req.body.department;
            users.isActive = req.body.isActive;
            users.isManager = req.body.isManager;
            users.location = req.body.location;
            users.anualSalary = req.body.anualSalary;
            users.hourlyRate = req.body.hourlyRate;
            users.weeklyHours = req.body.weeklyHours;
            users.hireDate = req.body.hireDate;
            users.terminationDate = req.body.terminationDate;
            users.email = req.body.email;
            users.username = req.body.username;


            users.save().then(users => {
                res.json('Updates to user have been submitted!');
            })
            .catch(err => {
                res.status(400).send("Update were not possible. Check for errors!");
            });
    });
});



