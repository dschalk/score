var socket = io.connect();
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
    $('#clean').click(function() {
        socket.emit('erase');
        return false;
    });
});

socket.on('highlightOff', function () {
    $('.on').attr({"class": "off"});
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










