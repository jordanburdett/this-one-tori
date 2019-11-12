const express = require('express')
const path = require('path')
var fs = require('fs')
const PORT = process.env.PORT || 5000

express()
  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res) {

    fs.readdir('views/pages', function(err, f) {
      if (err) console.log(process.cwd());
      var files = f;
      f.forEach(function(file) {
        console.log(file);
      })

      console.log(files);
      
      res.render('pages/index', {
        files: files
      })
    })
    
  })
  .get('/math', (req, res) => res.render('pages/math'))
  .get('/db', (req, res) => res.render('pages/db'))
  .post('/domath', function (req, res, next) {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let oper = req.body.operator;

    let answer = undefined;
    switch(oper) {
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

   res.writeHead(200, {'Content-Type':'text/html'});
   res.write("<div class='display-4'>The answer is " + answer.toString() + "</div>");
   res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

