// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var facebookCredentials = require('../config/facebookAuth.config');
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
// var GoogleCredentials = require('../config/googleAuth.config');

const route = require('express').Router();
const User = require('../db').User;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = require('../config/googleAuth.config');
const GitHubStrategy = require('passport-github').Strategy;
const githubConfig = require('../config/github.config.js');
const db = require('../db');

// Local Strategy (Username & Password)
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  db.getUser({_id: id}, function (err, user) {
    done(err, user);
  });
});
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Google OAuth2 Strategy
passport.use(new GoogleStrategy({
  clientID: googleConfig.id,
  clientSecret: googleConfig.secret,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    db.findOrCreateUser({ googleId: profile.id }, {
      fullName: profile.displayName,
      photo: profile.photos[0].value
    }, function (err, user) {
      if (err) {
        console.log(err.message);
      }
      return done(err, user);
    });
  }
));


passport.use(new GitHubStrategy({
  clientID: githubConfig.id,
  clientSecret: githubConfig.secret,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    db.findOrCreateUser({ githubId: profile.id }, {
      fullName: profile.displayName,
      photo: profile.photos[0].value
    }, function (err, user) {
      return cb(err, user);
    });
  }
));



route.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).end(req.user.username);
});

route.post('/register', function (req, res, next) {

  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      res.status(409).send('username already exists, please choose a different username');
      return;
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.status(201).end(user.username);
    });
  });
});




//Google OAuth2 endpoints
route.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

route.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });


route.get('/auth/github',
  passport.authenticate('github'));

route.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home. 
    res.redirect('/');
  });



//Logout of current session
route.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = route;






















// var User = {
//   findOrCreate: function (facebookId, callback) {
//     User.user.facebookId = facebookId;
//     console.log('user: ', User.user);
//     callback(null, User.user);
//   },
//   findById: function (id, callback) {
//     callback(null, User.user);
//   },
//   user: {
//     _id: '434279842342342342',
//     facebookId: '',
//     name: 'Bob',
//     email: 'bob@email.com',
//     username: 'bob33'
//   }
// };



// passport.use(new FacebookStrategy({
//   clientID: facebookCredentials.id,
//   clientSecret: facebookCredentials.secret,
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// }, function (accessToken, refreshToken, profile, done) {
//   console.log('Callback called');
//   User.findOrCreate({facebookid: profile.id}, function (err, user) {
//     console.log('User: ', user);
//     if (err) { return done(err); }
//     done(null, user);
//   });
// }));



// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//   consumerKey: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug.apps.googleusercontent.com',
//   consumerSecret: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug',
//   callbackURL: 'http://localhost:3000/auth/google/callback'
// }, function (token, tokenSecret, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }));



// passport.serializeUser(function (user, done) {
//   console.log('Serializing User', user);
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   console.log('Deserializing User', id);
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });