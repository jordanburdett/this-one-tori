const express = require('express')
const path = require('path')
var fs = require('fs')

var session = require('express-session');
var FileStore = require('session-file-store')(session);

const bcrypt = require('bcrypt');
const saltRounds = 10;

const myPlaintextPassword = 'verytired';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  console.log(hash);

  bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    if (res) {
      console.log("equal");
    }
  });
  
});



process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://rwomixvqbgubak:8b23aeaeda698af90a27e3a3d059edc4b3c7325c125705339b722caf7ba15e7d@ec2-54-83-61-142.compute-1.amazonaws.com:5432/d5nbldkuhdg9ue?ssl=true";
console.log("using connection string " + connectionString);

const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString});

var logger = function logRequest(req, res, next) {
  console.log("Received a request for: " + req.url);
  next();
}

express()
  .use(require('morgan')('dev'))
  .use(session({
    name: 'server-session-cookie-id',
    secret: 'shh',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
  }))
  .use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
  })
  .use(logger)
  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res) {
    fs.readdir('views/pages', function (err, f) {
      if (err) console.log(process.cwd());
      var files = f;
      f.forEach(function (file) {
        console.log(file);
      })

      console.log(files);

      res.render('pages/index', {
        files: files
      })
    })
   // https://github.com/jordanburdett/this-one-tori
  })
  .post('/findPerson', function (req, res) {
    var id = req.body.id;
    var sql = "SELECT * FROM person WHERE id = " + id;
    pool.query(sql, function (err, result) {

      // If an error occurred...
      if (err) {
        console.log("Error in query: ")
        console.log(err);
      }

      // Log this to the console for debugging purposes.
      console.log("Back from DB with result:");
      console.log(result.rows);

      res.json(result.rows);
    }
  )})
  .get('/getPerson', function (req, res) {
    if (err) console.log(err);

    var id = req.body.id;
    var sql = "SELECT * FROM person WHERE id = " + id;
    pool.query(sql, function (err, res) {
      if (err) console.log(err);
      console.log(res.json(results.row));
    })
  })
  .get('/math', (req, res) => res.render('pages/math'))
  .get('/db', (req, res) => res.render('pages/db'))
  .post('/domath', function (req, res, next) {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let oper = req.body.operator;

    let answer = undefined;
    switch (oper) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        answer = num1 / num2;
        break;
      default:
        answer = "ERROR!";
    }

    console.log(answer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<div class='display-4'>The answer is " + answer.toString() + "</div>");
    res.end();
  })
  .post('/login', function (req, res) {
    username = req.body.username;
    password = req.body.password;
    
    var sql = "SELECT password FROM users where username = '" + username + "'";
    pool.query(sql, function (err, queryRes) {
      if(err) {
        console.log("ERRRROOOOOORRRRR!!!!");
        console.log(err);
      }
      console.log("QUERY!!!!!!");
      console.log(queryRes.rows);

      var hash = queryRes.rows[0].password;
      console.log("PASSWORD: " + password);
      console.log("HASH: " + hash);

      bcrypt.compare(password, hash, (err, same) => {
        console.log(same);
        if (same) {
          console.log("They are the same...");
          req.session.user = username;
          res.json({success: true});
        }
        else {
          console.log('success: false');
          res.json({success: false});
        }
      })
    })

    /*
    console.log("username: ", username, "Password: ", password);
    if(username == 'admin' && password == 'password') {
      console.log('success: true');
      req.session.user = username;
      res.json({success: true});
    } else {
      console.log('success: false');
      res.json({success: false});
    }
    */
  })


  .post('/logout', function (req, res) {
    if (!req.session.user) {
      console.log('no one to log out');
      res.json({success: false});
    } else {
      req.session.user = null;
      console.log('logged out');
      res.json({success: true});
    }
  })
  .get('/getServerTime', (function verifyLogin(req, res, next) {
    if(!req.session.user) {
      res.status(401).json({success: false, error: 'Not logged in'});
    }
    else {
      next();
    }
  }), function (req, res) {
    var time = new Date();
    res.json({success: true, time: time});
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))