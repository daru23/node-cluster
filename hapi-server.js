var Hapi = require('hapi'),
    Good = require('good'),
    config = require("./config.json");

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

//Registering modules for console output
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err;
    }
    server.start(function () {
        server.log('info', 'Server '+process.pid+' running at: ' + server.info.uri);
    });
});
