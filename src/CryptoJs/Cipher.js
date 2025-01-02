//75109
const util = require('./util')//78249
const EvpKDF = require('./EvpKDF') //90888

module.exports = function() {
            var i = util
            i.lib.Cipher || function(e) {
              var t = i,
                n = t.lib,
                r = n.Base,
                o = n.WordArray,
                a = n.BufferedBlockAlgorithm,
                s = t.enc,
                c = (s.Utf8, s.Base64),
                u = t.algo.EvpKDF,
                _ = n.Cipher = a.extend({
                  cfg: r.extend(),
                  createEncryptor: function(e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t)
                  },
                  createDecryptor: function(e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t)
                  },
                  init: function(e, t, n) {
                    this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset()
                  },
                  reset: function() {
                    a.reset.call(this), this._doReset()
                  },
                  process: function(e) {
                    return this._append(e), this._process()
                  },
                  finalize: function(e) {
                    return e && this._append(e), this._doFinalize()
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: function() {
                    function e(e) {
                      return "string" == typeof e ? y : g
                    }
                    return function(t) {
                      return {
                        encrypt: function(n, r, o) {
                          return e(r).encrypt(t, n, r, o)
                        },
                        decrypt: function(n, r, o) {
                          return e(r).decrypt(t, n, r, o)
                        }
                      }
                    }
                  }()
                }),
                l = (n.StreamCipher = _.extend({
                  _doFinalize: function() {
                    return this._process(!0)
                  },
                  blockSize: 1
                }), t.mode = {}),
                p = n.BlockCipherMode = r.extend({
                  createEncryptor: function(e, t) {
                    return this.Encryptor.create(e, t)
                  },
                  createDecryptor: function(e, t) {
                    return this.Decryptor.create(e, t)
                  },
                  init: function(e, t) {
                    this._cipher = e, this._iv = t
                  }
                }),
                f = l.CBC = function() {
                  var t = p.extend();
    
                  function n(t, n, r) {
                    var o, i = this._iv;
                    i ? (o = i, this._iv = e) : o = this._prevBlock;
                    for (var a = 0; a < r; a++) t[n + a] ^= o[a]
                  }
                  return t.Encryptor = t.extend({
                    processBlock: function(e, t) {
                      var r = this._cipher,
                        o = r.blockSize;
                      n.call(this, e, t, o), r.encryptBlock(e, t), this._prevBlock = e.slice(t, t + o)
                    }
                  }), t.Decryptor = t.extend({
                    processBlock: function(e, t) {
                      var r = this._cipher,
                        o = r.blockSize,
                        i = e.slice(t, t + o);
                      r.decryptBlock(e, t), n.call(this, e, t, o), this._prevBlock = i
                    }
                  }), t
                }(),
                d = (t.pad = {}).Pkcs7 = {
                  pad: function(e, t) {
                    for (var n = 4 * t, r = n - e.sigBytes % n, i = r << 24 | r << 16 | r << 8 | r, a = [], s = 0; s < r; s += 4) a.push(i);
                    var c = o.create(a, r);
                    e.concat(c)
                  },
                  unpad: function(e) {
                    var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                    e.sigBytes -= t
                  }
                },
                h = (n.BlockCipher = _.extend({
                  cfg: _.cfg.extend({
                    mode: f,
                    padding: d
                  }),
                  reset: function() {
                    var e;
                    _.reset.call(this);
                    var t = this.cfg,
                      n = t.iv,
                      r = t.mode;
                    this._xformMode == this._ENC_XFORM_MODE ? e = r.createEncryptor : (e = r.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e ? this._mode.init(this, n && n.words) : (this._mode = e.call(r, this, n && n.words), this._mode.__creator = e)
                  },
                  _doProcessBlock: function(e, t) {
                    this._mode.processBlock(e, t)
                  },
                  _doFinalize: function() {
                    var e, t = this.cfg.padding;
                    return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize), e = this._process(!0)) : (e = this._process(!0), t.unpad(e)), e
                  },
                  blockSize: 4
                }), n.CipherParams = r.extend({
                  init: function(e) {
                    this.mixIn(e)
                  },
                  toString: function(e) {
                    return (e || this.formatter).stringify(this)
                  }
                })),
                v = (t.format = {}).OpenSSL = {
                  stringify: function(e) {
                    var t = e.ciphertext,
                      n = e.salt;
                    return (n ? o.create([1398893684, 1701076831]).concat(n).concat(t) : t).toString(c)
                  },
                  parse: function(e) {
                    var t, n = c.parse(e),
                      r = n.words;
                    return 1398893684 == r[0] && 1701076831 == r[1] && (t = o.create(r.slice(2, 4)), r.splice(0, 4), n.sigBytes -= 16), h.create({
                      ciphertext: n,
                      salt: t
                    })
                  }
                },
                g = n.SerializableCipher = r.extend({
                  cfg: r.extend({
                    format: v
                  }),
                  encrypt: function(e, t, n, r) {
                    r = this.cfg.extend(r);
                    var o = e.createEncryptor(n, r),
                      i = o.finalize(t),
                      a = o.cfg;
                    return h.create({
                      ciphertext: i,
                      key: n,
                      iv: a.iv,
                      algorithm: e,
                      mode: a.mode,
                      padding: a.padding,
                      blockSize: e.blockSize,
                      formatter: r.format
                    })
                  },
                  decrypt: function(e, t, n, r) {
                    return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(n, r).finalize(t.ciphertext)
                  },
                  _parse: function(e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e
                  }
                }),
                m = (t.kdf = {}).OpenSSL = {
                  execute: function(e, t, n, r) {
                    r || (r = o.random(8));
                    var i = u.create({
                        keySize: t + n
                      }).compute(e, r),
                      a = o.create(i.words.slice(t), 4 * n);
                    return i.sigBytes = 4 * t, h.create({
                      key: i,
                      iv: a,
                      salt: r
                    })
                  }
                },
                y = n.PasswordBasedCipher = g.extend({
                  cfg: g.cfg.extend({
                    kdf: m
                  }),
                  encrypt: function(e, t, n, r) {
                    var o = (r = this.cfg.extend(r)).kdf.execute(n, e.keySize, e.ivSize);
                    r.iv = o.iv;
                    var i = g.encrypt.call(this, e, t, o.key, r);
                    return i.mixIn(o), i
                  },
                  decrypt: function(e, t, n, r) {
                    r = this.cfg.extend(r), t = this._parse(t, r.format);
                    var o = r.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                    return r.iv = o.iv, g.decrypt.call(this, e, t, o.key, r)
                  }
                })
            }()
            return i
          }()