// SocketStream 0.4 Entry file

var SocketStream = require('socketstream'),
    ss = SocketStream()

module.exports = function(){

  window.ss = ss.services

  require('./chat')

}