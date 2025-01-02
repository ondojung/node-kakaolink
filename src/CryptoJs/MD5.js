//68214
const util = require('./util')
module.exports = function() {
              var t = util,
                n = t.lib,
                r = n.WordArray,
                i = n.Hasher,
                a = t.algo,
                s = [];
              ! function() {
                for (var t = 0; t < 64; t++) s[t] = 4294967296 * Math.abs(Math.sin(t + 1)) | 0
              }();
              var c = a.MD5 = i.extend({
                _doReset: function() {
                  this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(e, t) {
                  for (var n = 0; n < 16; n++) {
                    var r = t + n,
                      o = e[r];
                    e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                  }
                  var i = this._hash.words,
                    a = e[t + 0],
                    c = e[t + 1],
                    f = e[t + 2],
                    d = e[t + 3],
                    h = e[t + 4],
                    v = e[t + 5],
                    g = e[t + 6],
                    m = e[t + 7],
                    y = e[t + 8],
                    j = e[t + 9],
                    b = e[t + 10],
                    k = e[t + 11],
                    w = e[t + 12],
                    O = e[t + 13],
                    E = e[t + 14],
                    S = e[t + 15],
                    x = i[0],
                    T = i[1],
                    A = i[2],
                    C = i[3];
                  x = u(x, T, A, C, a, 7, s[0]), C = u(C, x, T, A, c, 12, s[1]), A = u(A, C, x, T, f, 17, s[2]), T = u(T, A, C, x, d, 22, s[3]), x = u(x, T, A, C, h, 7, s[4]), C = u(C, x, T, A, v, 12, s[5]), A = u(A, C, x, T, g, 17, s[6]), T = u(T, A, C, x, m, 22, s[7]), x = u(x, T, A, C, y, 7, s[8]), C = u(C, x, T, A, j, 12, s[9]), A = u(A, C, x, T, b, 17, s[10]), T = u(T, A, C, x, k, 22, s[11]), x = u(x, T, A, C, w, 7, s[12]), C = u(C, x, T, A, O, 12, s[13]), A = u(A, C, x, T, E, 17, s[14]), x = _(x, T = u(T, A, C, x, S, 22, s[15]), A, C, c, 5, s[16]), C = _(C, x, T, A, g, 9, s[17]), A = _(A, C, x, T, k, 14, s[18]), T = _(T, A, C, x, a, 20, s[19]), x = _(x, T, A, C, v, 5, s[20]), C = _(C, x, T, A, b, 9, s[21]), A = _(A, C, x, T, S, 14, s[22]), T = _(T, A, C, x, h, 20, s[23]), x = _(x, T, A, C, j, 5, s[24]), C = _(C, x, T, A, E, 9, s[25]), A = _(A, C, x, T, d, 14, s[26]), T = _(T, A, C, x, y, 20, s[27]), x = _(x, T, A, C, O, 5, s[28]), C = _(C, x, T, A, f, 9, s[29]), A = _(A, C, x, T, m, 14, s[30]), x = l(x, T = _(T, A, C, x, w, 20, s[31]), A, C, v, 4, s[32]), C = l(C, x, T, A, y, 11, s[33]), A = l(A, C, x, T, k, 16, s[34]), T = l(T, A, C, x, E, 23, s[35]), x = l(x, T, A, C, c, 4, s[36]), C = l(C, x, T, A, h, 11, s[37]), A = l(A, C, x, T, m, 16, s[38]), T = l(T, A, C, x, b, 23, s[39]), x = l(x, T, A, C, O, 4, s[40]), C = l(C, x, T, A, a, 11, s[41]), A = l(A, C, x, T, d, 16, s[42]), T = l(T, A, C, x, g, 23, s[43]), x = l(x, T, A, C, j, 4, s[44]), C = l(C, x, T, A, w, 11, s[45]), A = l(A, C, x, T, S, 16, s[46]), x = p(x, T = l(T, A, C, x, f, 23, s[47]), A, C, a, 6, s[48]), C = p(C, x, T, A, m, 10, s[49]), A = p(A, C, x, T, E, 15, s[50]), T = p(T, A, C, x, v, 21, s[51]), x = p(x, T, A, C, w, 6, s[52]), C = p(C, x, T, A, d, 10, s[53]), A = p(A, C, x, T, b, 15, s[54]), T = p(T, A, C, x, c, 21, s[55]), x = p(x, T, A, C, y, 6, s[56]), C = p(C, x, T, A, S, 10, s[57]), A = p(A, C, x, T, g, 15, s[58]), T = p(T, A, C, x, O, 21, s[59]), x = p(x, T, A, C, h, 6, s[60]), C = p(C, x, T, A, k, 10, s[61]), A = p(A, C, x, T, f, 15, s[62]), T = p(T, A, C, x, j, 21, s[63]), i[0] = i[0] + x | 0, i[1] = i[1] + T | 0, i[2] = i[2] + A | 0, i[3] = i[3] + C | 0
                },
                _doFinalize: function() {
                  var t = this._data,
                    n = t.words,
                    r = 8 * this._nDataBytes,
                    o = 8 * t.sigBytes;
                  n[o >>> 5] |= 128 << 24 - o % 32;
                  var i = Math.floor(r / 4294967296),
                    a = r;
                  n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
                  for (var s = this._hash, c = s.words, u = 0; u < 4; u++) {
                    var _ = c[u];
                    c[u] = 16711935 & (_ << 8 | _ >>> 24) | 4278255360 & (_ << 24 | _ >>> 8)
                  }
                  return s
                },
                clone: function() {
                  var e = i.clone.call(this);
                  return e._hash = this._hash.clone(), e
                }
              });
    
              function u(e, t, n, r, o, i, a) {
                var s = e + (t & n | ~t & r) + o + a;
                return (s << i | s >>> 32 - i) + t
              }
    
              function _(e, t, n, r, o, i, a) {
                var s = e + (t & r | n & ~r) + o + a;
                return (s << i | s >>> 32 - i) + t
              }
    
              function l(e, t, n, r, o, i, a) {
                var s = e + (t ^ n ^ r) + o + a;
                return (s << i | s >>> 32 - i) + t
              }
    
              function p(e, t, n, r, o, i, a) {
                var s = e + (n ^ (t | ~r)) + o + a;
                return (s << i | s >>> 32 - i) + t
              }
              t.MD5 = i._createHelper(c), t.HmacMD5 = i._createHmacHelper(c)
              
              return t
            }()