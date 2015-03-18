// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                console.log('before login 97');

                // if the user is found but the password is wrong
                if (password != rows[0].password){
                    console.log('inside login 101');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }                    
                console.log('outside login 104');
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );

    // =========================================================================
    // Leave form submissions ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-1leavesubmission',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            EmpNameField : 'EmpName',
            EmpEmailField : 'EmpEmail',
            start_dateField : 'start_date',
            end_dateField : 'end_date',
            LeaveMessageField : 'LeaveMessage',
            no_daysField : 'no_days',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, EmpName, EmpEmail, start_date, end_date, LeaveMessage, no_days, done) {
            console.log('130');
            console.log(EmpName);
            console.log(EmpEmail);
            console.log(start_date);
            console.log(end_date);
            console.log(LeaveMessage);
            console.log(no_days);

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            // if there is no user with that username
            // create the user
            var newLeaveMysql = {
                EmpName: EmpName,
                EmpEmail: EmpEmail,
                start_date: start_date,
                end_date: end_date,                          
                LeaveMessage: LeaveMessage,                          
                no_days: no_days                          
            };
            console.log('151');
            console.log(EmpName);
            console.log(EmpEmail);
            console.log(start_date);
            console.log(end_date);
            console.log(LeaveMessage);
            console.log(no_days);
            var insertQuery = "INSERT INTO leave ( EmpName, EmpEmail, start_date, end_date, LeaveMessage, no_days ) values (?,?,?,?,?,?)";
            console.log('159');
            console.log(EmpName);
            console.log(EmpEmail);
            console.log(start_date);
            console.log(end_date);
            console.log(LeaveMessage);
            console.log(no_days);
            connection.query(insertQuery,[newLeaveMysql.EmpName, newLeaveMysql.EmpEmail, newLeaveMysql.start_date, newLeaveMysql.end_date, newLeaveMysql.LeaveMessage],function(err, rows) {
                newLeaveMysql.id = rows.insertId;
            console.log('168');
            console.log(EmpName);
            console.log(EmpEmail);
            console.log(start_date);
            console.log(end_date);
            console.log(LeaveMessage);
            console.log(no_days);
                return done(null, newLeaveMysql);
            });
            console.log('177');
            console.log(EmpName);
            console.log(EmpEmail);
            console.log(start_date);
            console.log(end_date);
            console.log(LeaveMessage);
            console.log(no_days);            
               
        })
    );
};
