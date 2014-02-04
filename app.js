'use strict';
var Q = require('q');
var express = require('express')
	, Primus = require('primus')
	, redis = require('redis')
	, app = express();
var store = redis.createClient();
var pub = redis.createClient();
var sub = redis.createClient();

var Rooms = require('primus-rooms'),
	server = require('http').createServer(app),
	primus = new Primus(server, { transformer: 'socket.io', parser: 'JSON' }),
	Emitter = require('primus-emitter');
primus.use('rooms', Rooms);
primus.use('emitter', Emitter);

var	routes = require('./routes/'),
	http = require('http'),
	path = require('path'),

	players = {};
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
	var evalNums = require('./modules/evalNums'),
	gameData = require('./modules/monitor').monitor(primus);

var messages = [];
// var data = {};
var name = "Steve";
var k = 777;
var a;
var l;
var i = 888;
app.get('/', routes.index);
app.get('/experiments', routes.experiments);
app.get('/playground', routes.playground);
app.get('/cow', routes.cow);
app.use(function (req, res, next){
    res.locals.scripts = ['/public/javascripts/jquery-1.10.3-min.js', '/public/javascripts/ion.sounds.js', '/modules/processing3.js', '/public/javascripts/processing4.js', '/public/javascripts/processing2.js'];
    next();
});

/* development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
*/

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//@@@@@@@@@@@@@#################$$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@

primus.on('connection', function (spark) {
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('connection has the following headers', spark.headers);
	console.log('connection was made from', spark.address);
	console.log('connection id', spark.id);
	console.log('the whole spark:', spark);
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

	spark.on('clear', function () {
		players = {};
	});

	spark.on('rollRequest', function() {
		gameData.r();
		players = {};
	});

    spark.on('happyclown', function (dd) {
        players[dd.player] = dd.playerdoc;
	    primus.send('sb', players);
    });

	spark.on('cleanup', function () {
		players = {};
	});

    spark.on('timeUpApp', function (data) {
        primus.send('timeUp', data);
    });

    spark.on('evalRequest', function (data) {
		players = {};
		var flag = 6;
		var z = gameData.getNums();
	    z.complexity = data.complexity;
		var scNum = parseInt(gameData.getscoreNum(), 10);
	    evalNums.roll(z.a, z.b, z.c, z.d, primus, flag, z.complexity, scNum);
    });

    spark.on('evalRequest2', function (data) {
		players = {};
		var flag = 5;
		var scNum = parseInt(data.e, 10);
        evalNums.roll(data.a, data.b, data.c, data.d, primus, flag, data.complexity, scNum);
    });

    spark.on('messages', function (ww) {
        primus.send('mailbox', ww);
    });

    spark.on('timer', function(dat) {
	    gameData.setInplay(true);
	    var data = dat;
	    var sow = {};
	    var cow = {};
		primus.send('displayOn');
	    primus.send('buttonReset', data);  //Removes highlighting from buttons.
	    if (data.play === 1) {
		    data.pointer = 'score';
		    sow = {'tick': 30, 'play': 1};
		    primus.send('setClock', sow);
		    gameData.setData(data);
		    setTimeout( function () {
				primus.send('timeUp, data');
				var cow = {'pointer': 'timeUp'};
			    if (gameData.getInplay() === true) {
				    primus.send('pageUpdate', cow);
			    }
			    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++' + gameData.getInplay());
		    }, 30000);
		    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@__data ');
		    console.log(data);
	    }

	    if (data.play === 2) {
		    data.impossibleClicker = data.player;
		    gameData.setData(data);
		    gameData.setimpossibleClicker(data.player);
		    sow = {'tick': 60, 'play': 2};
		    primus.send('setClock', sow);
		    setTimeout( function () {
			    primus.send('timeUp, data');
			    var cow = {'pointer': 'timeUp'};
			    if (gameData.getInplay() === true) {
				    primus.send('pageUpdate', cow);
			    }
			}, 60000);
	    }

	    if (data.play === 3) {
		    sow = {'tick': 30, 'play': 3, 'player': data.player};
		    primus.send('setClock', sow);
		    gameData.setData(data);
		    setTimeout( function () {
			    primus.send('timeUp, data');
			    cow = {'pointer': 'timeUp'};
			    if (gameData.getInplay() === true) {
				    primus.send('pageUpdate', cow);
			    }
		    }, 30000);
	    }
    });

    spark.on('reset', function() {
        gameData.setd(6, 6, 12, 20);
        gameData.setscoreNum(20);
        primus.send('default');
    });

    spark.on('erase', function() {
        primus.send('wash');
    });

    spark.on('monkey', function(data) {
        gameData.setd(data.a, data.b, data.c, data.d);
	    var scrum = [data.a, data.b, data.c, data.d];
	    gameData.setscoreNum(data.scoreNum);
        var k = 0;
	    for (var n = 0; n <4; n+=1) {
            if (scrum[n] !== '6' && scrum[n] !== '12' && scrum[n] !== '20') {
	            k += 1;
                data.cow = 6; // If '6' the browser displays "random numbers," otherwise, "dice."
                primus.send('numberchanger', data);
                return;
            }
	    }
        data.cow = 5;
        primus.send('numberchanger', data);
    });

	spark.on('updateNums', function (data) {
		gameData.setnumberOb(data.numa, data.numb, data.numc, data.numd);
	});

	spark.on('updateNums', function (data) {
		gameData.setnumberOb(data.numa, data.numb, data.numc, data.numd);
	});

    spark.on('compute', function (dat) {
	    var data = gameData.getData();
	    data.x = dat.x;
	    data.y = dat.y;
	    data.op = dat.op;
	    data.m = dat.m;
	    Q(gameData.setData(data))
		    .then(gameData.calc());
	});
});

primus.on('connection', function (client) {
	sub.subscribe("chatting");
	sub.on("message", function (channel, message) {
		console.log("message received on server from publish ");
		client.send(message);
	});

	client.on("message", function (msg) {
		console.log(msg);
		if(msg.type == "chat"){
			pub.publish("chatting",msg.message);
		}
		else if(msg.type == "setUsername"){
			pub.publish("chatting","A new user in connected:" + msg.user);
			store.sadd("onlineUsers",msg.user);
		}
	});

	client.on('disconnect', function () {
		sub.quit();
		pub.publish("chatting","User is disconnected :" + client.id);
	});
});

