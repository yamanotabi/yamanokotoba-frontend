const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();
app.use(require('morgan')('combined')); // optional
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// sessionの設定
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: 'auto',
    maxage: 1000 * 60 * 60 * 24
  }
}))

// twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: process.env.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      profile.access_token = token;
      profile.token_secret = tokenSecret;
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/hello', (req, res) => res.send('world'));

// twitter
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.json({ user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/session', (req, res) => {
  res.json({ user: req.user })
});

module.exports = {
  path: '/server',
  handler: app,
};
