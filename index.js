const express = require('express')
const path = require('path')
var fs = require('fs')
const PORT = process.env.PORT || 5000

express()
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
