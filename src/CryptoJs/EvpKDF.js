//90888
const util = require('./util')//78249
const SHA1 = require('./SHA1')//62783
const HMAC = require('./HMAC')//89824

module.exports = function() {
            var i = util
        ! function() {
              var e = i,
                t = e.lib,
                n = t.Base,
                r = t.WordArray,
                o = e.algo,
                a = o.MD5,

                s = o.EvpKDF = n.extend({
                  cfg: n.extend({
                    keySize: 4,
                    hasher: a,
                    iterations: 1
                  }),
                  init: function(e) {
                    this.cfg = this.cfg.extend(e)
                  },
                  compute: function(e, t) {
                    for (var n, o = this.cfg, i = o.hasher.create(), a = r.create(), s = a.words, c = o.keySize, u = o.iterations; s.length < c;) {
                      n && i.update(n), n = i.update(e).finalize(t), i.reset();
                      for (var _ = 1; _ < u; _++) n = i.finalize(n), i.reset();
                      a.concat(n)
                    }
                    return a.sigBytes = 4 * c, a
                  }
                });
              e.EvpKDF = function(e, t, n) {
                return s.create(n).compute(e, t)
              }
            }()
            
            return i
          }()