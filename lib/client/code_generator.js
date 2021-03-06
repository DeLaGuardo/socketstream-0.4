"use strict";

/* 
  Code Generator
  --------------

  Output's a client-side module containing all the config and code needed
  to wire up the Transport and Services on the client.

  Why output to a file? Because Browserify 2 no longer sends the module
  resolution algo over the wire and only accepts file names as inputs.

  TODO: The client code for each Service (and the Transport) should be a true module

*/

module.exports = function(app) {
  
  var buf = [];

  buf.push("// Note: This file was auto-generated by SocketStream at " + String(Date.now()) );
  buf.push("// Do not modify!\n");

  buf.push("module.exports = function(app) {\n");

  buf.push("  // PASS THROUGH CONFIG");
  buf.push("  app.env = '" + app.env + "';\n");

  buf.push("  // DEFINE TRANSPORT");
  buf.push("  app.transport(" + app._transport.client.toString() + ", " + JSON.stringify(app._transport.options.client) + ");\n");

  buf.push("  // DEFINE SERVICES");
  for (var id in app._services.services) {
    var service = app._services.services[id];
    buf.push("\n  // " + service.assigned.name + " service");
    buf.push("  app.services.register(" + JSON.stringify(service.paramsForClient()) + ", " + service.clientApi.toString() + ");");
  }

  buf.push("\n  return app;");
  buf.push("};\n");

  return buf.join("\n");

};