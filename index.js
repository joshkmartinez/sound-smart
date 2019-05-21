var express = require('express')
var app = express()
const lines = require('./lines')
const api = express.Router()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
api.get(['/line', '/l', '/r', '/random'], (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(lines[Math.floor(Math.random() * lines.length)])
})
api.get(['/all', '/list', '/a', '/allLines'], (req, res) => {
  res.json(lines)
})

api.get(['/num', 'number', '/n'], (req, res) => {
  res.json(Object.keys(lines).length)
})
api.get('/', (req, res) => {
  res.send(`
This microservice just gives you lines that make you sound VERY SMART.
- /r
    - returns a random line
- /n
    - returns the number of lines in the db
- /a
    - returns **all** of the lines in the db

https://github.com/joshkmartinez/sound-smart
  `)
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})
