//89824
const util = require('./util')
module.exports = function() {
                var e = util,
                  t = e.lib.Base,
                  n = e.enc.Utf8;
                e.algo.HMAC = t.extend({
                  init: function(e, t) {
                    e = this._hasher = new e.init, "string" == typeof t && (t = n.parse(t));
                    var r = e.blockSize,
                      o = 4 * r;
                    t.sigBytes > o && (t = e.finalize(t)), t.clamp();
                    for (var i = this._oKey = t.clone(), a = this._iKey = t.clone(), s = i.words, c = a.words, u = 0; u < r; u++) s[u] ^= 1549556828, c[u] ^= 909522486;
                    i.sigBytes = a.sigBytes = o, this.reset()
                  },
                  reset: function() {
                    var e = this._hasher;
                    e.reset(), e.update(this._iKey)
                  },
                  update: function(e) {
                    return this._hasher.update(e), this
                  },
                  finalize: function(e) {
                    var t = this._hasher,
                      n = t.finalize(e);
                    return t.reset(), t.finalize(this._oKey.clone().concat(n))
                  }
                })
                return e
              }()