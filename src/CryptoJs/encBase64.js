//98269
const util = require('./util')
module.exports = function() {
            var o = util
            !function () {
              var e = o,
                t = e.lib.WordArray;
    
              function n(e, n, r) {
                for (var o = [], i = 0, a = 0; a < n; a++)
                  if (a % 4) {
                    var s = r[e.charCodeAt(a - 1)] << a % 4 * 2 | r[e.charCodeAt(a)] >>> 6 - a % 4 * 2;
                    o[i >>> 2] |= s << 24 - i % 4 * 8, i++
                  } return t.create(o, i)
              }
              e.enc.Base64 = {
                stringify: function(e) {
                  var t = e.words,
                    n = e.sigBytes,
                    r = this._map;
                  e.clamp();
                  for (var o = [], i = 0; i < n; i += 3)
                    for (var a = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; s < 4 && i + .75 * s < n; s++) o.push(r.charAt(a >>> 6 * (3 - s) & 63));
                  var c = r.charAt(64);
                  if (c)
                    for (; o.length % 4;) o.push(c);
                  return o.join("")
                },
                parse: function(e) {
                  var t = e.length,
                    r = this._map,
                    o = this._reverseMap;
                  if (!o) {
                    o = this._reverseMap = [];
                    for (var i = 0; i < r.length; i++) o[r.charCodeAt(i)] = i
                  }
                  var a = r.charAt(64);
                  if (a) {
                    var s = e.indexOf(a); - 1 !== s && (t = s)
                  }
                  return n(e, t, o)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
              }
            }()
            return o
          }()