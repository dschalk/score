var messages = [];
var tick = -88;
var stage = 1;
var ob = {'player': 'Steve', 'score': 0};
var f = ob.f = function () {
	return function() {
		ob.score += 1;
	}
};
var g = ob.g = function () {
	return function() {
		ob.score -= 1;
	}
};
var inc = f();
var dec = g();
var idax, idopx, idbx;
var a, b, newo;
var primus = new Primus;

$(document).ready(function() {
    copyax = 4;
    copybx = 4;
    $('button#roll').fadeIn(1000);
    $('button#eval').fadeOut(1000);
    $('button#random').fadeOut(1000);
    $('button#score').fadeOut(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#compute').fadeOut(1000);
    $('.message3').html(' ');
    //$('div.message').html("Greetings from Alex and David ");

	$.ionSound({
        sounds: [
            "Gong",
            "A",
	        "tilt"
        ],
        path: "sounds/",                // set path to sounds
        multiPlay: true,               // playin only 1 sound at once
        volume: "0.3"
    });

    setInterval(function() {
        primus.send('happyclown', {'player': ob.player, 'score': ob.score});
	    if (tick < 0) {
		    $('#message5').html(' ');
	    }
	    else {
		    $('#message5').html(tick);
		    tick -= 1;
	    }
    }, 1000);

	$(function() {
		var x = $("#input");
			x.asEventStream("change")
			.subscribe(function(event) {
				ob.player = x.val();
					inc();
				primus.send('clear');
			});
	});

	$(function() {
		var horse = {};
		$("#textMessage input")
			.asEventStream("change")
			.subscribe(function(event) {
				horse.message = $('#textMessage input').val();
                horse.player = ob.player;
				primus.send('messages', horse);
			});
	});
});

$(function() {
	var x = $('#in');
		x.asEventStream("change")
		.subscribe(function(event) {
			ob.player = x.val();
			return false;
		});
});

primus.on('offClock', function () {
	tick = -1;
	//$('.message5').html(' ');
});

primus.on('computebuttonOn', function () {
    $('#compute').show();
});

primus.on('computebuttonOff', function () {
    $('#compute').hide();
});

primus.on('setClock', function (data) {
	tick = data.tick;
    $('#compute').show();
    if (data.play === 2) {
        $('#interrupt').show();
        $('#compute').hide();
    }

    if (data.play == 3 && ob.player == data.player) {
		$('#compute').fadeIn();
	}

});

primus.on('dragon', function (data) {    //  Listens for roll information and populates the selection boxes
	$('#0').val(data['a']);
	$('#1').val(data['newo']);
	$('#2').val('cowC').hide();
	$('#9').val(data['a']);
	$('#10').val(data['newo']);
	$('#11').val('cowD').hide();
});

$(function() {
    $('.n')
	    .asEventStream("click")
	    .subscribe(function(event) {
	        $('.n').val("");
	        return false;
    });
});

$(function() {
	$("#roll")
		.asEventStream("click")
		.subscribe(function(event) {
			primus.send('rollRequest');
		});
});

$(function() {
    $('#mess_button')
	    .asEventStream("click")
	    .subscribe(function(event) {
		    var data = {};
		    data.message = $('#egg').val();
		    data.player = ob.player;
		    primus.send('messages', data);
		    return false;
    })
});

$(function() {
    $('#random')
	    .asEventStream("click")
	    .subscribe(function(event) {
	        data.cow = 6;
	        primus.send('rollRequest', data);
        return false;
    });
});

$(function() {
    $('#eval')
	    .asEventStream("click")
	    .subscribe(function(event) {
	        ob.player = "Solo";
            ob.score = 0;
            $('#in').val('solo');
	        var data = {};
			data.complexity = $('#output').val();
	        primus.send('evalRequest', data);
	        return false;
    });
});

$(function() {
    $('#eval2')
	    .asEventStream("click")
	    .subscribe(function(event) {
			ob.player = 'Solo';
		    var cow = {};
		    cow.complexity = $('#complexity').val();
	        cow.a = $('#a8').val();
	        cow.b = $('#b8').val();
	        cow.c = $('#c8').val();
	        cow.d = $('#d8').val();
	        cow.e = $('#e8').val();
	        primus.send('evalRequest2', cow);
	        return false;
    });
});


$(function() {
    $('#impossible')
	    .asEventStream("click")
	    .subscribe(function(event) {
	     /*
	        if (namex == "Solo" || namex == "Steve") {
	            alert("You haven't logged in.");
	            return;
	        }
	    */
	        $('#interrupt').fadeIn(800);
		    var data = {play:2, 'player': ob.player};
	        primus.send('timer', data);
            primus.send(setimpossibleClicker(ob.player));
	        return false;
    });
});

$(function() {
    $('#score')
	    .asEventStream("click")
	    .subscribe(function(event) {
	    /*
	        if (player === "Solo" || player === "Steve") {
	            alert("You haven't logged in.");
	            return;
	        }
	    */
			var data = {play:1, 'player': ob.player, impossiblePlayer: '#&*87uyt*&^dfgh&^%'};
	        $('button#compute').fadeIn(500);
	        primus.send('timer', data);
	        return false;
    });
});

$(function() {
    $('#interrupt')
	    .asEventStream("click")
	    .subscribe(function(event) {
		    var data = {play:3, 'player': ob.player};
	        $('#compute').show();
	        primus.send('timer', data);
	        return false;
    });
});

$(function() {
    $('#monkey')
	    .asEventStream("click")
	    .subscribe(function(event) {
	        var data = {};
	        data.a = $('.d1').val();
	        data.b = $('.d2').val();
	        data.c = $('.d3').val();
	        data.d = $('.d4').val();
		    data.scoreNum = $('.d5').val();
	        primus.send('monkey', data);
	        return false;
    });
});

$(function() {
    $('#ape')
	    .asEventStream("click")
	    .subscribe(function(event) {
       // primus.send('posts:ape', data);
        primus.send('reset');
        return false;
    });
});

primus.on('rollNums', function(dat) {    //  Listens for roll information and populates the selection boxes
	data = dat;
	$('.on').attr({"class": "off"});
    $('.message6').hide();
	$("#0").val(data.a).show();
	$("#1").val(data.b).show().css("background-color", "black");
	$("#2").val(data.c).show().css("background-color", "black");
	$("#3").val(data.d).show();
	$("#9").val(data.a).show();
	$("#10").val(data.b).show().css("background-color", "black");
	$("#11").val(data.c).show().css("background-color", "black");
	$("#12").val(data.d).show();
});

primus.on('sb', function (players) {
    $(function () {
        var scorediv = $('div.scoreboard');
        scorediv.html("Score Board <br><br>");
        for (cows in players) {
            if (players.hasOwnProperty(cows)) {
                scorediv.append(players[cows].player + "  " + players[cows].score + "<br>");
            }
        }
    });
});

primus.on('eval', function(data){        // Receives and displays the computer's calculations.
    console.log(data);
	$('.message3').html(' ');
    var flag = "multi";
    var bee = data['alexander'];
    var len = bee.length;
	var cow = data.cow;
    if (cow == 6) {
        $('button#roll').hide();
        $('button#random').fadeIn(1000);
    } else {
        $('button#random').hide();
        $('button#roll').fadeIn(800);
    }
    for (i=0; i<len; i+=1) {
    $('div.ev').prepend(bee[i] + '<br/>');
    }
$("div.ev").prepend("*************<br/>" + data.a + "&nbsp; " + data.b + "&nbsp; " +
	data.c + "&nbsp; " + data.d + " complexity = " + data.complexity + "<br/>");
});

primus.on('timeUp', function(data) {
	if (ob.player === data.player && data.play === 2) { inc(); }
	else if (ob.player === data.player) {dec();}
	$('.on').attr({"class": "off"});
	if (data.gamma === false) {
		$('#roll').hide();
		$('.message5').html("Round Over");
		$('#random').fadeIn(1000);
	} else {
		$('button#random').hide();
        $('.message5').html("Round Over");
		$('button#roll').fadeIn(1000);
	}
	$('button#eval').fadeIn(800);
	$('button#score').fadeIn(600)
	$('button#impossible').fadeIn(1000);
	$('button#interrupt').fadeOut(1000);
	$('button#compute').fadeOut(1000);
	$('div.buttons').fadeOut(1000);
});

primus.on('pageUpdate', function (cow){

	if (cow.pointer === 'roll') {
		$('.on').attr({"class": "off"});
		//$('.message5').html(' ');
		$('#compute').hide();
		$('button#score').fadeIn(700);
		$('button#impossible').fadeIn(700);
		$.ionSound.play("A");
		$('.message3').html(' ');
		$('.message2').html(' ');
		$('span').show();
		$('#egg').val("");
		$('div#first_message').hide();
		$('#eval').fadeIn(600);
		$('div.buttons').show();
		$('#ruleMessage').hide();
		$('div.message').html('Clicking "EVALUATE" often yields surprising results. Clicking it during game play causes a player to log out and be re-named "Solo."');
		$('div.rollDisplay').fadeIn(1200).html(data.a + " &nbsp;&nbsp;" + data.b + "&nbsp;&nbsp; " + data.c + "&nbsp;&nbsp;" + data.d + '<br/>');
		return;
	}

	if (cow.pointer === 'godzilla') {
		$('.message3').html(' ');
		$('button#compute').fadeIn(600).
		$('div.message888').hide();
		$('button#eval').fadeOut(1000);
		$('button#roll').fadeOut(1000);
		$('button#score').fadeOut(1000);
		$('button#interrupt').fadeOut(1000);
		$('button#impossible').fadeOut(1000);
		return;
	}

	if (cow.pointer === 'dragon') {
		$('.on').attr({"class": "off"});
		$('button#compute').fadeIn(100);
		$('.message3').html(' ');
		return;
	}

	if (cow.pointer === 'thor') {
		$('.on').attr({"class": "off"});
		$('.message3').html("Click ROLL THE DICE to start another round.<br/>Click EVALUATE to display the computer's solutions.");
		return;
	}

	if (cow.pointer === 'interrupt') {
		$('.on').attr({"class": "off"});
		$('.message3').html("Click ROLL THE DICE to start another round.<br/>Click EVALUATE to display the computer's solutions.");
		return;
	}

	if (cow.pointer = 'done') {
		$('button#score').fadeOut(1000);
		$('button#impossible').fadeOut(1000);
		$('button#eval').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
		$('button#compute').fadeIn(700);
		$('#roll').show();
		if (!cow.gamma) {
			$('button#roll').hide();
			$('button#random').fadeIn(1000);
		} else {
			$('button#random').hide();
			$('button#roll').fadeIn(1000);
		}
		if (ob.player === cow.player) {dec();}
		if (cow.play === 3 && ob.player === cow.impossibleClicker) {inc();}
	}
});

primus.on('mailbox', function (cow) {
    $('#textMessage input').val('');
	$('#textMessage').prepend(cow.player + " says, \"" + cow.message + "\"" + "<br/>")
});

primus.on('godzilla', function (dat) {    //  Listens for roll information and populates the selection boxes.
	data = dat;
	$('div.message2').show().append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " +
		data['newo'] + ". &nbsp;&nbsp;Available numbers are now " + data['a'] +
		" " + data['b'] + " and " + data['newo'] + "<br/>");
	$('#0').val(data.a);
	$('#1').val(data.b);
	$('#2').val(data.newo).css("background-color", "blue");
	$('#3').val('peaches').hide();
	$('#9').val(data.a);
	$('#10').val(data.b);
	$('#11').val(data.newo).css("background-color", "blue");
	$('#12').val('peaches').hide();
});

primus.on('dragon', function (data) {    //  Listens for roll information and populates the selection boxes.

	$('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " +
		data['newo'] +". &nbsp;&nbsp;Available numbers are now " +
		data['a']  + " and " + data['newo'] + "<br/>");

	$('#0').val(data['a']);
    $('#1').val(data['newo']).css("background-color", "blue");
    $('#2').val('cowC').hide();
    $('#9').val(data['a']);
    $('#10').val(data['newo']).css("background-color", "blue");
    $('#11').val('cowD').hide();
});

primus.on('thor', function (data) {    //  Listens for roll information and populates the selection boxes
	$('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " + data['newo']);
	$('#0').val(data['newo']);
    $('#1').hide();
    $('#9').val(data['newo']);
    $('#10').hide();
    });

primus.on('scoreUp', function (data) {    //  Listens for roll information and populates the selection boxes.
    tick = -1;
    $.ionSound.play("Gong");
    $('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " + data['newo']);
    if (!data.gamma) {
        $('button#roll').hide();
        $('button#random').fadeIn(1000);
    } else {
        $('button#random').hide();
        $('button#roll').fadeIn(1000);
    }
    $('button#eval').fadeIn(1000);
    $('button#score').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#compute').fadeOut(1000);
    $('div.buttons').fadeIn(800).hide();
    //$('div.message').html(data[7] + " scored!  One point added. ");
    console.log(data);
	if (ob.player === data.player) { inc(); }
	if (ob.player === data.impossibleClicker) {dec();}
});

primus.on('wash', function () {
    $('div.ev').html(" ")
    }
);

primus.on('tilt', function (data) {
    console.log("44444444444444444444444444444444444444444444444444444444444444_in 'tilt'");C
    $.ionSound.play("tilt");
    if (data.cow === 6) {
        $('button#roll').hide();
        $('button#random').fadeIn(1000);
    } else {
        $('button#random').hide();
        $('button#roll').fadeIn(1000);
    }
    $('button#eval').fadeIn(1000);
	$('.message6').show().html("<h1>TILT</h1><span id='tilt'>A number divided by zero is either undefined or infinity. Either way, it cannot combine with another number to produce 20.  Minus one point.</span>");
    $('button#score').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#compute').fadeOut(1000);
    $('div.buttons').fadeIn(800);
    if (ob.player === data.scoreClicker || ob.player === data.interruptClicker) {dec();}
    if (ob.player === data.impossibleClicker) {inc();}
});

primus.on('fractionMessage', function () {
		$('message3').html("Fractions are not allowed on the basic complexity level.  Hint: multipying by a fraction is the same as multiplying by the numerator and dividing by the denominator.");
	}
);

primus.on('concatMessage', function () {
		$('message3').html("concatenation is only for whole numbers, not fractions.");
});

primus.on('concatMessage', function () {
	$('message3').html("concatenation is only for whole numbers, not fractions.");
});