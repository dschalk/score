exports.roll = function (a, b, c, d, primus, flag, complexity, scoreNum) {
    var data = {};
	a = parseInt(a, 10);
	b = parseInt(b, 10);
	c = parseInt(c, 10);
	d = parseInt(d, 10);
    data.a = a;
    data.b = b;
    data.c = c;
    data.d = d;
    var lion = [];
    var works;
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

    var op = [" + ", " - ", " x ", " divided by ", " concatenated left of ",
                        " subtracted from ", " divided into ", " concatenated in front of "
    ];

    var dataObject = function (ar) {
        var o = {}, ob = {}, i = 0, l = ar.length, r = [];
        for (i = 0; i < l; i += 1) {
                o[ar[i]] = ar[i];
        }
        l = 0;
        for (var x in o) {
                ob[l] = o[x];
                l += 1;
        }
        return {'len': l, 'ob': ob};
    };
    var cow = ['<span style="color:#ffc050; font-size:18px;">Three-dice solutions.</span>'],
        pig = ['<span style="color:#ffc050; font-size:18px;">Combine the results of two distinct computations.</span>'],
        dog = ['<span style="color:#ffc050; font-size:18px;">Sequentially, left to right.</span>'],
        badger= ['<span style="color:#ffc050; font-size:18px;">Center first, then left and then right.</span>'],
        skunk = ['<span style="color:#ffc050; font-size:18px;">Center first, then right and then left.</span>'],
        monkey = ['<span style="color:#ffc050; font-size:18px;">Sequentially, right to left.</span>'],
        artistOb = dataObject(artist),
        o = artistOb.ob,
        l = artistOb.len;

    for (j = 0; j < l; j++) {
        for (k = 0; k < 5; k++) {
            for (i = 0; i < 5; i++) {
                if (calc[i]( calc[k](o[j][0], o[j][1]), o[j][2] ) === scoreNum) {
                    cow.push( '<br/>Score! (' + o[j][0] + " " + op[k] + " " + o[j][1] + ") " + op[i] + " " + o[j][2] + " = " + scoreNum);
                    works = works + 7;
                }
                if (calc[i](o[j][2],  calc[k](o[j][0], o[j][1])  ) === scoreNum) {
                    cow.push('<br/>Score! ' + o[j][2] + " " + op[i] + " (" + o[j][0] + " " + op[k] + " " + o[j][1] + ") = " + scoreNum);
                    works = works + 3;
                }
            }
        }
    }

    var musicianOb = dataObject(musician);
    o = musicianOb.ob;
    var l2 = musicianOb.len;

    for (j = 0; j < l2; j++) {
        for (k = 0; k < 5; k++) {
            for (i=0; i<5; i++) {
                for (m=0; m<5; m++) {
                   if (calc[m](calc[k](o[j][0], o[j][1]), calc[i](o[j][2], o[j][3])) == scoreNum) {
                        works += 1;
                        pig.push("<br/>Score! (" + o[j][0] + " " + op[k] + " " + o[j][1] + ") " + op[m] + " (" + o[j][2]
                            + " " + op[i] + " " + o[j][3] + ") = " + scoreNum);
                    }
                }
            }
        }
    }

    for (j = 0; j < l2; j++) {
        for (k = 0; k < 5; k++) {
            for (i = 0; i < 5; i++) {
                for (m = 0; m < 5; m++) {

                    if (calc[k](calc[i](calc[m](o[j][0], o[j][1]), o[j][2]), o[j][3]) === scoreNum) {
                        works += 11;
                        dog.push("<br/>Score! ( (" + o[j][0] + " " + op[m] + " " + o[j][1] + ") " + op[i] + " " + o[j][2] + ") " + op[k] + " " + o[j][3] + " = " + scoreNum);
                        works = works + 3;
                    }

                    if (calc[k](o[j][3], calc[i](calc[m](o[j][0], o[j][1]), o[j][2])) === scoreNum) {
                        works += 11;
                        skunk.push("<br/>Score! " + o[j][3] + " " + op[k] + " ( (" + o[j][0] + " " + op[m] + " " + o[j][1] + ") " + op[i] + " " + o[j][2] + ") = " + scoreNum);
                        works = works + 3;
                    }

                    if (calc[k](calc[i](o[j][2], calc[m](o[j][0], o[j][1])), o[j][3]) === scoreNum) {
                        works += 11;
                        badger.push("<br/>Score! (" + o[j][2] + " " + op[i] + " (" + o[j][0] + " " + op[m] + " " + o[j][1] + ")) " + op[k] + " " + o[j][3] + " = " + scoreNum);
                        works = works + 3;
                    }

                    if (calc[k](o[j][3], calc[i](o[j][2], calc[m](o[j][0], o[j][1]))) === scoreNum) {
                        works += 11;
                        monkey.push("<br/>Score! " + o[j][3] + " " + op[k] + " (" + o[j][2] + " " + op[i] + " (" + o[j][0] + " " + op[m] + " " + o[j][1] + ")) = " + scoreNum);
                        works = works + 3;
                    }
                }
            }
        }
    }

    if (works === 0) {
        lion.push('IMPOSSIBLE');
    }
    else {
        if (cow.length === 1) {cow.push('<br/>There are no solutions in this format.')}
        if (pig.length === 1) {pig.push('<br/>There are no solutions in this format.')}
        if (dog.length === 1) {dog.push('<br/>There are no solutions in this format.')}
        if (skunk.length === 1) {skunk.push('<br/>There are no solutions in this format.')}
        if (badger.length === 1) {badger.push('<br/>There are no solutions in this format.')}
        if (monkey.length === 1) {monkey.push('<br/>There are no solutions in this format.')}
        lion.push(cow);
        lion.push(pig);
        lion.push(dog);
        lion.push(skunk);
        lion.push(badger);
        lion.push(monkey);
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






