exports.tim = function (ios) {
	var io = ios;
    var cow = {};
	var tick = 888;
	var ob = {
		time : function () {
			setTimeout(function () {
				if (tick < 0){
					return;
				}
				else
				{   tick -= 1;
					cow.tick = tick;
					io.sockets.emit('tic', cow);
				}
				ob.time();
			}, 1000);
		}
		,setTick : function (t) {
			tick = t;
			io.sockets.emit('highlightOff');
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@___tick has been set to' + t);
		}
	};
	return ob;
};

