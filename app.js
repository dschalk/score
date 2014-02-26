'use strict';
var Bacon = require('baconjs');
var Udon = require('udon');
var express = require('express')
	, Primus = require('primus');
var app = express();

var Rooms = require('primus-rooms'),
	server = require('http').createServer(app),
	primus = new Primus(server, { transformer: 'sockjs', parser: 'JSON' }),
	Emitter = require('primus-emitter');
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
	var eNums = require('./modules/eNums'),
	gameData = require('./modules/monitor').monitor(primus);

var messages = [];
var name = "Steve";
var k = 777;
var a;
var l;
var i = 888;
app.get('/', routes.index);
app.get('/calculations', routes.calculations);
app.get('/calculationsUdon', routes.calculationsUdon);
app.get('/calculationsLazy', routes.calculationsLazy);
app.get('/cow', routes.cow);
app.use(function (req, res, next){
    res.locals.scripts = ['/public/javascripts/jquery-1.10.3-min.js', '/public/javascripts/udon.js', '/public/javascripts/Bacon.min.js', '/public/javascripts/Bacon.JQuery.Bindings.js',
        '/public/javascripts/ion.sounds.js', '/modules/processing3.js', '/public/javascripts/processing4.js', '/public/javascripts/processing2.js'];
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

    var Q = require("q");

	console.log('connection id', spark.id);
    spark.on('clear', function () {
		players = {};
	});

	spark.on('rollRequest', function() {
		gameData.r();
		players = {};
	});

    spark.on('happyclown', function (ob) {
	    // console.log(ob);
        players[ob.player] = {'player': ob.player, 'score': ob.score};
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
	    eNums.roll(z.a, z.b, z.c, z.d, primus, flag, z.complexity, scNum);
    });

    spark.on('evalRequest2', function (data) {
		players = {};
		var flag = 5;
		var scNum = parseInt(data.e, 10);
        eNums.roll(data.a, data.b, data.c, data.d, primus, flag, data.complexity, scNum);
    });

    spark.on('messages', function (cow) {
        primus.send('mailbox', cow);
    });

    spark.on('timer', function(data) {
        var impossibleClicker = 'Santa Clause';
        if (data.play === 2) {
            impossibleClicker = data.player;
            primus.send("computebuttonOff");
        }
        console.log('____________________________________________ Yo! _______impossibleClicker: ' + impossibleClicker);
        var play = data.play;
        var kiss = 0;
        var sow = {};
        var tickeroos;
        var x;

        var promiseOne = Q.promise(function (resolve, reject) {

            resolve(function () {
                gameData.setStop(true);
                x = false;
                console.log('_________________________________________________' + new Date())
            });

            reject(function () {
                console.log('Drat!');
            });

        });

     var promiseTwo = Q.promise(function (resolve, reject) {
         resolve(function () {
            gameData.setStop(false);
            x = true;
            console.log('_________________________________________________ newer Date()' + new Date())
        });
            reject(function () {
            console.log('Drat!');
        });
     });

        gameData.setStop(false);
        x = true;


        primus.send('displayOn');
        primus.send('buttonReset', data);  //Removes highlighting from buttons.

        function go () {
            Q.delay(100)
            .then('promiseOne')
            .delay(1000)
            .then('promiseTwo')
            .then(function () {
                cycle();
            });
        }

        var cycle = function () {
            kiss += 1;
            if (gameData.getStop() === true) {
                data.play = 100;
                return;
            }

            if (kiss === tickeroos) {
                data.impossibleClicker = impossibleClicker;
                primus.send('timeUp', data);
                gameData.setStop(true);
                var cow = {'tick': -1};
				primus.send('offClock', cow);
				data.play = 10;
                // return;
            }
                if (x === true) {
                sow = {'tick': tickeroos, 'play': play};
                primus.send('setClock', sow);
                x = false;
            }
            man();
        };

        var man = function () {
            console.log('_______________ Hey! ' + kiss);
            console.log('@@@@@@@@@@@@@@@@Vyp@@@@@@@@@@@@' + gameData.getStop());
            console.log('@@@@&&&&&@@@@@@@@@___Hey!' + x);
            console.info(gameData.getStop());
            console.log('@@@@@@@@@@@@@@@@Vyp@@@@@@@@@@@@___ play = ' + play);
            setTimeout(function() {
                cycle();
            }, 1000);
        };

        if (play === 1) {
            tickeroos = 30;
            go();
        }

	    if (data.play === 2) {
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_________________________________Greetings from play === 2');
            tickeroos = 60;
            gameData.setimpossibleClicker(impossibleClicker);
            go();
            }

	    if (play === 3) {
            tickeroos = 30;
            primus.send('computebuttonOn');
            go();
	    }
        gameData.setStop(false);
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
        gameData.setGamma(false);
	    var scrum = [data.a, data.b, data.c, data.d];
	    gameData.setscoreNum(data.scoreNum);
        var k = 0;
	    for (var n = 0; n <4; n+=1) {
            if (scrum[n] !== '6' && scrum[n] !== '12' && scrum[n] !== '20') {
	            k += 1;
                if (k > 0) {
                data.gamma = false;  // Not ordinary dice.
                primus.send('numberchanger', data);
                gameData.setGamma(false);
                }
            }
            else {
                data.gamma = true;  // The sides are all sixes, twelves, and/or twenties.
                primus.send('numberchanger', data);
                gameData.setGamma(true);
            }
	    }

    });
    spark.on('compute', function (data) {
        console.log('*************************************************   data coming into compute');
        console.log('*************************************************   data coming into compute');
        console.log(data);
        console.log('*************************************************   data coming into compute');
        console.log('*************************************************   data coming into compute');
		gameData.calc(data);
	});
});
