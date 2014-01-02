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
app.use(express.json())
app.use(express.urlencoded());
app.use(express.methodOverride());;
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.configure(function() {
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(express.static(path.join(__dirname, 'modules')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
    app.use(express.directory('public'));
});
io = require("socket.io").listen(server);
evalNums = require('./routes/evalNums.js');



var messages = [];
var data = {};l
var name = "Steve";
var k = 777;
var a;
var l;
var i = 888;
var interrupt;
var cow = {};
app.get('/', routes.index);
app.use(function (req, res, next){
    res.locals.scripts = ['/public/javascripts/jquery-1.11.0-beta1.js', '/public/javascripts/ion.sounds.js', '/modules/processing3.js',  '/public/javascripts/processing2.js'];
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

	timer = require('./routes/tim').tim(socket);
	gameData = require('./routes/monitor').monitor(socket, timer, io);

	// gameData.setSocket(socket);
    socket.on('happyclown', function (data) {
        players[data.player] = data.playerdoc;
        socket.emit('sb', players);
        socket.broadcast.emit('sb', players);
    });

	socket.on('tilt', function () {
	io.socket.emit('timeup');
	io.socket.emit('infinityMessage');
	timer.setBail(true);
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
	    timer.setBail(false);
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
		var z = gameData.getnumberOb();
		var scNum = gameData.getscoreNum();
	    evalNums.roll(z['0'], z['1'], z['2'], z['3'], socket, flag, output, scNum);
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
			    reject(function() {
				    console.log('timer.setData failed to return.');
			    });
		    });
			timerPromise.then(timer.setTick(30)).then(timer.time());

	    }
	    if (data.play === 2) {
		    data.impossibleClicker = data.currentPlayer = data.player;
		    gameData.setData(data);
		    var timerPromise2 = new Promise(function (resolve, reject) {
			    resolve(timer.setData(data));
			    reject(function() {
				    console.log('timer.setTick failed to return.');
			    });
		    });
		    timerPromise2.then(timer.setTick(60)).then(timer.time());
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
		    timerPromise3.then(timer.setData(data)).then(timer.setTick(30));
	    }
    });

	socket.on('bail', function () {
		timer.setBail(true);
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
	    timer.setBail(false);
    });
});

