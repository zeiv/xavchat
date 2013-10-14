var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var jade = require('jade');
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
   app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('home.jade');
});

io.sockets.on('connection', function (socket) {
	socket.on('setAlias', function (data) {
		socket.set('alias', data);
	});
	socket.on('message', function (message) {
		socket.get('alias', function (error, name) {
			var data = { 'message' : message, alias : name };
			socket.broadcast.emit('message', data);
			console.log("user " + name + " send this : " + message);
		})
	});
});

server.listen(3000);