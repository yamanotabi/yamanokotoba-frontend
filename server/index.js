const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const axios = require('axios');

const API_BASE_URL = process.env.YAMAGEN_API_URL
const WORD_API = process.env.V1 + "/words/"

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET_KEY = process.env.TWITTER_API_SECRET_KEY
const CALLBACK_URL = process.env.callbackURL

const SESSION_SECRET = process.env.SESSION_SECRET

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
  secret: SESSION_SECRET || 'secret',
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
      consumerKey: TWITTER_API_KEY,
      consumerSecret: TWITTER_API_SECRET_KEY,
      callbackURL: CALLBACK_URL
    },
    function(token, tokenSecret, profile, done) {
      profile.access_token = token;
      profile.token_secret = tokenSecret;
      return done(null, profile);
    },
  ),
);

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// word
app.get('/words', wrap(async (req, res) => {
  let requestURL = API_BASE_URL + WORD_API
  const response = await axios.get(requestURL)
  res.status(200).json({ words: response.data })
}));

app.get('/words/:id', wrap(async (req, res) => {
  let requestURL = API_BASE_URL + WORD_API + req.params.id
  console.log(requestURL)
  const response = await axios.get(requestURL)
  res.status(200).json({ word: response.data })
}));

// twitter
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  console.log(req.user)
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
  handler: app,
};
