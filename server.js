const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

const server = require('http').createServer(app)

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/app/dist')))


// this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
//     res.sendFile(path.join(__dirname, '/app/dist/index.html'))
// })

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const Data = require("./LoadData.js")
// let d = new Data();

const port = process.env.PORT || 8000
server.listen(port, () =>{
  console.log(`Server listening on port ${port}`);
})


