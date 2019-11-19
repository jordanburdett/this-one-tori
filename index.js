const express = require('express')
const path = require('path')
var fs = require('fs')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://rwomixvqbgubak:8b23aeaeda698af90a27e3a3d059edc4b3c7325c125705339b722caf7ba15e7d@ec2-54-83-61-142.compute-1.amazonaws.com:5432/d5nbldkuhdg9ue?ssl=true"

express()
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

  })
  .get('/query', function (req, res) {

    var sql = "SELECT * FROM scriptures";
    pool.query(sql, function (err, result) {

      // If an error occurred...
      if (err) {
        console.log("Error in query: ")
        console.log(err);
      }

      // Log this to the console for debugging purposes.
      console.log("Back from DB with result:");
      console.log(result.rows);
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

      .listen(PORT, () => console.log(`Listening on ${PORT}`))

