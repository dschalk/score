var socket = io.connect();
var messages = [];
var tick = -88;
var stage = 1;
var typecow = 888;
var data;
var idax, idopx, idbx;
var a, b, newo;
var playerdoc = { "player": "Steve", "score": 0 };
var player = "Steve";

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
	$('.message5').html(' ');
    //$('div.message').html("Greetings from Alex and David ");


	/*
	if (data.play === 1) {
		console.log('data received ##########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		$('button#roll').hide();
		$('button#random').fadeIn(1000);
	} else {
		$('button#random').hide();
		$('button#roll').fadeIn(1000);
	}
	if (player === data.scoreClicker || player === data.imposibleClicker) {playerdoc.score -= 1;}
    */

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
        data.playerdoc = playerdoc;
        data.player = player;
	    data.tick = tick;
        socket.emit('happyclown', data);
	    if (tick > -1) {
			$('.message5').html(tick);
		tick -= 1;
	    }
    }, 1000);
});

socket.on('offClock', function () {
	tick = -1;
	$('.message5').html(' ');
});

socket.on('setClock', function (data) {
	tick = data.tick;
});


socket.on('dragon', function (data) {    //  Listens for roll information and populates the selection boxes
	$('#0').val(data['a']);
	$('#1').val(data['newo']);
	$('#2').val('cowC').hide();
	$('#9').val(data['a']);
	$('#10').val(data['newo']);
	$('#11').val('cowD').hide();
});

$(function() {
    $('.nb').click(function() {
        player = $('.n').val();
        playerdoc = { 'player':player, 'score': 0 };
        return false;
    });
});

$(function() {
    $('.n').click(function() {
        $('.n').val("");
        return false;
    });
});

$(function() {
	$('button#roll').click(function() {
		socket.emit('rollRequest');
		return false;
	});
});

$(function() {
    $('#mess_button').click(function() {
	    var data = {};
	    data.message = $('#egg').val();
	    data.player = player;
	    socket.emit('messages', data);
	    return false;
    })
});

$(function() {
    $('#random').click(function() {
        data.cow = 6;
        typecow = 6;
        socket.emit('rollRequest', data);
        return false;
    });
});

$(function() {
    $('#eval').click(function() {
        playerdoc = { "player": "Solo", "score": 0 };
        player = "Solo";
        var data = {};
		data.flag = 6;
		data.complexity = $('#output').val();
        socket.emit('evalRequest', data);
        return false;
    });
});

$(function() {
    $('#eval2').click(function() {
        playerdoc = {
			"player": "Solo",
			"score": 0
        }
        player = "Solo";
        var data = {};
        data.flag = 5;
        data.output = $('#output').val();
        data.a = $('#a8').val();
        data.b = $('#b8').val();
        data.c = $('#c8').val();
        data.d = $('#d8').val();
        data.e = $('#e8').val();
        socket.emit('evalRequest2', data);
        return false;
    });
});

$(function() {
    $('#impossible').click(function() {
     /*
        if (namex == "Solo" || namex == "Steve") {
            alert("You haven't logged in.");
            return;
        }
    */
        $('#interrupt').fadeIn(800);
        data.play = 2;
	    data.player = player;
        socket.emit('timer', data);
        return false;
    });
});

$(function() {
    $('#score').click(function() {
    /*
        if (player === "Solo" || player === "Steve") {
            alert("You haven't logged in.");
            return;
        }
    */
		var data = {play:1};
	    data.player = player;
        $('button#compute').fadeIn(500);
        socket.emit('timer', data);
        return false;
    });
});

$(function() {
    $('#interrupt').click(function() {
        data.play = 3;
	    data.player = player;
        $('button#compute').fadeIn(800);
        socket.emit('timer', data);
        return false;
    });
});

$(function() {
    $('#monkey').click(function() {
        var data = {};
        data.a = $('.d1').val();
        data.b = $('.d2').val();
        data.c = $('.d3').val();
        data.d = $('.d4').val();
	    data.scoreNum = $('.d5').val();
        socket.emit('monkey', data);
        return false;
    });
});

$(function() {
    $('#ape').click(function() {
       // typecow = 5
       // socket.emit('posts:ape', data);

        socket.emit('reset');
        return false;
    });
});

socket.on('rollNums', function(dat) {    //  Listens for roll information and populates the selection boxes
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

socket.on('sb', function (players) {
    $(function () {
        $('div.scoreboard').html("Score Board <br><br>");
        for (cows in players) {
            if (players.hasOwnProperty(cows)) {
                $('div.scoreboard').append(players[cows].player + "  " + players[cows].score + "<br>");
            }
        }
    });
});

socket.on('eval', function(data){        // Receives and displays the computer's calculations.
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
	data.c + "&nbsp; " + data.d + "<br/>");
});

socket.on('eval2', function(data){        // Receives and displays the computer's calculations.
    console.log(data);
    var bee = data['alexander'];
    var len = bee.length;
    for (i=0; i<len; i+=1) {
    $('div.ev').prepend(bee[i] + '<br>');
    }
$("div.ev").prepend("*************<br>" + data.a + "&nbsp; " + data.b + "&nbsp; " + data.c + "&nbsp; " + data.d + "<br>");
});

socket.on('pageUpdate', function (cow){

	if (cow.pointer === 'roll') {
		$('.on').attr({"class": "off"});
		$('.message5').html(' ');
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
		$('button#compute').fadeOut(600).
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
		$('button#compute').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
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

	if (cow.pointer = 'timeUp') {
		$('.on').attr({"class": "off"});
		if (data.cow === 6) {
			$('button#roll').hide();
			$('.message5').html("Round Over");
			$('button#random').fadeIn(1000);
		} else {
			$('button#random').hide();
			$('button#roll').fadeIn(1000);
		}
		$('button#eval').fadeIn(800);
		$('button#score').fadeIn(600)
		$('button#impossible').fadeIn(1000);
		if (player === data.scoreClicker || player === data.interruptClicker) {playerdoc.score -= 1;}
		if (player === data.impossibleClicker) {playerdoc.score += 1}
		return;
	}

	if (cow.pointer = 'done') {
		$('button#score').fadeOut(1000);
		$('button#impossible').fadeOut(1000);
		$('button#eval').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
		$('button#compute').fadeIn(700);
		$('#roll').show();
		if (data.cow === 6) {
			$('button#roll').hide();
			$('button#random').fadeIn(1000);
		} else {
			$('button#random').hide();
			$('button#roll').fadeIn(1000);
		}
	}

});

socket.on('godzilla', function (dat) {    //  Listens for roll information and populates the selection boxes.
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

socket.on('dragon', function (data) {    //  Listens for roll information and populates the selection boxes.

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

socket.on('thor', function (data) {    //  Listens for roll information and populates the selection boxes
	$('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " + data['newo']);
	$('#0').val(data['newo']);
    $('#1').hide();
    $('#9').val(data['newo']);
    $('#10').hide();
    });

socket.on('timeUp', function (data) {    //  Listens for roll information and populates the selection boxes
	if (player === data.scoreClicker || player === data.interruptClicker) {playerdoc.score -= 1;}
	if (player === data.impossibleClicker) {playerdoc.score += 1}
});

socket.on('scoreUp', function (data) {    //  Listens for roll information and populates the selection boxes.
    $.ionSound.play("Gong");
    $('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " + data['newo']);
    if (data.cow === 6) {
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
	if (player === data.scoreClicker || player === data.interruptClicker) {playerdoc.score += 1;}
	if (player === data.impossibleClicker) {playerdoc.score -= 1}
});

socket.on('wash', function () {
    $('div.ev').html(" ")
    }
);

socket.on('tilt', function (data) {    //  Listens for roll information and populates the selection boxes
    console.log("44444444444444444444444444444444444444444444444444444444444444_in 'tilt'");
    $.ionSound.play("tilt");

   // $('message3').html("<span id='tilt'>TILT **** TILT **** TILT</span><br/>A number divided by zero is either undefined or infinity. Either way, it cannot combine with another number to produce 20.").show();
   // $('message2').html("<span id='tilt'>TILT **** TILT **** TILT</span><br/>A number divided by zero is either undefined or infinity. Either way, it cannot combine with another number to produce 20.").show();
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
    if (player === data.scoreClicker || player === data.interruptClicker) {playerdoc.score -= 1;}
    if (player === data.impossibleClicker) {playerdoc.score += 1}
});

socket.on('fractionMessage', function () {
		$('message3').html("Fractions are not allowed on the basic complexity level.  Hint: multipying by a fraction is the same as multiplying by the numerator and dividing by the denominator.");
	}
);

socket.on('concatMessage', function () {
		$('message3').html("concatenation is only for whole numbers, not fractions.");
});
