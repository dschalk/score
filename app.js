express = require('express');
Promise = require ('promise');
routes = require('./routes/');
http = require('http');
path = require('path');

app = express();
server = http.createServer(app);
var players = {};
// all environments
app.use(function noCachePlease(req, res, next) {
	if (req.url === '/') {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);
	}

	next();
});
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());;
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts/')));
app.use(express.static(path.join(__dirname, 'views')));

app.configure(function() {
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(express.static(path.join(__dirname, 'modules')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
    app.use(express.directory('public'));
});
io = require("socket.io").listen(server);

evalNums = require('./routes/evalNums');
timer = require('./routes/tim').tim();
gameData = require('./routes/monitor').monitor(timer, io, Promise);

var messages = [];
var data = {};
var name = "Steve";
var k = 777;
var a;
var l;
var i = 888;
app.get('/', routes.index);
app.use(function (req, res, next){
    res.locals.scripts = ['/public/javascripts/jquery-1.10.3-min.js', '/public/javascripts/ion.sounds.js', '/modules/processing3.js', '/public/javascripts/processing4.js', '/public/javascripts/processing2.js'];
    next();
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//@@@@@@@@@@@@@#################$$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@

io.sockets.on('connection', function (socket) {// Creates socket objects when clients connect and passes them .



    socket.on('stop', function (data) {
		var scorePromise = new Promise(function (resolve, reject) {
				resolve(io.sockets.emit('scoreup', data));
				reject(function() {
					console.log('Error');
				});
			});
			scorePromise.then(timer.setBail(false))
				.then(timer.setTick(-1))
	});

    socket.on('happyclown', function (data) {
        players[data.player] = data.playerdoc;
        socket.emit('sb', players);        socket.broadcast.emit('sb', players);
    });

	socket.on('tilt2', function (data) {
		io.sockets.emit('tilt', data);
		console.log('555555555555555555555555555555555555555555555555555555555555555__sent data to tilt from app.js')
	})

	socket.on('tiltControl', function () {
	var tiltPromise = new Promise(function (resolve, reject) {
		resolve(data = gameData.getData());
		reject(function() {console.log('Error at timeFinish');
		});
	});

	tiltPromise.then(io.sockets.emit('tilt', data))
		.then(
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$444444444444444444' +
			'444444444444444444444444444444444444444444444444444444444444'))
		.then(console.log(data));
	});

	socket.on('cleanup', function () {
		players = {};
	});

    socket.on('timeUpApp', function (data) {
        io.sockets.emit('timeUp', data);
    });

	socket.on('bail', function () {
		timer.bailTrue();
	});

    socket.on('rollRequest', function() {
	    gameData.setm(4);
		players = {};
		io.sockets.emit('reset');
	    io.sockets.emit('mReset');
		gameData.r();
	    return false;
    });

    socket.on('evalRequest', function (data) {
		players = {};
		var flag = 6;
		var output = data.output;
		var z = gameData.getNums();
	    console.log('33333333333333333333333333333333333333333333333333333333333__nums');
	    console.log(z);
		var scNum = gameData.getscoreNum();
	    evalNums.roll(z.a, z.b, z.c, z.d, socket, flag, output, scNum, gameData);
    });

    socket.on('evalRequest2', function (data) {
		players = {};
		var flag = 5;
		var complexity = data.output;
		var scNum = parseInt(data.e, 10);
        evalNums.roll(data.a, data.b, data.c, data.d, socket, flag, complexity, scNum);
    });

    socket.on('messages', function (data) {
        socket.broadcast.emit('mailbox', data);
        socket.emit('mailbox', data);
    });

    socket.on('timer', function(data) {
	    io.sockets.emit('buttonReset', data);  //Removes highlighting from buttons.
	    if (data.play === 1) {
		    data.scoreClicker = data.player;
		    data.currentPlayer = data.player;
		    gameData.setData(data);
		    var timerPromise = new Promise(function (resolve, reject) {
			    resolve(timer.setData(data));
			    reject(function() {console.log('Error at timer, play === 1 : true')
			    });
		    });
		    timerPromise.then(timer.setTick(20))
                .then(timer.time(socket));
            console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ____data');
            console.log(data);
	    }
	    if (data.play === 2) {
		    data.impossibleClicker = data.currentPlayer = data.player;
		    var timerPromise2 = new Promise(function (resolve, reject) {
			    resolve(gameData.setData(data));
			    reject(function() {
				    console.log('timer.setTick failed to return.');
			    });
		    });
		    timerPromise2.then(timer.setTick(60)).then(timer.time(data));
	    }
	    if (data.play === 3) {
		    data.currentPlayer = data.interruptClicker = data.player;
		    var dat = gameData.getData();
		    gameData.setData(data);
		    var timerPromise3 = new Promise(function (resolve, reject) {
			    resolve(data.impossibleClicker = dat.impossibleClicker);
			    reject(function() {
				    console.log('timer.setTick failed to return.');
			    });
		    });
		    timerPromise3.then(timer.setTick(30));
	    }
    });

	socket.on('bail', function () {
		timer.setTick(-1);
	});

	socket.on('startCountdown', function () {
		io.sockets.emit('time');
	});

    socket.on('reset', function() {
        gameData.setd(6, 6, 12, 20);
        gameData.setscoreNum(20);
        io.sockets.emit('default');
    });

    socket.on('erase', function() {
        socket.emit('wash');
    });

    socket.on('monkey', function(data) {
        gameData.setd(data.a, data.b, data.c, data.d);
	    var scrum = [data.a, data.b, data.c, data.d];
	    gameData.setscoreNum(data.scoreNum);
        var k = 0;
	    for (var n = 0; n <4; n+=1) {
            if (scrum[n] !== '6' && scrum[n] !== '12' && scrum[n] !== '20') {
	            k += 1;
                gameData.setcow(6);
                data.cow = 6;
                socket.emit('numberchanger', data);
                socket.broadcast.emit('numberchanger', data);
                return;
            }
	    }
        gameData.setcow(5);
	    gameData.setr();
        data.cow = 5;
        socket.emit('numberchanger', data);
        socket.broadcast.emit('numberchanger', data);
    });

	socket.on('updateNums', function (data) {
		gameData.setnumberOb(data.numa, data.numb, data.numc, data.numd);
	});

	socket.on('updateNums', function (data) {
		gameData.setnumberOb(data.numa, data.numb, data.numc, data.numd);
	});

    socket.on('compute', function (dat) {
	    var data = gameData.getData();
	    data.x = dat.x;
	    data.y = dat.y;
	    data.op = dat.op;
	    data.m = dat.m;
	    var calcPromise = new Promise(function (resolve, reject) {
		    resolve(gameData.setData(data));
		    reject(function() {
			    console.log('gameData.setData(data) failed.');
		    });
	    });
	    calcPromise.then(gameData.calc());
    });
});

