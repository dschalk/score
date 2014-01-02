var socket = io.connect();
var messages = [];
// var data = {'0': 888, '1': 888, '2': 888, '3': 888, '7': "Fred"};
var stage = 1;
var typecow = 888;
var data;
var cow = 888;
var op, x, y, idax, idopx, idbx, obj, az, bz, cz, dz;
var k = 777, i = 888, j = 999, a, b, c, d, l, n, m, newo;
var bl = false;
var len = 888, i = 888, interrupt;
var playerdoc = { "player": "Steve", "score": 0 };
var player = "Steve";
var scoreClicker, impossibleClicker, interruptClicker;

$(document).ready(function() {

    copyax = 4;
    copybx = 4;
    $('button#roll').hide().fadeIn(300).fadeOut(300).fadeIn(500);
    $('button#eval').fadeOut(1000);
    $('button#random').fadeOut(1000);
    $('button#score').fadeOut(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#compute').fadeOut(1000);
    $('div.countdown').append("");
    $('.message3').html(' ');
    $('div.message').html("Greetings from Alex and David ");
	if (data.play === 1) {
		console.log('data received ##########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		$('button#roll').hide();
		$('button#random').fadeIn(1000);
	} else {
		$('button#random').hide();
		$('button#roll').fadeIn(1000);
	}
	if (player === data.scoreClicker || player === data.imposibleClicker) {playerdoc.score -= 1;}
    $.ionSound({
        sounds: [
            "Gong",
            "A"
        ],
        path: "sounds/",                // set path to sounds
        multiPlay: true,               // playin only 1 sound at once
        volume: "0.3"
    });
    setInterval(function() {
        data.playerdoc = playerdoc;
        data.player = player;
        socket.emit('happyclown', data);
    }, 500);
});

socket.on('reset', function (data){
	copyax = 4;
	copybx = 4;
	$('button#roll').hide().fadeIn(100).fadeOut(100).fadeIn(200);
	$('button#eval').fadeOut(1000);
	$('button#random').fadeOut(1000);
	$('button#score').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(200);
	$('button#interrupt').fadeOut(1000);
	$('button#impossible').fadeIn(600);
	$('button#compute').fadeOut(1000);
	$('div.countdown').append("");
	$('div.message').hide();
	$('div.message2').hide();
	$('div.message3').hide();
	$('div.buttons').show();
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
    $('#clean').click(function() {
        socket.emit('erase');
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
        $('#interrupt').fadeIn(1000);
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
	    var data = {};
        data.play = 1;
		data.player = player;
        $('div.countdown').fadeIn(1000);
        $('button#compute').fadeIn(700);
	    $('setScore', data);
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

socket.on('highlightOff', function () {
    $('.on').attr({"class": "off"});
});

socket.on('anotherRound', function () {
	$('button#roll').hide().fadeIn(300).fadeOut(300).fadeIn(500);
	$('button#eval').fadeOut(1000);
	$('button#random').fadeOut(1000);
	$('button#score').fadeOut(1000);
	$('button#interrupt').fadeOut(1000);
	$('button#impossible').fadeOut(1000);
	$('button#compute').fadeOut(400);
	$('button#compute').fadeIn(600);
	$('.message3').html(' ');
});

socket.on('default', function() {

        $('.d1').val(6);
        $('.d2').val(6);
        $('.d3').val(12);
        $('.d4').val(20);
        $('.d5').val(20);
        $('div.sides').html("The sides of the dice are 6, 6, 12, and 20 and the Score Number is 20" );
})

socket.on('mailbox', function (data) {
    $('div.usermess').prepend('<br/>' + data.player + ' says ' + data.message);
    $('#egg').val("");
});

socket.on('rollNums', function(data) {    //  Listens for roll information and populates the selection boxes
	$('.on').attr({"class": "off"});
	$("#0").val(data.a).show();
	$("#1").val(data.b).show();
	$("#2").val(data.c).show();
	$("#3").val(data.d).show();
	$("#9").val(data.a).show();
	$("#10").val(data.b).show();
	$("#11").val(data.c).show();
	$("#12").val(data.d).show();
	$('button#score').fadeIn(500);
	$('button#impossible').fadeIn(500);
    $.ionSound.play("A");
	$('.message3').html(' ');
	$('.message2').html(' ');
	$('span').show();
    $('#egg').val("");
    $('div#first_message').hide();
    $('#eval').show();
    $('div.buttons').show();
    $('#ruleMessage').html(' ');
	var cow = data.cow;
	<!--
	console.log('***********COW*************____in rollNums*******____cow:');
	console.log(cow);
	console.log('***********COW**********COW**************COW***********************__cow in rollNums');
    if (cow === 6) {
        $('button#roll').hide();
        $('button#random').fadeIn(1000);
        typecow = 6
    } else {
        $('button#random').hide();
        $('button#roll').fadeIn(1000);
        typecow = 5;
    }
	-->
    $('.eval').fadeIn(500);
    $('button#score').fadeIn(750);
    $('button#impossible').fadeIn(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#compute').fadeOut(1000);
    $('div.countdown').html("");
    $('div.message').html('Clicking "EVALUATE" often yields surprising results. Clicking it during game play causes a player to log out and be re-named "Solo."');
    $('div.rollDisplay').fadeIn(1200).html(data.a + " &nbsp;&nbsp;" + data.b + "&nbsp;&nbsp; " + data.c + "&nbsp;&nbsp;" + data.d + '<br/>');
});

socket.on('message', function (data) {
    $('div.usermess').prepend(data.player + " says: " + data.message + "<br/>");
    $('.response').val("");
});

socket.on('showbutton', function (data) {
    $('button#roll').fadeIn(1000);
    $('button#interrupt').fadeOut(1000);
    $('.on').attr({"class": "offx"});
    $('.response').val("");
});

socket.on('buttonReset', function(data) {
    $('button#roll').fadeOut(1000);
    $('button#eval').fadeOut(1000);
	$('div.message').html(" ");
	$('button#score').fadeOut(1000);
	$('#interrupt').hide();
	$('#impossible').hide();
	if (data.currentPlayer === playerdoc.player) {
		$('#compute').show();
	}

	if (data.play == 2) {
		$('#compute').fadeOut(500);
		$('#interrupt').fadeIn(800);
		$('#impossible').hide();
	}

	if (data.play == 3) {
		$('#interrupt').hide();
		$('#compute').fadeIn(1000);
	}
});

socket.on('tic', function(data) {
    $('div.countdown').html(data.tick).show();
});

socket.on('impossibletimer', function(data) {
    $('button#interrupt').fadeIn(1000);
    $('button#score').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#compute').fadeIn(700);
    $('div.message').html(" ");
    impossibleClicker = data.impossibleClicker;
});

socket.on('interrupttimer', function(data) {
    interruptClicker = data.interruptClicker;
    $('button#interrupt').fadeOut(1000);
    $('div.message').html(" ");
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

socket.on('numberchanger', function (data) {
    $(function () {
	    $('.on').attr({class:'off'})
        if (data.cow === 6) {
            typecow = 6;
            $('div.sides').html("Upper bounds on the four random integers: " + data.a + " " + data.b + " " + data.c + " " + data.d);
            $('button#roll').hide();
            $('button#random').show();
        }
        else {
            $('div.sides').html("The virtual dice roll is: " + data.a + " " + data.b + " " + data.c + " " + data.d);
            $('button#roll').show();
            $('button#random').hide();
            typecow = 5
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
        $('button#roll').fadeIn(1000);
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

socket.on('godzilla', function (data) {    //  Listens for roll information and populates the selection boxes.
	$('div.message2').show();
	$('.message3').html(' ');
    $('button#compute').show();
    $('div.message888').hide();
    $('div.countdown').fadeIn(1000);
    $('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " +
	    data['newo'] + ". &nbsp;&nbsp;Available numbers are now " + data['a'] + " " + data['b'] + " and " + data['newo'] + "<br/>");
    $('#0').val(data['a']);
    $('#1').val(data['b']);
    $('#2').val(data['newo']);
    $('#3').val('peaches').hide();
    $('#9').val(data['a']);
    $('#10').val(data['b']);
    $('#11').val(data['newo']);
    $('#12').val('peaches').hide();
    $('button#eval').fadeOut(1000);
    $('button#roll').fadeOut(1000);
    $('button#score').fadeOut(1000);
    $('button#interrupt').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    });

socket.on('dragon', function (data) {    //  Listens for roll information and populates the selection boxes
	$('.message3').html(' ');
	$('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " +
		data['newo'] +". &nbsp;&nbsp;Available numbers are now " + data['a']  + " and " + data['newo'] + "<br/>");
    $('#0').val(data['a']);
    $('#1').val(data['newo']);
    $('#2').val('cowC').hide();
    $('#9').val(data['a']);
    $('#10').val(data['newo']);
    $('#11').val('cowD').hide();
    $('button#score').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#eval').fadeOut(1000);
    $('button#roll').fadeIn().fadeOut(1000);
    $('button#compute').fadeIn(500);
    });

socket.on('thor', function (data) {    //  Listens for roll information and populates the selection boxes
	$('.on').attr({"class": "off"});
	$('.message3').html(' ');
	$('div.message2').append(data['yin'] + " " + data['operator'] + " " + data['yang'] + " = " + data['newo']);
    $('#0').val(data['newo']);
    $('#1').hide();
    $('#9').val(data['newo']);
    $('#10').hide();

    $('button#score').fadeOut(1000);
    $('button#impossible').fadeOut(1000);
    $('button#eval').fadeOut(1000);
    $('button#roll').fadeIn(750).fadeOut(750);
    $('button#compute').fadeIn(700);
	$('#roll').show();
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
	$('div.countdown').html(" ");
	if (player === data.currentPlayer) {playerdoc.score -= 1;}
	if (player === data.impossibleClicker) {playerdoc.score += 1}
    });

socket.on('timeUp', function (data) {    //  Listens for roll information and populates the selection boxes
	$('#roll').show();
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
    $('div.countdown').html(" ");
	if (player === data.scoreClicker || player === data.imposibleClicker) {playerdoc.score -= 1;}
	if (player === data.impossibleClicker) {playerdoc.score += 1}
});

socket.on('scoreUp', function (data) {    //  Listens for roll information and populates the selection boxes.
    $.ionSound.play("Gong");
    $('div.countdown').hide();
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
console.log(data.play + ' ' + playerdoc.player + ' ' + data.impossibleClicker + ' ' + data.currentPlayer);
	if (player === data.scoreClicker || player === data.interruptClicker) {playerdoc.score += 1;}
	if (player === data.impossibleClicker) {playerdoc.score -= 1}
	console.log(player);
	console.log(data.impossibleClicker);
});

socket.on('wash', function () {
    $('div.ev').html(" ")
    }
);

socket.on('wash', function () {
		$('div.ev').html(" ");
	}
);

socket.on('infinityMessage', function () {
		$.ionSound.play("tilt");
		$('message3').html("<span id='tilt'>TILT **** TILT **** TILT</span><br/>A number divided by zero is either undefined or infinity. Either way, it cannot combine with another number to produce 20.")
	}
);

socket.on('fractionMessage', function () {
		$('message3').html("Fractions are not allowed on the basic complexity level.  Hint: multipying by a fraction is the same as multiplying by the numerator and dividing by the denominator.");
	}
);

socket.on('concatMessage', function () {
		$('message3').html("concatenation is only for whole numbers, not fractions.");
	}
);