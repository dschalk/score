exports.roll = function (a, b, c, d, primus, flag, compl, scNum) {
    var Udon = require('udon');
    var complexity = compl;
	var scoreNum = scNum;
    console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
	console.log(scoreNum);
	console.log('****************************************************__________________scoreNum');
	console.log('****************************************************__________________scoreNum');
    var data = {};
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

    var op = [" + ", " - ", " x ", " divided by ", " concatenated left of ",
        " subtracted from ", " divided into ", " concatenated in front of "
    ];

var calc = [
	function (xt, yt) {return xt + yt;},
    function (xt,yt) {
	    if ((xt - yt) >= 0 || complexity !== "simple") {
		    return xt - yt;
	    }
	    else { return undefined; }
    },
    function (xt,yt) {return xt * yt;},
    function (xt,yt){
	    if (complexity === "complex" || ~~(xt/yt) === xt/yt) {
		    return xt/yt
	    } else { return undefined; }
	},
	function (xt, yt) {
	    if ( typeof xt === 'number' && typeof yt === 'number' && yt >= 0 && xt !== 0 && ~~yt === yt && ~~xt ===xt ) {
	        var cat = (xt.toString()) + (yt.toString());
			return parseInt(cat, 10);
        } else { return undefined; }
	}
];       

    var ar3 = artist.unique();
    var ar4 = musician.unique();
    var k, k2, k3, j2, j3, m2, m3, j, z, result;
    k = k2 = k3 = j = j2 = j3 = m2 = j =  m3 = -1;
    var lion = [];
    var resultA, resultB, resultC, resultD;
   Udon.map(function(ar) {
        Udon.map(function(funcs) {
            k += 1;
            Udon.map(function(functions) {
                j += 1;
                y = functions(funcs(ar[0], ar[1]), ar[2]);
                z = functions(ar[2], funcs(ar[0], ar[1]));
                if (y === scoreNum) {
                    lion.push('Score! &nbsp;&nbsp;(' + ar[0] + '  ' + op[calc.indexOf(funcs)] + ' ' + ar[1] + ') '
                            + op[calc.indexOf(functions)] + '  ' + ar[2] + ' = ' + y);
                }
                if (z === scoreNum) {
                     lion.push('Score!&nbsp;&nbsp; (' + ar[2] + ' ' + op[calc.indexOf(funcs)] + ' (' + ar[0] + '  '
                           + op[calc.indexOf(functions)] + ' ' + ar[1] + ') = ' + z);
                }
            }, calc);
        }, calc);
    }, ar3);

    Udon.map(function(ar) {
        Udon.map(function(funcs) {
            k2 += 1;
            Udon.map(function(functions) {
                j2 += 1;
                Udon.map(function (fu) {
                    m2 += 1;
                    result = fu(funcs(ar[0], ar[1]), functions(ar[2], ar[3]));
                    if (result === scoreNum) {
                        lion.push('(' + ar[0] + ' ' + op[calc.indexOf(funcs)]  + ' ' + ar[1] + ') ' + op[calc.indexOf(fu)] + ' ('
                            + ar[2] + ' ' +  op[calc.indexOf(functions)] + ' ' + ar[3] + ') = ' + result);
                    }
                }, calc);
            }, calc);
        }, calc);
    }, ar4);

    Udon.map(function(ar) {
        Udon.map(function(funcs) {
            k3 += 1;
            Udon.map(function(functions) {
                j3 += 1;
                Udon.map(function (fi) {
                    m3 += 1;
                    resultA = fi(functions(funcs(ar[0], ar[1]), ar[2]), ar[3]);
                    resultC = fi(ar[3], (functions(funcs(ar[0], ar[1]), ar[2])));
                    resultB = fi(functions(ar[2], funcs(ar[0], ar[1])), ar[3]);
                    resultD = fi(ar[3], (functions(ar[2], funcs(ar[0], ar[1]))));
                    if (resultA === scoreNum) {
                        lion.push('((' + ar[0] + ' ' + op[calc.indexOf(funcs)] + ' ' + ar[1] + ') ' + op[calc.indexOf(functions)] + ar[2]
                        + ') ' + op[calc.indexOf(fi)] + ' ' + ar[3] + ' = ' + resultA);
                    }
                    if (resultC === scoreNum) {
                        lion.push(ar[3] + ' ' +  op[calc.indexOf(fi)] + ' ((' + ar[0] + ' ' + op[calc.indexOf(funcs)] + ' '
                                + ar[1] + ') ' + op[calc.indexOf(functions)] + ar[2]+ ') = ' + resultC);
                    }
                    if (resultB === scoreNum) {
                        lion.push('(' + ar[2] + ' ' + op[calc.indexOf(functions)] + ' (' + ar[0] + ' ' + op[calc.indexOf(funcs)] + ' ' + ar[1]
                                + ')) ' + op[calc.indexOf(fi)] + ' ' + ar[3] + ' = ' + resultB);
                    }
                    if (resultD === scoreNum) {
                        lion.push(ar[3] + ' ' + op[calc.indexOf(fi)] + ' (' + ar[2] + ' ' + op[calc.indexOf(functions)] + '( ' + ar[0]
                               + '  ' + op[calc.indexOf(funcs)] + ' ' + ar[1] + ') = ' + resultD);
                    }
                }, calc);
            }, calc);
        }, calc);
    }, ar4);


if (lion.length === 0) {
    lion.push("Impossible");
}

console.log("Clowns and devious horses *******************scoreNum****__scoreNum***_2");
	console.log("Clowns and devious horses *************************************************_4");
    console.log(scoreNum);
    console.log("Clowns and devious horses *************************************************_6");
	console.log("Clowns and devious horses **********************______scoreNum____**_8");

    data.alexander = lion;
	data.complexity = complexity;
    primus.send('eval', data);

};



