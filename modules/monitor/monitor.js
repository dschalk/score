exports.monitor = function (pri) {
	var primus = pri;
    var stop = false;
	var inplay = false;
    var gamma = true;
	var isInterrupted = false;
	var nums = {}; //Persists throughout round of play.
	var numberOb = {}; //Contains currently available numbers.
	var x, y, op;
	var complexity = 0;
	var impossibleClicker;
	var scoreNum = 20;
	var data = {};
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

    return  {
            calc : function (data) {
            data.gamma = this.gamma;
            console.log('7777777777777777777777777777777777777777777777777777777   data coming into calc');
            console.log('7777777777777777777777777777777777777777777777777777777   data coming into calc');
            console.log(data);
            console.log('7777777777777777777777777777777777777777777777777777777   data coming into calc');
            console.log('7777777777777777777777777777777777777777777777777777777   data coming into calc');
            var x = data.yin = parseFloat(numberOb[data.x], 10);
            var y = data.yang = parseFloat(numberOb[data.y], 10);
            var op = parseInt(data.op, 10);
            if (op === 0) {
                data.newo = x + y;
            }
            else if (op === 1) {
                data.newo = x - y;
            }
            else if (op === 2) {
                data.newo = x * y;
                console.log('_______________________________________****************************_______Everybody up now!')
                console.log([x, y, data.newo])
            }
            else if (op === 3) {
                if (y === 0) {
                primus.send('tilt', data);
				primus.send('offClock');
                }
                data.newo = x/y;
                }
            else if (op === 4) {
                if (~~x === x && ~~y === y) {
                    data.newo = parseInt((x.toString() + y.toString()));
                } else {
                    data.newo = 'undefined';
                    return;
                }
            }
            else {data.newo = 'error';}
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
            rx2 = data.b;
            rx3 = data.c;
            rx4 = data.d;
        },

		setStop : function (b) {
			stop = b;
		},

		getStop : function () {
			return stop;
		},

		getNums : function () {
			return nums;
		},

		getInplay : function () {
			return inplay;
		},

		setInplay : function(x) {
			inplay = x;
		},


		getGamma : function () {
			return gamma;
		},

		setGamma : function(x) {
			gamma = x;
		},

		getisInterrupted : function () {
			return isInterrupted;
		},

		setisInterrupted : function(x) {
			isInterrupted = x;
		},
	    setscoreNum: function(number) {
		    scoreNum = number;
	    },

		setimpossibleClicker: function(xyz) {
			impossibleClicker = xyz;
            console.log('___$$$$$$$$$$$$$$$$&&&&&&&@@@@@#######################@@@@@@**************________ You bet!');
		},

		getimpossibleClicker: function() {
			return impossibleClicker;
		},


		setinterruptClicker: function(x) {
			interruptClicker = x;
		},

		getinterruptClicker: function() {
			return interruptClicker;
		},

	    getscoreNum: function() {
		    return scoreNum;
	    },

		setData : function (d) {
			data = d;
			play = d.play;
            gamma = d.gamma;
		},

		getData : function () {
			return data;
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
            primus.send('rollNums', nums);
	        primus.send('mReset');
            data.nums = nums;
	        var cow = {'pointer': 'roll'};
	        primus.send('pageUpdate', cow);
        },

		process : function(data) {
            data.gamma = gamma;
            console.log('*************************************************************** data coming into process');
            console.log('*************************************************************** data coming into process');
            console.log(data);
            console.log('*************************************************************** data coming into process');
            console.log('*************************************************************** data coming into process');
			var temp = [];
			var n = 0;
			for (k = 0; k < data.m; k += 1) {
				if (k !== parseInt(data.x, 10) && k !== parseInt(data.y, 10)) {
					temp[n] = numberOb[k];
					n += 1;
					console.log(temp);
				}
			}
            data.a = temp[0];
			data.b = temp[1];
			data.operator = opArray[data.op];
			data.play = play;
            console.log('*************************************************************** data coming later in process');
            console.log('*************************************************************** data coming later in process');
            console.log(data);
            console.log('*************************************************************** data coming later in process');
            console.log('*************************************************************** data coming later in process');
			if ((data.newo === scoreNum & data.m === 3 && (data.x === 2 || data.y === 2)) || (data.newo === scoreNum && data.m === 2)) {
				data.impossibleClicker = impossibleClicker;
                inplay = false;
                stop = true;
                console.log('___________________________________*********************************__________________ Yo!');
                console.log(data);
                console.log('___________________________________*********************************__________________ Yo!');
				primus.send('scoreUp', data);
				play = 10;
			}

			else if (data.m === 4) {
				numberOb = {'0':data.a, '1':data.b, '2':data.newo};
				primus.send('godzilla', data);
			}

			else if (data.m === 3) {
				numberOb = {'0':data.a, '1':data.newo};
				primus.send('dragon', data);
			}

			else if (data.m === 2) {
                stop = true;
				inplay = false;
				primus.send('thor', data);
				data.impossibleClicker = impossibleClicker;
				var cow = {'tick': -1};
				primus.send('timeUp', data);
				primus.send('offClock', cow);
				play = data.play = 10;
			}

			else if (data.newo === 'horse') {
				primus.send('tilt', data);
				primus.send('offClock');
			}

		}

	};
};


