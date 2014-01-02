var socket = io.connect();
var ax = 88, bx = 99, opx = 2000;
var m = 5;
var copyax, copybx;
var data = {};
//var dr = require('../../modules/monitor').monitor();

function tog(el){
	/*
	console.log('Back in toggle.  Cheers! ++++++++++++++++++++++++++++');
	if(el.className === "on") {
		el.className="off";
	}

	else {	*/

		if (el.id < 4) {
			document.getElementById("0").className="off";
			document.getElementById("1").className="off";
			document.getElementById("2").className="off";
			document.getElementById("3").className="off";
		}
		else  {
			document.getElementById("4").className="off";
			document.getElementById("5").className="off";
			document.getElementById("6").className="off";
			document.getElementById("7").className="off";
			document.getElementById("8").className="off";
		}
		el.className="on";
	}

function tog2(el){
	/*
	if(el.className === "on") {
		el.className="off";

else */
		document.getElementById("9").className="off";
		document.getElementById("10").className="off";
		document.getElementById("11").className="off";
		document.getElementById("12").className="off";
		el.className="on";
	}

// Click functions.  Player interactions.
$(function() {
	$('#0').click(function() {
		ax = 0;
		idax = 0; copyax = 0;
	});
});
//  These correspond to the table of options.
$(function() {                    //  copyx and copyb are used below to prevent choosing the same number twice.
	$('#1').click(function() {    //  idax and idbx are used to turn off all selections in preparation for another round
		ax = 1;                     //  ax, opx, and bx identify the selections for the computations in the function calc().
		idax = 1;  copyax = 1;
	});
});

$(function() {
	$('#2').click(function() {
		ax = 2;
		idax = 2;  copyax = 2;
	});
});

$(function() {
	$('#3').click(function() {
		ax = 3;
		idax = 3;    copyax = 3;
	});
});
$(function() {
	$('#4').click(function() {
		opx = 0;
		idopx = 4;
	});
});

$(function() {
	$('#5').click(function() {
		opx = 1;
		idopx = 5;
	});
});

$(function() {
	$('#6').click(function() {
		opx = 2;
		idopx = 6;
	});
});

$(function() {
	$('#7').click(function() {
		opx = 3;
		idopx = 7;
	});
});

$(function() {
	$('#8').click(function() {
		opx = 4;
		idopx = 8;
	});
});

$(function() {
	$('#9').click(function() {
		bx = 0;
		idbx = 9;  copybx = 0;
	});
});

$(function() {
	$('#10').click(function() {
		bx = 1;
		idbx = 10;  copybx = 1;
	});
});

$(function() {
	$('#11').click(function() {
		bx = 2;
		idbx = 11;  copybx = 2;
	});
});
$(function() {
	$('#12').click(function() {
		bx = 3;
		idbx = 12;   copybx = 3;
	});
});

socket.on('mReset', function () {
	m = 5;
});

$(function() {
	$('#compute').click(function() {

		if (ax === bx) {
			var av1 = $('#0').val();
			var av2 = $('#1').val();
			var av3 = $('#2').val();
			var av4 = $('#3').val();
			var available = [av1, av2, av3, av4];
			var ar = [];
			var k = 0;
			for (var j=0; j<4; j+=1) {
				if (available[j] === available[copyax]) {
					k+=1;
					ar.push(j);
				}
			}
			if (k === 1) {
				$('div.message3').html("Please select two distinct die").show();
				$('.on').attr({class:'off'});
				k = 0;
				return;
			}
			else {
				ax = ar[0];
				bx = ar[1];
				$('compute').trigger('click');
			}
		}
		if (
			document.getElementById("4").className==="off" &&
				document.getElementById("5").className==="off" &&
				document.getElementById("6").className==="off" &&
				document.getElementById("7").className==="off" &&
				document.getElementById("8").className==="off")  {
			$(".message3").html('Please select an operator');
			return;
		}

		if (
			document.getElementById("0").className==="off" &&
				document.getElementById("1").className==="off" &&
				document.getElementById("2").className==="off" &&
				document.getElementById("3").className==="off")      {
			$('.message3').html('Please select two numbers').show();
			return;
		}
		if (
			document.getElementById("9").className==="off" &&
				document.getElementById("10").className==="off" &&
				document.getElementById("11").className==="off" &&
				document.getElementById("12").className==="off")     {
			$('.message3').html('Please select two numbers').show();
			return;
		} else {
			console.log('Past the tests, preparing data for transmission **********************************************');
			stage += 1; //  This determines what happens in calc() on the server and whether the results
			// $('div.message3').html(' ');
			$('.compute').show();
			data.x = ax;
			data.y = bx;
			data.op = opx;
			m -= 1;
			data.m = m;
			console.log('Here is data coming out of the click callback^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^: ');
			console.log(data);
			socket.emit('compute', data);
			return false;
		}
	})
});
