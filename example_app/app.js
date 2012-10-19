// Example SocketStream 0.4 Application
// Note: API is subject to change at this stage

var http = require('http'),
    SocketStream = require('../socketstream'),
    app = SocketStream();

// Support Jade
app.preprocessor('jade', require('./jade-stream')())
app.preprocessor('styl', require('./stylus-stream')())

// Setup Websocket Transport
app.transport(require('./ss-engineio'))

// Define a Single Page Client
var mainClient = app.client('client/views/main.jade', {
  css:  ['client/css/reset.css', 'client/css/main.styl']
});

// Serve it 
app.route('/', mainClient)

var server = http.createServer(app.router()).listen(3000, '127.0.0.1')

// Start listening over the websocket
var ss = app.start(server, function(){
  console.log('Server running at http://127.0.0.1:3000');  
})


// To be implemented:

// var Stream = require('stream')
// var tweetStream = app.stream.createWriteStream('tweets')
// tweetStream.readable = true
// setInterval(function(){
//   tweetStream.write('This is a tweet')
// }, 1000)

// tweetStream.pipe(app.connection)

