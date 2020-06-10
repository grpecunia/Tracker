const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 4000;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");


let Users = require("./models/users.js")
let Entries = require("./models/entries.js")
let Activities = require("./models/activities.js")
let Funds = require("./models/funds.js")

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);


const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
// app.use(
//   cors({
//     //Fix for the cors origin errors
//     origin: [
//       "http://localhost:3000",
//     ],
//     optionsSuccessStatus: 200,
//     // credentials: true,
//   })
// );
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

const index = require("./routes/index");
const auth = require("./routes/auth");
app.use("/", index);
app.use("/", auth);

// Uncomment this line for production
let client = path.join(__dirname + "../public/index.html");
console.log("client", client);

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
  })
});

// Route for Getting ALL Activities
app.get('/api/activities', (req, res) => {
  Activities.find((err, activity) => {
    if (err) {
      console.log(err);
    } else {
      res.json(activity);
    }
  });
});

// Route for Getting ALL Funds
app.get('/api/funds', (req, res) => {
  Funds.find((err, funds) => {
    if (err) {
      console.log(err);
    } else {
      res.json(funds);
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

//Route to Create / Add NEW Activities
app.post('/api/activities',(req, res) => {
    let activity = new Activities(req.body);
    activity
      .save()
      .then((activity) => {
        res.status(200).json({ TimeTracker: "Activity added successfully" });
      })
      .catch((err) => {
        res.status(400).send("Adding new Activity failed. Check for errors!");
      });
});

//Route to Create / Add NEW Funds
app.post('/api/funds',(req, res) => {
    let fund = new Funds(req.body);
    fund.save()
        .then(fund => {
            res.status(200).json({'TimeTracker': 'Fund added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new Fund failed. Check for errors!');
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
    }).populate('activity_id user_id fund_id')
});

//Route to DELETE individual Users
app.delete('/api/users/:id',(req, res) => {
    let id = req.params.id;
    Users.findByIdAndDelete({ _id: id }, (err, users) => {
        res.json("User has been successfully deleted!");
    });
});

//Route to DELETE individual Activities
app.delete('/api/activities/:id',(req, res) => {
    let id = req.params.id;
    Activities.findByIdAndDelete({ _id: id }, (err, activity) => {
        res.json("Activity has been successfully deleted!");
    });
});

//Route to DELETE individual Funds
app.delete('/api/funds/:id',(req, res) => {
    let id = req.params.id;
    Funds.findByIdAndDelete({ _id: id }, (err, fund) => {
        res.json("Fund has been successfully deleted!");
    });
});

//Route to pull specific User Entries
app.get('/api/entries/:id', (req, res) => {
    let id = req.params.id
    Readings.findById({ _id: id }, (err, entries) => {
      if (err) {
        console.log(err);
      } else {
        res.json(entries);
      }
    })
      .populate("activity_id user_id fund_id");
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
            entries.activity_id = req.body.activity_id;
            entries.fund_id = req.body.fund_id;
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
app
  .get("/api/:id/entries", (req, res) => {
    let id = req.params.id;
    Entries.find({ user_id: id }, (err, entries) => {
      res.json(entries);
    }).sort({ datestamp: -1 });
  })

//Route for individual Users
app.get('/api/users/:id', (req, res) => {
    let id = req.params.id;
    Users.findById(id, (err, users) => {
        res.json(users);
    });
});

//Route for updating individual Users
app.post('/api/users/update/:id', (req, res) => {
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

//Route for updating individual Activities
app.post('/api/activities/update/:id', (req, res) => {
    Activities.findById(req.params.id, (err, activity) => {
        if (!activity)
            res.status(404).send("Error TimeTracker-Fellow! Check with support group.");
        else
            activity.activityName = req.body.activityName;
            activity.isActive = req.body.isActive;
            activity.description = req.body.description;
            activity.type = req.body.type;

            activity.save().then(activity => {
                res.json('Updates to Activity have been submitted!');
            })
            .catch(err => {
                res.status(400).send("Update were not possible. Check for errors!");
            });
        });
    });

//Route for updating individual Activities
app.post('/api/funds/update/:id', (req, res) => {
    Funds.findById(req.params.id, (err, fund) => {
        if (!fund)
            res.status(404).send("Error TimeTracker-Fellow! Check with support group.");
        else
            fund.fundName = req.body.fundName;
            fund.isActive = req.body.isActive;
            fund.description = req.body.description;
            fund.source = req.body.source;
            fund.amount = req.body.amount;

            fund.save().then(fund => {
                res.json('Updates to Fund have been submitted!');
            })
            .catch(err => {
                res.status(400).send("Update were not possible. Check for errors!");
            });
        });
    });


})
