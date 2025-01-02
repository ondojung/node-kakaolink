//78249
module.exports = function() {
            var e = function(e, t) {
              var r = require('crypto')
              var o = function() {
                  if (r) {
                    if ("function" === typeof r.getRandomValues) try {
                      return r.getRandomValues(new Uint32Array(1))[0]
                    } catch (v) {}
                    if ("function" === typeof r.randomBytes) try {
                      return r.randomBytes(4).readInt32LE()
                    } catch (v) {}
                  }
                  throw new Error("Native crypto module could not be used to get secure random number.")
                },
                i = Object.create || function() {
                  function e() {}
                  return function(t) {
                    var n;
                    return e.prototype = t, n = new e, e.prototype = null, n
                  }
                }(),
                a = {},
                s = a.lib = {},
                c = s.Base = {
                  extend: function(e) {
                    var t = i(this);
                    return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                      t.$super.init.apply(this, arguments)
                    }), t.init.prototype = t, t.$super = this, t
                  },
                  create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                  },
                  init: function() {},
                  mixIn: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                  },
                  clone: function() {
                    return this.init.prototype.extend(this)
                  }
                },
                u = s.WordArray = c.extend({
                  init: function(e, n) {
                    e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length
                  },
                  toString: function(e) {
                    return (e || l).stringify(this)
                  },
                  concat: function(e) {
                    var t = this.words,
                      n = e.words,
                      r = this.sigBytes,
                      o = e.sigBytes;
                    if (this.clamp(), r % 4)
                      for (var i = 0; i < o; i++) {
                        var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8
                      } else
                        for (var s = 0; s < o; s += 4) t[r + s >>> 2] = n[s >>> 2];
                    return this.sigBytes += o, this
                  },
                  clamp: function() {
                    var t = this.words,
                      n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                  },
                  clone: function() {
                    var e = c.clone.call(this);
                    return e.words = this.words.slice(0), e
                  },
                  random: function(e) {
                    for (var t = [], n = 0; n < e; n += 4) t.push(o());
                    return new u.init(t, e)
                  }
                }),
                _ = a.enc = {},
                l = _.Hex = {
                  stringify: function(e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                      var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                      r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
                    }
                    return r.join("")
                  },
                  parse: function(e) {
                    for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new u.init(n, t / 2)
                  }
                },
                p = _.Latin1 = {
                  stringify: function(e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                      var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                      r.push(String.fromCharCode(i))
                    }
                    return r.join("")
                  },
                  parse: function(e) {
                    for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                    return new u.init(n, t)
                  }
                },
                f = _.Utf8 = {
                  stringify: function(e) {
                    try {
                      return decodeURIComponent(escape(p.stringify(e)))
                    } catch (t) {
                      throw new Error("Malformed UTF-8 data")
                    }
                  },
                  parse: function(e) {
                    return p.parse(unescape(encodeURIComponent(e)))
                  }
                },
                d = s.BufferedBlockAlgorithm = c.extend({
                  reset: function() {
                    this._data = new u.init, this._nDataBytes = 0
                  },
                  _append: function(e) {
                    "string" == typeof e && (e = f.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                  },
                  _process: function(t) {
                    var n, r = this._data,
                      o = r.words,
                      i = r.sigBytes,
                      a = this.blockSize,
                      s = i / (4 * a),
                      c = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * a,
                      _ = e.min(4 * c, i);
                    if (c) {
                      for (var l = 0; l < c; l += a) this._doProcessBlock(o, l);
                      n = o.splice(0, c), r.sigBytes -= _
                    }
                    return new u.init(n, _)
                  },
                  clone: function() {
                    var e = c.clone.call(this);
                    return e._data = this._data.clone(), e
                  },
                  _minBufferSize: 0
                }),
                h = (s.Hasher = d.extend({
                  cfg: c.extend(),
                  init: function(e) {
                    this.cfg = this.cfg.extend(e), this.reset()
                  },
                  reset: function() {
                    d.reset.call(this), this._doReset()
                  },
                  update: function(e) {
                    return this._append(e), this._process(), this
                  },
                  finalize: function(e) {
                    return e && this._append(e), this._doFinalize()
                  },
                  blockSize: 16,
                  _createHelper: function(e) {
                    return function(t, n) {
                      return new e.init(n).finalize(t)
                    }
                  },
                  _createHmacHelper: function(e) {
                    return function(t, n) {
                      return new h.HMAC.init(e, n).finalize(t)
                    }
                  }
                }), a.algo = {});
              return a
            }(Math);
            return e
          }()