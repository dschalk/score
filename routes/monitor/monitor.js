exports.monitor = function (tim, iota) {
	var timer = tim;
	var io = iota;
	var nums = {}; //Persists throughout round of play.
	var numberOb = {}; //Contains currently available numbers.
	var x, y, op;
	var abs = Math.abs;
	var complexity = 0;
	var scoreNum = 20;
	var cow;
	var data = {};
	var currentPlayer;
	var play;
	var impossibleClicker;
	var d1 = 6,// Upper bounds on the random integers.
	d2 = 6,
	d3 = 12,
	d4 = 20,
	r1 = 888,//Computer roll.
	r2 = 888,
	r3 = 888,
	r4 = 888,
	rx1 = 88,//Currently available numbers.
	rx2 = 88,
	rx3 = 88,
	rx4 = 88;
	var opArray = ['plus', 'minus', 'times', 'divided by', 'concatenated behind'];
	return {calc : function () {
		console.log(data);
		console.log(numberOb);
		console.log('That was data and numberOb___from calc__in the monitor module (gameData)*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		console.log('That was data and numberOb___*******************************************************')
		x = data.yin = numberOb[data.x];
		y = data.yang = numberOb[data.y];
		op = data.op;
		console.log('FFFFFFFFFFFFFFFFFFF00000000000000000____x____op____y____ ' + x + ' ' + op + ' ' + y);
		if (op == 0) {
			data.newo = x + y;
			console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF' +
				'FFFFFFFFFF00____x____op____y___newo_ ' + x + ' ' + op + ' ' + y + ' ' + data.newo);
		}
		else if (op == 1) {
			if (complexity === 0) {
				data.newo = abs(x - y);
			}
			else {data.newo = x - y;}
		}
		else if (op == 2) {
			data.newo = x * y;
		}
		else if (op == 3) {
			if (y == 0) {
				data.newo = 'tilt';
				return;
			}
			else if (complexity !== 2 && x / y !== ~~x / y) {
				io.sockets.emit('fractionMessage');
				return;
			}
			else {
				data.newo = x / y;
			}
		}
		else if (op == 4) {
			if (~~x === x && ~~y === y) {
				data.newo = parseInt((x.toString() + y.toString()), 10);
			} else {
				io.sockets.emit('concatMessage');
				return;
			}
		} else {
			data.newo = 999;
		}
		this.process(data);
	},

        setd: function(x, y, z, w) {
            d1 = x;
            d2 = y;
            d3 = z;
            d4 = w;
        },

        setr: function(data) {
            r1 = data.a;
            r2 = data.b;
            r3 = data.c;
            r4 = data.d;
            rx1 = data.a;
			m = data.m;
			x = data.x;
			y = data.y;
			op = data.op;
			complexity = data.complexity;
			currentPlayer = data.currentPlayer;
            rx2 = data.b;
            rx3 = data.c;
            rx4 = data.d;
        },
        setrx: function(obj) {// The current roll.
            rx1 = obj.a;
            rx2 = obj.b;
            rx3 = obj.c;
            rx4 = obj.d;
        },


	    setscoreNum: function(number) {
		    scoreNum = number;
	    },
	    getscoreNum: function() {
		    return scoreNum;
	    },

		setData : function (d) {
		data = d;
		},

		getData : function () {
			return data;
		},

		setnumberOb: function(number) {
			numberOb = number;
		},

		getnumberOb: function() {
			return numberOb;
		},

		setm: function(number) {
			m = number;
		},
		getm: function() {
			return m;
		},

	    setcow: function(numb) {
		    cow = numb;
	    },
	    getcow: function() {
		    return cow;

		},

	    setimpossibleClicker: function(str) {
		    data.impossibleClicker = str;
	    },

		getimpossibleClicker: function() {
			return impossibleClicker;
		},

		setinterruptClicker: function(str) {
			data.interruptClicker = str;
		},

		setscoreClicker: function(str) {
			data.scoreClicker = str;
		},

	    setplay: function(int) {
		    data.play = int;
	    },

	    setcurrentPlayer: function(str) {
		    data.currentPlayer = str;
	    },

	    getd: function() {
            return {a:d1, b:d2, c:d3, d:d4};
        },
        getr: function() {
            return nums;
        },
        getrx: function () {
            return {a:rx1, b:rx2, c:rx3, d:rx4};
        },

        r: function () {
            numberOb[0] = rx1 = r1 = nums.a = Math.floor(Math.random() * (d1)) + 1;
            numberOb[1] = rx2 = r2 = nums.b = Math.floor(Math.random() * (d2)) + 1;
            numberOb[2] = rx3 = r3 = nums.c = Math.floor(Math.random() * (d3)) + 1;
            numberOb[3] = rx4 = r4 = nums.d = Math.floor(Math.random() * (d4)) + 1;
            io.sockets.emit('rollNums', nums);
	        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE__nums');
	        console.log(nums);
            return nums;
        },

		process : function() {
			var temp = [];
			var n = 0;
			for (k = 0; k < data.m; k += 1) {
				var arg = [k, m, numberOb[k], data.x, data.y];
				console.log(arg);
				if (k !== data.x && k !== data.y) {
					temp[n] = numberOb[k];
					n += 1;
					console.log(temp);
				}
			}
				data.a = temp[0];
				data.b = temp[1];
				data.operator = opArray[data.op];
				data.play = play;
			console.log('?????????????????????????????????????????_________________data from process');
			console.log(data);
				if (data.newo === 'tilt') {
					io.sockets.emit('timeUp, data');
					io.sockets.emit('infinityMessage');
					io.sockets.emit('bail');
				}
				else if ((data.newo === scoreNum && data.m === 3 && (data.x === 2 || data.y === 2)) || (data.newo === scoreNum && data.m === 2)) {
					io.sockets.emit('scoreUp', data);
					timer.setTick(-1);
					}
				else if (data.m === 4) {
					numberOb = {'0':data.a, '1':data.b, '2':data.newo, '3':'cow'};
					console.log(numberOb);
					console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
					io.sockets.emit('godzilla', data);
				}
				else if (data.m === 3) {
					numberOb = {'0':data.a, '1':data.newo, '2':'cow', '3':'cow'}
					io.sockets.emit('dragon', data);
				}
				else if (data.m === 2) {
					io.sockets.emit('thor', data);
					timer.setTick(-1);
				}
			}

	};
};


