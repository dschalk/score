exports.roll = function (a, b, c, d, socket, flag, output, scNum) {
	evalData = require('monitor').monitor();
	var scoreNum = scNum;
    console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
	console.log(scoreNum);
	console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
    var data = {};
	output = parseInt(output, 10);
	var a = parseInt(a, 10);
	var b = parseInt(b, 10);
	var c = parseInt(c, 10);
	var d = parseInt(d, 10);
    data.a = a;
    data.b = b;
    data.c = c;
    data.d = d;
    Array.prototype.unique = function () {
        var o = {}, i = 0, l = this.length, r = [];
        for (i = 0; i < l; i += 1) o[this[i]] = this[i];
        for (var n in o) {
            r.push(o[n]);
        }
        return r;
    };
    var lion = [];
    var works = 0, lizard = 0, tiger = [], jack = 0, jill = 0, hill = 0;
    var cow2 = 888, goat = 2, horse = 4, burrow = 3, chevy = 5, ford = 2, olds = 7, peach = 0, pear = 1, apple = 2;
    var cow = 77, ox = 0, pig = 88;
//  All possible combinations of three dice
    var artist = [
        [a, b, c],
        [a, b, d],
        [a, c, b],
        [a, c, d],
        [a, d, b],
        [a, d, c],
        [b, a, c],
        [b, a, d],
        [b, c, a],
        [b, c, d],
        [b, d, a],
        [b, d, c],
        [c, a, b],
        [c, a, d],
        [c, b, a],
        [c, b, d],
        [c, d, a],
        [c, d, b],
        [d, a, b],
        [d, a, c],
        [d, b, a],
        [d, b, c],
        [d, c, a],
        [d, c, b ]
    ];
//  All possible combination of four dice.
    var musician = [
        [a, b, c, d],
        [a, b, d, c],
        [a, c, b, d],
        [a, c, d, b],
        [a, d, b, c],
        [a, d, c, b],
        [b, a, c, d],
        [b, a, d, c],
        [b, c, a, d],
        [b, c, d, a],
        [b, d, a, c],
        [b, d, c, a],
        [c, a, b, d],
        [c, a, d, b],
        [c, b, a, d],
        [c, b, d, a],
        [c, d, a, b],
        [c, d, b, a],
        [d, a, b, c],
        [d, a, c, b],
        [d, b, a, c],
        [d, b, c, a],
        [d, c, a, b],
        [d, c, b, a]
    ];

    var ar = artist.unique();
    var ar2 = musician.unique();
    var j = 0;
    var horseB = 2, horseC = 3, horseD = 4, goat2 = 6;

    var w1 = ar[j][0];
    var x1 = ar[j][1];
    var y1 = ar[j][2];

    var w = ar2[j][0];
    var x = ar2[j][1];
    var y = ar2[j][2];
    var z = ar2[j][3];

    var op = [" + ", " - ", " x ", " divided by ", " concatinated left of ",
        " subtracted from ", " divided into ", " concatinated in front of "
    ];

var calc = [
	function (xt, yt) {
		return xt + yt;
	},
    function (xt,yt) {
	    if (output === 0) {
		    if (xt >= yt) { return xt - yt;}
		    else return undefined;
	    }
	    else return xt - yt;
    },
    function(xt,yt) {return xt * yt;}, 
    function (xt,yt){
	    if (output === 0 || output === 1) {
		    if (~~(xt/yt) === xt/yt && yt!==0){return xt/yt;}
	        else return undefined;
        }
	    if (output ===2 && yt!==0) {return xt/yt};
    },
    function (x, y) {
        if (typeof x === 'number' && typeof y === 'number' && y >= 0 && ~~y === y && ~~x ===x )
            return parseInt(x.toString()+y.toString(), 10);
    }
];       

    var l = ar.length;
    var l2 = ar2.length;
    j = 0;
    var k = 0;
    var i = 0;
    var m = 0;

//  Method 1.  Select only three dice.  Operate on the first pair of number,
//  then operate on the first result and the third number.
//  We aren't concerned with dividing the first number by the result of operating
//  on the second two numbers since the result will always be less than twenty.
//  All possibilities are covered with the following three loops:

    for (j = 0; j < l; j++) {
        for (k = 0; k < 5; k++) {
            for (i = 0; i < 5; i++) {

//  The calculation:
                ox = calc[i](ar[j][0], ar[j][1]);
                cow = calc[k](ox, ar[j][2]);
                pig = calc[k](ar[j][2], ox);

                if (cow === scoreNum) {
                    w1 = ar[j][0];
                    x1 = ar[j][1];
                    y1 = ar[j][2];
                    works += 15;
                    lion.push("Score! (" + w1 + " " + op[i] + " " + x1 + ") " + op[k] + " " + y1 + " = " + scoreNum);
                    works = works + 7;
                }

                if (pig === scoreNum) {
                    w1 = ar[j][0];
                    x1 = ar[j][1];
                    y1 = ar[j][2];
                    works += 15;
                    lion.push("Score! " + y1 + " " + op[k] + " (" + w1 + " " + op[i] + " " + x1 + ") = " + scoreNum);
                    works = works + 3;
                }

            }
        }
    }

for (j = 0; j < l2; j++) {
    for (k = 0; k < 5; k++) {
        for (i=0; i<5; i++) {
            for (m=0; m<5; m++) {
               if (calc[m](calc[k](ar2[j][0], ar2[j][1]), calc[i](ar2[j][2], ar2[j][3])) == scoreNum) {
                    w = ar2[j][0];
                    x = ar2[j][1];
                    y = ar2[j][2];
                    z = ar2[j][3];
                    works += 1;
                    lion.push("Score! (" + w + " " + op[k] + " " + x + ") " + op[m] + " (" + y + " " + op[i] + " " + z + ") = " + scoreNum);
                }
            }
        }
    }
}


for (j = 0; j < l2; j++) {
    for (k = 0; k < 5; k++) {
        for (i = 0; i < 5; i++) {
            for (m = 0; m < 5; m++) {

                burrow = calc[m](ar2[j][0], ar2[j][1]);   // These are switched and assume all values in the permutations     op[m]

                goat = calc[i](burrow, ar2[j][2]);
                horse = calc[k](goat, ar2[j][3]);
                horseB = calc[k](ar2[j][3], goat);

                goat2 = calc[i](ar2[j][2], burrow);
                horseC = calc[k](goat2, ar2[j][3]);
                horseD = calc[k](ar2[j][3], goat2);


                if (horse === scoreNum) {
                    works += 11;
                    w = ar2[j][0];
                    x = ar2[j][1];
                    y = ar2[j][2];
                    z = ar2[j][3];
                    lion.push("Score! ( (" + w + " " + op[m] + " " + x + ") " + op[i] + " " + y + ") " + op[k] + " " + z + " = " + scoreNum);
                    works = works + 3;
                }

                if (horseB === scoreNum) {
                    works += 11;
                    w = ar2[j][0];
                    x = ar2[j][1];
                    y = ar2[j][2];
                    z = ar2[j][3];
                    lion.push("Score! " + z + " " + op[k] + " ( (" + w + " " + op[m] + " " + x + ") " + op[i] + " " + y + ") = " + scoreNum);
                    works = works + 3;
                }

                if (horseC === scoreNum) {
                    works += 11;
                    w = ar2[j][0];
                    x = ar2[j][1];
                    y = ar2[j][2];
                    z = ar2[j][3];
                    lion.push("Score! (" + y + " " + op[i] + " (" + w + " " + op[m] + " " + x + ")) " + op[k] + " " + z + " = " + scoreNum);
                    works = works + 3;
                }

                if (horseD === scoreNum) {
                    works += 11;
                    w = ar2[j][0];
                    x = ar2[j][1];
                    y = ar2[j][2];
                    z = ar2[j][3];
                    lion.push("Score! " + z + " " + op[k] + " (" + y + " " + op[i] + " (" + w + " " + op[m] + " " + x + ")) = " + scoreNum);
                    works = works + 3;
                }
            }
        }
    }
}

if (works === 0) {
    lion.push("Impossible");
}
console.log("Clowns and devious horses *******************scoreNum****__scoreNum***_2");
	console.log("Clowns and devious horses *************************************************_4");
    console.log(scoreNum);
    console.log("Clowns and devious horses *************************************************_6");
	console.log("Clowns and devious horses **********************______scoreNum____**_8");

    data.alexander = lion;
    socket.emit('eval', data);
    if (flag === 6) {
    socket.broadcast.emit('eval', data);
    }
};






