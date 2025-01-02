//62783
const util = require('./util')
module.exports = function() {
        var o = util
        ! function() {
          var e = o,
            t = e.lib,
            n = t.WordArray,
            r = t.Hasher,
            i = e.algo,
            a = [],
            s = i.SHA1 = r.extend({
              _doReset: function() {
                this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
              },
              _doProcessBlock: function(e, t) {
                for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], s = n[3], c = n[4], u = 0; u < 80; u++) {
                  if (u < 16) a[u] = 0 | e[t + u];
                  else {
                    var _ = a[u - 3] ^ a[u - 8] ^ a[u - 14] ^ a[u - 16];
                    a[u] = _ << 1 | _ >>> 31
                  }
                  var l = (r << 5 | r >>> 27) + c + a[u];
                  l += u < 20 ? 1518500249 + (o & i | ~o & s) : u < 40 ? 1859775393 + (o ^ i ^ s) : u < 60 ? (o & i | o & s | i & s) - 1894007588 : (o ^ i ^ s) - 899497514, c = s, s = i, i = o << 30 | o >>> 2, o = r, r = l
                }
                n[0] = n[0] + r | 0, n[1] = n[1] + o | 0, n[2] = n[2] + i | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0
              },
              _doFinalize: function() {
                var e = this._data,
                  t = e.words,
                  n = 8 * this._nDataBytes,
                  r = 8 * e.sigBytes;
                return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (r + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash
              },
              clone: function() {
                var e = r.clone.call(this);
                return e._hash = this._hash.clone(), e
              }
            });
          e.SHA1 = r._createHelper(s), e.HmacSHA1 = r._createHmacHelper(s)
        }()
        return o
      }()