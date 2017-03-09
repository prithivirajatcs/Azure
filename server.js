// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
//var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
//var User   = require('./models/User'); // get our mongoose model

var path = require('path');

var apiRoutes = express.Router(); 

var callbackURL = "http://localhost:8080/Index"


// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route
// app.get('/', function(req, res) {
//     res.send('Hello! The API is at http://localhost:' + port + '/api');
// });

app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


// var port = process.env.PORT || 3001;
// var User = require('./models/User');

// mongoose.connect(process.env.MONGO_URL);


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));
// app.use(function(req,res,next){
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//  next();
// })

// viewed at http://localhost:8080
app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'));
});
app.get("/.auth/login/aad/callback", function(req,res){
  console.log(req.query.postData);
  res.write("{Data:'Prithvi'}");
    res.end();
    console.log(app.post);
});

app.post("/send", function(req,res){

// User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                res.json({
//                     type: true,
//                     data: user,
//                     token: user.token
                    
//                 }); 
//             } else {
//                 res.json({
//                     type: false,
//                     data: "Incorrect email/password"
//                 });    
//             }
//         }
//     });


  var username = "prithivi";
  var password = "Raja";
  var un = req.body.usrname;
  var pw = req.body.pasword;

  if ((un == username) && (pw == password)) {
    console.log("authenticated");

    var options = {
    'expiresIn': '1h'
    };

    var token = jwt.sign(un, app.get('superSecret')
         // expiresIn: 60*60*24 // expires in 24 hours
        );

        // return the information including token as JSON
var string = encodeURIComponent(token);
     console.log(string);
     res.redirect('/?valid=' + string);
     
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

    //res.write("Done");
    //res.redirect("http://www.google.co.in/");


  }
  else {
    console.log("Not authenticated");
    res.write("failed");
  }
    // console.log("Post Method");
    // res.write("Post Methiod is called");


 // User.findOne({
 //    name: req.body.usrname,
 //  }, function(err, user) {

 //    if (err) throw err;

 //    if (!user) {
 //      res.json({ success: false, message: 'Authentication failed. User not found.' });
 //    } else if (user) {

 //      // check if password matches
 //      if (user.password != req.body.pasword) {
 //        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
 //      } else {

 //        // if user is found and password is right
 //        // create a token
 //        var token = jwt.sign(user, app.get('superSecret'), {
 //         // expiresInMinutes: 1440 // expires in 24 hours
 //        });

 //        // return the information including token as JSON
 //        res.json({
 //          success: true,
 //          message: 'Enjoy your token!',
 //          token: token
 //        });
 //      }   

 //    }

 //  });




    res.end();
});

//Sign Up
// app.post('/signin', function(req, res) {
//     User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                 res.json({
//                     type: false,
//                     data: "User already exists!"
//                 });
//             } else {
//                 var userModel = new User();
//                 userModel.username = req.body.username;
//                 userModel.password = req.body.password;
//                 userModel.save(function(err, user) {
//                     user.token = jwt.sign(user, process.env.JWT_SECRET);
//                     user.save(function(err, user1) {
//                         res.json({
//                             type: true,
//                             data: user1,
//                             token: user1.token
//                         });
//                     });
//                 })
//             }
//         }
//     });
// });
app.listen(port);
console.log("magic happens at http://localhost:" +port);