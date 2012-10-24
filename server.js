var http = require('http');
var static = require('node-static');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var port = 8080;

var files = new static.Server('./public');

function handler(request, response) {
	request.addListener('end', function() {
		files.serve(request, response);
	});
}

// delete to see more logs from sockets
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  socket.on('send:coords', function (data) {
  	socket.broadcast.emit('load:coords', data);
  });
});

// start app on specified port
app.listen(port);
console.log('Your server goes on localhost:' + port);