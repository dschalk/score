exports.tim = function (sock) {
	var socket = sock;
	var data = {};
	var tick = 0;
	var ick = 'Blow me';
	var color = 'green';
	var ob = {
		time : function () {
			console.log(color);
			setTimeout(function () {
				if (tick < 0 && color === 'red') {
					return;
				}
				else if (tick < 0 && color !== 'red') {
					socket.emit('timeFinish');
					return;
					}
				else if (tick >= 0) {
					tick -= 1;
					data.tick = tick;
					socket.emit('tic', data);
					io.sockets.emit('tic', data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@___tick: ' + tick);
				}  ob.time();
			}, 1000);
			// io.sockets.emit('highlightOff');
		}

		,setColor : function (str) {
			console.log('************************************************____In setColor');
			color = str;
		}

		,setTick : function (t) {
			tick = t;	    console.log('****************************************************OOOOOOOOOOOOOOOOOOOO');
			// io.sockets.emit('highlightOff');
			console.log('tick____________tick______________________in setTick___should return to app for timer.time(data)__');
		}

		,getTick : function () {
			return tick;
		}
	};
	return ob;
};

