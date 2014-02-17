var primus = new Primus;
primus.on('reset', function (data){
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
    $('#clean')
	    .asEventStream("click")
	    .subscribe(function(event) {
        primus.send('erase');
        return false;
    });
});

primus.on('highlightOff', function () {
    $('.on').attr({"class": "off"});
});

primus.on('default', function() {
        $('.d1').val(6);
        $('.d2').val(6);
        $('.d3').val(12);
        $('.d4').val(20);
        $('.d5').val(20);
        $('div.sides').html("The sides of the dice are 6, 6, 12, and 20 and the Score Number is 20" );
});

primus.on('showbutton', function (data) {
    $('button#roll').fadeIn(1000);
    $('button#interrupt').fadeOut(1000);
    $('.on').attr({"class": "offx"});
    $('.response').val("");
});

primus.on('buttonReset', function(data) {
    $('button#roll').fadeOut(1000);
    $('button#eval').fadeOut(1000);
	$('div.message').html(" ");
	$('button#score').fadeOut(1000);
	$('#interrupt').hide();
	if (data.player === ob.player) {
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

primus.on('numberchanger', function (data) {
    $(function () {
	    $('.on').attr({class:'off'})
        if (!data.gamma) { // True means the sides are 6's, 12's, and/or 20's.
            $('div.sides').html("Upper bounds on the four random integers: " + data.a + " " + data.b + " " + data.c + " " + data.d);
            $('#roll').hide();
            $('#random').show();
        }
        else {
            $('div.sides').html("The virtual dice roll is: " + data.a + " " + data.b + " " + data.c + " " + data.d);
            $('#roll').show();
            $('#random').hide();
        }
    });
});

