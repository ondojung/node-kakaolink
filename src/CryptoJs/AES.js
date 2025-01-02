const util = require('./util')//78249
const encBase64 = require('./encBase64') //98269
const MD5 = require('./MD5')//68214
const EvpKDF = require('./EvpKDF') //90888
const Cipher = require('./Cipher') //75109

module.exports = function() {
        var i = util
        ! function() {
              var e = i,
                t = e.lib.BlockCipher,
                n = e.algo,
                r = [],
                o = [],
                a = [],
                s = [],
                c = [],
                u = [],
                _ = [],
                l = [],
                p = [],
                f = [];
              ! function() {
                for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
                var n = 0,
                  i = 0;
                for (t = 0; t < 256; t++) {
                  var d = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
                  d = d >>> 8 ^ 255 & d ^ 99, r[n] = d, o[d] = n;
                  var h = e[n],
                    v = e[h],
                    g = e[v],
                    m = 257 * e[d] ^ 16843008 * d;
                  a[n] = m << 24 | m >>> 8, s[n] = m << 16 | m >>> 16, c[n] = m << 8 | m >>> 24, u[n] = m, m = 16843009 * g ^ 65537 * v ^ 257 * h ^ 16843008 * n, _[d] = m << 24 | m >>> 8, l[d] = m << 16 | m >>> 16, p[d] = m << 8 | m >>> 24, f[d] = m, n ? (n = h ^ e[e[e[g ^ h]]], i ^= e[e[i]]) : n = i = 1
                }
              }();
              
              var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                h = n.AES = t.extend({
                  _doReset: function() {
                    if (!this._nRounds || this._keyPriorReset !== this._key) {
                      for (var e = this._keyPriorReset = this._key, t = e.words, n = e.sigBytes / 4, o = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], a = 0; a < o; a++) a < n ? i[a] = t[a] : (u = i[a - 1], a % n ? n > 6 && a % n == 4 && (u = r[u >>> 24] << 24 | r[u >>> 16 & 255] << 16 | r[u >>> 8 & 255] << 8 | r[255 & u]) : (u = r[(u = u << 8 | u >>> 24) >>> 24] << 24 | r[u >>> 16 & 255] << 16 | r[u >>> 8 & 255] << 8 | r[255 & u], u ^= d[a / n | 0] << 24), i[a] = i[a - n] ^ u);
                      for (var s = this._invKeySchedule = [], c = 0; c < o; c++) {
                        if (a = o - c, c % 4) var u = i[a];
                        else u = i[a - 4];
                        s[c] = c < 4 || a <= 4 ? u : _[r[u >>> 24]] ^ l[r[u >>> 16 & 255]] ^ p[r[u >>> 8 & 255]] ^ f[r[255 & u]]
                      }
                    }
                  },
                  encryptBlock: function(e, t) {
                    this._doCryptBlock(e, t, this._keySchedule, a, s, c, u, r)
                  },
                  decryptBlock: function(e, t) {
                    var n = e[t + 1];
                    e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, _, l, p, f, o), n = e[t + 1], e[t + 1] = e[t + 3], e[t + 3] = n
                  },
                  _doCryptBlock: function(e, t, n, r, o, i, a, s) {
                    for (var c = this._nRounds, u = e[t] ^ n[0], _ = e[t + 1] ^ n[1], l = e[t + 2] ^ n[2], p = e[t + 3] ^ n[3], f = 4, d = 1; d < c; d++) {
                      var h = r[u >>> 24] ^ o[_ >>> 16 & 255] ^ i[l >>> 8 & 255] ^ a[255 & p] ^ n[f++],
                        v = r[_ >>> 24] ^ o[l >>> 16 & 255] ^ i[p >>> 8 & 255] ^ a[255 & u] ^ n[f++],
                        g = r[l >>> 24] ^ o[p >>> 16 & 255] ^ i[u >>> 8 & 255] ^ a[255 & _] ^ n[f++],
                        m = r[p >>> 24] ^ o[u >>> 16 & 255] ^ i[_ >>> 8 & 255] ^ a[255 & l] ^ n[f++];
                      u = h, _ = v, l = g, p = m
                    }
                    h = (s[u >>> 24] << 24 | s[_ >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & p]) ^ n[f++], v = (s[_ >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[p >>> 8 & 255] << 8 | s[255 & u]) ^ n[f++], g = (s[l >>> 24] << 24 | s[p >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & _]) ^ n[f++], m = (s[p >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[_ >>> 8 & 255] << 8 | s[255 & l]) ^ n[f++], e[t] = h, e[t + 1] = v, e[t + 2] = g, e[t + 3] = m
                  },
                  keySize: 8
                });
              e.AES = t._createHelper(h)
            }()
            return i
    }()