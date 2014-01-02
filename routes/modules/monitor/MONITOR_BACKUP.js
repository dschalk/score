exports.monitor = function () {
	var socket;
	var abs = Math.abs;
	var data = {};
	var complexity;
	var nums = {};
	var scoreNum = 20;
	var cow;
	var currentPlayer = 'Freddy boy';
	var play = 888;
	var impossibleClicker = 'Cosmo54321#$Vyp%$#';
	var interruptClicker = 'Cosmo54321#$Vyp%$#';
	var scoreClicker = 'Cosmo54321#$Vyp%$#';
	var x, op, y, newo, m;
	var numberOb = {};
	var d1 = 6,// Upper bounds on the random integers.
	d2 = 6,
	d3 = 12,
	d4 = 20,
	r1 = 888,//Computer roll.
	r2 = 888,
	r3 = 888,
	r4 = 888,
	obr = {'0':r1, '1':r2, '2':r3, '3':r4},
	rx1 = 88,//Currently available numbers.
	rx2 = 88,
	rx3 = 88,
	rx4 = 88;
	var opArray = ['plus', 'minus', 'times', 'divided by', 'concatenated behind'];

	calc = function (x, y, op) {
		switch(op) {
			case 0:
				return x + y;
				break;
			case 1:
				if (op === 1 && complexity === 0) {
					newt = abs(x - y);
				}
				if (op === 1 && complexity !== 0) {
					newt = x - y;
				}
				break;
			case 2:
				return x*y;
				break;
			case 3:
				if (y === 0) {
					socket.emit('infinityMessage');
				}
				else if (complexity !==2 && x/y !== ~~x/y) {
					socket.emit('fractionMessage');
					// socket.broadcast.emit('infinityMessage'); This is only for the current player.
				}
				else {
					return x/y;
				}
				break;
			case 4:
				if (~~x === x && ~~y === y ) {
					return parseInt((x.toString() + y.toString()), 10);
				} else {
					socket.emit('infinityMessage');
					socket.broadcast.emit('infinityMessage');
				}
				break;
			default:
				return 999;
		}
	};

	var finish = function () {
		if ((ob.newo === scoreNum && ob.m === 3 && (ob.x === 2 || ob.y === 2)) || (ob.newo === scoreNum && ob.m === 2)) {
			socket.broadcast.emit('scoreUp', numberOb);
			socket.emit('scoreUp', numberOb);
		}
		else if (m == 4) {
			socket.broadcast.emit('godzilla', numberOb);
			socket.emit('godzilla', numberOb);
		}
		else if (m == 3) {
				socket.broadcast.emit('dragon', numberOb);
				socket.emit('dragon', numberOb);
		}
		else {
			socket.broadcast.emit('thor', numberOb);
			socket.emit('thor', numberOb);
			socket.broadcast.emit('bail');
			socket.emit('bail');
			socket.broadcast.emit('timeUp', numberOb);
			socket.emit('timeUp', numberOb);
		}
	};

	var ob = {
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

		setClickers : function (a, b, c, d, e) {
			scoreClicker = a;
			impossibleClicker = b;
			interruptClicker = c;
			currentPlayer = d;
			play = e;
		},

		scoreClicker: scoreClicker,
		impossibleClicker: impossibleClicker,
		interruptClicker: interruptClicker,
		setcomplexity: function(number) {
			complexity = number;
		},
		getcomplexity: function() {
			return complexity;
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
		setnumberOb: function(w,x,y,z) {
			numberOb = {'0':w, '1':x, '2':y, '3':z};
		},
		getnumberOb: function() {
			return numberOb;
		},
	    setimpossibleClicker: function(str) {
		    impossibleClicker = str;9
	    },
	    getimpossibleClicker: function() {
		    return impossibleClicker;
	    },

		setinterruptClicker: function(str) {
			interruptClicker = str;
		},
		getinterruptClicker: function() {
			return interruptClicker;
		},

		setscoreClicker: function(str) {
			scoreClicker = str;
		},
		getscoreClicker: function() {
			return scoreClicker;
		},

	    setplay: function(int) {
		    play = int;
	    },
	    getplay: function() {
		    return play;
	    },

	    setcurrentPlayer: function(str) {
		    currentPlayer = str;
	    },
	    getcurrentPlayer: function() {
		    return currentPlayer;
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

        r: function (socket, data) {
            numberOb[0] = rx1 = r1 = nums.a = data.a = Math.floor(Math.random() * (d1)) + 1;
            numberOb[1] = rx2 = r2 = nums.b = data.b = Math.floor(Math.random() * (d2)) + 1;
            numberOb[2] = rx3 = r3 = nums.c = data.c = Math.floor(Math.random() * (d3)) + 1;
            numberOb[3] = rx4 = r4 = nums.d = data.d = Math.floor(Math.random() * (d4)) + 1;
            socket.emit('rollNums', nums);
            socket.broadcast.emit('rollNums', nums);
            return nums;
        },

		x: x,

		y: y,

		newo: newo,




		process : function(sock, dat) {
			console.log('#########################################################################__numberOb');
			console.log('#########################################################################__numberOb');
			console.log('#########################################################################__numberOb');
			console.log('#########################################################################__numberOb');
			console.log(numberOb);
			console.log('#########################################################################__numberOb');
			console.log('#########################################################################__numberOb');
			console.log('#########################################################################__numberOb');
			data = dat;
			console.log(data);
			currentPlayer = data.currentPlayer;
			impossibleClicker = data.impossibleClicker;
			interruptClicker = data.interruptClicker;
			complexity = data.complexity;
			play = data.play;
			socket = sock;
			this.m = m = data.m;
			this.x = x = data.x;
			this.y = y = data.y;
			var op = data.op;
			var temp = [];
			var n = 0;
			var k = 0;
			for (k = 0; k < m; k += 1) {
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
			this.newo = data.newo = newo = calc(numberOb[data.x], numberOb[data.y], data.op);
			data.yin = numberOb[data.x];
			data.yang = numberOb[data.y];

			data.operator = opArray[data.op];
			if (m === 4) {
				numberOb = {'0':data.a, '1':data.b, '2':data.newo, '3':'cow'}
			}
			if (m === 3) {
				numberOb = {'0':data.a, '1':data.newo, '2':'cow', '3':'cow'}
			}
			if (m === 2) {
				numberOb = {'0':data.newo, '1':'cow', '2':'cow', '3':'cow'}
			}
			numberOb['4'] = data.yin;
			numberOb['5'] = data.yang;
			numberOb['6'] = opArray[op];
			numberOb.newo = data.newo;
			finish();
		}
	};
	return ob;
};


