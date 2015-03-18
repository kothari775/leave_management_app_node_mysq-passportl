// app/routes.js
// load up the user model
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render(__dirname +'/views/index.ejs'); // load the index.ejs file
		//res.sendFile('../views/index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render(__dirname +'/views/login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render(__dirname +'/views/signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render(__dirname +'/views/profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// process the profile leave submission form
	app.post('/profile', isLoggedIn, function(req, res) {
		/*var EmpName = req.body.EmpName;
		var EmpEmail = req.body.EmpEmail;
		var start_date = req.body.start_date;
		var end_date = req.body.end_date;
		var LeaveMessage = req.body.LeaveMessage;
		var no_days = req.body.no_days;
*/
		var data = {
            EmpName: req.body.EmpName,
            EmpEmail: req.body.EmpEmail,
            start_date: req.body.start_date,
            end_date: req.body.end_date,                          
            LeaveMessage: req.body.LeaveMessage,                          
            no_days: req.body.no_days                          
        };

	    var query = connection.query("INSERT INTO leave set ? ",data, function(err, rows)	{
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.render(__dirname +'/views/profile.ejs'); 
          
        });
/*
		var insertQuery = "INSERT INTO leave ( EmpName, EmpEmail, start_date, end_date, LeaveMessage, no_days ) values (req.body.EmpName,req.body.EmpEmail,req.body.start_date,req.body.end_date,req.body.LeaveMessage,req.body.no_days)";
		
		connection.query(insertQuery, function(err, info) {
			console.log(err);
			console.log(info);
			console.log(insertQuery);

		    console.log('inserted');
		});	
		console.log('insert finish');
		res.render(__dirname +'/views/profile.ejs');	
*/	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
