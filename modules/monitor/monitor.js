exports.monitor = function (iota) {
	var io = iota;
	var nums = {}; //Persists throughout round of play.
	var numberOb = {}; //Contains currently available numbers.
	var x, y, op;
	var abs = Math.abs;
	var complexity = 0;
	var scoreNum = 20;
	var data = {};
	var currentPlayer;
	var impossibleClicker;
	var play = 88;
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
		x = data.yin = numberOb[data.x];
		y = data.yang = numberOb[data.y];
		op = data.op;
		if (op == 0) {
			data.newo = x + y;
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
			if (y === 0) {
				data.newo = 'horse';
				}
			else if (complexity !== 2 && x / y !== ~~x / y) {
				data.newo = 'mule';
				return;
			}
			else {
				data.newo = x/y;
			}
		}
		else if (op == 4) {
			if (~~x === x && ~~y === y) {
				data.newo = parseInt((x.toString() + y.toString()));
			} else {
				data.newo = 'donkey';
				return;
			}
		} else {
			data.newo = 'error';
		}
		this.process();
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

		getNums : function () {
			return nums;
		},

	    setscoreNum: function(number) {
		    scoreNum = number;
	    },
	    getscoreNum: function() {
		    return scoreNum;
	    },

		setData : function (d) {
			data = d;
			play = d.play;
		},

		getData : function () {
			return data;
		},

		setimpossibleClicker : function (i) {
			impossibleClicker = i;
		},

		getimpossibleClicker : function () {
			return impossibleClicker;
		},

		getPlay : function () {
			return play;
		},

		setnumberOb: function(number) {
			numberOb = number;
		},

        r: function () {
            numberOb[0] = rx1 = r1 = nums.a = Math.floor(Math.random() * (d1)) + 1;
            numberOb[1] = rx2 = r2 = nums.b = Math.floor(Math.random() * (d2)) + 1;
            numberOb[2] = rx3 = r3 = nums.c = Math.floor(Math.random() * (d3)) + 1;
            numberOb[3] = rx4 = r4 = nums.d = Math.floor(Math.random() * (d4)) + 1;
            io.sockets.emit('rollNums', nums);
	        io.sockets.emit('mReset');
            data.nums = nums;
	        var cow = {'pointer': 'roll'};
	        io.sockets.emit('pageUpdate', cow);
        },

		process : function() {
			var temp = [];
			var n = 0;
			for (k = 0; k < data.m; k += 1) {
				var arg = [k, data.m, numberOb[k], data.x, data.y];
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
			if ((data.newo === scoreNum && data.m === 3 && (data.x === 2 || data.y === 2)) || (data.newo === scoreNum && data.m === 2)) {
				io.sockets.emit('scoreUp', data);
				io.sockets.emit('setClock', {tick: -1});
				io.sockets.emit('displayOff');
				play = 10;
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');
				console.log(data);
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');
				console.log('$$$$$$$$$$$$$$$$_________________######################____@@_______data from process');

			}

			else if (data.m === 4) {
				numberOb = {'0':data.a, '1':data.b, '2':data.newo};
				io.sockets.emit('godzilla', data);
			}

			else if (data.m === 3 && (data.newo !== 'horse' && data.newo !== 'mule' && data.newo !== 'donkey')) {
				numberOb = {'0':data.a, '1':data.newo};
				io.sockets.emit('dragon', data);
			}

			else if (data.m === 2 && (data.newo !== 'horse' && data.newo !== 'mule' && data.newo !== 'donkey')) {
				io.sockets.emit('thor', data);
				var cow = {'pointer': 'done', 'tick': -1};
				io.sockets.emit('pageUpdate', cow);
				io.sockets.emit('offClock', cow);
				play = data.play = 10;
			}

			else if (data.newo === 'horse') {
				io.sockets.emit('tilt', data);
				io.sockets.emit('offClock');
			}

			else if (data.newo === 'mule') {

			}

			else if (data.newo === 'donkey') {

			}

			else if (data.newo === 'error') {
				console.log('calc failed to return a number');
			}

		}
	};
};


