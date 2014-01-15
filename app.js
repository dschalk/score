express = require('express');
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
app.use(express.methodOverride());
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

evalNums = require('./modules/evalNums');
gameData = require('./modules/monitor').monitor(io);

var messages = [];
var data = {};
var name = "Steve";
var k = 777;
var a;
var l;
var i = 888;
app.get('/', routes.index);
app.get('/experiments', routes.experiments);
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

    socket.on('happyclown', function (data) {
        players[data.player] = data.playerdoc;
		console.log('______________________________##########################___________play = ' + gameData.getPlay());
	    console.log('______________________________##########################___________tick = ' + data.tick);
	    io.sockets.emit('sb', players);
    });

	socket.on('cleanup', function () {
		players = {};
	});

    socket.on('timeUpApp', function (data) {
        io.sockets.emit('timeUp', data);
    });

    socket.on('rollRequest', function() {

		gameData.r();
	    players = {};
    });

    socket.on('evalRequest', function (data) {
		players = {};
		var flag = 6;
		var z = gameData.getNums();
	    var output = data.output;
	    console.log('33333333333333333333333333333333333333333333333333333333333__nums');
	    console.log(z);
		var scNum = gameData.getscoreNum();
	    evalNums.roll(z.a, z.b, z.c, z.d, socket, flag, output, scNum);
    });

    socket.on('evalRequest2', function (data) {
		players = {};
		var flag = 5;
		var output = data.output;
		var scNum = parseInt(data.e, 10);
        evalNums.roll(data.a, data.b, data.c, data.d, socket, flag, output, scNum);
    });

    socket.on('messages', function (data) {
        socket.broadcast.emit('mailbox', data);
        socket.emit('mailbox', data);
    });

    socket.on('timer', function(data) {
		io.sockets.emit('displayOn');
	    io.sockets.emit('buttonReset', data);  //Removes highlighting from buttons.
	    if (data.play === 1) {
		    data.scoreClicker = data.player;
		    data.currentPlayer = data.player;
		    data.pointer = 'score';
		    var cow = {'tick': 30};
		    io.sockets.emit('setClock', cow);
		    gameData.setData(data);
		    setTimeout( function () {
				if (gameData.getPlay() === 1) {
					io.sockets.emit('timeUp, data');
					var cow = {'pointer': 'timeUp'};
					io.sockets.emit('pageUpdate', cow);
				}
		    }, 30000);
		    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@__data ');
		    console.log(data);
	    }

	    if (data.play === 2) {
		    data.impossibleClicker = data.currentPlayer = data.player;
		    gameData.setimpossibleClicker(data.impossibleClicker);
		    gameData.setData(data);
		    var sow = {'tick': 60};
		    io.sockets.emit('setClock', sow);
		    setTimeout( function () {
			    if (gameData.getPlay() === 2) {
				    io.sockets.emit('timeUp, data');
				    var cow = {'pointer': 'timeUp'};
				    io.sockets.emit('pageUpdate', cow);
			    }
			}, 60000);
		    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@__data ');
		    console.log(data);
	    }

	    if (data.play === 3) {
		    data.impossibleClicker = gameData.getimpossibleClicker();
		    data.currentPlayer = data.interruptClicker = data.player;
		    gameData.setData(data);
		    var cow = {'tick': 30};
		    io.sockets.emit('setClock', cow);

		    setTimeout( function () {
			    if (gameData.getPlay === 3) {
				    console.log('________________________________________HOLY SHIT    CHRIST    WHAT THE FUCK?')
			    io.sockets.emit('timeUp, data');
			    var cow = {'pointer': 'timeUp'};
			    io.sockets.emit('pageUpdate', cow);
			    }
		    }, 30000);
	    }
	    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@__data ');
	    console.log(data);
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
		gameData.setData(data);
	    gameData.calc();
    });
});

