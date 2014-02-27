
first = function (w, x, y, z) {
    var count = 0;
    a = parseInt(w, 10);
    b = parseInt(x, 10);
    c = parseInt(y, 10);
    d = parseInt(z, 10);
    var r3 = rr3(a, b, c, d);
    var artistOb = dataObject(r3);
    var o = artistOb.ob;
    var l = artistOb.len;
    var i;
    var scoreNum = 20;
    for (j = 0; j < l; j++) {
        for (k = 0; k < 5; k++) {
            for (i = 0; i < 5; i++) {
                if (calc[i](calc[k](o[j][0], o[j][1]), o[j][2] ) === scoreNum) {
                    count += 1;
                    return;
                }
                if (calc[i](o[j][2],  calc[k](o[j][0], o[j][1])  ) === scoreNum) {
                    count += 1;
                    return;
                }
            }
        }
    }
    return count;
}
second = function (w, x, y, z) {
    var r4 = rr4(a, b, c, d);
    var count2 = 0;
    var scoreNum = 20;    
    a = parseInt(w, 10);
    b = parseInt(x, 10);
    c = parseInt(y, 10);
    d = parseInt(z, 10);
    var musicianOb = dataObject(r4);
    o = musicianOb.ob;
    var l2 = musicianOb.len;
    for (j = 0; j < l2; j++) {
        for (k = 0; k < 5; k++) {
            for (i=0; i<5; i++) {
                for (m=0; m<5; m++) {
                   if (calc[m](calc[k](o[j][0], o[j][1]), calc[i](o[j][2], o[j][3])) == scoreNum) {
                        count2 += 1;
                        return;
                    }

                    if (calc[k](calc[i](calc[m](o[j][0], o[j][1]), o[j][2]), o[j][3]) === scoreNum) {
                        count2 += 1;
                        return;
                    }

                    if (calc[k](o[j][3], calc[i](calc[m](o[j][0], o[j][1]), o[j][2])) === scoreNum) {
                        count2 += 1;
                        return;
                    }

                    if (calc[k](calc[i](o[j][2], calc[m](o[j][0], o[j][1])), o[j][3]) === scoreNum) {
                        count2 += 1;
                        return;
                    }

                    if (calc[k](o[j][3], calc[i](o[j][2], calc[m](o[j][0], o[j][1]))) === scoreNum) {
                        count2 += 1;
                        return;
                    }
                }
            }
        }
    }
    return count2;
}

var rr3 = function(a, b, c, d) {
    return [
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
}
//  All possible combination of four dice.
    var rr4 = function(a, b, c, d) {
    return [
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
}
        var calc = [
        function (xt, yt) {return xt + yt;},
        function (xt,yt) {return xt - yt;},
        function (xt,yt) {return xt * yt;},
        function (xt,yt){return xt/yt;},
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
        var o = {}, ob = {}, i;
        for (i = 0; i < 24; i += 1) {
                o[ar[i]] = ar[i];
        }
        var l = 0;
        for (var x in o) {
                ob[l] = o[x];
                l += 1;
        }
        return {'len': l, 'ob': ob};
    };

/*
if (works === 0) {
        console.log(pr());
    console.log(a, b, c, d);

}

*/
    nb = 0;
    pr = function() {
    nb += 1;
    return nb;
}
var test = function() {
    var n = 0;
    var jb, kb, ib, mb, result;
    result = 0;
    for (jb = 1; jb < 7; jb += 1) {
        for (kb = 1; kb < 7; kb += 1) {
            for (ib = 1; ib < 13; ib += 1) {
                for (mb = 1; mb < 21; mb += 1) {
                    if (jb<=kb && kb<=ib && ib<=mb && (first(jb, kb, ib, mb) + second(jb, kb, ib, mb)) === 0) {
                        n += 1;
                        console.log(n + '____' + jb, kb, ib, mb);
                    }
                }
            }
        }
    }
}
 test();
//first(6,5,20,3);
