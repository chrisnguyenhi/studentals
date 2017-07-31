var mysql = require('mysql');
var dbconfig = require('../config/database');

var express = require('express');

var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/main', isLoggedIn, function(req, res) {
    res.render('main.ejs');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/sell', isLoggedIn, function(req, res) {
    var connection = mysql.createConnection({
      host: dbconfig.connection.host,
      user: dbconfig.connection.user,
      password: dbconfig.connection.password,
      database: dbconfig.database
    });
    var data = req.body;
    connection.query('INSERT INTO housing SET ?', data, function(err, res) {
      if (err) throw err;
      connection.end();
    });
    res.redirect('/browse');
  });

  app.get('/sell', isLoggedIn, function(req, res) {
    res.render('sell.ejs');
  });

  app.get('/browse', isLoggedIn, function(req, res) {
    var connection = mysql.createConnection({
      host: dbconfig.connection.host,
      user: dbconfig.connection.user,
      password: dbconfig.connection.password,
      database: dbconfig.database
    });
    var query = connection.query('SELECT * FROM housing', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('browse.ejs', { page_title: "Browse Housing", data: rows });
    });
    connection.end();
  });

    app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/main',
      failureRedirect: '/login',
      failureFlash: true
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

    app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
        user: req.user
      });
    });

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });
  };

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  };