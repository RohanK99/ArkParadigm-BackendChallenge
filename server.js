var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

var endpoints = require('./routes/endpoints.route')

var port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', endpoints);

// check for socket.io connections
io.on('connection', () =>{
    console.log('a user is connected')
})

// start server
var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});