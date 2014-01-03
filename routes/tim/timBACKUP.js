exports.tim = function () {
	var gameData = require('monitor').monitor();  get rid of this.
	// var socket;
    var bail;
    return {bail : 'horse', 'tick':7, play: 1
        ,currentPlayer: 'Big Ed'
        ,scoreClicker: 'Squid'
        ,impossibleClicker: 'Amasthenon the demented'
        ,interruptClicker: 'Quadralong Short'
        ,data: {}
    ,timemachine : function (sock, tick, b) {
        bail = b;
        this.bail = bail;

        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.bail);
        if (this.bail === true || bail === true) { return;}
    var timid = require('tim').tim();
    var socket = sock;
            var m;
            this.tick = tick;
            var data = this.data;
		    data.play = this.play;
		    data.currentPlayer = this.currentPlayer;
            data.scoreClicker = this.scoreClicker;
            data.interruptClicker = this.interruptClicker;
            data.impossibleClicker = this.impossibleClicker;
		    this.data = data;
            this.setTick(100);
        console.log('Now in timermachine *******************************************');
		        setTimeout(function () {
		            console.log('Now in the setInterval loop________________________$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$' + tick);
			        if (this.bail === true) {
			            tick = -2;
			            this.tick = tick;
			            socket.broadcast.emit('timeUp', data);
			            socket.emit('timeUp', data);
				        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@__this.bail === true');
						return;
		            }

			        if (this.play === 0) {
		                    console.log('We have a winner');
			                this.bailWinner = true;
		                return;
		            }

		            if (this.tick < 0 || tick < 0) {
		                if (this.play == 1) {
                            this.bail = true;
		                    socket.broadcast.emit('timeUp', data);
		                    socket.emit('timeUp', data);
                            socket.broadcast.emit('expired', data);
                            socket.emit('expired', data);
		                    console.log('30 seconds ran out.  Initial click was SCORE.');
			                console.log('____________________________________________________________________$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			                this.bail = true;
                            bail = true;
                            timid.timemachine(sock, tick, true);
                            return;
		                }
		                if (this.play == 2) {
		                    socket.broadcast.emit('timeUp', data);
		                    socket.emit('timeUp', data);
		                    console.log('60 seconds ran out.');
		                    return;
		                }
			            if (this.play == 3) {
			                socket.broadcast.emit('timeUp', data);
			                socket.emit('timeUp', data);
			                console.log('30 seconds ran out.');
			                return;
		                }
		            }else if (tick >= 0) {
						  tick -= 1;
			              this.tick = tick;
		                  data.tick = this.tick;
			             // data.tick = 'Fuck you.';
		                  socket.broadcast.emit('tic', data);
		                  socket.emit('tic', data);
                          //io.sockets.emit('tick', data);
		                  console.log(tick);
		            }  timid.timemachine(sock, tick, false);
		        }, 1000);
            }
        
	

    ,time:function(sock) {
	    this.socket = sock;
        socket = sock;
        socket.emit('highlightOff');
        socket.broadcast.emit('highlightOff');
		this.play = gameData.getplay();
	    this.play = 1;
        this.bail = false;
	    this.currentPlayer = gameData.currentPlayer;
        if (this.play === 1) {
            this.bail = false;
            this.timemachine(socket, 10);
        }
        else if (play === 2) {
            console.log('In timer *******************************************');
            this.play = 2;
            tick = 60;
            this.bail = false;
            this.timemachine(socket, 60);
        }

        else if (data.play === 3) {
            console.log('In timer *******************************************');
			tick = 30;
        }

        else {
            console.log("Listener timer in apps.js probably malfunctioned.")
        }
    }

        ,bailTrue : function () {
		    this.bail = true;
            tick = -1;
        }

        ,setTick : function (n) {
            tick = n;
        }

        ,getTick : function () {
            return tick;
        }

    }
};