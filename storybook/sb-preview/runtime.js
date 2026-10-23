var il = Object.create;
var ot = Object.defineProperty;
var al = Object.getOwnPropertyDescriptor;
var ll = Object.getOwnPropertyNames;
var cl = Object.getPrototypeOf, pl = Object.prototype.hasOwnProperty;
var n = (r, e) => ot(r, "name", { value: e, configurable: !0 }), dr = /* @__PURE__ */ ((r) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(r, {
  get: (e, t) => (typeof require < "u" ? require : e)[t]
}) : r)(function(r) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + r + '" is not supported');
});
var q = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), Ce = (r, e) => {
  for (var t in e)
    ot(r, t, { get: e[t], enumerable: !0 });
}, dl = (r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of ll(e))
      !pl.call(r, s) && s !== t && ot(r, s, { get: () => e[s], enumerable: !(o = al(e, s)) || o.enumerable });
  return r;
};
var ue = (r, e, t) => (t = r != null ? il(cl(r)) : {}, dl(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !r || !r.__esModule ? ot(t, "default", { value: r, enumerable: !0 }) : t,
  r
));

// ../node_modules/memoizerific/memoizerific.js
var ct = q((gs, Ro) => {
  (function(r) {
    if (typeof gs == "object" && typeof Ro < "u")
      Ro.exports = r();
    else if (typeof define == "function" && define.amd)
      define([], r);
    else {
      var e;
      typeof window < "u" ? e = window : typeof global < "u" ? e = global : typeof self < "u" ? e = self : e = this, e.memoizerific = r();
    }
  })(function() {
    var r, e, t;
    return (/* @__PURE__ */ n(function o(s, i, a) {
      function c(u, d) {
        if (!i[u]) {
          if (!s[u]) {
            var h = typeof dr == "function" && dr;
            if (!d && h) return h(u, !0);
            if (l) return l(u, !0);
            var S = new Error("Cannot find module '" + u + "'");
            throw S.code = "MODULE_NOT_FOUND", S;
          }
          var m = i[u] = { exports: {} };
          s[u][0].call(m.exports, function(T) {
            var y = s[u][1][T];
            return c(y || T);
          }, m, m.exports, o, s, i, a);
        }
        return i[u].exports;
      }
      n(c, "s");
      for (var l = typeof dr == "function" && dr, p = 0; p < a.length; p++) c(a[p]);
      return c;
    }, "e"))({ 1: [function(o, s, i) {
      s.exports = function(a) {
        if (typeof Map != "function" || a) {
          var c = o("./similar");
          return new c();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, s, i) {
      function a() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      n(a, "Similar"), a.prototype.get = function(c) {
        var l;
        if (this.lastItem && this.isEqual(this.lastItem.key, c))
          return this.lastItem.val;
        if (l = this.indexOf(c), l >= 0)
          return this.lastItem = this.list[l], this.list[l].val;
      }, a.prototype.set = function(c, l) {
        var p;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? (this.lastItem.val = l, this) : (p = this.indexOf(c), p >= 0 ? (this.lastItem =
        this.list[p], this.list[p].val = l, this) : (this.lastItem = { key: c, val: l }, this.list.push(this.lastItem), this.size++, this));
      }, a.prototype.delete = function(c) {
        var l;
        if (this.lastItem && this.isEqual(this.lastItem.key, c) && (this.lastItem = void 0), l = this.indexOf(c), l >= 0)
          return this.size--, this.list.splice(l, 1)[0];
      }, a.prototype.has = function(c) {
        var l;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? !0 : (l = this.indexOf(c), l >= 0 ? (this.lastItem = this.list[l], !0) :
        !1);
      }, a.prototype.forEach = function(c, l) {
        var p;
        for (p = 0; p < this.size; p++)
          c.call(l || this, this.list[p].val, this.list[p].key, this);
      }, a.prototype.indexOf = function(c) {
        var l;
        for (l = 0; l < this.size; l++)
          if (this.isEqual(this.list[l].key, c))
            return l;
        return -1;
      }, a.prototype.isEqual = function(c, l) {
        return c === l || c !== c && l !== l;
      }, s.exports = a;
    }, {}], 3: [function(o, s, i) {
      var a = o("map-or-similar");
      s.exports = function(u) {
        var d = new a(!1), h = [];
        return function(S) {
          var m = /* @__PURE__ */ n(function() {
            var T = d, y, R, x = arguments.length - 1, g = Array(x + 1), b = !0, v;
            if ((m.numArgs || m.numArgs === 0) && m.numArgs !== x + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (v = 0; v < x; v++) {
              if (g[v] = {
                cacheItem: T,
                arg: arguments[v]
              }, T.has(arguments[v])) {
                T = T.get(arguments[v]);
                continue;
              }
              b = !1, y = new a(!1), T.set(arguments[v], y), T = y;
            }
            return b && (T.has(arguments[x]) ? R = T.get(arguments[x]) : b = !1), b || (R = S.apply(null, arguments), T.set(arguments[x], R)),
            u > 0 && (g[x] = {
              cacheItem: T,
              arg: arguments[x]
            }, b ? c(h, g) : h.push(g), h.length > u && l(h.shift())), m.wasMemoized = b, m.numArgs = x + 1, R;
          }, "memoizerific");
          return m.limit = u, m.wasMemoized = !1, m.cache = d, m.lru = h, m;
        };
      };
      function c(u, d) {
        var h = u.length, S = d.length, m, T, y;
        for (T = 0; T < h; T++) {
          for (m = !0, y = 0; y < S; y++)
            if (!p(u[T][y].arg, d[y].arg)) {
              m = !1;
              break;
            }
          if (m)
            break;
        }
        u.push(u.splice(T, 1)[0]);
      }
      n(c, "moveToMostRecentLru");
      function l(u) {
        var d = u.length, h = u[d - 1], S, m;
        for (h.cacheItem.delete(h.arg), m = d - 2; m >= 0 && (h = u[m], S = h.cacheItem.get(h.arg), !S || !S.size); m--)
          h.cacheItem.delete(h.arg);
      }
      n(l, "removeCachedResult");
      function p(u, d) {
        return u === d || u !== u && d !== d;
      }
      n(p, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/@ngard/tiny-isequal/index.js
var Oi = q((An) => {
  Object.defineProperty(An, "__esModule", { value: !0 }), An.isEqual = /* @__PURE__ */ function() {
    var r = Object.prototype.toString, e = Object.getPrototypeOf, t = Object.getOwnPropertySymbols ? function(o) {
      return Object.keys(o).concat(Object.getOwnPropertySymbols(o));
    } : Object.keys;
    return function(o, s) {
      return (/* @__PURE__ */ n(function i(a, c, l) {
        var p, u, d, h = r.call(a), S = r.call(c);
        if (a === c) return !0;
        if (a == null || c == null) return !1;
        if (l.indexOf(a) > -1 && l.indexOf(c) > -1) return !0;
        if (l.push(a, c), h != S || (p = t(a), u = t(c), p.length != u.length || p.some(function(m) {
          return !i(a[m], c[m], l);
        }))) return !1;
        switch (h.slice(8, -1)) {
          case "Symbol":
            return a.valueOf() == c.valueOf();
          case "Date":
          case "Number":
            return +a == +c || +a != +a && +c != +c;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + a == "" + c;
          case "Set":
          case "Map":
            p = a.entries(), u = c.entries();
            do
              if (!i((d = p.next()).value, u.next().value, l)) return !1;
            while (!d.done);
            return !0;
          case "ArrayBuffer":
            a = new Uint8Array(a), c = new Uint8Array(c);
          case "DataView":
            a = new Uint8Array(a.buffer), c = new Uint8Array(c.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (a.length != c.length) return !1;
            for (d = 0; d < a.length; d++) if ((d in a || d in c) && (d in a != d in c || !i(a[d], c[d], l))) return !1;
            return !0;
          case "Object":
            return i(e(a), e(c), l);
          default:
            return !1;
        }
      }, "n"))(o, s, []);
    };
  }();
});

// ../node_modules/picoquery/lib/string-util.js
var Hn = q((Vn) => {
  "use strict";
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  Vn.encodeString = Au;
  var le = Array.from({ length: 256 }, (r, e) => "%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase()), Ru = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function Au(r) {
    let e = r.length;
    if (e === 0)
      return "";
    let t = "", o = 0, s = 0;
    e: for (; s < e; s++) {
      let i = r.charCodeAt(s);
      for (; i < 128; ) {
        if (Ru[i] !== 1 && (o < s && (t += r.slice(o, s)), o = s + 1, t += le[i]), ++s === e)
          break e;
        i = r.charCodeAt(s);
      }
      if (o < s && (t += r.slice(o, s)), i < 2048) {
        o = s + 1, t += le[192 | i >> 6] + le[128 | i & 63];
        continue;
      }
      if (i < 55296 || i >= 57344) {
        o = s + 1, t += le[224 | i >> 12] + le[128 | i >> 6 & 63] + le[128 | i & 63];
        continue;
      }
      if (++s, s >= e)
        throw new Error("URI malformed");
      let a = r.charCodeAt(s) & 1023;
      o = s + 1, i = 65536 + ((i & 1023) << 10 | a), t += le[240 | i >> 18] + le[128 | i >> 12 & 63] + le[128 | i >> 6 & 63] + le[128 | i & 63];
    }
    return o === 0 ? r : o < e ? t + r.slice(o) : t;
  }
  n(Au, "encodeString");
});

// ../node_modules/picoquery/lib/shared.js
var kt = q((ce) => {
  "use strict";
  Object.defineProperty(ce, "__esModule", { value: !0 });
  ce.defaultOptions = ce.defaultShouldSerializeObject = ce.defaultValueSerializer = void 0;
  var Wn = Hn(), xu = /* @__PURE__ */ n((r) => {
    switch (typeof r) {
      case "string":
        return (0, Wn.encodeString)(r);
      case "bigint":
      case "boolean":
        return "" + r;
      case "number":
        if (Number.isFinite(r))
          return r < 1e21 ? "" + r : (0, Wn.encodeString)("" + r);
        break;
    }
    return r instanceof Date ? (0, Wn.encodeString)(r.toISOString()) : "";
  }, "defaultValueSerializer");
  ce.defaultValueSerializer = xu;
  var vu = /* @__PURE__ */ n((r) => r instanceof Date, "defaultShouldSerializeObject");
  ce.defaultShouldSerializeObject = vu;
  var oa = /* @__PURE__ */ n((r) => r, "identityFunc");
  ce.defaultOptions = {
    nesting: !0,
    nestingSyntax: "dot",
    arrayRepeat: !1,
    arrayRepeatSyntax: "repeat",
    delimiter: 38,
    valueDeserializer: oa,
    valueSerializer: ce.defaultValueSerializer,
    keyDeserializer: oa,
    shouldSerializeObject: ce.defaultShouldSerializeObject
  };
});

// ../node_modules/picoquery/lib/object-util.js
var zn = q((Lt) => {
  "use strict";
  Object.defineProperty(Lt, "__esModule", { value: !0 });
  Lt.getDeepObject = Cu;
  Lt.stringifyObject = na;
  var Be = kt(), wu = Hn();
  function _u(r) {
    return r === "__proto__" || r === "constructor" || r === "prototype";
  }
  n(_u, "isPrototypeKey");
  function Cu(r, e, t, o, s) {
    if (_u(e))
      return r;
    let i = r[e];
    return typeof i == "object" && i !== null ? i : !o && (s || typeof t == "number" || typeof t == "string" && t * 0 === 0 && t.indexOf(".") ===
    -1) ? r[e] = [] : r[e] = {};
  }
  n(Cu, "getDeepObject");
  var Pu = 20, Ou = "[]", Iu = "[", Fu = "]", Nu = ".";
  function na(r, e, t = 0, o, s) {
    let { nestingSyntax: i = Be.defaultOptions.nestingSyntax, arrayRepeat: a = Be.defaultOptions.arrayRepeat, arrayRepeatSyntax: c = Be.defaultOptions.
    arrayRepeatSyntax, nesting: l = Be.defaultOptions.nesting, delimiter: p = Be.defaultOptions.delimiter, valueSerializer: u = Be.defaultOptions.
    valueSerializer, shouldSerializeObject: d = Be.defaultOptions.shouldSerializeObject } = e, h = typeof p == "number" ? String.fromCharCode(
    p) : p, S = s === !0 && a, m = i === "dot" || i === "js" && !s;
    if (t > Pu)
      return "";
    let T = "", y = !0, R = !1;
    for (let x in r) {
      let g = r[x], b;
      o ? (b = o, S ? c === "bracket" && (b += Ou) : m ? (b += Nu, b += x) : (b += Iu, b += x, b += Fu)) : b = x, y || (T += h), typeof g ==
      "object" && g !== null && !d(g) ? (R = g.pop !== void 0, (l || a && R) && (T += na(g, e, t + 1, b, R))) : (T += (0, wu.encodeString)(b),
      T += "=", T += u(g, x)), y && (y = !1);
    }
    return T;
  }
  n(na, "stringifyObject");
});

// ../node_modules/fast-decode-uri-component/index.js
var la = q((oT, aa) => {
  "use strict";
  var sa = 12, Du = 0, $n = [
    // The first part of the table maps bytes to character to a transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    // The second part of the table maps a state to a new state when adding a
    // transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // The third part maps the current transition to a mask that needs to apply
    // to the byte.
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function ku(r) {
    var e = r.indexOf("%");
    if (e === -1) return r;
    for (var t = r.length, o = "", s = 0, i = 0, a = e, c = sa; e > -1 && e < t; ) {
      var l = ia(r[e + 1], 4), p = ia(r[e + 2], 0), u = l | p, d = $n[u];
      if (c = $n[256 + c + d], i = i << 6 | u & $n[364 + d], c === sa)
        o += r.slice(s, a), o += i <= 65535 ? String.fromCharCode(i) : String.fromCharCode(
          55232 + (i >> 10),
          56320 + (i & 1023)
        ), i = 0, s = e + 3, e = a = r.indexOf("%", s);
      else {
        if (c === Du)
          return null;
        if (e += 3, e < t && r.charCodeAt(e) === 37) continue;
        return null;
      }
    }
    return o + r.slice(s);
  }
  n(ku, "decodeURIComponent");
  var Lu = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function ia(r, e) {
    var t = Lu[r];
    return t === void 0 ? 255 : t << e;
  }
  n(ia, "hexCodeToInt");
  aa.exports = ku;
});

// ../node_modules/picoquery/lib/parse.js
var ua = q((he) => {
  "use strict";
  var Mu = he && he.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(he, "__esModule", { value: !0 });
  he.numberValueDeserializer = he.numberKeyDeserializer = void 0;
  he.parse = Gu;
  var Mt = zn(), Ve = kt(), ca = Mu(la()), ju = /* @__PURE__ */ n((r) => {
    let e = Number(r);
    return Number.isNaN(e) ? r : e;
  }, "numberKeyDeserializer");
  he.numberKeyDeserializer = ju;
  var Uu = /* @__PURE__ */ n((r) => {
    let e = Number(r);
    return Number.isNaN(e) ? r : e;
  }, "numberValueDeserializer");
  he.numberValueDeserializer = Uu;
  var pa = /\+/g, da = /* @__PURE__ */ n(function() {
  }, "Empty");
  da.prototype = /* @__PURE__ */ Object.create(null);
  function jt(r, e, t, o, s) {
    let i = r.substring(e, t);
    return o && (i = i.replace(pa, " ")), s && (i = (0, ca.default)(i) || i), i;
  }
  n(jt, "computeKeySlice");
  function Gu(r, e) {
    let { valueDeserializer: t = Ve.defaultOptions.valueDeserializer, keyDeserializer: o = Ve.defaultOptions.keyDeserializer, arrayRepeatSyntax: s = Ve.
    defaultOptions.arrayRepeatSyntax, nesting: i = Ve.defaultOptions.nesting, arrayRepeat: a = Ve.defaultOptions.arrayRepeat, nestingSyntax: c = Ve.
    defaultOptions.nestingSyntax, delimiter: l = Ve.defaultOptions.delimiter } = e ?? {}, p = typeof l == "string" ? l.charCodeAt(0) : l, u = c ===
    "js", d = new da();
    if (typeof r != "string")
      return d;
    let h = r.length, S = "", m = -1, T = -1, y = -1, R = d, x, g = "", b = "", v = !1, C = !1, F = !1, G = !1, B = !1, z = !1, se = !1, P = 0,
    N = -1, j = -1, L = -1;
    for (let D = 0; D < h + 1; D++) {
      if (P = D !== h ? r.charCodeAt(D) : p, P === p) {
        if (se = T > m, se || (T = D), y !== T - 1 && (b = jt(r, y + 1, N > -1 ? N : T, F, v), g = o(b), x !== void 0 && (R = (0, Mt.getDeepObject)(
        R, x, g, u && B, u && z))), se || g !== "") {
          se && (S = r.slice(T + 1, D), G && (S = S.replace(pa, " ")), C && (S = (0, ca.default)(S) || S));
          let H = t(S, g);
          if (a) {
            let re = R[g];
            re === void 0 ? N > -1 ? R[g] = [H] : R[g] = H : re.pop ? re.push(H) : R[g] = [re, H];
          } else
            R[g] = H;
        }
        S = "", m = D, T = D, v = !1, C = !1, F = !1, G = !1, B = !1, z = !1, N = -1, y = D, R = d, x = void 0, g = "";
      } else P === 93 ? (a && s === "bracket" && L === 91 && (N = j), i && (c === "index" || u) && T <= m && (y !== j && (b = jt(r, y + 1, D,
      F, v), g = o(b), x !== void 0 && (R = (0, Mt.getDeepObject)(R, x, g, void 0, u)), x = g, F = !1, v = !1), y = D, z = !0, B = !1)) : P ===
      46 ? i && (c === "dot" || u) && T <= m && (y !== j && (b = jt(r, y + 1, D, F, v), g = o(b), x !== void 0 && (R = (0, Mt.getDeepObject)(
      R, x, g, u)), x = g, F = !1, v = !1), B = !0, z = !1, y = D) : P === 91 ? i && (c === "index" || u) && T <= m && (y !== j && (b = jt(r,
      y + 1, D, F, v), g = o(b), u && x !== void 0 && (R = (0, Mt.getDeepObject)(R, x, g, u)), x = g, F = !1, v = !1, B = !1, z = !0), y = D) :
      P === 61 ? T <= m ? T = D : C = !0 : P === 43 ? T > m ? G = !0 : F = !0 : P === 37 && (T > m ? C = !0 : v = !0);
      j = D, L = P;
    }
    return d;
  }
  n(Gu, "parse");
});

// ../node_modules/picoquery/lib/stringify.js
var fa = q((Yn) => {
  "use strict";
  Object.defineProperty(Yn, "__esModule", { value: !0 });
  Yn.stringify = Bu;
  var qu = zn();
  function Bu(r, e) {
    if (r === null || typeof r != "object")
      return "";
    let t = e ?? {};
    return (0, qu.stringifyObject)(r, t);
  }
  n(Bu, "stringify");
});

// ../node_modules/picoquery/lib/main.js
var Ut = q((ne) => {
  "use strict";
  var Vu = ne && ne.__createBinding || (Object.create ? function(r, e, t, o) {
    o === void 0 && (o = t);
    var s = Object.getOwnPropertyDescriptor(e, t);
    (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: /* @__PURE__ */ n(function() {
      return e[t];
    }, "get") }), Object.defineProperty(r, o, s);
  } : function(r, e, t, o) {
    o === void 0 && (o = t), r[o] = e[t];
  }), Hu = ne && ne.__exportStar || function(r, e) {
    for (var t in r) t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && Vu(e, r, t);
  };
  Object.defineProperty(ne, "__esModule", { value: !0 });
  ne.stringify = ne.parse = void 0;
  var Wu = ua();
  Object.defineProperty(ne, "parse", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Wu.parse;
  }, "get") });
  var zu = fa();
  Object.defineProperty(ne, "stringify", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return zu.stringify;
  }, "get") });
  Hu(kt(), ne);
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/entities.json
var Qn = q((TT, Zu) => {
  Zu.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\
\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}",
  Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\
\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220",
  ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\
\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222",
  angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\
\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5",
  Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\
\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D",
  backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\
\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\
\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\
\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\
\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\
\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\
\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\
\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\
\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554",
  boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\
\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\
\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A",
  boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\
\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F",
  bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\
\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\
\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041",
  caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\
\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2",
  cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\
\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\
\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\
\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\
\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\
\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102",
  cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\
\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\
\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2",
  ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48",
  cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00",
  curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4",
  curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D",
  dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\
\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA",
  DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\
\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\
\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4",
  diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7",
  divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}",
  dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238",
  dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\
\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\
\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\
\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957",
  DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}",
  dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\
\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9",
  easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\
\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}",
  eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\
\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB",
  emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\
\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5",
  Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\
\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\
\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\
\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130",
  exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03",
  fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\
\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200",
  ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC",
  frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C",
  frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131",
  gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F",
  Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267",
  gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\
\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9",
  gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A",
  gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\
\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A",
  gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7",
  gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7",
  hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\
\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9",
  hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\
\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\
\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010",
  Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\
\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\
\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\
\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\
\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124",
  Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\
\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9",
  iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\
\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\
\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}",
  Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA",
  kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\
\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\
\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\
\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190",
  Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2",
  latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772",
  lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\
\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\
\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190",
  Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\
\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\
\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\
\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960",
  LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264",
  leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00",
  lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\
\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\
\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC",
  lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\
\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\
\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\
\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\
\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\
\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\
\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\
\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0",
  Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\
\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976",
  ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\
\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\
\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\
\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127",
  micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\
\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\
\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207",
  Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\
\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43",
  Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D",
  ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338",
  NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262",
  nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F",
  nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\
\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\
\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338",
  nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338",
  nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\
\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\
\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\
\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\
\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\
\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338",
  notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\
\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\
\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\
\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\
\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\
\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1",
  nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244",
  nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288",
  nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\
\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\
\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D",
  nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\
\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6",
  nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E",
  ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\
\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5",
  ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\
\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\
\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\
\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\
\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\
\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE",
  OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\
\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\
\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\
\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "\
+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1",
  Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A",
  prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\
\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3",
  precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\
\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\
\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}",
  qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\
\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\
\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB",
  rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\
\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\
\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]",
  rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309",
  rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C",
  realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\
\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1",
  rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\
\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\
\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\
\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\
\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953",
  RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\
\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E",
  rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\
\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\
\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\
\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D",
  sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\
\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925",
  searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\
\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448",
  ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\
\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243",
  simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\
\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA",
  smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\
\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00",
  Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\
\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\
\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\
\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\
\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\
\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\
\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\
\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\
\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\
\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE",
  supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\
\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\
\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926",
  swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4",
  tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\
\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\
\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\
\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\
\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1",
  top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122",
  triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9",
  trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\
\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\
\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\
\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB",
  ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\
\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C",
  ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF",
  UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}",
  uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\
\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E",
  UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5",
  UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\
\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\
\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\
\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\
\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\
\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\
\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE",
  verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\
\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\
\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\
\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\
\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD",
  Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\
\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\
\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\
\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}",
  yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E",
  yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\
\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\
\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D",
  zwnj: "\u200C" };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/legacy.json
var Ta = q((ET, ef) => {
  ef.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\
\xE0", amp: "&", AMP: "&", Aring: "\xC5", aring: "\xE5", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", brvbar: "\xA6", Ccedil: "\
\xC7", ccedil: "\xE7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", Eacute: "\xC9",
  eacute: "\xE9", Ecirc: "\xCA", ecirc: "\xEA", Egrave: "\xC8", egrave: "\xE8", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", frac12: "\
\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", Iacute: "\xCD", iacute: "\xED", Icirc: "\xCE", icirc: "\xEE", iexcl: "\xA1", Igrave: "\
\xCC", igrave: "\xEC", iquest: "\xBF", Iuml: "\xCF", iuml: "\xEF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7",
  nbsp: "\xA0", not: "\xAC", Ntilde: "\xD1", ntilde: "\xF1", Oacute: "\xD3", oacute: "\xF3", Ocirc: "\xD4", ocirc: "\xF4", Ograve: "\xD2", ograve: "\
\xF2", ordf: "\xAA", ordm: "\xBA", Oslash: "\xD8", oslash: "\xF8", Otilde: "\xD5", otilde: "\xF5", Ouml: "\xD6", ouml: "\xF6", para: "\xB6",
  plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\
\xB2", sup3: "\xB3", szlig: "\xDF", THORN: "\xDE", thorn: "\xFE", times: "\xD7", Uacute: "\xDA", uacute: "\xFA", Ucirc: "\xDB", ucirc: "\xFB",
  Ugrave: "\xD9", ugrave: "\xF9", uml: "\xA8", Uuml: "\xDC", uuml: "\xFC", Yacute: "\xDD", yacute: "\xFD", yen: "\xA5", yuml: "\xFF" };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/xml.json
var Zn = q((RT, rf) => {
  rf.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/decode.json
var Ea = q((AT, tf) => {
  tf.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240,
  "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212,
  "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/decode_codepoint.js
var Aa = q((Yr) => {
  "use strict";
  var of = Yr && Yr.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Yr, "__esModule", { value: !0 });
  var Ra = of(Ea()), nf = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(r) {
      var e = "";
      return r > 65535 && (r -= 65536, e += String.fromCharCode(r >>> 10 & 1023 | 55296), r = 56320 | r & 1023), e += String.fromCharCode(r),
      e;
    }
  );
  function sf(r) {
    return r >= 55296 && r <= 57343 || r > 1114111 ? "\uFFFD" : (r in Ra.default && (r = Ra.default[r]), nf(r));
  }
  n(sf, "decodeCodePoint");
  Yr.default = sf;
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/decode.js
var rs = q((pe) => {
  "use strict";
  var Gt = pe && pe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(pe, "__esModule", { value: !0 });
  pe.decodeHTML = pe.decodeHTMLStrict = pe.decodeXML = void 0;
  var es = Gt(Qn()), af = Gt(Ta()), lf = Gt(Zn()), xa = Gt(Aa()), cf = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  pe.decodeXML = wa(lf.default);
  pe.decodeHTMLStrict = wa(es.default);
  function wa(r) {
    var e = _a(r);
    return function(t) {
      return String(t).replace(cf, e);
    };
  }
  n(wa, "getStrictDecoder");
  var va = /* @__PURE__ */ n(function(r, e) {
    return r < e ? 1 : -1;
  }, "sorter");
  pe.decodeHTML = function() {
    for (var r = Object.keys(af.default).sort(va), e = Object.keys(es.default).sort(va), t = 0, o = 0; t < e.length; t++)
      r[o] === e[t] ? (e[t] += ";?", o++) : e[t] += ";";
    var s = new RegExp("&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), i = _a(es.default);
    function a(c) {
      return c.substr(-1) !== ";" && (c += ";"), i(c);
    }
    return n(a, "replacer"), function(c) {
      return String(c).replace(s, a);
    };
  }();
  function _a(r) {
    return /* @__PURE__ */ n(function(t) {
      if (t.charAt(1) === "#") {
        var o = t.charAt(2);
        return o === "X" || o === "x" ? xa.default(parseInt(t.substr(3), 16)) : xa.default(parseInt(t.substr(2), 10));
      }
      return r[t.slice(1, -1)] || t;
    }, "replace");
  }
  n(_a, "getReplacer");
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/encode.js
var os = q((J) => {
  "use strict";
  var Ca = J && J.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(J, "__esModule", { value: !0 });
  J.escapeUTF8 = J.escape = J.encodeNonAsciiHTML = J.encodeHTML = J.encodeXML = void 0;
  var pf = Ca(Zn()), Pa = Ia(pf.default), Oa = Fa(Pa);
  J.encodeXML = ka(Pa);
  var df = Ca(Qn()), ts = Ia(df.default), uf = Fa(ts);
  J.encodeHTML = yf(ts, uf);
  J.encodeNonAsciiHTML = ka(ts);
  function Ia(r) {
    return Object.keys(r).sort().reduce(function(e, t) {
      return e[r[t]] = "&" + t + ";", e;
    }, {});
  }
  n(Ia, "getInverseObj");
  function Fa(r) {
    for (var e = [], t = [], o = 0, s = Object.keys(r); o < s.length; o++) {
      var i = s[o];
      i.length === 1 ? e.push("\\" + i) : t.push(i);
    }
    e.sort();
    for (var a = 0; a < e.length - 1; a++) {
      for (var c = a; c < e.length - 1 && e[c].charCodeAt(1) + 1 === e[c + 1].charCodeAt(1); )
        c += 1;
      var l = 1 + c - a;
      l < 3 || e.splice(a, l, e[a] + "-" + e[c]);
    }
    return t.unshift("[" + e.join("") + "]"), new RegExp(t.join("|"), "g");
  }
  n(Fa, "getInverseReplacer");
  var Na = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  ff = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(r) {
        return r.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(r) {
        return (r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function qt(r) {
    return "&#x" + (r.length > 1 ? ff(r) : r.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  n(qt, "singleCharReplacer");
  function yf(r, e) {
    return function(t) {
      return t.replace(e, function(o) {
        return r[o];
      }).replace(Na, qt);
    };
  }
  n(yf, "getInverse");
  var Da = new RegExp(Oa.source + "|" + Na.source, "g");
  function mf(r) {
    return r.replace(Da, qt);
  }
  n(mf, "escape");
  J.escape = mf;
  function hf(r) {
    return r.replace(Oa, qt);
  }
  n(hf, "escapeUTF8");
  J.escapeUTF8 = hf;
  function ka(r) {
    return function(e) {
      return e.replace(Da, function(t) {
        return r[t] || qt(t);
      });
    };
  }
  n(ka, "getASCIIEncoder");
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/index.js
var Ma = q((O) => {
  "use strict";
  Object.defineProperty(O, "__esModule", { value: !0 });
  O.decodeXMLStrict = O.decodeHTML5Strict = O.decodeHTML4Strict = O.decodeHTML5 = O.decodeHTML4 = O.decodeHTMLStrict = O.decodeHTML = O.decodeXML =
  O.encodeHTML5 = O.encodeHTML4 = O.escapeUTF8 = O.escape = O.encodeNonAsciiHTML = O.encodeHTML = O.encodeXML = O.encode = O.decodeStrict = O.
  decode = void 0;
  var Bt = rs(), La = os();
  function gf(r, e) {
    return (!e || e <= 0 ? Bt.decodeXML : Bt.decodeHTML)(r);
  }
  n(gf, "decode");
  O.decode = gf;
  function Sf(r, e) {
    return (!e || e <= 0 ? Bt.decodeXML : Bt.decodeHTMLStrict)(r);
  }
  n(Sf, "decodeStrict");
  O.decodeStrict = Sf;
  function bf(r, e) {
    return (!e || e <= 0 ? La.encodeXML : La.encodeHTML)(r);
  }
  n(bf, "encode");
  O.encode = bf;
  var We = os();
  Object.defineProperty(O, "encodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeXML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeNonAsciiHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(O, "escape", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.escape;
  }, "get") });
  Object.defineProperty(O, "escapeUTF8", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.escapeUTF8;
  }, "get") });
  Object.defineProperty(O, "encodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  var we = rs();
  Object.defineProperty(O, "decodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeXML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeXMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return we.decodeXML;
  }, "get") });
});

// ../node_modules/ansi-to-html/lib/ansi_to_html.js
var Ya = q((FT, $a) => {
  "use strict";
  function Tf(r, e) {
    if (!(r instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  n(Tf, "_classCallCheck");
  function ja(r, e) {
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(r, o.key, o);
    }
  }
  n(ja, "_defineProperties");
  function Ef(r, e, t) {
    return e && ja(r.prototype, e), t && ja(r, t), r;
  }
  n(Ef, "_createClass");
  function Ha(r, e) {
    var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = Rf(r)) || e && r && typeof r.length == "number") {
        t && (r = t);
        var o = 0, s = /* @__PURE__ */ n(function() {
        }, "F");
        return { s, n: /* @__PURE__ */ n(function() {
          return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] };
        }, "n"), e: /* @__PURE__ */ n(function(p) {
          throw p;
        }, "e"), f: s };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var i = !0, a = !1, c;
    return { s: /* @__PURE__ */ n(function() {
      t = t.call(r);
    }, "s"), n: /* @__PURE__ */ n(function() {
      var p = t.next();
      return i = p.done, p;
    }, "n"), e: /* @__PURE__ */ n(function(p) {
      a = !0, c = p;
    }, "e"), f: /* @__PURE__ */ n(function() {
      try {
        !i && t.return != null && t.return();
      } finally {
        if (a) throw c;
      }
    }, "f") };
  }
  n(Ha, "_createForOfIteratorHelper");
  function Rf(r, e) {
    if (r) {
      if (typeof r == "string") return Ua(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      if (t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set") return Array.from(r);
      if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Ua(r, e);
    }
  }
  n(Rf, "_unsupportedIterableToArray");
  function Ua(r, e) {
    (e == null || e > r.length) && (e = r.length);
    for (var t = 0, o = new Array(e); t < e; t++)
      o[t] = r[t];
    return o;
  }
  n(Ua, "_arrayLikeToArray");
  var Af = Ma(), Ga = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: xf()
  };
  function xf() {
    var r = {
      0: "#000",
      1: "#A00",
      2: "#0A0",
      3: "#A50",
      4: "#00A",
      5: "#A0A",
      6: "#0AA",
      7: "#AAA",
      8: "#555",
      9: "#F55",
      10: "#5F5",
      11: "#FF5",
      12: "#55F",
      13: "#F5F",
      14: "#5FF",
      15: "#FFF"
    };
    return Vt(0, 5).forEach(function(e) {
      Vt(0, 5).forEach(function(t) {
        Vt(0, 5).forEach(function(o) {
          return vf(e, t, o, r);
        });
      });
    }), Vt(0, 23).forEach(function(e) {
      var t = e + 232, o = Wa(e * 10 + 8);
      r[t] = "#" + o + o + o;
    }), r;
  }
  n(xf, "getDefaultColors");
  function vf(r, e, t, o) {
    var s = 16 + r * 36 + e * 6 + t, i = r > 0 ? r * 40 + 55 : 0, a = e > 0 ? e * 40 + 55 : 0, c = t > 0 ? t * 40 + 55 : 0;
    o[s] = wf([i, a, c]);
  }
  n(vf, "setStyleColor");
  function Wa(r) {
    for (var e = r.toString(16); e.length < 2; )
      e = "0" + e;
    return e;
  }
  n(Wa, "toHexString");
  function wf(r) {
    var e = [], t = Ha(r), o;
    try {
      for (t.s(); !(o = t.n()).done; ) {
        var s = o.value;
        e.push(Wa(s));
      }
    } catch (i) {
      t.e(i);
    } finally {
      t.f();
    }
    return "#" + e.join("");
  }
  n(wf, "toColorHexString");
  function qa(r, e, t, o) {
    var s;
    return e === "text" ? s = Of(t, o) : e === "display" ? s = Cf(r, t, o) : e === "xterm256Foreground" ? s = Wt(r, o.colors[t]) : e === "xt\
erm256Background" ? s = zt(r, o.colors[t]) : e === "rgb" && (s = _f(r, t)), s;
  }
  n(qa, "generateOutput");
  function _f(r, e) {
    e = e.substring(2).slice(0, -1);
    var t = +e.substr(0, 2), o = e.substring(5).split(";"), s = o.map(function(i) {
      return ("0" + Number(i).toString(16)).substr(-2);
    }).join("");
    return Ht(r, (t === 38 ? "color:#" : "background-color:#") + s);
  }
  n(_f, "handleRgb");
  function Cf(r, e, t) {
    e = parseInt(e, 10);
    var o = {
      "-1": /* @__PURE__ */ n(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ n(function() {
        return r.length && za(r);
      }, "_"),
      1: /* @__PURE__ */ n(function() {
        return _e(r, "b");
      }, "_"),
      3: /* @__PURE__ */ n(function() {
        return _e(r, "i");
      }, "_"),
      4: /* @__PURE__ */ n(function() {
        return _e(r, "u");
      }, "_"),
      8: /* @__PURE__ */ n(function() {
        return Ht(r, "display:none");
      }, "_"),
      9: /* @__PURE__ */ n(function() {
        return _e(r, "strike");
      }, "_"),
      22: /* @__PURE__ */ n(function() {
        return Ht(r, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ n(function() {
        return Va(r, "i");
      }, "_"),
      24: /* @__PURE__ */ n(function() {
        return Va(r, "u");
      }, "_"),
      39: /* @__PURE__ */ n(function() {
        return Wt(r, t.fg);
      }, "_"),
      49: /* @__PURE__ */ n(function() {
        return zt(r, t.bg);
      }, "_"),
      53: /* @__PURE__ */ n(function() {
        return Ht(r, "text-decoration:overline");
      }, "_")
    }, s;
    return o[e] ? s = o[e]() : 4 < e && e < 7 ? s = _e(r, "blink") : 29 < e && e < 38 ? s = Wt(r, t.colors[e - 30]) : 39 < e && e < 48 ? s =
    zt(r, t.colors[e - 40]) : 89 < e && e < 98 ? s = Wt(r, t.colors[8 + (e - 90)]) : 99 < e && e < 108 && (s = zt(r, t.colors[8 + (e - 100)])),
    s;
  }
  n(Cf, "handleDisplay");
  function za(r) {
    var e = r.slice(0);
    return r.length = 0, e.reverse().map(function(t) {
      return "</" + t + ">";
    }).join("");
  }
  n(za, "resetStyles");
  function Vt(r, e) {
    for (var t = [], o = r; o <= e; o++)
      t.push(o);
    return t;
  }
  n(Vt, "range");
  function Pf(r) {
    return function(e) {
      return (r === null || e.category !== r) && r !== "all";
    };
  }
  n(Pf, "notCategory");
  function Ba(r) {
    r = parseInt(r, 10);
    var e = null;
    return r === 0 ? e = "all" : r === 1 ? e = "bold" : 2 < r && r < 5 ? e = "underline" : 4 < r && r < 7 ? e = "blink" : r === 8 ? e = "hid\
e" : r === 9 ? e = "strike" : 29 < r && r < 38 || r === 39 || 89 < r && r < 98 ? e = "foreground-color" : (39 < r && r < 48 || r === 49 || 99 <
    r && r < 108) && (e = "background-color"), e;
  }
  n(Ba, "categoryForCode");
  function Of(r, e) {
    return e.escapeXML ? Af.encodeXML(r) : r;
  }
  n(Of, "pushText");
  function _e(r, e, t) {
    return t || (t = ""), r.push(e), "<".concat(e).concat(t ? ' style="'.concat(t, '"') : "", ">");
  }
  n(_e, "pushTag");
  function Ht(r, e) {
    return _e(r, "span", e);
  }
  n(Ht, "pushStyle");
  function Wt(r, e) {
    return _e(r, "span", "color:" + e);
  }
  n(Wt, "pushForegroundColor");
  function zt(r, e) {
    return _e(r, "span", "background-color:" + e);
  }
  n(zt, "pushBackgroundColor");
  function Va(r, e) {
    var t;
    if (r.slice(-1)[0] === e && (t = r.pop()), t)
      return "</" + e + ">";
  }
  n(Va, "closeTag");
  function If(r, e, t) {
    var o = !1, s = 3;
    function i() {
      return "";
    }
    n(i, "remove");
    function a(v, C) {
      return t("xterm256Foreground", C), "";
    }
    n(a, "removeXterm256Foreground");
    function c(v, C) {
      return t("xterm256Background", C), "";
    }
    n(c, "removeXterm256Background");
    function l(v) {
      return e.newline ? t("display", -1) : t("text", v), "";
    }
    n(l, "newline");
    function p(v, C) {
      o = !0, C.trim().length === 0 && (C = "0"), C = C.trimRight(";").split(";");
      var F = Ha(C), G;
      try {
        for (F.s(); !(G = F.n()).done; ) {
          var B = G.value;
          t("display", B);
        }
      } catch (z) {
        F.e(z);
      } finally {
        F.f();
      }
      return "";
    }
    n(p, "ansiMess");
    function u(v) {
      return t("text", v), "";
    }
    n(u, "realText");
    function d(v) {
      return t("rgb", v), "";
    }
    n(d, "rgb");
    var h = [{
      pattern: /^\x08+/,
      sub: i
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: i
    }, {
      pattern: /^\x1b\[\(B/,
      sub: i
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: d
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: a
    }, {
      pattern: /^\x1b\[48;5;(\d+)m/,
      sub: c
    }, {
      pattern: /^\n/,
      sub: l
    }, {
      pattern: /^\r+\n/,
      sub: l
    }, {
      pattern: /^\r/,
      sub: l
    }, {
      pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
      sub: p
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: i
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: i
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: i
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: u
    }];
    function S(v, C) {
      C > s && o || (o = !1, r = r.replace(v.pattern, v.sub));
    }
    n(S, "process");
    var m = [], T = r, y = T.length;
    e: for (; y > 0; ) {
      for (var R = 0, x = 0, g = h.length; x < g; R = ++x) {
        var b = h[R];
        if (S(b, R), r.length !== y) {
          y = r.length;
          continue e;
        }
      }
      if (r.length === y)
        break;
      m.push(0), y = r.length;
    }
    return m;
  }
  n(If, "tokenize");
  function Ff(r, e, t) {
    return e !== "text" && (r = r.filter(Pf(Ba(t))), r.push({
      token: e,
      data: t,
      category: Ba(t)
    })), r;
  }
  n(Ff, "updateStickyStack");
  var Nf = /* @__PURE__ */ function() {
    function r(e) {
      Tf(this, r), e = e || {}, e.colors && (e.colors = Object.assign({}, Ga.colors, e.colors)), this.options = Object.assign({}, Ga, e), this.
      stack = [], this.stickyStack = [];
    }
    return n(r, "Filter"), Ef(r, [{
      key: "toHtml",
      value: /* @__PURE__ */ n(function(t) {
        var o = this;
        t = typeof t == "string" ? [t] : t;
        var s = this.stack, i = this.options, a = [];
        return this.stickyStack.forEach(function(c) {
          var l = qa(s, c.token, c.data, i);
          l && a.push(l);
        }), If(t.join(""), i, function(c, l) {
          var p = qa(s, c, l, i);
          p && a.push(p), i.stream && (o.stickyStack = Ff(o.stickyStack, c, l));
        }), s.length && a.push(za(s)), a.join("");
      }, "toHtml")
    }]), r;
  }();
  $a.exports = Nf;
});

// ../node_modules/browser-dtector/browser-dtector.umd.min.js
var ol = q((cs, ps) => {
  (function(r, e) {
    typeof cs == "object" && typeof ps < "u" ? ps.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis <
    "u" ? globalThis : r || self).BrowserDetector = e();
  })(cs, function() {
    "use strict";
    function r(a, c) {
      for (var l = 0; l < c.length; l++) {
        var p = c[l];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(a, (u = p.key, d = void 0,
        typeof (d = function(h, S) {
          if (typeof h != "object" || h === null) return h;
          var m = h[Symbol.toPrimitive];
          if (m !== void 0) {
            var T = m.call(h, S || "default");
            if (typeof T != "object") return T;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (S === "string" ? String : Number)(h);
        }(u, "string")) == "symbol" ? d : String(d)), p);
      }
      var u, d;
    }
    n(r, "e");
    var e = { chrome: "Google Chrome", brave: "Brave", crios: "Google Chrome", edge: "Microsoft Edge", edg: "Microsoft Edge", edgios: "Micro\
soft Edge", fennec: "Mozilla Firefox", jsdom: "JsDOM", mozilla: "Mozilla Firefox", fxios: "Mozilla Firefox", msie: "Microsoft Internet Explo\
rer", opera: "Opera", opios: "Opera", opr: "Opera", opt: "Opera", rv: "Microsoft Internet Explorer", safari: "Safari", samsungbrowser: "Sams\
ung Browser", electron: "Electron" }, t = { android: "Android", androidTablet: "Android Tablet", cros: "Chrome OS", fennec: "Android Tablet",
    ipad: "IPad", iphone: "IPhone", jsdom: "JsDOM", linux: "Linux", mac: "Macintosh", tablet: "Android Tablet", win: "Windows", "windows pho\
ne": "Windows Phone", xbox: "Microsoft Xbox" }, o = /* @__PURE__ */ n(function(a) {
      var c = new RegExp("^-?\\d+(?:.\\d{0,".concat(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1, "})?")), l = Number(
      a).toString().match(c);
      return l ? l[0] : null;
    }, "n"), s = /* @__PURE__ */ n(function() {
      return typeof window < "u" ? window.navigator : null;
    }, "i"), i = function() {
      function a(u) {
        var d;
        (function(h, S) {
          if (!(h instanceof S)) throw new TypeError("Cannot call a class as a function");
        })(this, a), this.userAgent = u || ((d = s()) === null || d === void 0 ? void 0 : d.userAgent) || null;
      }
      n(a, "t");
      var c, l, p;
      return c = a, l = [{ key: "parseUserAgent", value: /* @__PURE__ */ n(function(u) {
        var d, h, S, m = {}, T = u || this.userAgent || "", y = T.toLowerCase().replace(/\s\s+/g, " "), R = /(edge)\/([\w.]+)/.exec(y) || /(edg)[/]([\w.]+)/.
        exec(y) || /(opr)[/]([\w.]+)/.exec(y) || /(opt)[/]([\w.]+)/.exec(y) || /(fxios)[/]([\w.]+)/.exec(y) || /(edgios)[/]([\w.]+)/.exec(y) ||
        /(jsdom)[/]([\w.]+)/.exec(y) || /(samsungbrowser)[/]([\w.]+)/.exec(y) || /(electron)[/]([\w.]+)/.exec(y) || /(chrome)[/]([\w.]+)/.exec(
        y) || /(crios)[/]([\w.]+)/.exec(y) || /(opios)[/]([\w.]+)/.exec(y) || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
        y) || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(y) || /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
        y) || /(webkit)[/]([\w.]+)/.exec(y) || /(opera)(?:.*version|)[/]([\w.]+)/.exec(y) || /(msie) ([\w.]+)/.exec(y) || /(fennec)[/]([\w.]+)/.
        exec(y) || y.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(y) || y.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.
        exec(y) || [], x = /(ipad)/.exec(y) || /(ipod)/.exec(y) || /(iphone)/.exec(y) || /(jsdom)/.exec(y) || /(windows phone)/.exec(y) || /(xbox)/.
        exec(y) || /(win)/.exec(y) || /(tablet)/.exec(y) || /(android)/.test(y) && /(mobile)/.test(y) === !1 && ["androidTablet"] || /(android)/.
        exec(y) || /(mac)/.exec(y) || /(linux)/.exec(y) || /(cros)/.exec(y) || [], g = R[5] || R[3] || R[1] || null, b = x[0] || null, v = R[4] ||
        R[2] || null, C = s();
        g === "chrome" && typeof (C == null || (d = C.brave) === null || d === void 0 ? void 0 : d.isBrave) == "function" && (g = "brave"), g &&
        (m[g] = !0), b && (m[b] = !0);
        var F = !!(m.tablet || m.android || m.androidTablet), G = !!(m.ipad || m.tablet || m.androidTablet), B = !!(m.android || m.androidTablet ||
        m.tablet || m.ipad || m.ipod || m.iphone || m["windows phone"]), z = !!(m.cros || m.mac || m.linux || m.win), se = !!(m.brave || m.chrome ||
        m.crios || m.opr || m.safari || m.edg || m.electron), P = !!(m.msie || m.rv);
        return { name: (h = e[g]) !== null && h !== void 0 ? h : null, platform: (S = t[b]) !== null && S !== void 0 ? S : null, userAgent: T,
        version: v, shortVersion: v ? o(parseFloat(v), 2) : null, isAndroid: F, isTablet: G, isMobile: B, isDesktop: z, isWebkit: se, isIE: P };
      }, "value") }, { key: "getBrowserInfo", value: /* @__PURE__ */ n(function() {
        var u = this.parseUserAgent();
        return { name: u.name, platform: u.platform, userAgent: u.userAgent, version: u.version, shortVersion: u.shortVersion };
      }, "value") }], p = [{ key: "VERSION", get: /* @__PURE__ */ n(function() {
        return "3.4.0";
      }, "get") }], l && r(c.prototype, l), p && r(c, p), Object.defineProperty(c, "prototype", { writable: !1 }), a;
    }();
    return i;
  });
});

// ../node_modules/@storybook/global/dist/index.mjs
var Yt = {};
Ce(Yt, {
  global: () => E
});
var E = (() => {
  let r;
  return typeof window < "u" ? r = window : typeof globalThis < "u" ? r = globalThis : typeof global < "u" ? r = global : typeof self < "u" ?
  r = self : r = {}, r;
})();

// src/core-events/index.ts
var ge = {};
Ce(ge, {
  ARGTYPES_INFO_REQUEST: () => go,
  ARGTYPES_INFO_RESPONSE: () => at,
  CHANNEL_CREATED: () => fl,
  CHANNEL_WS_DISCONNECT: () => Xt,
  CONFIG_ERROR: () => Jt,
  CREATE_NEW_STORYFILE_REQUEST: () => yl,
  CREATE_NEW_STORYFILE_RESPONSE: () => ml,
  CURRENT_STORY_WAS_SET: () => nt,
  DOCS_PREPARED: () => Qt,
  DOCS_RENDERED: () => ur,
  FILE_COMPONENT_SEARCH_REQUEST: () => hl,
  FILE_COMPONENT_SEARCH_RESPONSE: () => gl,
  FORCE_REMOUNT: () => Zt,
  FORCE_RE_RENDER: () => fr,
  GLOBALS_UPDATED: () => Pe,
  NAVIGATE_URL: () => Sl,
  PLAY_FUNCTION_THREW_EXCEPTION: () => eo,
  PRELOAD_ENTRIES: () => to,
  PREVIEW_BUILDER_PROGRESS: () => bl,
  PREVIEW_KEYDOWN: () => oo,
  REGISTER_SUBSCRIPTION: () => Tl,
  REQUEST_WHATS_NEW_DATA: () => Ol,
  RESET_STORY_ARGS: () => yr,
  RESULT_WHATS_NEW_DATA: () => Il,
  SAVE_STORY_REQUEST: () => Dl,
  SAVE_STORY_RESPONSE: () => kl,
  SELECT_STORY: () => El,
  SET_CONFIG: () => Rl,
  SET_CURRENT_STORY: () => no,
  SET_FILTER: () => Al,
  SET_GLOBALS: () => so,
  SET_INDEX: () => xl,
  SET_STORIES: () => vl,
  SET_WHATS_NEW_CACHE: () => Fl,
  SHARED_STATE_CHANGED: () => wl,
  SHARED_STATE_SET: () => _l,
  STORIES_COLLAPSE_ALL: () => Cl,
  STORIES_EXPAND_ALL: () => Pl,
  STORY_ARGS_UPDATED: () => io,
  STORY_CHANGED: () => ao,
  STORY_ERRORED: () => lo,
  STORY_FINISHED: () => it,
  STORY_INDEX_INVALIDATED: () => co,
  STORY_MISSING: () => st,
  STORY_PREPARED: () => po,
  STORY_RENDERED: () => Ye,
  STORY_RENDER_PHASE_CHANGED: () => Oe,
  STORY_SPECIFIED: () => uo,
  STORY_THREW_EXCEPTION: () => fo,
  STORY_UNCHANGED: () => yo,
  TELEMETRY_ERROR: () => ho,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: () => Gl,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: () => ql,
  TESTING_MODULE_CRASH_REPORT: () => Ll,
  TESTING_MODULE_PROGRESS_REPORT: () => Ml,
  TESTING_MODULE_RUN_ALL_REQUEST: () => Ul,
  TESTING_MODULE_RUN_REQUEST: () => jl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => Nl,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => ro,
  UPDATE_GLOBALS: () => mr,
  UPDATE_QUERY_PARAMS: () => mo,
  UPDATE_STORY_ARGS: () => hr,
  default: () => ul
});
var Kt = /* @__PURE__ */ ((A) => (A.CHANNEL_WS_DISCONNECT = "channelWSDisconnect", A.CHANNEL_CREATED = "channelCreated", A.CONFIG_ERROR = "c\
onfigError", A.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", A.STORY_SPECIFIED = "storySpecified", A.SET_CONFIG = "setConfig", A.SET_STORIES =
"setStories", A.SET_INDEX = "setIndex", A.SET_CURRENT_STORY = "setCurrentStory", A.CURRENT_STORY_WAS_SET = "currentStoryWasSet", A.FORCE_RE_RENDER =
"forceReRender", A.FORCE_REMOUNT = "forceRemount", A.PRELOAD_ENTRIES = "preloadStories", A.STORY_PREPARED = "storyPrepared", A.DOCS_PREPARED =
"docsPrepared", A.STORY_CHANGED = "storyChanged", A.STORY_UNCHANGED = "storyUnchanged", A.STORY_RENDERED = "storyRendered", A.STORY_FINISHED =
"storyFinished", A.STORY_MISSING = "storyMissing", A.STORY_ERRORED = "storyErrored", A.STORY_THREW_EXCEPTION = "storyThrewException", A.STORY_RENDER_PHASE_CHANGED =
"storyRenderPhaseChanged", A.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", A.UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErro\
rsWhilePlaying", A.UPDATE_STORY_ARGS = "updateStoryArgs", A.STORY_ARGS_UPDATED = "storyArgsUpdated", A.RESET_STORY_ARGS = "resetStoryArgs", A.
SET_FILTER = "setFilter", A.SET_GLOBALS = "setGlobals", A.UPDATE_GLOBALS = "updateGlobals", A.GLOBALS_UPDATED = "globalsUpdated", A.REGISTER_SUBSCRIPTION =
"registerSubscription", A.PREVIEW_KEYDOWN = "previewKeydown", A.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", A.SELECT_STORY = "sel\
ectStory", A.STORIES_COLLAPSE_ALL = "storiesCollapseAll", A.STORIES_EXPAND_ALL = "storiesExpandAll", A.DOCS_RENDERED = "docsRendered", A.SHARED_STATE_CHANGED =
"sharedStateChanged", A.SHARED_STATE_SET = "sharedStateSet", A.NAVIGATE_URL = "navigateUrl", A.UPDATE_QUERY_PARAMS = "updateQueryParams", A.
REQUEST_WHATS_NEW_DATA = "requestWhatsNewData", A.RESULT_WHATS_NEW_DATA = "resultWhatsNewData", A.SET_WHATS_NEW_CACHE = "setWhatsNewCache", A.
TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications", A.TELEMETRY_ERROR = "telemetryError", A.FILE_COMPONENT_SEARCH_REQUEST = "fil\
eComponentSearchRequest", A.FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchResponse", A.SAVE_STORY_REQUEST = "saveStoryRequest", A.SAVE_STORY_RESPONSE =
"saveStoryResponse", A.ARGTYPES_INFO_REQUEST = "argtypesInfoRequest", A.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse", A.CREATE_NEW_STORYFILE_REQUEST =
"createNewStoryfileRequest", A.CREATE_NEW_STORYFILE_RESPONSE = "createNewStoryfileResponse", A.TESTING_MODULE_CRASH_REPORT = "testingModuleC\
rashReport", A.TESTING_MODULE_PROGRESS_REPORT = "testingModuleProgressReport", A.TESTING_MODULE_RUN_REQUEST = "testingModuleRunRequest", A.TESTING_MODULE_RUN_ALL_REQUEST =
"testingModuleRunAllRequest", A.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST = "testingModuleCancelTestRunRequest", A.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE =
"testingModuleCancelTestRunResponse", A))(Kt || {}), ul = Kt, {
  CHANNEL_WS_DISCONNECT: Xt,
  CHANNEL_CREATED: fl,
  CONFIG_ERROR: Jt,
  CREATE_NEW_STORYFILE_REQUEST: yl,
  CREATE_NEW_STORYFILE_RESPONSE: ml,
  CURRENT_STORY_WAS_SET: nt,
  DOCS_PREPARED: Qt,
  DOCS_RENDERED: ur,
  FILE_COMPONENT_SEARCH_REQUEST: hl,
  FILE_COMPONENT_SEARCH_RESPONSE: gl,
  FORCE_RE_RENDER: fr,
  FORCE_REMOUNT: Zt,
  GLOBALS_UPDATED: Pe,
  NAVIGATE_URL: Sl,
  PLAY_FUNCTION_THREW_EXCEPTION: eo,
  UNHANDLED_ERRORS_WHILE_PLAYING: ro,
  PRELOAD_ENTRIES: to,
  PREVIEW_BUILDER_PROGRESS: bl,
  PREVIEW_KEYDOWN: oo,
  REGISTER_SUBSCRIPTION: Tl,
  RESET_STORY_ARGS: yr,
  SELECT_STORY: El,
  SET_CONFIG: Rl,
  SET_CURRENT_STORY: no,
  SET_FILTER: Al,
  SET_GLOBALS: so,
  SET_INDEX: xl,
  SET_STORIES: vl,
  SHARED_STATE_CHANGED: wl,
  SHARED_STATE_SET: _l,
  STORIES_COLLAPSE_ALL: Cl,
  STORIES_EXPAND_ALL: Pl,
  STORY_ARGS_UPDATED: io,
  STORY_CHANGED: ao,
  STORY_ERRORED: lo,
  STORY_INDEX_INVALIDATED: co,
  STORY_MISSING: st,
  STORY_PREPARED: po,
  STORY_RENDER_PHASE_CHANGED: Oe,
  STORY_RENDERED: Ye,
  STORY_FINISHED: it,
  STORY_SPECIFIED: uo,
  STORY_THREW_EXCEPTION: fo,
  STORY_UNCHANGED: yo,
  UPDATE_GLOBALS: mr,
  UPDATE_QUERY_PARAMS: mo,
  UPDATE_STORY_ARGS: hr,
  REQUEST_WHATS_NEW_DATA: Ol,
  RESULT_WHATS_NEW_DATA: Il,
  SET_WHATS_NEW_CACHE: Fl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: Nl,
  TELEMETRY_ERROR: ho,
  SAVE_STORY_REQUEST: Dl,
  SAVE_STORY_RESPONSE: kl,
  ARGTYPES_INFO_REQUEST: go,
  ARGTYPES_INFO_RESPONSE: at,
  TESTING_MODULE_CRASH_REPORT: Ll,
  TESTING_MODULE_PROGRESS_REPORT: Ml,
  TESTING_MODULE_RUN_REQUEST: jl,
  TESTING_MODULE_RUN_ALL_REQUEST: Ul,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: Gl,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: ql
} = Kt;

// src/preview/globals/globals.ts
var So = {
  "@storybook/global": "__STORYBOOK_MODULE_GLOBAL__",
  "storybook/internal/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/core/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "storybook/internal/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/core/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "storybook/internal/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "storybook/internal/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core-events/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "storybook/internal/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/core/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "storybook/internal/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/core/types": "__STORYBOOK_MODULE_TYPES__"
}, us = Object.keys(So);

// src/channels/index.ts
var Dr = {};
Ce(Dr, {
  Channel: () => ie,
  HEARTBEAT_INTERVAL: () => rn,
  HEARTBEAT_MAX_LATENCY: () => tn,
  PostMessageTransport: () => er,
  WebsocketTransport: () => rr,
  createBrowserChannel: () => Vd,
  default: () => Bd
});

// ../node_modules/ts-dedent/esm/index.js
function _(r) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  var o = Array.from(typeof r == "string" ? [r] : r);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var s = o.reduce(function(c, l) {
    var p = l.match(/\n([\t ]+|(?!\s).)/g);
    return p ? c.concat(p.map(function(u) {
      var d, h;
      return (h = (d = u.match(/[\t ]/g)) === null || d === void 0 ? void 0 : d.length) !== null && h !== void 0 ? h : 0;
    })) : c;
  }, []);
  if (s.length) {
    var i = new RegExp(`
[	 ]{` + Math.min.apply(Math, s) + "}", "g");
    o = o.map(function(c) {
      return c.replace(i, `
`);
    });
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  var a = o[0];
  return e.forEach(function(c, l) {
    var p = a.match(/(?:^|\n)( *)$/), u = p ? p[1] : "", d = c;
    typeof c == "string" && c.includes(`
`) && (d = String(c).split(`
`).map(function(h, S) {
      return S === 0 ? h : "" + u + h;
    }).join(`
`)), a += d + o[l + 1];
  }), a;
}
n(_, "dedent");
var fs = _;

// src/shared/universal-store/instances.ts
var bo = /* @__PURE__ */ new Map();

// src/shared/universal-store/index.ts
var Bl = "UNIVERSAL_STORE:", ee = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
}, w = class w {
  constructor(e, t) {
    /** Enable debug logs for this store */
    this.debugging = !1;
    // TODO: narrow type of listeners based on event type
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    /** Gets the current state */
    this.getState = /* @__PURE__ */ n(() => (this.debug("getState", { state: this.state }), this.state), "getState");
    /**
     * Subscribes to store events
     *
     * @returns A function to unsubscribe
     */
    this.subscribe = /* @__PURE__ */ n((e, t) => {
      let o = typeof e == "function", s = o ? "*" : e, i = o ? e : t;
      if (this.debug("subscribe", { eventType: s, listener: i }), !i)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(i), () => {
        this.debug("unsubscribe", { eventType: s, listener: i }), this.listeners.has(s) && (this.listeners.get(s).delete(i), this.listeners.
        get(s)?.size === 0 && this.listeners.delete(s));
      };
    }, "subscribe");
    /** Sends a custom event to the other stores */
    this.send = /* @__PURE__ */ n((e) => {
      if (this.debug("send", { event: e }), this.status !== w.Status.READY)
        throw new TypeError(
          _`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event: e,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(e, { actor: this.actor }), this.emitToChannel(e, { actor: this.actor });
    }, "send");
    if (this.debugging = e.debug ?? !1, !w.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (w.isInternalConstructing = !1, this.id = e.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.
    actorType = e.leader ? w.ActorType.LEADER : w.ActorType.FOLLOWER, this.state = e.initialState, this.channelEventName = `${Bl}${this.id}`,
    this.debug("constructor", {
      options: e,
      environmentOverrides: t,
      channelEventName: this.channelEventName
    }), this.actor.type === w.ActorType.LEADER)
      this.syncing = {
        state: ee.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let o, s, i = new Promise((a, c) => {
        o = /* @__PURE__ */ n(() => {
          this.syncing.state === ee.PENDING && (this.syncing.state = ee.RESOLVED, a());
        }, "syncingResolve"), s = /* @__PURE__ */ n((l) => {
          this.syncing.state === ee.PENDING && (this.syncing.state = ee.REJECTED, c(l));
        }, "syncingReject");
      });
      this.syncing = {
        state: ee.PENDING,
        promise: i,
        resolve: o,
        reject: s
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange =
    this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.
    prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(
    this), this.debug = this.debug.bind(this), this.channel = t?.channel ?? w.preparation.channel, this.environment = t?.environment ?? w.preparation.
    environment, this.channel && this.environment ? this.prepareThis({ channel: this.channel, environment: this.environment }) : w.preparation.
    promise.then(this.prepareThis);
  }
  static setupPreparationPromise() {
    let e, t, o = new Promise(
      (s, i) => {
        e = /* @__PURE__ */ n((a) => {
          s(a);
        }, "resolveRef"), t = /* @__PURE__ */ n((...a) => {
          i(a);
        }, "rejectRef");
      }
    );
    w.preparation = {
      resolve: e,
      reject: t,
      promise: o
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: this.environment ?? w.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    if (!this.channel || !this.environment)
      return w.Status.UNPREPARED;
    switch (this.syncing?.state) {
      case ee.PENDING:
      case void 0:
        return w.Status.SYNCING;
      case ee.REJECTED:
        return w.Status.ERROR;
      case ee.RESOLVED:
      default:
        return w.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    return Promise.all([w.preparation.promise, this.syncing?.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(e) {
    if (!e || typeof e?.id != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    e.debug && console.debug(
      _`[UniversalStore]
        create`,
      { options: e }
    );
    let t = bo.get(e.id);
    if (t)
      return console.warn(_`UniversalStore with id "${e.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), t;
    w.isInternalConstructing = !0;
    let o = new w(e);
    return bo.set(e.id, o), o;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(e, t) {
    w.preparation.channel = e, w.preparation.environment = t, w.preparation.resolve({ channel: e, environment: t });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(e) {
    let t = this.state, o = typeof e == "function" ? e(t) : e;
    if (this.debug("setState", { newState: o, previousState: t, updater: e }), this.status !== w.Status.READY)
      throw new TypeError(
        _`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState: o,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = o;
    let s = {
      type: w.InternalEventType.SET_STATE,
      payload: {
        state: o,
        previousState: t
      }
    };
    this.emitToChannel(s, { actor: this.actor }), this.emitToListeners(s, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(e) {
    return this.debug("onStateChange", { listener: e }), this.subscribe(
      w.InternalEventType.SET_STATE,
      ({ payload: t }, o) => {
        e(t.state, t.previousState, o);
      }
    );
  }
  emitToChannel(e, t) {
    this.debug("emitToChannel", { event: e, eventInfo: t, channel: this.channel }), this.channel?.emit(this.channelEventName, {
      event: e,
      eventInfo: t
    });
  }
  prepareThis({
    channel: e,
    environment: t
  }) {
    this.channel = e, this.environment = t, this.debug("prepared", { channel: e, environment: t }), this.channel.on(this.channelEventName, this.
    handleChannelEvents), this.actor.type === w.ActorType.LEADER ? this.emitToChannel(
      { type: w.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: w.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: w.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(
        new TypeError(
          `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower\
.`
        )
      );
    }, 1e3));
  }
  emitToListeners(e, t) {
    let o = this.listeners.get(e.type), s = this.listeners.get("*");
    this.debug("emitToListeners", {
      event: e,
      eventInfo: t,
      eventTypeListeners: o,
      everythingListeners: s
    }), [...o ?? [], ...s ?? []].forEach(
      (i) => i(e, t)
    );
  }
  handleChannelEvents(e) {
    let { event: t, eventInfo: o } = e;
    if ([o.actor.id, o.forwardingActor?.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: e });
      return;
    } else if (this.syncing?.state === ee.PENDING && t.type !== w.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: e });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent: e }), this.actor.type === w.ActorType.LEADER) {
      let s = !0;
      switch (t.type) {
        case w.InternalEventType.EXISTING_STATE_REQUEST:
          s = !1;
          let i = {
            type: w.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent: i
          }), this.emitToChannel(i, { actor: this.actor });
          break;
        case w.InternalEventType.LEADER_CREATED:
          s = !1, this.syncing.state = ee.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event: t
          }), console.error(
            _`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o.actor, null, 2)}`
          );
          break;
      }
      s && (this.debug("handleChannelEvents: forwarding event", { channelEvent: e }), this.emitToChannel(t, { actor: o.actor, forwardingActor: this.
      actor }));
    }
    if (this.actor.type === w.ActorType.FOLLOWER)
      switch (t.type) {
        case w.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event: t
          }), this.syncing?.state !== ee.PENDING)
            break;
          this.syncing.resolve?.();
          let s = {
            type: w.InternalEventType.SET_STATE,
            payload: {
              state: t.payload,
              previousState: this.state
            }
          };
          this.state = t.payload, this.emitToListeners(s, o);
          break;
      }
    switch (t.type) {
      case w.InternalEventType.SET_STATE:
        this.debug("handleChannelEvents: Setting state", { event: t }), this.state = t.payload.state;
        break;
    }
    this.emitToListeners(t, { actor: o.actor });
  }
  debug(e, t) {
    this.debugging && console.debug(
      _`[UniversalStore::${this.id}::${this.environment ?? w.Environment.UNKNOWN}]
        ${e}`,
      JSON.stringify(
        {
          data: t,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    w.preparation.reject(new Error("reset")), w.setupPreparationPromise(), w.isInternalConstructing = !1;
  }
};
n(w, "UniversalStore"), /**
 * Defines the possible actor types in the store system
 *
 * @readonly
 */
w.ActorType = {
  LEADER: "LEADER",
  FOLLOWER: "FOLLOWER"
}, /**
 * Defines the possible environments the store can run in
 *
 * @readonly
 */
w.Environment = {
  SERVER: "SERVER",
  MANAGER: "MANAGER",
  PREVIEW: "PREVIEW",
  UNKNOWN: "UNKNOWN",
  MOCK: "MOCK"
}, /**
 * Internal event types used for store synchronization
 *
 * @readonly
 */
w.InternalEventType = {
  EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
  EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
  SET_STATE: "__SET_STATE",
  LEADER_CREATED: "__LEADER_CREATED",
  FOLLOWER_CREATED: "__FOLLOWER_CREATED"
}, w.Status = {
  UNPREPARED: "UNPREPARED",
  SYNCING: "SYNCING",
  READY: "READY",
  ERROR: "ERROR"
}, // This is used to check if constructor was called from the static factory create()
w.isInternalConstructing = !1, w.setupPreparationPromise();
var Q = w;

// src/channels/main.ts
var Vl = /* @__PURE__ */ n((r) => r.transports !== void 0, "isMulti"), Hl = /* @__PURE__ */ n(() => Math.random().toString(16).slice(2), "ge\
nerateRandomId"), To = class To {
  constructor(e = {}) {
    this.sender = Hl();
    this.events = {};
    this.data = {};
    this.transports = [];
    this.isAsync = e.async || !1, Vl(e) ? (this.transports = e.transports || [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    })) : this.transports = e.transport ? [e.transport] : [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(e, t) {
    this.events[e] = this.events[e] || [], this.events[e].push(t);
  }
  emit(e, ...t) {
    let o = { type: e, args: t, from: this.sender }, s = {};
    t.length >= 1 && t[0] && t[0].options && (s = t[0].options);
    let i = /* @__PURE__ */ n(() => {
      this.transports.forEach((a) => {
        a.send(o, s);
      }), this.handleEvent(o);
    }, "handler");
    this.isAsync ? setImmediate(i) : i();
  }
  last(e) {
    return this.data[e];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(e) {
    let t = this.listeners(e);
    return t ? t.length : 0;
  }
  listeners(e) {
    return this.events[e] || void 0;
  }
  once(e, t) {
    let o = this.onceListener(e, t);
    this.addListener(e, o);
  }
  removeAllListeners(e) {
    e ? this.events[e] && delete this.events[e] : this.events = {};
  }
  removeListener(e, t) {
    let o = this.listeners(e);
    o && (this.events[e] = o.filter((s) => s !== t));
  }
  on(e, t) {
    this.addListener(e, t);
  }
  off(e, t) {
    this.removeListener(e, t);
  }
  handleEvent(e) {
    let t = this.listeners(e.type);
    t && t.length && t.forEach((o) => {
      o.apply(e, e.args);
    }), this.data[e.type] = e.args;
  }
  onceListener(e, t) {
    let o = /* @__PURE__ */ n((...s) => (this.removeListener(e, o), t(...s)), "onceListener");
    return o;
  }
};
n(To, "Channel");
var ie = To;

// src/client-logger/index.ts
var gr = {};
Ce(gr, {
  deprecate: () => ae,
  logger: () => I,
  once: () => M,
  pretty: () => X
});
var { LOGLEVEL: Wl } = E, Se = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 10
}, zl = Wl, Ke = Se[zl] || Se.info, I = {
  trace: /* @__PURE__ */ n((r, ...e) => {
    Ke <= Se.trace && console.trace(r, ...e);
  }, "trace"),
  debug: /* @__PURE__ */ n((r, ...e) => {
    Ke <= Se.debug && console.debug(r, ...e);
  }, "debug"),
  info: /* @__PURE__ */ n((r, ...e) => {
    Ke <= Se.info && console.info(r, ...e);
  }, "info"),
  warn: /* @__PURE__ */ n((r, ...e) => {
    Ke <= Se.warn && console.warn(r, ...e);
  }, "warn"),
  error: /* @__PURE__ */ n((r, ...e) => {
    Ke <= Se.error && console.error(r, ...e);
  }, "error"),
  log: /* @__PURE__ */ n((r, ...e) => {
    Ke < Se.silent && console.log(r, ...e);
  }, "log")
}, Eo = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ n((r) => (e, ...t) => {
  if (!Eo.has(e))
    return Eo.add(e), I[r](e, ...t);
}, "once");
M.clear = () => Eo.clear();
M.trace = M("trace");
M.debug = M("debug");
M.info = M("info");
M.warn = M("warn");
M.error = M("error");
M.log = M("log");
var ae = M("warn"), X = /* @__PURE__ */ n((r) => (...e) => {
  let t = [];
  if (e.length) {
    let o = /<span\s+style=(['"])([^'"]*)\1\s*>/gi, s = /<\/span>/gi, i;
    for (t.push(e[0].replace(o, "%c").replace(s, "%c")); i = o.exec(e[0]); )
      t.push(i[2]), t.push("");
    for (let a = 1; a < e.length; a++)
      t.push(e[a]);
  }
  I[r].apply(I, t);
}, "pretty");
X.trace = X("trace");
X.debug = X("debug");
X.info = X("info");
X.warn = X("warn");
X.error = X("error");

// ../node_modules/telejson/dist/chunk-465TF3XA.mjs
var $l = Object.create, ys = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, ms = Object.getOwnPropertyNames, Kl = Object.getPrototypeOf,
Xl = Object.prototype.hasOwnProperty, Z = /* @__PURE__ */ n((r, e) => /* @__PURE__ */ n(function() {
  return e || (0, r[ms(r)[0]])((e = { exports: {} }).exports, e), e.exports;
}, "__require"), "__commonJS"), Jl = /* @__PURE__ */ n((r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of ms(e))
      !Xl.call(r, s) && s !== t && ys(r, s, { get: /* @__PURE__ */ n(() => e[s], "get"), enumerable: !(o = Yl(e, s)) || o.enumerable });
  return r;
}, "__copyProps"), lt = /* @__PURE__ */ n((r, e, t) => (t = r != null ? $l(Kl(r)) : {}, Jl(
  e || !r || !r.__esModule ? ys(t, "default", { value: r, enumerable: !0 }) : t,
  r
)), "__toESM"), Ql = [
  "bubbles",
  "cancelBubble",
  "cancelable",
  "composed",
  "currentTarget",
  "defaultPrevented",
  "eventPhase",
  "isTrusted",
  "returnValue",
  "srcElement",
  "target",
  "timeStamp",
  "type"
], Zl = ["detail"];
function hs(r) {
  let e = Ql.filter((t) => r[t] !== void 0).reduce((t, o) => ({ ...t, [o]: r[o] }), {});
  return r instanceof CustomEvent && Zl.filter((t) => r[t] !== void 0).forEach((t) => {
    e[t] = r[t];
  }), e;
}
n(hs, "extractEventHiddenProperties");

// ../node_modules/telejson/dist/index.mjs
var Fs = ue(ct(), 1);
var As = Z({
  "node_modules/has-symbols/shams.js"(r, e) {
    "use strict";
    e.exports = /* @__PURE__ */ n(function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return !1;
      if (typeof Symbol.iterator == "symbol")
        return !0;
      var o = {}, s = Symbol("test"), i = Object(s);
      if (typeof s == "string" || Object.prototype.toString.call(s) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object \
Symbol]")
        return !1;
      var a = 42;
      o[s] = a;
      for (s in o)
        return !1;
      if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
      o).length !== 0)
        return !1;
      var c = Object.getOwnPropertySymbols(o);
      if (c.length !== 1 || c[0] !== s || !Object.prototype.propertyIsEnumerable.call(o, s))
        return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var l = Object.getOwnPropertyDescriptor(o, s);
        if (l.value !== a || l.enumerable !== !0)
          return !1;
      }
      return !0;
    }, "hasSymbols");
  }
}), xs = Z({
  "node_modules/has-symbols/index.js"(r, e) {
    "use strict";
    var t = typeof Symbol < "u" && Symbol, o = As();
    e.exports = /* @__PURE__ */ n(function() {
      return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 :
      o();
    }, "hasNativeSymbols");
  }
}), ec = Z({
  "node_modules/function-bind/implementation.js"(r, e) {
    "use strict";
    var t = "Function.prototype.bind called on incompatible ", o = Array.prototype.slice, s = Object.prototype.toString, i = "[object Functi\
on]";
    e.exports = /* @__PURE__ */ n(function(c) {
      var l = this;
      if (typeof l != "function" || s.call(l) !== i)
        throw new TypeError(t + l);
      for (var p = o.call(arguments, 1), u, d = /* @__PURE__ */ n(function() {
        if (this instanceof u) {
          var y = l.apply(
            this,
            p.concat(o.call(arguments))
          );
          return Object(y) === y ? y : this;
        } else
          return l.apply(
            c,
            p.concat(o.call(arguments))
          );
      }, "binder"), h = Math.max(0, l.length - p.length), S = [], m = 0; m < h; m++)
        S.push("$" + m);
      if (u = Function("binder", "return function (" + S.join(",") + "){ return binder.apply(this,arguments); }")(d), l.prototype) {
        var T = /* @__PURE__ */ n(function() {
        }, "Empty2");
        T.prototype = l.prototype, u.prototype = new T(), T.prototype = null;
      }
      return u;
    }, "bind");
  }
}), xo = Z({
  "node_modules/function-bind/index.js"(r, e) {
    "use strict";
    var t = ec();
    e.exports = Function.prototype.bind || t;
  }
}), rc = Z({
  "node_modules/has/src/index.js"(r, e) {
    "use strict";
    var t = xo();
    e.exports = t.call(Function.call, Object.prototype.hasOwnProperty);
  }
}), vs = Z({
  "node_modules/get-intrinsic/index.js"(r, e) {
    "use strict";
    var t, o = SyntaxError, s = Function, i = TypeError, a = /* @__PURE__ */ n(function(P) {
      try {
        return s('"use strict"; return (' + P + ").constructor;")();
      } catch {
      }
    }, "getEvalledConstructor"), c = Object.getOwnPropertyDescriptor;
    if (c)
      try {
        c({}, "");
      } catch {
        c = null;
      }
    var l = /* @__PURE__ */ n(function() {
      throw new i();
    }, "throwTypeError"), p = c ? function() {
      try {
        return arguments.callee, l;
      } catch {
        try {
          return c(arguments, "callee").get;
        } catch {
          return l;
        }
      }
    }() : l, u = xs()(), d = Object.getPrototypeOf || function(P) {
      return P.__proto__;
    }, h = {}, S = typeof Uint8Array > "u" ? t : d(Uint8Array), m = {
      "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
      "%ArrayIteratorPrototype%": u ? d([][Symbol.iterator]()) : t,
      "%AsyncFromSyncIteratorPrototype%": t,
      "%AsyncFunction%": h,
      "%AsyncGenerator%": h,
      "%AsyncGeneratorFunction%": h,
      "%AsyncIteratorPrototype%": h,
      "%Atomics%": typeof Atomics > "u" ? t : Atomics,
      "%BigInt%": typeof BigInt > "u" ? t : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? t : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
      "%Function%": s,
      "%GeneratorFunction%": h,
      "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": u ? d(d([][Symbol.iterator]())) : t,
      "%JSON%": typeof JSON == "object" ? JSON : t,
      "%Map%": typeof Map > "u" ? t : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !u ? t : d((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? t : Promise,
      "%Proxy%": typeof Proxy > "u" ? t : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect > "u" ? t : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? t : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !u ? t : d((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": u ? d(""[Symbol.iterator]()) : t,
      "%Symbol%": u ? Symbol : t,
      "%SyntaxError%": o,
      "%ThrowTypeError%": p,
      "%TypedArray%": S,
      "%TypeError%": i,
      "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet
    }, T = /* @__PURE__ */ n(function P(N) {
      var j;
      if (N === "%AsyncFunction%")
        j = a("async function () {}");
      else if (N === "%GeneratorFunction%")
        j = a("function* () {}");
      else if (N === "%AsyncGeneratorFunction%")
        j = a("async function* () {}");
      else if (N === "%AsyncGenerator%") {
        var L = P("%AsyncGeneratorFunction%");
        L && (j = L.prototype);
      } else if (N === "%AsyncIteratorPrototype%") {
        var D = P("%AsyncGenerator%");
        D && (j = d(D.prototype));
      }
      return m[N] = j, j;
    }, "doEval2"), y = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    }, R = xo(), x = rc(), g = R.call(Function.call, Array.prototype.concat), b = R.call(Function.apply, Array.prototype.splice), v = R.call(
    Function.call, String.prototype.replace), C = R.call(Function.call, String.prototype.slice), F = R.call(Function.call, RegExp.prototype.
    exec), G = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, B = /\\(\\)?/g, z = /* @__PURE__ */ n(
    function(N) {
      var j = C(N, 0, 1), L = C(N, -1);
      if (j === "%" && L !== "%")
        throw new o("invalid intrinsic syntax, expected closing `%`");
      if (L === "%" && j !== "%")
        throw new o("invalid intrinsic syntax, expected opening `%`");
      var D = [];
      return v(N, G, function(H, re, K, Qr) {
        D[D.length] = K ? v(Qr, B, "$1") : re || H;
      }), D;
    }, "stringToPath3"), se = /* @__PURE__ */ n(function(N, j) {
      var L = N, D;
      if (x(y, L) && (D = y[L], L = "%" + D[0] + "%"), x(m, L)) {
        var H = m[L];
        if (H === h && (H = T(L)), typeof H > "u" && !j)
          throw new i("intrinsic " + N + " exists, but is not available. Please file an issue!");
        return {
          alias: D,
          name: L,
          value: H
        };
      }
      throw new o("intrinsic " + N + " does not exist!");
    }, "getBaseIntrinsic2");
    e.exports = /* @__PURE__ */ n(function(N, j) {
      if (typeof N != "string" || N.length === 0)
        throw new i("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof j != "boolean")
        throw new i('"allowMissing" argument must be a boolean');
      if (F(/^%?[^%]*%?$/, N) === null)
        throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var L = z(N), D = L.length > 0 ? L[0] : "", H = se("%" + D + "%", j), re = H.name, K = H.value, Qr = !1, $t = H.alias;
      $t && (D = $t[0], b(L, g([0, 1], $t)));
      for (var Zr = 1, pr = !0; Zr < L.length; Zr += 1) {
        var de = L[Zr], et = C(de, 0, 1), rt = C(de, -1);
        if ((et === '"' || et === "'" || et === "`" || rt === '"' || rt === "'" || rt === "`") && et !== rt)
          throw new o("property names with quotes must have matching quotes");
        if ((de === "constructor" || !pr) && (Qr = !0), D += "." + de, re = "%" + D + "%", x(m, re))
          K = m[re];
        else if (K != null) {
          if (!(de in K)) {
            if (!j)
              throw new i("base intrinsic for " + N + " exists, but the property is not available.");
            return;
          }
          if (c && Zr + 1 >= L.length) {
            var tt = c(K, de);
            pr = !!tt, pr && "get" in tt && !("originalValue" in tt.get) ? K = tt.get : K = K[de];
          } else
            pr = x(K, de), K = K[de];
          pr && !Qr && (m[re] = K);
        }
      }
      return K;
    }, "GetIntrinsic");
  }
}), tc = Z({
  "node_modules/call-bind/index.js"(r, e) {
    "use strict";
    var t = xo(), o = vs(), s = o("%Function.prototype.apply%"), i = o("%Function.prototype.call%"), a = o("%Reflect.apply%", !0) || t.call(
    i, s), c = o("%Object.getOwnPropertyDescriptor%", !0), l = o("%Object.defineProperty%", !0), p = o("%Math.max%");
    if (l)
      try {
        l({}, "a", { value: 1 });
      } catch {
        l = null;
      }
    e.exports = /* @__PURE__ */ n(function(h) {
      var S = a(t, i, arguments);
      if (c && l) {
        var m = c(S, "length");
        m.configurable && l(
          S,
          "length",
          { value: 1 + p(0, h.length - (arguments.length - 1)) }
        );
      }
      return S;
    }, "callBind");
    var u = /* @__PURE__ */ n(function() {
      return a(t, s, arguments);
    }, "applyBind2");
    l ? l(e.exports, "apply", { value: u }) : e.exports.apply = u;
  }
}), oc = Z({
  "node_modules/call-bind/callBound.js"(r, e) {
    "use strict";
    var t = vs(), o = tc(), s = o(t("String.prototype.indexOf"));
    e.exports = /* @__PURE__ */ n(function(a, c) {
      var l = t(a, !!c);
      return typeof l == "function" && s(a, ".prototype.") > -1 ? o(l) : l;
    }, "callBoundIntrinsic");
  }
}), nc = Z({
  "node_modules/has-tostringtag/shams.js"(r, e) {
    "use strict";
    var t = As();
    e.exports = /* @__PURE__ */ n(function() {
      return t() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
}), sc = Z({
  "node_modules/is-regex/index.js"(r, e) {
    "use strict";
    var t = oc(), o = nc()(), s, i, a, c;
    o && (s = t("Object.prototype.hasOwnProperty"), i = t("RegExp.prototype.exec"), a = {}, l = /* @__PURE__ */ n(function() {
      throw a;
    }, "throwRegexMarker"), c = {
      toString: l,
      valueOf: l
    }, typeof Symbol.toPrimitive == "symbol" && (c[Symbol.toPrimitive] = l));
    var l, p = t("Object.prototype.toString"), u = Object.getOwnPropertyDescriptor, d = "[object RegExp]";
    e.exports = /* @__PURE__ */ n(o ? function(S) {
      if (!S || typeof S != "object")
        return !1;
      var m = u(S, "lastIndex"), T = m && s(m, "value");
      if (!T)
        return !1;
      try {
        i(S, c);
      } catch (y) {
        return y === a;
      }
    } : function(S) {
      return !S || typeof S != "object" && typeof S != "function" ? !1 : p(S) === d;
    }, "isRegex");
  }
}), ic = Z({
  "node_modules/is-function/index.js"(r, e) {
    e.exports = o;
    var t = Object.prototype.toString;
    function o(s) {
      if (!s)
        return !1;
      var i = t.call(s);
      return i === "[object Function]" || typeof s == "function" && i !== "[object RegExp]" || typeof window < "u" && (s === window.setTimeout ||
      s === window.alert || s === window.confirm || s === window.prompt);
    }
    n(o, "isFunction3");
  }
}), ac = Z({
  "node_modules/is-symbol/index.js"(r, e) {
    "use strict";
    var t = Object.prototype.toString, o = xs()();
    o ? (s = Symbol.prototype.toString, i = /^Symbol\(.*\)$/, a = /* @__PURE__ */ n(function(l) {
      return typeof l.valueOf() != "symbol" ? !1 : i.test(s.call(l));
    }, "isRealSymbolObject"), e.exports = /* @__PURE__ */ n(function(l) {
      if (typeof l == "symbol")
        return !0;
      if (t.call(l) !== "[object Symbol]")
        return !1;
      try {
        return a(l);
      } catch {
        return !1;
      }
    }, "isSymbol3")) : e.exports = /* @__PURE__ */ n(function(l) {
      return !1;
    }, "isSymbol3");
    var s, i, a;
  }
}), lc = lt(sc()), cc = lt(ic()), pc = lt(ac());
function dc(r) {
  return r != null && typeof r == "object" && Array.isArray(r) === !1;
}
n(dc, "isObject");
var uc = typeof global == "object" && global && global.Object === Object && global, fc = uc, yc = typeof self == "object" && self && self.Object ===
Object && self, mc = fc || yc || Function("return this")(), vo = mc, hc = vo.Symbol, Xe = hc, ws = Object.prototype, gc = ws.hasOwnProperty,
Sc = ws.toString, Sr = Xe ? Xe.toStringTag : void 0;
function bc(r) {
  var e = gc.call(r, Sr), t = r[Sr];
  try {
    r[Sr] = void 0;
    var o = !0;
  } catch {
  }
  var s = Sc.call(r);
  return o && (e ? r[Sr] = t : delete r[Sr]), s;
}
n(bc, "getRawTag");
var Tc = bc, Ec = Object.prototype, Rc = Ec.toString;
function Ac(r) {
  return Rc.call(r);
}
n(Ac, "objectToString");
var xc = Ac, vc = "[object Null]", wc = "[object Undefined]", Ss = Xe ? Xe.toStringTag : void 0;
function _c(r) {
  return r == null ? r === void 0 ? wc : vc : Ss && Ss in Object(r) ? Tc(r) : xc(r);
}
n(_c, "baseGetTag");
var _s = _c;
function Cc(r) {
  return r != null && typeof r == "object";
}
n(Cc, "isObjectLike");
var Pc = Cc, Oc = "[object Symbol]";
function Ic(r) {
  return typeof r == "symbol" || Pc(r) && _s(r) == Oc;
}
n(Ic, "isSymbol");
var wo = Ic;
function Fc(r, e) {
  for (var t = -1, o = r == null ? 0 : r.length, s = Array(o); ++t < o; )
    s[t] = e(r[t], t, r);
  return s;
}
n(Fc, "arrayMap");
var Nc = Fc, Dc = Array.isArray, _o = Dc, kc = 1 / 0, bs = Xe ? Xe.prototype : void 0, Ts = bs ? bs.toString : void 0;
function Cs(r) {
  if (typeof r == "string")
    return r;
  if (_o(r))
    return Nc(r, Cs) + "";
  if (wo(r))
    return Ts ? Ts.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -kc ? "-0" : e;
}
n(Cs, "baseToString");
var Lc = Cs;
function Mc(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
n(Mc, "isObject2");
var Ps = Mc, jc = "[object AsyncFunction]", Uc = "[object Function]", Gc = "[object GeneratorFunction]", qc = "[object Proxy]";
function Bc(r) {
  if (!Ps(r))
    return !1;
  var e = _s(r);
  return e == Uc || e == Gc || e == jc || e == qc;
}
n(Bc, "isFunction");
var Vc = Bc, Hc = vo["__core-js_shared__"], Ao = Hc, Es = function() {
  var r = /[^.]+$/.exec(Ao && Ao.keys && Ao.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Wc(r) {
  return !!Es && Es in r;
}
n(Wc, "isMasked");
var zc = Wc, $c = Function.prototype, Yc = $c.toString;
function Kc(r) {
  if (r != null) {
    try {
      return Yc.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
n(Kc, "toSource");
var Xc = Kc, Jc = /[\\^$.*+?()[\]{}|]/g, Qc = /^\[object .+?Constructor\]$/, Zc = Function.prototype, ep = Object.prototype, rp = Zc.toString,
tp = ep.hasOwnProperty, op = RegExp(
  "^" + rp.call(tp).replace(Jc, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function np(r) {
  if (!Ps(r) || zc(r))
    return !1;
  var e = Vc(r) ? op : Qc;
  return e.test(Xc(r));
}
n(np, "baseIsNative");
var sp = np;
function ip(r, e) {
  return r?.[e];
}
n(ip, "getValue");
var ap = ip;
function lp(r, e) {
  var t = ap(r, e);
  return sp(t) ? t : void 0;
}
n(lp, "getNative");
var Os = lp;
function cp(r, e) {
  return r === e || r !== r && e !== e;
}
n(cp, "eq");
var pp = cp, dp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, up = /^\w*$/;
function fp(r, e) {
  if (_o(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || wo(r) ? !0 : up.test(r) || !dp.test(r) || e != null && r in Object(
  e);
}
n(fp, "isKey");
var yp = fp, mp = Os(Object, "create"), br = mp;
function hp() {
  this.__data__ = br ? br(null) : {}, this.size = 0;
}
n(hp, "hashClear");
var gp = hp;
function Sp(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
n(Sp, "hashDelete");
var bp = Sp, Tp = "__lodash_hash_undefined__", Ep = Object.prototype, Rp = Ep.hasOwnProperty;
function Ap(r) {
  var e = this.__data__;
  if (br) {
    var t = e[r];
    return t === Tp ? void 0 : t;
  }
  return Rp.call(e, r) ? e[r] : void 0;
}
n(Ap, "hashGet");
var xp = Ap, vp = Object.prototype, wp = vp.hasOwnProperty;
function _p(r) {
  var e = this.__data__;
  return br ? e[r] !== void 0 : wp.call(e, r);
}
n(_p, "hashHas");
var Cp = _p, Pp = "__lodash_hash_undefined__";
function Op(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = br && e === void 0 ? Pp : e, this;
}
n(Op, "hashSet");
var Ip = Op;
function Je(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Je, "Hash");
Je.prototype.clear = gp;
Je.prototype.delete = bp;
Je.prototype.get = xp;
Je.prototype.has = Cp;
Je.prototype.set = Ip;
var Rs = Je;
function Fp() {
  this.__data__ = [], this.size = 0;
}
n(Fp, "listCacheClear");
var Np = Fp;
function Dp(r, e) {
  for (var t = r.length; t--; )
    if (pp(r[t][0], e))
      return t;
  return -1;
}
n(Dp, "assocIndexOf");
var dt = Dp, kp = Array.prototype, Lp = kp.splice;
function Mp(r) {
  var e = this.__data__, t = dt(e, r);
  if (t < 0)
    return !1;
  var o = e.length - 1;
  return t == o ? e.pop() : Lp.call(e, t, 1), --this.size, !0;
}
n(Mp, "listCacheDelete");
var jp = Mp;
function Up(r) {
  var e = this.__data__, t = dt(e, r);
  return t < 0 ? void 0 : e[t][1];
}
n(Up, "listCacheGet");
var Gp = Up;
function qp(r) {
  return dt(this.__data__, r) > -1;
}
n(qp, "listCacheHas");
var Bp = qp;
function Vp(r, e) {
  var t = this.__data__, o = dt(t, r);
  return o < 0 ? (++this.size, t.push([r, e])) : t[o][1] = e, this;
}
n(Vp, "listCacheSet");
var Hp = Vp;
function Qe(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Qe, "ListCache");
Qe.prototype.clear = Np;
Qe.prototype.delete = jp;
Qe.prototype.get = Gp;
Qe.prototype.has = Bp;
Qe.prototype.set = Hp;
var Wp = Qe, zp = Os(vo, "Map"), $p = zp;
function Yp() {
  this.size = 0, this.__data__ = {
    hash: new Rs(),
    map: new ($p || Wp)(),
    string: new Rs()
  };
}
n(Yp, "mapCacheClear");
var Kp = Yp;
function Xp(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
n(Xp, "isKeyable");
var Jp = Xp;
function Qp(r, e) {
  var t = r.__data__;
  return Jp(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
n(Qp, "getMapData");
var ut = Qp;
function Zp(r) {
  var e = ut(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
n(Zp, "mapCacheDelete");
var ed = Zp;
function rd(r) {
  return ut(this, r).get(r);
}
n(rd, "mapCacheGet");
var td = rd;
function od(r) {
  return ut(this, r).has(r);
}
n(od, "mapCacheHas");
var nd = od;
function sd(r, e) {
  var t = ut(this, r), o = t.size;
  return t.set(r, e), this.size += t.size == o ? 0 : 1, this;
}
n(sd, "mapCacheSet");
var id = sd;
function Ze(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Ze, "MapCache");
Ze.prototype.clear = Kp;
Ze.prototype.delete = ed;
Ze.prototype.get = td;
Ze.prototype.has = nd;
Ze.prototype.set = id;
var Is = Ze, ad = "Expected a function";
function Co(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(ad);
  var t = /* @__PURE__ */ n(function() {
    var o = arguments, s = e ? e.apply(this, o) : o[0], i = t.cache;
    if (i.has(s))
      return i.get(s);
    var a = r.apply(this, o);
    return t.cache = i.set(s, a) || i, a;
  }, "memoized");
  return t.cache = new (Co.Cache || Is)(), t;
}
n(Co, "memoize");
Co.Cache = Is;
var ld = Co, cd = 500;
function pd(r) {
  var e = ld(r, function(o) {
    return t.size === cd && t.clear(), o;
  }), t = e.cache;
  return e;
}
n(pd, "memoizeCapped");
var dd = pd, ud = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, fd = /\\(\\)?/g, yd = dd(
function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(ud, function(t, o, s, i) {
    e.push(s ? i.replace(fd, "$1") : o || t);
  }), e;
}), md = yd;
function hd(r) {
  return r == null ? "" : Lc(r);
}
n(hd, "toString");
var gd = hd;
function Sd(r, e) {
  return _o(r) ? r : yp(r, e) ? [r] : md(gd(r));
}
n(Sd, "castPath");
var bd = Sd, Td = 1 / 0;
function Ed(r) {
  if (typeof r == "string" || wo(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Td ? "-0" : e;
}
n(Ed, "toKey");
var Rd = Ed;
function Ad(r, e) {
  e = bd(e, r);
  for (var t = 0, o = e.length; r != null && t < o; )
    r = r[Rd(e[t++])];
  return t && t == o ? r : void 0;
}
n(Ad, "baseGet");
var xd = Ad;
function vd(r, e, t) {
  var o = r == null ? void 0 : xd(r, e);
  return o === void 0 ? t : o;
}
n(vd, "get");
var wd = vd, pt = dc, _d = /* @__PURE__ */ n((r) => {
  let e = null, t = !1, o = !1, s = !1, i = "";
  if (r.indexOf("//") >= 0 || r.indexOf("/*") >= 0)
    for (let a = 0; a < r.length; a += 1)
      !e && !t && !o && !s ? r[a] === '"' || r[a] === "'" || r[a] === "`" ? e = r[a] : r[a] === "/" && r[a + 1] === "*" ? t = !0 : r[a] === "\
/" && r[a + 1] === "/" ? o = !0 : r[a] === "/" && r[a + 1] !== "/" && (s = !0) : (e && (r[a] === e && r[a - 1] !== "\\" || r[a] === `
` && e !== "`") && (e = null), s && (r[a] === "/" && r[a - 1] !== "\\" || r[a] === `
`) && (s = !1), t && r[a - 1] === "/" && r[a - 2] === "*" && (t = !1), o && r[a] === `
` && (o = !1)), !t && !o && (i += r[a]);
  else
    i = r;
  return i;
}, "removeCodeComments"), Cd = (0, Fs.default)(1e4)(
  (r) => _d(r).replace(/\n\s*/g, "").trim()
), Pd = /* @__PURE__ */ n(function(e, t) {
  let o = t.slice(0, t.indexOf("{")), s = t.slice(t.indexOf("{"));
  if (o.includes("=>") || o.includes("function"))
    return t;
  let i = o;
  return i = i.replace(e, "function"), i + s;
}, "convertShorthandMethods2"), Od = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, Tr = /* @__PURE__ */ n((r) => r.match(/^[\[\{\"\}].*[\]\}\"]$/),
"isJSON");
function Ns(r) {
  if (!pt(r))
    return r;
  let e = r, t = !1;
  return typeof Event < "u" && r instanceof Event && (e = hs(e), t = !0), e = Object.keys(e).reduce((o, s) => {
    try {
      e[s] && e[s].toJSON, o[s] = e[s];
    } catch {
      t = !0;
    }
    return o;
  }, {}), t ? e : r;
}
n(Ns, "convertUnconventionalData");
var Id = /* @__PURE__ */ n(function(e) {
  let t, o, s, i;
  return /* @__PURE__ */ n(function(c, l) {
    try {
      if (c === "")
        return i = [], t = /* @__PURE__ */ new Map([[l, "[]"]]), o = /* @__PURE__ */ new Map(), s = [], l;
      let p = o.get(this) || this;
      for (; s.length && p !== s[0]; )
        s.shift(), i.pop();
      if (typeof l == "boolean")
        return l;
      if (l === void 0)
        return e.allowUndefined ? "_undefined_" : void 0;
      if (l === null)
        return null;
      if (typeof l == "number")
        return l === -1 / 0 ? "_-Infinity_" : l === 1 / 0 ? "_Infinity_" : Number.isNaN(l) ? "_NaN_" : l;
      if (typeof l == "bigint")
        return `_bigint_${l.toString()}`;
      if (typeof l == "string")
        return Od.test(l) ? e.allowDate ? `_date_${l}` : void 0 : l;
      if ((0, lc.default)(l))
        return e.allowRegExp ? `_regexp_${l.flags}|${l.source}` : void 0;
      if ((0, cc.default)(l)) {
        if (!e.allowFunction)
          return;
        let { name: d } = l, h = l.toString();
        return h.match(
          /(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/
        ) ? `_function_${d}|${(() => {
        }).toString()}` : `_function_${d}|${Cd(Pd(c, h))}`;
      }
      if ((0, pc.default)(l)) {
        if (!e.allowSymbol)
          return;
        let d = Symbol.keyFor(l);
        return d !== void 0 ? `_gsymbol_${d}` : `_symbol_${l.toString().slice(7, -1)}`;
      }
      if (s.length >= e.maxDepth)
        return Array.isArray(l) ? `[Array(${l.length})]` : "[Object]";
      if (l === this)
        return `_duplicate_${JSON.stringify(i)}`;
      if (l instanceof Error && e.allowError)
        return {
          __isConvertedError__: !0,
          errorProperties: {
            ...l.cause ? { cause: l.cause } : {},
            ...l,
            name: l.name,
            message: l.message,
            stack: l.stack,
            "_constructor-name_": l.constructor.name
          }
        };
      if (l.constructor && l.constructor.name && l.constructor.name !== "Object" && !Array.isArray(l) && !e.allowClass)
        return;
      let u = t.get(l);
      if (!u) {
        let d = Array.isArray(l) ? l : Ns(l);
        if (l.constructor && l.constructor.name && l.constructor.name !== "Object" && !Array.isArray(l) && e.allowClass)
          try {
            Object.assign(d, { "_constructor-name_": l.constructor.name });
          } catch {
          }
        return i.push(c), s.unshift(d), t.set(l, JSON.stringify(i)), l !== d && o.set(l, d), d;
      }
      return `_duplicate_${u}`;
    } catch {
      return;
    }
  }, "replace");
}, "replacer2"), Fd = /* @__PURE__ */ n(function reviver(options) {
  let refs = [], root;
  return /* @__PURE__ */ n(function revive(key, value) {
    if (key === "" && (root = value, refs.forEach(({ target: r, container: e, replacement: t }) => {
      let o = Tr(t) ? JSON.parse(t) : t.split(".");
      o.length === 0 ? e[r] = root : e[r] = wd(root, o);
    })), key === "_constructor-name_")
      return value;
    if (pt(value) && value.__isConvertedError__) {
      let { message: r, ...e } = value.errorProperties, t = new Error(r);
      return Object.assign(t, e), t;
    }
    if (pt(value) && value["_constructor-name_"] && options.allowFunction) {
      let r = value["_constructor-name_"];
      if (r !== "Object") {
        let e = new Function(`return function ${r.replace(/[^a-zA-Z0-9$_]+/g, "")}(){}`)();
        Object.setPrototypeOf(value, new e());
      }
      return delete value["_constructor-name_"], value;
    }
    if (typeof value == "string" && value.startsWith("_function_") && options.allowFunction) {
      let [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [], sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, "");
      if (!options.lazyEval)
        return eval(`(${sourceSanitized})`);
      let result = /* @__PURE__ */ n((...args) => {
        let f = eval(`(${sourceSanitized})`);
        return f(...args);
      }, "result");
      return Object.defineProperty(result, "toString", {
        value: /* @__PURE__ */ n(() => sourceSanitized, "value")
      }), Object.defineProperty(result, "name", {
        value: name
      }), result;
    }
    if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
      let [, r, e] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
      return new RegExp(e, r);
    }
    return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value ==
    "string" && value.startsWith("_duplicate_") ? (refs.push({ target: key, container: this, replacement: value.replace(/^_duplicate_/, "") }),
    null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value ==
    "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" &&
    value === "_-Infinity_" ? -1 / 0 : typeof value == "string" && value === "_Infinity_" ? 1 / 0 : typeof value == "string" && value === "_\
NaN_" ? NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) :
    value;
  }, "revive");
}, "reviver"), Ds = {
  maxDepth: 10,
  space: void 0,
  allowFunction: !0,
  allowRegExp: !0,
  allowDate: !0,
  allowClass: !0,
  allowError: !0,
  allowUndefined: !0,
  allowSymbol: !0,
  lazyEval: !0
}, ft = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Ds, ...e };
  return JSON.stringify(Ns(r), Id(t), e.space);
}, "stringify"), Nd = /* @__PURE__ */ n(() => {
  let r = /* @__PURE__ */ new Map();
  return /* @__PURE__ */ n(function e(t) {
    pt(t) && Object.entries(t).forEach(([o, s]) => {
      s === "_undefined_" ? t[o] = void 0 : r.get(s) || (r.set(s, !0), e(s));
    }), Array.isArray(t) && t.forEach((o, s) => {
      o === "_undefined_" ? (r.set(o, !0), t[s] = void 0) : r.get(o) || (r.set(o, !0), e(o));
    });
  }, "mutateUndefined");
}, "mutator"), yt = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Ds, ...e }, o = JSON.parse(r, Fd(t));
  return Nd()(o), o;
}, "parse");

// ../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var Dd = !0, Po = "Invariant failed";
function fe(r, e) {
  if (!r) {
    if (Dd)
      throw new Error(Po);
    var t = typeof e == "function" ? e() : e, o = t ? "".concat(Po, ": ").concat(t) : Po;
    throw new Error(o);
  }
}
n(fe, "invariant");

// src/preview-errors.ts
var Nr = {};
Ce(Nr, {
  CalledExtractOnStoreError: () => Ar,
  CalledPreviewMethodBeforeInitializationError: () => V,
  Category: () => Ls,
  EmptyIndexError: () => _r,
  ImplicitActionsDuringRendering: () => Oo,
  InvalidChannelPageError: () => Er,
  MdxFileWithNoCsfReferencesError: () => wr,
  MissingRenderToCanvasError: () => xr,
  MissingStoryAfterHmrError: () => Rr,
  MissingStoryFromCsfFileError: () => Pr,
  MountMustBeDestructuredError: () => Ie,
  NextJsSharpError: () => Io,
  NextjsRouterMocksNotAvailable: () => Fo,
  NoRenderFunctionError: () => Ir,
  NoStoryMatchError: () => Cr,
  NoStoryMountedError: () => Fr,
  StoryIndexFetchError: () => vr,
  StoryStoreAccessedBeforeInitializationError: () => Or,
  UnknownArgTypesError: () => No,
  UnsupportedViewportDimensionError: () => Do
});

// src/storybook-error.ts
function ks({
  code: r,
  category: e
}) {
  let t = String(r).padStart(4, "0");
  return `SB_${e}_${t}`;
}
n(ks, "parseErrorCode");
var mt = class mt extends Error {
  constructor(t) {
    super(mt.getFullMessage(t));
    /**
     * Data associated with the error. Used to provide additional information in the error message or
     * to be passed to telemetry.
     */
    this.data = {};
    /** Flag used to easily determine if the error originates from Storybook. */
    this.fromStorybook = !0;
    this.category = t.category, this.documentation = t.documentation ?? !1, this.code = t.code;
  }
  get fullErrorCode() {
    return ks({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let t = this.constructor.name;
    return `${this.fullErrorCode} (${t})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: t,
    code: o,
    category: s,
    message: i
  }) {
    let a;
    return t === !0 ? a = `https://storybook.js.org/error/${ks({ code: o, category: s })}` : typeof t == "string" ? a = t : Array.isArray(t) &&
    (a = `
${t.map((c) => `	- ${c}`).join(`
`)}`), `${i}${a != null ? `

More info: ${a}
` : ""}`;
  }
};
n(mt, "StorybookError");
var U = mt;

// src/preview-errors.ts
var Ls = /* @__PURE__ */ ((b) => (b.BLOCKS = "BLOCKS", b.DOCS_TOOLS = "DOCS-TOOLS", b.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER", b.PREVIEW_CHANNELS =
"PREVIEW_CHANNELS", b.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS", b.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER", b.PREVIEW_API = "PREVIEW\
_API", b.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM", b.PREVIEW_ROUTER = "PREVIEW_ROUTER", b.PREVIEW_THEMING = "PREVIEW_THEMING", b.RENDERER_HTML =
"RENDERER_HTML", b.RENDERER_PREACT = "RENDERER_PREACT", b.RENDERER_REACT = "RENDERER_REACT", b.RENDERER_SERVER = "RENDERER_SERVER", b.RENDERER_SVELTE =
"RENDERER_SVELTE", b.RENDERER_VUE = "RENDERER_VUE", b.RENDERER_VUE3 = "RENDERER_VUE3", b.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS",
b.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS", b.ADDON_VITEST = "ADDON_VITEST", b))(Ls || {}), ko = class ko extends U {
  constructor(t) {
    super({
      category: "PREVIEW_CHANNELS",
      code: 1,
      message: `The postMessage channel transport needs "config.page" to be "manager" or "preview", but received "${t.page}".`
    });
    this.data = t;
  }
};
n(ko, "InvalidChannelPageError");
var Er = ko, Lo = class Lo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 1,
      message: _`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`
    });
    this.data = t;
  }
};
n(Lo, "MissingStoryAfterHmrError");
var Rr = Lo, Mo = class Mo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 2,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-\
for-example-in-the-play-function",
      message: _`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${t.deprecated ? `
This is deprecated and won't work in Storybook 8 anymore.
` : ""}
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`
    });
    this.data = t;
  }
};
n(Mo, "ImplicitActionsDuringRendering");
var Oo = Mo, jo = class jo extends U {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 3,
      message: _`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`
    });
  }
};
n(jo, "CalledExtractOnStoreError");
var Ar = jo, Uo = class Uo extends U {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 4,
      message: _`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field"
    });
  }
};
n(Uo, "MissingRenderToCanvasError");
var xr = Uo, Go = class Go extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 5,
      message: _`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`
    });
    this.data = t;
  }
};
n(Go, "CalledPreviewMethodBeforeInitializationError");
var V = Go, qo = class qo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 6,
      message: _`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`
    });
    this.data = t;
  }
};
n(qo, "StoryIndexFetchError");
var vr = qo, Bo = class Bo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 7,
      message: _`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`
    });
    this.data = t;
  }
};
n(Bo, "MdxFileWithNoCsfReferencesError");
var wr = Bo, Vo = class Vo extends U {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 8,
      message: _`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`
    });
  }
};
n(Vo, "EmptyIndexError");
var _r = Vo, Ho = class Ho extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 9,
      message: _`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`
    });
    this.data = t;
  }
};
n(Ho, "NoStoryMatchError");
var Cr = Ho, Wo = class Wo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 10,
      message: _`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`
    });
    this.data = t;
  }
};
n(Wo, "MissingStoryFromCsfFileError");
var Pr = Wo, zo = class zo extends U {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 11,
      message: _`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`
    });
  }
};
n(zo, "StoryStoreAccessedBeforeInitializationError");
var Or = zo, $o = class $o extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 12,
      message: _`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`
    });
    this.data = t;
  }
};
n($o, "MountMustBeDestructuredError");
var Ie = $o, Yo = class Yo extends U {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 14,
      message: _`
        No render function available for storyId '${t.id}'
      `
    });
    this.data = t;
  }
};
n(Yo, "NoRenderFunctionError");
var Ir = Yo, Ko = class Ko extends U {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 15,
      message: _`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `
    });
  }
};
n(Ko, "NoStoryMountedError");
var Fr = Ko, Xo = class Xo extends U {
  constructor() {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 1,
      documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
      message: _`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `
    });
  }
};
n(Xo, "NextJsSharpError");
var Io = Xo, Jo = class Jo extends U {
  constructor(t) {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 2,
      message: _`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `
    });
    this.data = t;
  }
};
n(Jo, "NextjsRouterMocksNotAvailable");
var Fo = Jo, Qo = class Qo extends U {
  constructor(t) {
    super({
      category: "DOCS-TOOLS",
      code: 1,
      documentation: "https://github.com/storybookjs/storybook/issues/26606",
      message: _`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `
    });
    this.data = t;
  }
};
n(Qo, "UnknownArgTypesError");
var No = Qo, Zo = class Zo extends U {
  constructor(t) {
    super({
      category: "ADDON_VITEST",
      code: 1,
      // TODO: Add documentation about viewports support
      // documentation: '',
      message: _`
        Encountered an unsupported value "${t.value}" when setting the viewport ${t.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `
    });
    this.data = t;
  }
};
n(Zo, "UnsupportedViewportDimensionError");
var Do = Zo;

// src/shared/utils/local-hosts.ts
var Ms = ["localhost", "*.localhost", "127.0.0.1"], js = /* @__PURE__ */ n((r, e) => e.some(
  (t) => t.startsWith("*.") ? r.endsWith(t.slice(1)) : r === t
), "matchesHostname");

// src/channels/postmessage/getEventSourceUrl.ts
var Us = /* @__PURE__ */ n((r) => {
  let e = Array.from(
    document.querySelectorAll("iframe[data-is-storybook]")
  ), [t, ...o] = e.filter((i) => {
    try {
      return i.contentWindow?.location.origin === r.source.location.origin && i.contentWindow?.location.pathname === r.source.location.pathname;
    } catch {
    }
    try {
      return i.contentWindow === r.source;
    } catch {
    }
    let a = i.getAttribute("src"), c;
    try {
      if (!a)
        return !1;
      ({ origin: c } = new URL(a, document.location.toString()));
    } catch {
      return !1;
    }
    return c === r.origin;
  }), s = t?.getAttribute("src");
  if (s && o.length === 0) {
    let { protocol: i, host: a, pathname: c } = new URL(s, document.location.toString());
    return `${i}//${a}${c}`;
  }
  return o.length > 0 && I.error("found multiple candidates for event source"), null;
}, "getEventSourceUrl");

// src/channels/postmessage/index.ts
var { document: Fe, location: be } = E, ht = "storybook-channel", kd = { allowFunction: !1, maxDepth: 25 }, Ld = /* @__PURE__ */ n(() => {
  try {
    let r = Fe?.referrer && new URL(Fe.referrer).origin;
    return r && r !== "null" ? r : null;
  } catch {
    return null;
  }
}, "getReferrerOrigin"), Md = /* @__PURE__ */ n((r) => {
  try {
    return r.location.href === "about:blank";
  } catch {
    return !1;
  }
}, "isOnInitialBlankDocument"), jd = /* @__PURE__ */ n(() => {
  let r = be?.origin;
  return E.CONFIG_TYPE !== "DEVELOPMENT" || !r || r === "null" ? null : (e) => {
    if (e === r)
      return !0;
    try {
      return js(new URL(e).hostname, Ms);
    } catch {
      return !1;
    }
  };
}, "getOriginValidator"), en = class en {
  constructor(e) {
    this.config = e;
    this.connected = !1;
    this.rejectedOrigins = /* @__PURE__ */ new Set();
    if (this.buffer = [], this.originValidator = jd(), this.insecureIframeMessaging = E.INSECURE_IFRAME_MESSAGING === !0, this.pinsTargetOrigin =
    E.CONFIG_TYPE === "DEVELOPMENT" && !this.insecureIframeMessaging, typeof E?.addEventListener == "function" && E.addEventListener("messag\
e", this.handleEvent.bind(this), !1), e.page !== "manager" && e.page !== "preview")
      throw new Er({ page: e.page });
  }
  setHandler(e) {
    this.handler = (...t) => {
      e.apply(this, t), !this.connected && this.getLocalFrame().length && (this.flush(), this.connected = !0);
    };
  }
  /**
   * Sends `event` to the associated window. If the window does not yet exist the event will be
   * stored in a buffer and sent when the window exists.
   *
   * @param event
   */
  send(e, t) {
    let {
      target: o,
      // telejson options
      allowRegExp: s,
      allowFunction: i,
      allowSymbol: a,
      allowDate: c,
      allowError: l,
      allowUndefined: p,
      allowClass: u,
      maxDepth: d,
      space: h,
      lazyEval: S
    } = t || {}, m = Object.fromEntries(
      Object.entries({
        allowRegExp: s,
        allowFunction: i,
        allowSymbol: a,
        allowDate: c,
        allowError: l,
        allowUndefined: p,
        allowClass: u,
        maxDepth: d,
        space: h,
        lazyEval: S
      }).filter(([g, b]) => typeof b < "u")
    ), T = {
      ...kd,
      ...E.CHANNEL_OPTIONS || {},
      ...m
    }, y = this.getFrames(o), R = new URLSearchParams(be?.search || ""), x = ft(
      {
        key: ht,
        event: e,
        refId: R.get("refId")
      },
      T
    );
    return y.length ? (this.buffer.length && this.flush(), y.forEach(({ contentWindow: g, targetOrigin: b }) => {
      if (!(this.config.page === "manager" && Md(g)))
        try {
          g.postMessage(x, this.pinsTargetOrigin ? b : "*");
        } catch {
          I.error("sending over postmessage fail");
        }
    }), Promise.resolve(null)) : new Promise((g, b) => {
      this.buffer.push({ event: e, resolve: g, reject: b });
    });
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => {
      this.send(t.event).then(t.resolve).catch(t.reject);
    });
  }
  getFrames(e) {
    if (this.config.page === "manager") {
      let o = Array.from(
        Fe.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")
      ).flatMap((s) => {
        try {
          return s.contentWindow && s.dataset.isStorybook !== void 0 && s.id === e ? [
            { contentWindow: s.contentWindow, targetOrigin: this.getIframeTargetOrigin(s) }
          ] : [];
        } catch {
          return [];
        }
      });
      return o?.length ? o : this.getCurrentFrames();
    }
    return E && E.parent && E.parent !== E.self ? [{ contentWindow: E.parent, targetOrigin: this.getManagerTargetOrigin() }] : [];
  }
  getCurrentFrames() {
    return this.config.page === "manager" ? Array.from(
      Fe.querySelectorAll('[data-is-storybook="true"]')
    ).flatMap(
      (t) => t.contentWindow ? [{ contentWindow: t.contentWindow, targetOrigin: this.getIframeTargetOrigin(t) }] : []
    ) : E && E.parent ? [{ contentWindow: E.parent, targetOrigin: this.getManagerTargetOrigin() }] : [];
  }
  getIframeTargetOrigin(e) {
    let t = e.getAttribute("src");
    if (t)
      try {
        let { origin: o } = new URL(t, Fe.location.toString());
        if (o !== "null")
          return o;
      } catch {
      }
    return be?.origin && be.origin !== "null" ? be.origin : "*";
  }
  // In composition the manager lives on a different origin than this preview; the referrer
  // identifies which host embedded it.
  getManagerTargetOrigin() {
    let e = Ld();
    return this.originValidator ? e !== null && this.originValidator(e) ? e : be.origin : e ?? "*";
  }
  getLocalFrame() {
    return this.config.page === "manager" ? Array.from(
      Fe.querySelectorAll("#storybook-preview-iframe")
    ).flatMap((t) => t.contentWindow ? [t.contentWindow] : []) : E && E.parent ? [E.parent] : [];
  }
  isAllowedSender(e) {
    return this.insecureIframeMessaging ? !0 : this.config.page === "manager" ? this.isAllowedToContactManager(e) : this.config.page === "pr\
eview" ? this.isAllowedToContactPreview(e) : !1;
  }
  // A dev-mode preview only accepts messages from its own origin and from local hosts. A built
  // preview, or one served from an opaque origin, has no validator and accepts any message.
  isAllowedToContactPreview(e) {
    return !this.originValidator || this.originValidator(e.origin) ? !0 : (this.warnOnceAboutRejectedSender(
      e,
      `Ignored Storybook channel message from unexpected origin "${e.origin}". While it runs in dev mode, this preview only accepts messages\
 from local hosts and its own origin. To accept messages from any origin, set "security.insecureIframeMessaging" to true in the main config \
of the Storybook serving this preview.`
    ), !1);
  }
  // A channel message reaches the manager only from a preview iframe it rendered itself: the local
  // preview or a composed ref. `event.source` is set by the browser and cannot be forged, but it
  // survives navigation, so in dev mode the message must also come from the origin the iframe was given.
  isAllowedToContactManager(e) {
    let t = e.source ? Array.from(Fe.querySelectorAll("iframe")).find(
      (o) => o.contentWindow === e.source
    ) : void 0;
    if (t?.hasAttribute("data-is-storybook")) {
      if (!this.pinsTargetOrigin)
        return !0;
      let o = this.getIframeTargetOrigin(t);
      return o === "*" || o === e.origin ? !0 : (this.warnOnceAboutRejectedSender(
        e,
        `Ignored Storybook channel message from a registered preview iframe that is on origin "${e.origin}" instead of "${o}". While it runs\
 in dev mode, the manager only accepts channel messages from the origin each preview iframe was given, so a page the iframe navigated to can\
not send them. To accept messages from any origin, set "security.insecureIframeMessaging" to true.`
      ), !1);
    }
    return this.warnOnceAboutRejectedSender(
      e,
      `Ignored Storybook channel message from a window that is not a registered preview iframe (origin "${e.origin}"). The manager only acce\
pts channel messages from its own preview and composed Storybook iframes, never from a page that embeds it. To accept messages from any wind\
ow, set "security.insecureIframeMessaging" to true.`
    ), !1;
  }
  warnOnceAboutRejectedSender(e, t) {
    (typeof e.data == "string" ? e.data.includes(ht) : e.data?.key === ht) && !this.rejectedOrigins.has(e.origin) && (this.rejectedOrigins.add(
    e.origin), I.warn(t));
  }
  handleEvent(e) {
    try {
      if (!this.isAllowedSender(e))
        return;
      let { data: t } = e, { key: o, event: s, refId: i } = typeof t == "string" && Tr(t) ? yt(t, E.CHANNEL_OPTIONS || {}) : t;
      if (o === ht) {
        let a = this.config.page === "manager" ? '<span style="color: #37D5D3; background: black"> manager </span>' : '<span style="color: #\
1EA7FD; background: black"> preview </span>', c = Object.values(ge).includes(s.type) ? `<span style="color: #FF4785">${s.type}</span>` : `<s\
pan style="color: #FFAE00">${s.type}</span>`;
        if (i && (s.refId = i), s.source = this.config.page === "preview" ? e.origin : Us(e), !s.source) {
          X.error(
            `${a} received ${c} but was unable to determine the source of the event`
          );
          return;
        }
        let l = `${a} received ${c} (${t.length})`;
        X.debug(
          be.origin !== s.source ? l : `${l} <span style="color: gray">(on ${be.origin} from ${s.source})</span>`,
          ...s.args
        ), fe(this.handler, "ChannelHandler should be set"), this.handler(s);
      }
    } catch (t) {
      I.error(t);
    }
  }
};
n(en, "PostMessageTransport");
var er = en;

// src/channels/websocket/index.ts
var { WebSocket: Ud } = E, rn = 15e3, tn = 5e3, on = class on {
  constructor({ url: e, onError: t, page: o }) {
    this.buffer = [];
    this.isReady = !1;
    this.isClosed = !1;
    this.pingTimeout = 0;
    this.socket = new Ud(e), this.socket.onopen = () => {
      this.isReady = !0, this.heartbeat(), this.flush();
    }, this.socket.onmessage = ({ data: s }) => {
      let i = typeof s == "string" && Tr(s) ? yt(s) : s;
      fe(this.handler, "WebsocketTransport handler should be set"), this.handler(i), i.type === "ping" && (this.heartbeat(), this.send({ type: "\
pong" }));
    }, this.socket.onerror = (s) => {
      t && t(s);
    }, this.socket.onclose = (s) => {
      fe(this.handler, "WebsocketTransport handler should be set"), this.handler({
        type: Xt,
        args: [{ reason: s.reason, code: s.code }],
        from: o || "preview"
      }), this.isClosed = !0, clearTimeout(this.pingTimeout);
    };
  }
  heartbeat() {
    clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
      this.socket.close(3008, "timeout");
    }, rn + tn);
  }
  setHandler(e) {
    this.handler = e;
  }
  send(e) {
    this.isClosed || (this.isReady ? this.sendNow(e) : this.sendLater(e));
  }
  sendLater(e) {
    this.buffer.push(e);
  }
  sendNow(e) {
    let t = ft(e, {
      maxDepth: 15,
      allowFunction: !1,
      ...E.CHANNEL_OPTIONS
    });
    this.socket.send(t);
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => this.send(t));
  }
};
n(on, "WebsocketTransport");
var rr = on;

// src/channels/index.ts
var { CHANNEL_OPTIONS: Gd, CONFIG_TYPE: qd } = E, Bd = ie;
function Vd({ page: r, extraTransports: e = [] }) {
  let t = [new er({ page: r }), ...e];
  if (qd === "DEVELOPMENT") {
    let s = window.location.protocol === "http:" ? "ws" : "wss", { hostname: i, port: a } = window.location, { wsToken: c } = Gd || {}, l = `${s}\
://${i}:${a}/storybook-server-channel?token=${c}&page=${r}`;
    t.push(new rr({ url: l, onError: /* @__PURE__ */ n(() => {
    }, "onError"), page: r }));
  }
  let o = new ie({ transports: t });
  return Q.__prepare(
    o,
    r === "manager" ? Q.Environment.MANAGER : Q.Environment.PREVIEW
  ), o;
}
n(Vd, "createBrowserChannel");

// src/types/index.ts
var kr = {};
Ce(kr, {
  Addon_TypesEnum: () => Gs
});

// src/types/modules/addons.ts
var Gs = /* @__PURE__ */ ((p) => (p.TAB = "tab", p.PANEL = "panel", p.TOOL = "tool", p.TOOLEXTRA = "toolextra", p.PREVIEW = "preview", p.experimental_PAGE =
"page", p.experimental_SIDEBAR_BOTTOM = "sidebar-bottom", p.experimental_SIDEBAR_TOP = "sidebar-top", p.experimental_TEST_PROVIDER = "test-p\
rovider", p))(Gs || {});

// src/preview-api/index.ts
var Jr = {};
Ce(Jr, {
  DocsContext: () => me,
  HooksContext: () => Te,
  Preview: () => Ge,
  PreviewWeb: () => Kr,
  PreviewWithSelection: () => qe,
  ReporterAPI: () => Re,
  StoryStore: () => je,
  UrlStore: () => He,
  WebView: () => ze,
  addons: () => te,
  applyHooks: () => St,
  combineArgs: () => nr,
  combineParameters: () => Y,
  composeConfigs: () => Me,
  composeStepRunners: () => Ft,
  composeStories: () => Wi,
  composeStory: () => Fn,
  createPlaywrightTest: () => zi,
  decorateStory: () => _n,
  defaultDecorateStory: () => Pt,
  definePreview: () => qs,
  experimental_MockUniversalStore: () => Rt,
  experimental_UniversalStore: () => Q,
  experimental_useUniversalStore: () => xi,
  filterArgTypes: () => qr,
  getCsfFactoryAnnotations: () => Nt,
  inferControls: () => lr,
  makeDecorator: () => Zs,
  mockChannel: () => gt,
  normalizeProjectAnnotations: () => Le,
  normalizeStory: () => ke,
  prepareMeta: () => Ot,
  prepareStory: () => ar,
  sanitizeStoryContextUpdate: () => Cn,
  setDefaultProjectAnnotations: () => Vi,
  setProjectAnnotations: () => Hi,
  simulateDOMContentLoaded: () => Xr,
  simulatePageLoad: () => ls,
  sortStoriesV7: () => Zi,
  useArgs: () => Js,
  useCallback: () => tr,
  useChannel: () => Ks,
  useEffect: () => Lr,
  useGlobals: () => Qs,
  useMemo: () => Hs,
  useParameter: () => Xs,
  useReducer: () => Ys,
  useRef: () => zs,
  useState: () => Tt,
  useStoryContext: () => Mr,
  userOrAutoTitle: () => Xi,
  userOrAutoTitleFromSpecifier: () => kn
});

// src/preview-api/modules/addons/storybook-channel-mock.ts
function gt() {
  let r = {
    setHandler: /* @__PURE__ */ n(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ n(() => {
    }, "send")
  };
  return new ie({ transport: r });
}
n(gt, "mockChannel");

// src/preview-api/modules/addons/main.ts
var an = class an {
  constructor() {
    this.getChannel = /* @__PURE__ */ n(() => {
      if (!this.channel) {
        let e = gt();
        return this.setChannel(e), e;
      }
      return this.channel;
    }, "getChannel");
    this.ready = /* @__PURE__ */ n(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ n(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ n((e) => {
      this.channel = e, this.resolve();
    }, "setChannel");
    this.promise = new Promise((e) => {
      this.resolve = () => e(this.getChannel());
    });
  }
};
n(an, "AddonStore");
var sn = an, nn = "__STORYBOOK_ADDONS_PREVIEW";
function Hd() {
  return E[nn] || (E[nn] = new sn()), E[nn];
}
n(Hd, "getAddonsStore");
var te = Hd();

// src/preview-api/modules/addons/definePreview.ts
function qs(r) {
  return r;
}
n(qs, "definePreview");

// src/preview-api/modules/addons/hooks.ts
var dn = class dn {
  constructor() {
    this.hookListsMap = void 0;
    this.mountedDecorators = void 0;
    this.prevMountedDecorators = void 0;
    this.currentHooks = void 0;
    this.nextHookIndex = void 0;
    this.currentPhase = void 0;
    this.currentEffects = void 0;
    this.prevEffects = void 0;
    this.currentDecoratorName = void 0;
    this.hasUpdates = void 0;
    this.currentContext = void 0;
    this.renderListener = /* @__PURE__ */ n((e) => {
      e === this.currentContext?.id && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
    }, "renderListener");
    this.init();
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(),
    this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName =
    null, this.hasUpdates = !1, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((e) => {
      e.destroy && e.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let e = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, e;
  }
  triggerEffects() {
    this.prevEffects.forEach((e) => {
      !this.currentEffects.includes(e) && e.destroy && e.destroy();
    }), this.currentEffects.forEach((e) => {
      this.prevEffects.includes(e) || (e.destroy = e.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), te.getChannel().on(Ye, this.renderListener);
  }
  removeRenderListeners() {
    te.getChannel().removeListener(Ye, this.renderListener);
  }
};
n(dn, "HooksContext");
var Te = dn;
function Bs(r) {
  let e = /* @__PURE__ */ n((...t) => {
    let { hooks: o } = typeof t[0] == "function" ? t[1] : t[0], s = o.currentPhase, i = o.currentHooks, a = o.nextHookIndex, c = o.currentDecoratorName;
    o.currentDecoratorName = r.name, o.prevMountedDecorators.has(r) ? (o.currentPhase = "UPDATE", o.currentHooks = o.hookListsMap.get(r) || []) :
    (o.currentPhase = "MOUNT", o.currentHooks = [], o.hookListsMap.set(r, o.currentHooks), o.prevMountedDecorators.add(r)), o.nextHookIndex =
    0;
    let l = E.STORYBOOK_HOOKS_CONTEXT;
    E.STORYBOOK_HOOKS_CONTEXT = o;
    let p = r(...t);
    if (E.STORYBOOK_HOOKS_CONTEXT = l, o.currentPhase === "UPDATE" && o.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o.currentPhase = s, o.currentHooks = i, o.nextHookIndex = a, o.currentDecoratorName = c, p;
  }, "hookified");
  return e.originalFn = r, e;
}
n(Bs, "hookify");
var ln = 0, Wd = 25, St = /* @__PURE__ */ n((r) => (e, t) => {
  let o = r(
    Bs(e),
    t.map((s) => Bs(s))
  );
  return (s) => {
    let { hooks: i } = s;
    i.prevMountedDecorators ??= /* @__PURE__ */ new Set(), i.mountedDecorators = /* @__PURE__ */ new Set([e, ...t]), i.currentContext = s, i.
    hasUpdates = !1;
    let a = o(s);
    for (ln = 1; i.hasUpdates; )
      if (i.hasUpdates = !1, i.currentEffects = [], a = o(s), ln += 1, ln > Wd)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return i.addRenderListeners(), a;
  };
}, "applyHooks"), zd = /* @__PURE__ */ n((r, e) => r.length === e.length && r.every((t, o) => t === e[o]), "areDepsEqual"), cn = /* @__PURE__ */ n(
() => new Error("Storybook preview hooks can only be called inside decorators and story functions."), "invalidHooksError");
function Vs() {
  return E.STORYBOOK_HOOKS_CONTEXT || null;
}
n(Vs, "getHooksContextOrNull");
function pn() {
  let r = Vs();
  if (r == null)
    throw cn();
  return r;
}
n(pn, "getHooksContextOrThrow");
function $d(r, e, t) {
  let o = pn();
  if (o.currentPhase === "MOUNT") {
    t != null && !Array.isArray(t) && I.warn(
      `${r} received a final argument that is not an array (instead, received ${t}). When specified, the final argument must be an array.`
    );
    let s = { name: r, deps: t };
    return o.currentHooks.push(s), e(s), s;
  }
  if (o.currentPhase === "UPDATE") {
    let s = o.getNextHook();
    if (s == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return s.name !== r && I.warn(
      `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This wi\
ll lead to bugs and errors if not fixed.`
    ), t != null && s.deps == null && I.warn(
      `${r} received a final argument during this render, but not during the previous render. Even though the final argument is optional, it\
s type cannot change between renders.`
    ), t != null && s.deps != null && t.length !== s.deps.length && I.warn(`The final argument passed to ${r} changed size between renders. \
The order and size of this array must remain constant.
Previous: ${s.deps}
Incoming: ${t}`), (t == null || s.deps == null || !zd(t, s.deps)) && (e(s), s.deps = t), s;
  }
  throw cn();
}
n($d, "useHook");
function bt(r, e, t) {
  let { memoizedState: o } = $d(
    r,
    (s) => {
      s.memoizedState = e();
    },
    t
  );
  return o;
}
n(bt, "useMemoLike");
function Hs(r, e) {
  return bt("useMemo", r, e);
}
n(Hs, "useMemo");
function tr(r, e) {
  return bt("useCallback", () => r, e);
}
n(tr, "useCallback");
function Ws(r, e) {
  return bt(r, () => ({ current: e }), []);
}
n(Ws, "useRefLike");
function zs(r) {
  return Ws("useRef", r);
}
n(zs, "useRef");
function Yd() {
  let r = Vs();
  if (r != null && r.currentPhase !== "NONE")
    r.hasUpdates = !0;
  else
    try {
      te.getChannel().emit(fr);
    } catch {
      I.warn("State updates of Storybook preview hooks work only in browser");
    }
}
n(Yd, "triggerUpdate");
function $s(r, e) {
  let t = Ws(
    r,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof e == "function" ? e() : e
  ), o = /* @__PURE__ */ n((s) => {
    t.current = typeof s == "function" ? s(t.current) : s, Yd();
  }, "setState");
  return [t.current, o];
}
n($s, "useStateLike");
function Tt(r) {
  return $s("useState", r);
}
n(Tt, "useState");
function Ys(r, e, t) {
  let o = t != null ? () => t(e) : e, [s, i] = $s("useReducer", o);
  return [s, /* @__PURE__ */ n((c) => i((l) => r(l, c)), "dispatch")];
}
n(Ys, "useReducer");
function Lr(r, e) {
  let t = pn(), o = bt("useEffect", () => ({ create: r }), e);
  t.currentEffects.includes(o) || t.currentEffects.push(o);
}
n(Lr, "useEffect");
function Ks(r, e = []) {
  let t = te.getChannel();
  return Lr(() => (Object.entries(r).forEach(([o, s]) => t.on(o, s)), () => {
    Object.entries(r).forEach(
      ([o, s]) => t.removeListener(o, s)
    );
  }), [...Object.keys(r), ...e]), tr(t.emit.bind(t), [t]);
}
n(Ks, "useChannel");
function Mr() {
  let { currentContext: r } = pn();
  if (r == null)
    throw cn();
  return r;
}
n(Mr, "useStoryContext");
function Xs(r, e) {
  let { parameters: t } = Mr();
  if (r)
    return t[r] ?? e;
}
n(Xs, "useParameter");
function Js() {
  let r = te.getChannel(), { id: e, args: t } = Mr(), o = tr(
    (i) => r.emit(hr, { storyId: e, updatedArgs: i }),
    [r, e]
  ), s = tr(
    (i) => r.emit(yr, { storyId: e, argNames: i }),
    [r, e]
  );
  return [t, o, s];
}
n(Js, "useArgs");
function Qs() {
  let r = te.getChannel(), { globals: e } = Mr(), t = tr(
    (o) => r.emit(mr, { globals: o }),
    [r]
  );
  return [e, t];
}
n(Qs, "useGlobals");

// src/preview-api/modules/addons/make-decorator.ts
var Zs = /* @__PURE__ */ n(({
  name: r,
  parameterName: e,
  wrapper: t,
  skipIfNoParametersOrOptions: o = !1
}) => {
  let s = /* @__PURE__ */ n((i) => (a, c) => {
    let l = c.parameters && c.parameters[e];
    return l && l.disable || o && !i && !l ? a(c) : t(a, c, {
      options: i,
      parameters: l
    });
  }, "decorator");
  return (...i) => typeof i[0] == "function" ? s()(...i) : (...a) => {
    if (a.length > 1)
      return i.length > 1 ? s(i)(...a) : s(...i)(...a);
    throw new Error(
      `Passing stories directly into ${r}() is not allowed,
        instead use addDecorator(${r}) and pass options with the '${e}' parameter`
    );
  };
}, "makeDecorator");

// ../node_modules/es-toolkit/dist/object/omitBy.mjs
function un(r, e) {
  let t = {}, o = Object.entries(r);
  for (let s = 0; s < o.length; s++) {
    let [i, a] = o[s];
    e(a, i) || (t[i] = a);
  }
  return t;
}
n(un, "omitBy");

// ../node_modules/es-toolkit/dist/object/pick.mjs
function fn(r, e) {
  let t = {};
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
  }
  return t;
}
n(fn, "pick");

// ../node_modules/es-toolkit/dist/object/pickBy.mjs
function yn(r, e) {
  let t = {}, o = Object.entries(r);
  for (let s = 0; s < o.length; s++) {
    let [i, a] = o[s];
    e(a, i) && (t[i] = a);
  }
  return t;
}
n(yn, "pickBy");

// ../node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function $(r) {
  if (typeof r != "object" || r == null)
    return !1;
  if (Object.getPrototypeOf(r) === null)
    return !0;
  if (r.toString() !== "[object Object]")
    return !1;
  let e = r;
  for (; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(r) === e;
}
n($, "isPlainObject");

// ../node_modules/es-toolkit/dist/object/mapValues.mjs
function oe(r, e) {
  let t = {}, o = Object.keys(r);
  for (let s = 0; s < o.length; s++) {
    let i = o[s], a = r[i];
    t[i] = e(a, i, r);
  }
  return t;
}
n(oe, "mapValues");

// ../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var ei = "[object RegExp]", ri = "[object String]", ti = "[object Number]", oi = "[object Boolean]", mn = "[object Arguments]", ni = "[objec\
t Symbol]", si = "[object Date]", ii = "[object Map]", ai = "[object Set]", li = "[object Array]", ci = "[object Function]", pi = "[object A\
rrayBuffer]", Et = "[object Object]", di = "[object Error]", ui = "[object DataView]", fi = "[object Uint8Array]", yi = "[object Uint8Clampe\
dArray]", mi = "[object Uint16Array]", hi = "[object Uint32Array]", gi = "[object BigUint64Array]", Si = "[object Int8Array]", bi = "[object\
 Int16Array]", Ti = "[object Int32Array]", Ei = "[object BigInt64Array]", Ri = "[object Float32Array]", Ai = "[object Float64Array]";

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function hn(r) {
  return Object.getOwnPropertySymbols(r).filter((e) => Object.prototype.propertyIsEnumerable.call(r, e));
}
n(hn, "getSymbols");

// ../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function gn(r) {
  return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
}
n(gn, "getTag");

// ../node_modules/es-toolkit/dist/predicate/isEqual.mjs
function jr(r, e) {
  if (typeof r == typeof e)
    switch (typeof r) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return r === e;
      case "number":
        return r === e || Object.is(r, e);
      case "function":
        return r === e;
      case "object":
        return ye(r, e);
    }
  return ye(r, e);
}
n(jr, "isEqual");
function ye(r, e, t) {
  if (Object.is(r, e))
    return !0;
  let o = gn(r), s = gn(e);
  if (o === mn && (o = Et), s === mn && (s = Et), o !== s)
    return !1;
  switch (o) {
    case ri:
      return r.toString() === e.toString();
    case ti: {
      let c = r.valueOf(), l = e.valueOf();
      return c === l || Number.isNaN(c) && Number.isNaN(l);
    }
    case oi:
    case si:
    case ni:
      return Object.is(r.valueOf(), e.valueOf());
    case ei:
      return r.source === e.source && r.flags === e.flags;
    case ci:
      return r === e;
  }
  t = t ?? /* @__PURE__ */ new Map();
  let i = t.get(r), a = t.get(e);
  if (i != null && a != null)
    return i === e;
  t.set(r, e), t.set(e, r);
  try {
    switch (o) {
      case ii: {
        if (r.size !== e.size)
          return !1;
        for (let [c, l] of r.entries())
          if (!e.has(c) || !ye(l, e.get(c), t))
            return !1;
        return !0;
      }
      case ai: {
        if (r.size !== e.size)
          return !1;
        let c = Array.from(r.values()), l = Array.from(e.values());
        for (let p = 0; p < c.length; p++) {
          let u = c[p], d = l.findIndex((h) => ye(u, h, t));
          if (d === -1)
            return !1;
          l.splice(d, 1);
        }
        return !0;
      }
      case li:
      case fi:
      case yi:
      case mi:
      case hi:
      case gi:
      case Si:
      case bi:
      case Ti:
      case Ei:
      case Ri:
      case Ai: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r) !== Buffer.isBuffer(e) || r.length !== e.length)
          return !1;
        for (let c = 0; c < r.length; c++)
          if (!ye(r[c], e[c], t))
            return !1;
        return !0;
      }
      case pi:
        return r.byteLength !== e.byteLength ? !1 : ye(new Uint8Array(r), new Uint8Array(e), t);
      case ui:
        return r.byteLength !== e.byteLength || r.byteOffset !== e.byteOffset ? !1 : ye(r.buffer, e.buffer, t);
      case di:
        return r.name === e.name && r.message === e.message;
      case Et: {
        if (!(ye(r.constructor, e.constructor, t) || $(r) && $(e)))
          return !1;
        let l = [...Object.keys(r), ...hn(r)], p = [...Object.keys(e), ...hn(e)];
        if (l.length !== p.length)
          return !1;
        for (let u = 0; u < l.length; u++) {
          let d = l[u], h = r[d];
          if (!Object.prototype.hasOwnProperty.call(e, d))
            return !1;
          let S = e[d];
          if (!ye(h, S, t))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    t.delete(r), t.delete(e);
  }
}
n(ye, "areObjectsEqual");

// src/shared/universal-store/use-universal-store-preview.ts
var xi = /* @__PURE__ */ n((r, e) => {
  let [t, o] = Tt(
    e ? e(r.getState()) : r.getState()
  );
  return Lr(() => r.onStateChange((s, i) => {
    if (!e) {
      o(s);
      return;
    }
    let a = e(s), c = e(i);
    !jr(a, c) && o(a);
  }), [r, o, e]), [t, r.setState];
}, "useUniversalStore");

// src/shared/universal-store/mock.ts
var At = class At extends Q {
  constructor(e, t) {
    Q.isInternalConstructing = !0, super(
      { ...e, leader: !0 },
      { channel: new ie({}), environment: Q.Environment.MOCK }
    ), Q.isInternalConstructing = !1, typeof t?.fn == "function" && (this.testUtils = t, this.getState = t.fn(this.getState), this.setState =
    t.fn(this.setState), this.subscribe = t.fn(this.subscribe), this.onStateChange = t.fn(this.onStateChange), this.send = t.fn(this.send));
  }
  /** Create a mock universal store. This is just an alias for the constructor */
  static create(e, t) {
    return new At(e, t);
  }
  unsubscribeAll() {
    if (!this.testUtils)
      throw new Error(
        fs`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`
      );
    let e = /* @__PURE__ */ n((t) => {
      try {
        t.value();
      } catch {
      }
    }, "callReturnedUnsubscribeFn");
    this.subscribe.mock?.results.forEach(e), this.onStateChange.mock?.results.forEach(e);
  }
};
n(At, "MockUniversalStore");
var Rt = At;

// src/preview-api/modules/store/StoryStore.ts
var Dt = ue(ct(), 1);

// src/preview-api/modules/store/args.ts
var or = Symbol("incompatible"), Sn = /* @__PURE__ */ n((r, e) => {
  let t = e.type;
  if (r == null || !t || e.mapping)
    return r;
  switch (t.name) {
    case "string":
      return String(r);
    case "enum":
      return r;
    case "number":
      return Number(r);
    case "boolean":
      return String(r) === "true";
    case "array":
      return !t.value || !Array.isArray(r) ? or : r.reduce((o, s, i) => {
        let a = Sn(s, { type: t.value });
        return a !== or && (o[i] = a), o;
      }, new Array(r.length));
    case "object":
      return typeof r == "string" || typeof r == "number" ? r : !t.value || typeof r != "object" ? or : Object.entries(r).reduce((o, [s, i]) => {
        let a = Sn(i, { type: t.value[s] });
        return a === or ? o : Object.assign(o, { [s]: a });
      }, {});
    default:
      return or;
  }
}, "map"), vi = /* @__PURE__ */ n((r, e) => Object.entries(r).reduce((t, [o, s]) => {
  if (!e[o])
    return t;
  let i = Sn(s, e[o]);
  return i === or ? t : Object.assign(t, { [o]: i });
}, {}), "mapArgsToTypes"), nr = /* @__PURE__ */ n((r, e) => Array.isArray(r) && Array.isArray(e) ? e.reduce(
  (t, o, s) => (t[s] = nr(r[s], e[s]), t),
  [...r]
).filter((t) => t !== void 0) : !$(r) || !$(e) ? e : Object.keys({ ...r, ...e }).reduce((t, o) => {
  if (o in e) {
    let s = nr(r[o], e[o]);
    s !== void 0 && (t[o] = s);
  } else
    t[o] = r[o];
  return t;
}, {}), "combineArgs"), wi = /* @__PURE__ */ n((r, e) => Object.entries(e).reduce((t, [o, { options: s }]) => {
  function i() {
    return o in r && (t[o] = r[o]), t;
  }
  if (n(i, "allowArg"), !s)
    return i();
  if (!Array.isArray(s))
    return M.error(_`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `), i();
  if (s.some((d) => d && ["object", "function"].includes(typeof d)))
    return M.error(_`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `), i();
  let a = Array.isArray(r[o]), c = a && r[o].findIndex((d) => !s.includes(d)), l = a && c === -1;
  if (r[o] === void 0 || s.includes(r[o]) || l)
    return i();
  let p = a ? `${o}[${c}]` : o, u = s.map((d) => typeof d == "string" ? `'${d}'` : String(d)).join(", ");
  return M.warn(`Received illegal value for '${p}'. Supported options: ${u}`), t;
}, {}), "validateOptions"), Ne = Symbol("Deeply equal"), sr = /* @__PURE__ */ n((r, e) => {
  if (typeof r != typeof e)
    return e;
  if (jr(r, e))
    return Ne;
  if (Array.isArray(r) && Array.isArray(e)) {
    let t = e.reduce((o, s, i) => {
      let a = sr(r[i], s);
      return a !== Ne && (o[i] = a), o;
    }, new Array(e.length));
    return e.length >= r.length ? t : t.concat(new Array(r.length - e.length).fill(void 0));
  }
  return $(r) && $(e) ? Object.keys({ ...r, ...e }).reduce((t, o) => {
    let s = sr(r?.[o], e?.[o]);
    return s === Ne ? t : Object.assign(t, { [o]: s });
  }, {}) : e;
}, "deepDiff"), bn = "UNTARGETED";
function _i({
  args: r,
  argTypes: e
}) {
  let t = {};
  return Object.entries(r).forEach(([o, s]) => {
    let { target: i = bn } = e[o] || {};
    t[i] = t[i] || {}, t[i][o] = s;
  }), t;
}
n(_i, "groupArgsByTarget");

// src/preview-api/modules/store/ArgsStore.ts
function Kd(r) {
  return Object.keys(r).forEach((e) => r[e] === void 0 && delete r[e]), r;
}
n(Kd, "deleteUndefined");
var Tn = class Tn {
  constructor() {
    this.initialArgsByStoryId = {};
    this.argsByStoryId = {};
  }
  get(e) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    return this.argsByStoryId[e];
  }
  setInitial(e) {
    if (!this.initialArgsByStoryId[e.id])
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs;
    else if (this.initialArgsByStoryId[e.id] !== e.initialArgs) {
      let t = sr(this.initialArgsByStoryId[e.id], this.argsByStoryId[e.id]);
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs, t !== Ne && this.updateFromDelta(e, t);
    }
  }
  updateFromDelta(e, t) {
    let o = wi(t, e.argTypes);
    this.argsByStoryId[e.id] = nr(this.argsByStoryId[e.id], o);
  }
  updateFromPersisted(e, t) {
    let o = vi(t, e.argTypes);
    return this.updateFromDelta(e, o);
  }
  update(e, t) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    this.argsByStoryId[e] = Kd({
      ...this.argsByStoryId[e],
      ...t
    });
  }
};
n(Tn, "ArgsStore");
var xt = Tn;

// src/preview-api/modules/store/csf/getValuesFromArgTypes.ts
var vt = /* @__PURE__ */ n((r = {}) => Object.entries(r).reduce((e, [t, { defaultValue: o }]) => (typeof o < "u" && (e[t] = o), e), {}), "ge\
tValuesFromArgTypes");

// src/preview-api/modules/store/GlobalsStore.ts
var En = class En {
  constructor({
    globals: e = {},
    globalTypes: t = {}
  }) {
    this.set({ globals: e, globalTypes: t });
  }
  set({ globals: e = {}, globalTypes: t = {} }) {
    let o = this.initialGlobals && sr(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
    let s = vt(t);
    this.initialGlobals = { ...s, ...e }, this.globals = this.initialGlobals, o && o !== Ne && this.updateFromPersisted(o);
  }
  filterAllowedGlobals(e) {
    return Object.entries(e).reduce((t, [o, s]) => (this.allowedGlobalNames.has(o) ? t[o] = s : I.warn(
      `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`
    ), t), {});
  }
  updateFromPersisted(e) {
    let t = this.filterAllowedGlobals(e);
    this.globals = { ...this.globals, ...t };
  }
  get() {
    return this.globals;
  }
  update(e) {
    this.globals = { ...this.globals, ...this.filterAllowedGlobals(e) };
  }
};
n(En, "GlobalsStore");
var wt = En;

// src/preview-api/modules/store/StoryIndexStore.ts
var Ci = ue(ct(), 1);
var Xd = (0, Ci.default)(1)(
  (r) => Object.values(r).reduce(
    (e, t) => (e[t.importPath] = e[t.importPath] || t, e),
    {}
  )
), Rn = class Rn {
  constructor({ entries: e } = { v: 5, entries: {} }) {
    this.entries = e;
  }
  entryFromSpecifier(e) {
    let t = Object.values(this.entries);
    if (e === "*")
      return t[0];
    if (typeof e == "string")
      return this.entries[e] ? this.entries[e] : t.find((i) => i.id.startsWith(e));
    let { name: o, title: s } = e;
    return t.find((i) => i.name === o && i.title === s);
  }
  storyIdToEntry(e) {
    let t = this.entries[e];
    if (!t)
      throw new Rr({ storyId: e });
    return t;
  }
  importPathToEntry(e) {
    return Xd(this.entries)[e];
  }
};
n(Rn, "StoryIndexStore");
var _t = Rn;

// src/preview-api/modules/store/csf/normalizeInputTypes.ts
var Jd = /* @__PURE__ */ n((r) => typeof r == "string" ? { name: r } : r, "normalizeType"), Qd = /* @__PURE__ */ n((r) => typeof r == "strin\
g" ? { type: r } : r, "normalizeControl"), Zd = /* @__PURE__ */ n((r, e) => {
  let { type: t, control: o, ...s } = r, i = {
    name: e,
    ...s
  };
  return t && (i.type = Jd(t)), o ? i.control = Qd(o) : o === !1 && (i.control = { disable: !0 }), i;
}, "normalizeInputType"), De = /* @__PURE__ */ n((r) => oe(r, Zd), "normalizeInputTypes");

// src/csf/toStartCaseStr.ts
function Pi(r) {
  return r.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (e, t, o, s) => `${t} ${o}${s}`).replace(
  /([a-z])([A-Z])/g, (e, t, o) => `${t} ${o}`).replace(/([a-z])([0-9])/gi, (e, t, o) => `${t} ${o}`).replace(/([0-9])([a-z])/gi, (e, t, o) => `${t}\
 ${o}`).replace(/(\s|^)(\w)/g, (e, t, o) => `${t}${o.toUpperCase()}`).replace(/ +/g, " ").trim();
}
n(Pi, "toStartCaseStr");

// src/csf/includeConditionalArg.ts
var xn = ue(Oi(), 1);
var Ii = /* @__PURE__ */ n((r) => r.map((e) => typeof e < "u").filter(Boolean).length, "count"), eu = /* @__PURE__ */ n((r, e) => {
  let { exists: t, eq: o, neq: s, truthy: i } = r;
  if (Ii([t, o, s, i]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t, eq: o, neq: s })}`);
  if (typeof o < "u")
    return (0, xn.isEqual)(e, o);
  if (typeof s < "u")
    return !(0, xn.isEqual)(e, s);
  if (typeof t < "u") {
    let c = typeof e < "u";
    return t ? c : !c;
  }
  return (typeof i > "u" ? !0 : i) ? !!e : !e;
}, "testValue"), vn = /* @__PURE__ */ n((r, e, t) => {
  if (!r.if)
    return !0;
  let { arg: o, global: s } = r.if;
  if (Ii([o, s]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: o, global: s })}`);
  let i = o ? e[o] : t[s];
  return eu(r.if, i);
}, "includeConditionalArg");

// src/csf/csf-factories.ts
function ir(r) {
  return r != null && typeof r == "object" && "_tag" in r && r?._tag === "Story";
}
n(ir, "isStory");

// src/csf/index.ts
var wn = /* @__PURE__ */ n((r) => r.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(/-+/g,
"-").replace(/^-+/, "").replace(/-+$/, ""), "sanitize"), Fi = /* @__PURE__ */ n((r, e) => {
  let t = wn(r);
  if (t === "")
    throw new Error(`Invalid ${e} '${r}', must include alphanumeric characters`);
  return t;
}, "sanitizeSafe"), Di = /* @__PURE__ */ n((r, e) => `${Fi(r, "kind")}${e ? `--${Fi(e, "name")}` : ""}`, "toId"), ki = /* @__PURE__ */ n((r) => Pi(
r), "storyNameFromExport");
function Ni(r, e) {
  return Array.isArray(e) ? e.includes(r) : r.match(e);
}
n(Ni, "matches");
function Ur(r, { includeStories: e, excludeStories: t }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    r !== "__esModule" && (!e || Ni(r, e)) && (!t || !Ni(r, t))
  );
}
n(Ur, "isExportStory");
var Li = /* @__PURE__ */ n((...r) => {
  let e = r.reduce((t, o) => (o.startsWith("!") ? t.delete(o.slice(1)) : t.add(o), t), /* @__PURE__ */ new Set());
  return Array.from(e);
}, "combineTags");

// src/preview-api/modules/store/csf/normalizeArrays.ts
var k = /* @__PURE__ */ n((r) => Array.isArray(r) ? r : r ? [r] : [], "normalizeArrays");

// src/preview-api/modules/store/csf/normalizeStory.ts
var ru = _`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function ke(r, e, t) {
  let o = e, s = typeof e == "function" ? e : null, { story: i } = o;
  i && (I.debug("deprecated story", i), ae(ru));
  let a = ki(r), c = typeof o != "function" && o.name || o.storyName || i?.name || a, l = [
    ...k(o.decorators),
    ...k(i?.decorators)
  ], p = { ...i?.parameters, ...o.parameters }, u = { ...i?.args, ...o.args }, d = { ...i?.argTypes, ...o.argTypes }, h = [...k(o.loaders), ...k(
  i?.loaders)], S = [
    ...k(o.beforeEach),
    ...k(i?.beforeEach)
  ], m = [
    ...k(o.experimental_afterEach),
    ...k(i?.experimental_afterEach)
  ], { render: T, play: y, tags: R = [], globals: x = {} } = o, g = p.__id || Di(t.id, a);
  return {
    moduleExport: e,
    id: g,
    name: c,
    tags: R,
    decorators: l,
    parameters: p,
    args: u,
    argTypes: De(d),
    loaders: h,
    beforeEach: S,
    experimental_afterEach: m,
    globals: x,
    ...T && { render: T },
    ...s && { userStoryFn: s },
    ...y && { play: y }
  };
}
n(ke, "normalizeStory");

// src/preview-api/modules/store/csf/normalizeComponentAnnotations.ts
function Gr(r, e = r.title, t) {
  let { id: o, argTypes: s } = r;
  return {
    id: wn(o || e),
    ...r,
    title: e,
    ...s && { argTypes: De(s) },
    parameters: {
      fileName: t,
      ...r.parameters
    }
  };
}
n(Gr, "normalizeComponentAnnotations");

// src/preview-api/modules/store/csf/processCSFFile.ts
var tu = /* @__PURE__ */ n((r) => {
  let { globals: e, globalTypes: t } = r;
  (e || t) && I.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: e,
      globalTypes: t
    })
  );
}, "checkGlobals"), ou = /* @__PURE__ */ n((r) => {
  let { options: e } = r;
  e?.storySort && I.error("The storySort option parameter can only be set globally");
}, "checkStorySort"), Ct = /* @__PURE__ */ n((r) => {
  r && (tu(r), ou(r));
}, "checkDisallowedParameters");
function Mi(r, e, t) {
  let { default: o, __namedExportsOrder: s, ...i } = r, a = Object.values(i)[0];
  if (ir(a)) {
    let p = Gr(a.meta.input, t, e);
    Ct(p.parameters);
    let u = { meta: p, stories: {}, moduleExports: r };
    return Object.keys(i).forEach((d) => {
      if (Ur(d, p)) {
        let h = ke(d, i[d].input, p);
        Ct(h.parameters), u.stories[h.id] = h;
      }
    }), u.projectAnnotations = a.meta.preview.composed, u;
  }
  let c = Gr(
    o,
    t,
    e
  );
  Ct(c.parameters);
  let l = { meta: c, stories: {}, moduleExports: r };
  return Object.keys(i).forEach((p) => {
    if (Ur(p, c)) {
      let u = ke(p, i[p], c);
      Ct(u.parameters), l.stories[u.id] = u;
    }
  }), l;
}
n(Mi, "processCSFFile");

// src/preview-api/modules/preview-web/render/mount-utils.ts
function Ui(r) {
  return r != null && nu(r).includes("mount");
}
n(Ui, "mountDestructured");
function nu(r) {
  let e = r.toString().match(/[^(]*\(([^)]*)/);
  if (!e)
    return [];
  let t = ji(e[1]);
  if (!t.length)
    return [];
  let o = t[0];
  return o.startsWith("{") && o.endsWith("}") ? ji(o.slice(1, -1).replace(/\s/g, "")).map((i) => i.replace(/:.*|=.*/g, "")) : [];
}
n(nu, "getUsedProps");
function ji(r) {
  let e = [], t = [], o = 0;
  for (let i = 0; i < r.length; i++)
    if (r[i] === "{" || r[i] === "[")
      t.push(r[i] === "{" ? "}" : "]");
    else if (r[i] === t[t.length - 1])
      t.pop();
    else if (!t.length && r[i] === ",") {
      let a = r.substring(o, i).trim();
      a && e.push(a), o = i + 1;
    }
  let s = r.substring(o).trim();
  return s && e.push(s), e;
}
n(ji, "splitByComma");

// src/preview-api/modules/store/decorators.ts
function _n(r, e, t) {
  let o = t(r);
  return (s) => e(o, s);
}
n(_n, "decorateStory");
function Cn({
  componentId: r,
  title: e,
  kind: t,
  id: o,
  name: s,
  story: i,
  parameters: a,
  initialArgs: c,
  argTypes: l,
  ...p
} = {}) {
  return p;
}
n(Cn, "sanitizeStoryContextUpdate");
function Pt(r, e) {
  let t = {}, o = /* @__PURE__ */ n((i) => (a) => {
    if (!t.value)
      throw new Error("Decorated function called without init");
    return t.value = {
      ...t.value,
      ...Cn(a)
    }, i(t.value);
  }, "bindWithContext"), s = e.reduce(
    (i, a) => _n(i, a, o),
    r
  );
  return (i) => (t.value = i, s(i));
}
n(Pt, "defaultDecorateStory");

// src/preview-api/modules/store/parameters.ts
var Y = /* @__PURE__ */ n((...r) => {
  let e = {}, t = r.filter(Boolean), o = t.reduce((s, i) => (Object.entries(i).forEach(([a, c]) => {
    let l = s[a];
    Array.isArray(c) || typeof l > "u" ? s[a] = c : $(c) && $(l) ? e[a] = !0 : typeof c < "u" && (s[a] = c);
  }), s), {});
  return Object.keys(e).forEach((s) => {
    let i = t.filter(Boolean).map((a) => a[s]).filter((a) => typeof a < "u");
    i.every((a) => $(a)) ? o[s] = Y(...i) : o[s] = i[i.length - 1];
  }), o;
}, "combineParameters");

// src/preview-api/modules/store/csf/prepareStory.ts
function ar(r, e, t) {
  let { moduleExport: o, id: s, name: i } = r || {}, a = Gi(
    r,
    e,
    t
  ), c = /* @__PURE__ */ n(async (C) => {
    let F = {};
    for (let G of [
      ..."__STORYBOOK_TEST_LOADERS__" in E && Array.isArray(E.__STORYBOOK_TEST_LOADERS__) ? [E.__STORYBOOK_TEST_LOADERS__] : [],
      k(t.loaders),
      k(e.loaders),
      k(r.loaders)
    ]) {
      if (C.abortSignal.aborted)
        return F;
      let B = await Promise.all(G.map((z) => z(C)));
      Object.assign(F, ...B);
    }
    return F;
  }, "applyLoaders"), l = /* @__PURE__ */ n(async (C) => {
    let F = new Array();
    for (let G of [
      ...k(t.beforeEach),
      ...k(e.beforeEach),
      ...k(r.beforeEach)
    ]) {
      if (C.abortSignal.aborted)
        return F;
      let B = await G(C);
      B && F.push(B);
    }
    return F;
  }, "applyBeforeEach"), p = /* @__PURE__ */ n(async (C) => {
    let F = [
      ...k(t.experimental_afterEach),
      ...k(e.experimental_afterEach),
      ...k(r.experimental_afterEach)
    ].reverse();
    for (let G of F) {
      if (C.abortSignal.aborted)
        return;
      await G(C);
    }
  }, "applyAfterEach"), u = /* @__PURE__ */ n((C) => C.originalStoryFn(C.args, C), "undecoratedStoryFn"), { applyDecorators: d = Pt, runStep: h } = t,
  S = [
    ...k(r?.decorators),
    ...k(e?.decorators),
    ...k(t?.decorators)
  ], m = r?.userStoryFn || r?.render || e.render || t.render, T = St(d)(u, S), y = /* @__PURE__ */ n((C) => T(C), "unboundStoryFn"), R = r?.
  play ?? e?.play, x = Ui(R);
  if (!m && !x)
    throw new Ir({ id: s });
  let g = /* @__PURE__ */ n((C) => async () => (await C.renderToCanvas(), C.canvas), "defaultMount"), b = r.mount ?? e.mount ?? t.mount ?? g,
  v = t.testingLibraryRender;
  return {
    storyGlobals: {},
    ...a,
    moduleExport: o,
    id: s,
    name: i,
    story: i,
    originalStoryFn: m,
    undecoratedStoryFn: u,
    unboundStoryFn: y,
    applyLoaders: c,
    applyBeforeEach: l,
    applyAfterEach: p,
    playFunction: R,
    runStep: h,
    mount: b,
    testingLibraryRender: v,
    renderToCanvas: t.renderToCanvas,
    usesMount: x
  };
}
n(ar, "prepareStory");
function Ot(r, e, t) {
  return {
    ...Gi(void 0, r, e),
    moduleExport: t
  };
}
n(Ot, "prepareMeta");
function Gi(r, e, t) {
  let o = ["dev", "test"], s = E.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [], i = Li(
    ...o,
    ...s,
    ...t.tags ?? [],
    ...e.tags ?? [],
    ...r?.tags ?? []
  ), a = Y(
    t.parameters,
    e.parameters,
    r?.parameters
  ), { argTypesEnhancers: c = [], argsEnhancers: l = [] } = t, p = Y(
    t.argTypes,
    e.argTypes,
    r?.argTypes
  );
  if (r) {
    let R = r?.userStoryFn || r?.render || e.render || t.render;
    a.__isArgsStory = R && R.length > 0;
  }
  let u = {
    ...t.args,
    ...e.args,
    ...r?.args
  }, d = {
    ...e.globals,
    ...r?.globals
  }, h = {
    componentId: e.id,
    title: e.title,
    kind: e.title,
    // Back compat
    id: r?.id || e.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: r?.name || "__meta",
    story: r?.name || "__meta",
    // Back compat
    component: e.component,
    subcomponents: e.subcomponents,
    tags: i,
    parameters: a,
    initialArgs: u,
    argTypes: p,
    storyGlobals: d
  };
  h.argTypes = c.reduce(
    (R, x) => x({ ...h, argTypes: R }),
    h.argTypes
  );
  let S = { ...u };
  h.initialArgs = l.reduce(
    (R, x) => ({
      ...R,
      ...x({
        ...h,
        initialArgs: R
      })
    }),
    S
  );
  let { name: m, story: T, ...y } = h;
  return y;
}
n(Gi, "preparePartialAnnotations");
function It(r) {
  let { args: e } = r, t = {
    ...r,
    allArgs: void 0,
    argsByTarget: void 0
  };
  if (E.FEATURES?.argTypeTargetsV7) {
    let i = _i(r);
    t = {
      ...r,
      allArgs: r.args,
      argsByTarget: i,
      args: i[bn] || {}
    };
  }
  let o = Object.entries(t.args).reduce((i, [a, c]) => {
    if (!t.argTypes[a]?.mapping)
      return i[a] = c, i;
    let l = /* @__PURE__ */ n((p) => {
      let u = t.argTypes[a].mapping;
      return u && p in u ? u[p] : p;
    }, "mappingFn");
    return i[a] = Array.isArray(c) ? c.map(l) : l(c), i;
  }, {}), s = Object.entries(o).reduce((i, [a, c]) => {
    let l = t.argTypes[a] || {};
    return vn(l, o, t.globals) && (i[a] = c), i;
  }, {});
  return { ...t, unmappedArgs: e, args: s };
}
n(It, "prepareContext");

// src/preview-api/modules/store/inferArgTypes.ts
var Pn = /* @__PURE__ */ n((r, e, t) => {
  let o = typeof r;
  switch (o) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: o };
    default:
      break;
  }
  return r ? t.has(r) ? (I.warn(_`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (t.add(r), Array.isArray(r) ? { name: "array", value: r.length > 0 ? Pn(r[0], e, new Set(
  t)) : { name: "other", value: "unknown" } } : { name: "object", value: oe(r, (i) => Pn(i, e, new Set(t))) }) : { name: "object", value: {} };
}, "inferType"), On = /* @__PURE__ */ n((r) => {
  let { id: e, argTypes: t = {}, initialArgs: o = {} } = r, s = oe(o, (a, c) => ({
    name: c,
    type: Pn(a, `${e}.${c}`, /* @__PURE__ */ new Set())
  })), i = oe(t, (a, c) => ({
    name: c
  }));
  return Y(s, i, t);
}, "inferArgTypes");
On.secondPass = !0;

// src/preview-api/modules/store/filterArgTypes.ts
var qi = /* @__PURE__ */ n((r, e) => Array.isArray(e) ? e.includes(r) : r.match(e), "matches"), qr = /* @__PURE__ */ n((r, e, t) => !e && !t ?
r : r && yn(r, (o, s) => {
  let i = o.name || s.toString();
  return !!(!e || qi(i, e)) && (!t || !qi(i, t));
}), "filterArgTypes");

// src/preview-api/modules/store/inferControls.ts
var su = /* @__PURE__ */ n((r, e, t) => {
  let { type: o, options: s } = r;
  if (o) {
    if (t.color && t.color.test(e)) {
      let i = o.name;
      if (i === "string")
        return { control: { type: "color" } };
      i !== "enum" && I.warn(
        `Addon controls: Control of type color only supports string, received "${i}" instead`
      );
    }
    if (t.date && t.date.test(e))
      return { control: { type: "date" } };
    switch (o.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value: i } = o;
        return { control: { type: i?.length <= 5 ? "radio" : "select" }, options: i };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: s ? "select" : "object" } };
    }
  }
}, "inferControl"), lr = /* @__PURE__ */ n((r) => {
  let {
    argTypes: e,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    parameters: { __isArgsStory: t, controls: { include: o = null, exclude: s = null, matchers: i = {} } = {} }
  } = r;
  if (!t)
    return e;
  let a = qr(e, o, s), c = oe(a, (l, p) => l?.type && su(l, p.toString(), i));
  return Y(c, a);
}, "inferControls");
lr.secondPass = !0;

// src/preview-api/modules/store/csf/normalizeProjectAnnotations.ts
function Le({
  argTypes: r,
  globalTypes: e,
  argTypesEnhancers: t,
  decorators: o,
  loaders: s,
  beforeEach: i,
  experimental_afterEach: a,
  globals: c,
  initialGlobals: l,
  ...p
}) {
  return c && Object.keys(c).length > 0 && ae(_`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `), {
    ...r && { argTypes: De(r) },
    ...e && { globalTypes: De(e) },
    decorators: k(o),
    loaders: k(s),
    beforeEach: k(i),
    experimental_afterEach: k(a),
    argTypesEnhancers: [
      ...t || [],
      On,
      // inferControls technically should only run if the user is using the controls addon,
      // and so should be added by a preset there. However, as it seems some code relies on controls
      // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
      // compatibility reasons, we will leave this in the store until 7.0
      lr
    ],
    initialGlobals: Y(l, c),
    ...p
  };
}
n(Le, "normalizeProjectAnnotations");

// src/preview-api/modules/store/csf/beforeAll.ts
var Bi = /* @__PURE__ */ n((r) => async () => {
  let e = [];
  for (let t of r) {
    let o = await t();
    o && e.unshift(o);
  }
  return async () => {
    for (let t of e)
      await t();
  };
}, "composeBeforeAllHooks");

// src/preview-api/modules/store/csf/stepRunners.ts
function Ft(r) {
  return async (e, t, o) => {
    await r.reduceRight(
      (i, a) => async () => a(e, i, o),
      async () => t(o)
    )();
  };
}
n(Ft, "composeStepRunners");

// src/preview-api/modules/store/csf/composeConfigs.ts
function Vr(r, e) {
  return r.map((t) => t.default?.[e] ?? t[e]).filter(Boolean);
}
n(Vr, "getField");
function Ee(r, e, t = {}) {
  return Vr(r, e).reduce((o, s) => {
    let i = k(s);
    return t.reverseFileOrder ? [...i, ...o] : [...o, ...i];
  }, []);
}
n(Ee, "getArrayField");
function Br(r, e) {
  return Object.assign({}, ...Vr(r, e));
}
n(Br, "getObjectField");
function cr(r, e) {
  return Vr(r, e).pop();
}
n(cr, "getSingletonField");
function Me(r) {
  let e = Ee(r, "argTypesEnhancers"), t = Vr(r, "runStep"), o = Ee(r, "beforeAll");
  return {
    parameters: Y(...Vr(r, "parameters")),
    decorators: Ee(r, "decorators", {
      reverseFileOrder: !(E.FEATURES?.legacyDecoratorFileOrder ?? !1)
    }),
    args: Br(r, "args"),
    argsEnhancers: Ee(r, "argsEnhancers"),
    argTypes: Br(r, "argTypes"),
    argTypesEnhancers: [
      ...e.filter((s) => !s.secondPass),
      ...e.filter((s) => s.secondPass)
    ],
    globals: Br(r, "globals"),
    initialGlobals: Br(r, "initialGlobals"),
    globalTypes: Br(r, "globalTypes"),
    loaders: Ee(r, "loaders"),
    beforeAll: Bi(o),
    beforeEach: Ee(r, "beforeEach"),
    experimental_afterEach: Ee(r, "experimental_afterEach"),
    render: cr(r, "render"),
    renderToCanvas: cr(r, "renderToCanvas"),
    renderToDOM: cr(r, "renderToDOM"),
    // deprecated
    applyDecorators: cr(r, "applyDecorators"),
    runStep: Ft(t),
    tags: Ee(r, "tags"),
    mount: cr(r, "mount"),
    testingLibraryRender: cr(r, "testingLibraryRender")
  };
}
n(Me, "composeConfigs");

// src/preview-api/modules/store/reporter-api.ts
var In = class In {
  constructor() {
    this.reports = [];
  }
  async addReport(e) {
    this.reports.push(e);
  }
};
n(In, "ReporterAPI");
var Re = In;

// src/preview-api/modules/store/csf/csf-factory-utils.ts
function Nt(r, e, t) {
  return ir(r) ? {
    story: r.input,
    meta: r.meta.input,
    preview: r.meta.preview.composed
  } : { story: r, meta: e, preview: t };
}
n(Nt, "getCsfFactoryAnnotations");

// src/preview-api/modules/store/csf/portable-stories.ts
function Vi(r) {
  globalThis.defaultProjectAnnotations = r;
}
n(Vi, "setDefaultProjectAnnotations");
var iu = "ComposedStory", au = "Unnamed Story";
function lu(r) {
  return r ? Me([r]) : {};
}
n(lu, "extractAnnotation");
function Hi(r) {
  let e = Array.isArray(r) ? r : [r];
  return globalThis.globalProjectAnnotations = Me([
    globalThis.defaultProjectAnnotations ?? {},
    Me(e.map(lu))
  ]), globalThis.globalProjectAnnotations ?? {};
}
n(Hi, "setProjectAnnotations");
var Ae = [];
function Fn(r, e, t, o, s) {
  if (r === void 0)
    throw new Error("Expected a story but received undefined.");
  e.title = e.title ?? iu;
  let i = Gr(e), a = s || r.storyName || r.story?.name || r.name || au, c = ke(
    a,
    r,
    i
  ), l = Le(
    Me([
      o ?? globalThis.globalProjectAnnotations ?? {},
      t ?? {}
    ])
  ), p = ar(
    c,
    i,
    l
  ), d = {
    // TODO: remove loading from globalTypes in 9.0
    ...vt(l.globalTypes),
    ...l.initialGlobals,
    ...p.storyGlobals
  }, h = new Re(), S = /* @__PURE__ */ n(() => {
    let g = It({
      hooks: new Te(),
      globals: d,
      args: { ...p.initialArgs },
      viewMode: "story",
      reporting: h,
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ n((b, v) => p.runStep(b, v, g), "step"),
      canvasElement: null,
      canvas: {},
      globalTypes: l.globalTypes,
      ...p,
      context: null,
      mount: null
    });
    return g.parameters.__isPortableStory = !0, g.context = g, p.renderToCanvas && (g.renderToCanvas = async () => {
      let b = await p.renderToCanvas?.(
        {
          componentId: p.componentId,
          title: p.title,
          id: p.id,
          name: p.name,
          tags: p.tags,
          showMain: /* @__PURE__ */ n(() => {
          }, "showMain"),
          showError: /* @__PURE__ */ n((v) => {
            throw new Error(`${v.title}
${v.description}`);
          }, "showError"),
          showException: /* @__PURE__ */ n((v) => {
            throw v;
          }, "showException"),
          forceRemount: !0,
          storyContext: g,
          storyFn: /* @__PURE__ */ n(() => p.unboundStoryFn(g), "storyFn"),
          unboundStoryFn: p.unboundStoryFn
        },
        g.canvasElement
      );
      b && Ae.push(b);
    }), g.mount = p.mount(g), g;
  }, "initializeContext"), m, T = /* @__PURE__ */ n(async (g) => {
    let b = S();
    return b.canvasElement ??= globalThis?.document?.body, m && (b.loaded = m.loaded), Object.assign(b, g), p.playFunction(b);
  }, "play"), y = /* @__PURE__ */ n((g) => {
    let b = S();
    return Object.assign(b, g), pu(p, b);
  }, "run"), R = p.playFunction ? T : void 0;
  return Object.assign(
    /* @__PURE__ */ n(function(b) {
      let v = S();
      return m && (v.loaded = m.loaded), v.args = {
        ...v.initialArgs,
        ...b
      }, p.unboundStoryFn(v);
    }, "storyFn"),
    {
      id: p.id,
      storyName: a,
      load: /* @__PURE__ */ n(async () => {
        for (let b of [...Ae].reverse())
          await b();
        Ae.length = 0;
        let g = S();
        g.loaded = await p.applyLoaders(g), Ae.push(...(await p.applyBeforeEach(g)).filter(Boolean)), m = g;
      }, "load"),
      globals: d,
      args: p.initialArgs,
      parameters: p.parameters,
      argTypes: p.argTypes,
      play: R,
      run: y,
      reporting: h,
      tags: p.tags
    }
  );
}
n(Fn, "composeStory");
var cu = /* @__PURE__ */ n((r, e, t, o) => Fn(r, e, t, {}, o), "defaultComposeStory");
function Wi(r, e, t = cu) {
  let { default: o, __esModule: s, __namedExportsOrder: i, ...a } = r, c = o;
  return Object.entries(a).reduce(
    (p, [u, d]) => {
      let { story: h, meta: S } = Nt(d);
      return !c && S && (c = S), Ur(u, c) ? Object.assign(p, {
        [u]: t(h, c, e, u)
      }) : p;
    },
    {}
  );
}
n(Wi, "composeStories");
function zi(r) {
  return r.extend({
    mount: /* @__PURE__ */ n(async ({ mount: e, page: t }, o) => {
      await o(async (s, ...i) => {
        if (!("__pw_type" in s) || "__pw_type" in s && s.__pw_type !== "jsx")
          throw new Error(_`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await t.evaluate(async (c) => {
          let l = await globalThis.__pwUnwrapObject?.(c);
          return ("__pw_type" in l ? l.type : l)?.load?.();
        }, s);
        let a = await e(s, ...i);
        return await t.evaluate(async (c) => {
          let l = await globalThis.__pwUnwrapObject?.(c), p = "__pw_type" in l ? l.type : l, u = document.querySelector("#root");
          return p?.play?.({ canvasElement: u });
        }, s), a;
      });
    }, "mount")
  });
}
n(zi, "createPlaywrightTest");
async function pu(r, e) {
  for (let s of [...Ae].reverse())
    await s();
  if (Ae.length = 0, !e.canvasElement) {
    let s = document.createElement("div");
    globalThis?.document?.body?.appendChild(s), e.canvasElement = s, Ae.push(() => {
      globalThis?.document?.body?.contains(s) && globalThis?.document?.body?.removeChild(s);
    });
  }
  if (e.loaded = await r.applyLoaders(e), e.abortSignal.aborted)
    return;
  Ae.push(...(await r.applyBeforeEach(e)).filter(Boolean));
  let t = r.playFunction, o = r.usesMount;
  o || await e.mount(), !e.abortSignal.aborted && (t && (o || (e.mount = async () => {
    throw new Ie({ playFunction: t.toString() });
  }), await t(e)), await r.applyAfterEach(e));
}
n(pu, "runStory");

// src/preview-api/modules/store/StoryStore.ts
function $i(r, e) {
  return un(fn(r, e), (t) => t === void 0);
}
n($i, "picky");
var Yi = 1e3, du = 1e4, Nn = class Nn {
  constructor(e, t, o) {
    this.importFn = t;
    // TODO: Remove in 9.0
    // NOTE: this is legacy `stories.json` data for the `extract` script.
    // It is used to allow v7 Storybooks to be composed in v6 Storybooks, which expect a
    // `stories.json` file with legacy fields (`kind` etc).
    this.getStoriesJsonData = /* @__PURE__ */ n(() => {
      let e = this.getSetStoriesPayload(), t = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
      return {
        v: 3,
        stories: oe(e.stories, (s) => {
          let { importPath: i } = this.storyIndex.entries[s.id];
          return {
            ...$i(s, ["id", "name", "title"]),
            importPath: i,
            // These 3 fields were going to be dropped in v7, but instead we will keep them for the
            // 7.x cycle so that v7 Storybooks can be composed successfully in v6 Storybook.
            // In v8 we will (likely) completely drop support for `extract` and `getStoriesJsonData`
            kind: s.title,
            story: s.name,
            parameters: {
              ...$i(s.parameters, t),
              fileName: i
            }
          };
        })
      };
    }, "getStoriesJsonData");
    this.storyIndex = new _t(e), this.projectAnnotations = Le(o);
    let { initialGlobals: s, globalTypes: i } = this.projectAnnotations;
    this.args = new xt(), this.userGlobals = new wt({ globals: s, globalTypes: i }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache =
    (0, Dt.default)(Yi)(Mi), this.prepareMetaWithCache = (0, Dt.default)(Yi)(Ot), this.prepareStoryWithCache = (0, Dt.default)(du)(ar);
  }
  setProjectAnnotations(e) {
    this.projectAnnotations = Le(e);
    let { initialGlobals: t, globalTypes: o } = e;
    this.userGlobals.set({ globals: t, globalTypes: o });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    e && (this.importFn = e), t && (this.storyIndex.entries = t.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(e) {
    return this.storyIndex.storyIdToEntry(e);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(e) {
    let { importPath: t, title: o } = this.storyIndex.storyIdToEntry(e), s = await this.importFn(t);
    return this.processCSFFileWithCache(s, t, o);
  }
  async loadAllCSFFiles() {
    let e = {};
    return Object.entries(this.storyIndex.entries).forEach(([o, { importPath: s }]) => {
      e[s] = o;
    }), (await Promise.all(
      Object.entries(e).map(async ([o, s]) => ({
        importPath: o,
        csfFile: await this.loadCSFFileByStoryId(s)
      }))
    )).reduce(
      (o, { importPath: s, csfFile: i }) => (o[s] = i, o),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: e }) {
    let t = e.meta;
    return this.prepareMetaWithCache(
      t,
      this.projectAnnotations,
      e.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: e }) {
    let t = await this.loadCSFFileByStoryId(e);
    return this.storyFromCSFFile({ storyId: e, csfFile: t });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: e,
    csfFile: t
  }) {
    let o = t.stories[e];
    if (!o)
      throw new Pr({ storyId: e });
    let s = t.meta, i = this.prepareStoryWithCache(
      o,
      s,
      t.projectAnnotations ?? this.projectAnnotations
    );
    return this.args.setInitial(i), this.hooks[i.id] = this.hooks[i.id] || new Te(), i;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: e
  }) {
    return Object.keys(this.storyIndex.entries).filter((t) => !!e.stories[t]).map((t) => this.storyFromCSFFile({ storyId: t, csfFile: e }));
  }
  async loadEntry(e) {
    let t = await this.storyIdToEntry(e), o = t.type === "docs" ? t.storiesImports : [], [s, ...i] = await Promise.all([
      this.importFn(t.importPath),
      ...o.map((a) => {
        let c = this.storyIndex.importPathToEntry(a);
        return this.loadCSFFileByStoryId(c.id);
      })
    ]);
    return { entryExports: s, csfFiles: i };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(e, { forceInitialArgs: t = !1 } = {}) {
    let o = this.userGlobals.get(), { initialGlobals: s } = this.userGlobals, i = new Re();
    return It({
      ...e,
      args: t ? e.initialArgs : this.args.get(e.id),
      initialGlobals: s,
      globalTypes: this.projectAnnotations.globalTypes,
      userGlobals: o,
      reporting: i,
      globals: {
        ...o,
        ...e.storyGlobals
      },
      hooks: this.hooks[e.id]
    });
  }
  addCleanupCallbacks(e, t) {
    this.cleanupCallbacks[e.id] = t;
  }
  async cleanupStory(e) {
    this.hooks[e.id].clean();
    let t = this.cleanupCallbacks[e.id];
    if (t)
      for (let o of [...t].reverse())
        await o();
    delete this.cleanupCallbacks[e.id];
  }
  extract(e = { includeDocsOnly: !1 }) {
    let { cachedCSFFiles: t } = this;
    if (!t)
      throw new Ar();
    return Object.entries(this.storyIndex.entries).reduce(
      (o, [s, { type: i, importPath: a }]) => {
        if (i === "docs")
          return o;
        let c = t[a], l = this.storyFromCSFFile({ storyId: s, csfFile: c });
        return !e.includeDocsOnly && l.parameters.docsOnly || (o[s] = Object.entries(l).reduce(
          (p, [u, d]) => u === "moduleExport" || typeof d == "function" ? p : Array.isArray(d) ? Object.assign(p, { [u]: d.slice().sort() }) :
          Object.assign(p, { [u]: d }),
          {
            //
            args: l.initialArgs,
            globals: {
              ...this.userGlobals.initialGlobals,
              ...this.userGlobals.globals,
              ...l.storyGlobals
            }
          }
        )), o;
      },
      {}
    );
  }
  // TODO: Remove in 9.0
  getSetStoriesPayload() {
    let e = this.extract({ includeDocsOnly: !0 }), t = Object.values(e).reduce(
      (o, { title: s }) => (o[s] = {}, o),
      {}
    );
    return {
      v: 2,
      globals: this.userGlobals.get(),
      globalParameters: {},
      kindParameters: t,
      stories: e
    };
  }
  raw() {
    return ae(
      "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"
    ), Object.values(this.extract()).map(({ id: e }) => this.fromId(e)).filter(Boolean);
  }
  fromId(e) {
    if (ae(
      "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"
    ), !this.cachedCSFFiles)
      throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
    let t;
    try {
      ({ importPath: t } = this.storyIndex.storyIdToEntry(e));
    } catch {
      return null;
    }
    let o = this.cachedCSFFiles[t], s = this.storyFromCSFFile({ storyId: e, csfFile: o });
    return {
      ...s,
      storyFn: /* @__PURE__ */ n((i) => {
        let a = {
          ...this.getStoryContext(s),
          abortSignal: new AbortController().signal,
          canvasElement: null,
          loaded: {},
          step: /* @__PURE__ */ n((c, l) => s.runStep(c, l, a), "step"),
          context: null,
          mount: null,
          canvas: {},
          viewMode: "story"
        };
        return s.unboundStoryFn({ ...a, ...i });
      }, "storyFn")
    };
  }
};
n(Nn, "StoryStore");
var je = Nn;

// ../node_modules/slash/index.js
function Dn(r) {
  return r.startsWith("\\\\?\\") ? r : r.replace(/\\/g, "/");
}
n(Dn, "slash");

// src/preview-api/modules/store/autoTitle.ts
var uu = /* @__PURE__ */ n((r) => {
  if (r.length === 0)
    return r;
  let e = r[r.length - 1], t = e?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (r.length === 1)
    return [t];
  let o = r[r.length - 2];
  return t && o && t.toLowerCase() === o.toLowerCase() ? [...r.slice(0, -2), t] : t && (/^(story|stories)([.][^.]+)$/i.test(e) || /^index$/i.
  test(t)) ? r.slice(0, -1) : [...r.slice(0, -1), t];
}, "sanitize");
function Ki(r) {
  return r.flatMap((e) => e.split("/")).filter(Boolean).join("/");
}
n(Ki, "pathJoin");
var kn = /* @__PURE__ */ n((r, e, t) => {
  let { directory: o, importPathMatcher: s, titlePrefix: i = "" } = e || {};
  typeof r == "number" && M.warn(_`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
  let a = Dn(String(r));
  if (s.exec(a)) {
    if (!t) {
      let c = a.replace(o, ""), l = Ki([i, c]).split("/");
      return l = uu(l), l.join("/");
    }
    return i ? Ki([i, t]) : t;
  }
}, "userOrAutoTitleFromSpecifier"), Xi = /* @__PURE__ */ n((r, e, t) => {
  for (let o = 0; o < e.length; o += 1) {
    let s = kn(r, e[o], t);
    if (s)
      return s;
  }
  return t || void 0;
}, "userOrAutoTitle");

// src/preview-api/modules/store/storySort.ts
var Ji = /\s*\/\s*/, Qi = /* @__PURE__ */ n((r = {}) => (e, t) => {
  if (e.title === t.title && !r.includeNames)
    return 0;
  let o = r.method || "configure", s = r.order || [], i = e.title.trim().split(Ji), a = t.title.trim().split(Ji);
  r.includeNames && (i.push(e.name), a.push(t.name));
  let c = 0;
  for (; i[c] || a[c]; ) {
    if (!i[c])
      return -1;
    if (!a[c])
      return 1;
    let l = i[c], p = a[c];
    if (l !== p) {
      let d = s.indexOf(l), h = s.indexOf(p), S = s.indexOf("*");
      return d !== -1 || h !== -1 ? (d === -1 && (S !== -1 ? d = S : d = s.length), h === -1 && (S !== -1 ? h = S : h = s.length), d - h) : o ===
      "configure" ? 0 : l.localeCompare(p, r.locales ? r.locales : void 0, {
        numeric: !0,
        sensitivity: "accent"
      });
    }
    let u = s.indexOf(l);
    u === -1 && (u = s.indexOf("*")), s = u !== -1 && Array.isArray(s[u + 1]) ? s[u + 1] : [], c += 1;
  }
  return 0;
}, "storySort");

// src/preview-api/modules/store/sortStories.ts
var fu = /* @__PURE__ */ n((r, e, t) => {
  if (e) {
    let o;
    typeof e == "function" ? o = e : o = Qi(e), r.sort(o);
  } else
    r.sort(
      (o, s) => t.indexOf(o.importPath) - t.indexOf(s.importPath)
    );
  return r;
}, "sortStoriesCommon"), Zi = /* @__PURE__ */ n((r, e, t) => {
  try {
    return fu(r, e, t);
  } catch (o) {
    throw new Error(_`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
}, "sortStoriesV7");

// src/preview-api/modules/preview-web/render/Render.ts
var xe = new Error("prepareAborted");

// src/preview-api/modules/preview-web/render/StoryRender.ts
var { AbortController: ea } = globalThis;
function ra(r) {
  try {
    let { name: e = "Error", message: t = String(r), stack: o } = r;
    return { name: e, message: t, stack: o };
  } catch {
    return { name: "Error", message: String(r) };
  }
}
n(ra, "serializeError");
var Ln = class Ln {
  constructor(e, t, o, s, i, a, c = { autoplay: !0, forceInitialArgs: !1 }, l) {
    this.channel = e;
    this.store = t;
    this.renderToScreen = o;
    this.callbacks = s;
    this.id = i;
    this.viewMode = a;
    this.renderOptions = c;
    this.type = "story";
    this.notYetRendered = !0;
    this.rerenderEnqueued = !1;
    this.disableKeyListeners = !1;
    this.teardownRender = /* @__PURE__ */ n(() => {
    }, "teardownRender");
    this.torndown = !1;
    this.abortController = new ea(), l && (this.story = l, this.phase = "preparing");
  }
  async runPhase(e, t, o) {
    this.phase = t, this.channel.emit(Oe, { newPhase: this.phase, storyId: this.id }), o && (await o(), this.checkIfAborted(e));
  }
  checkIfAborted(e) {
    return e.aborted ? (this.phase = "aborted", this.channel.emit(Oe, { newPhase: this.phase, storyId: this.id }), !0) : !1;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), xe;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(
      this.phase
    );
  }
  async renderToElement(e) {
    return this.canvasElement = e, this.render({ initial: !0, forceRemount: !0 });
  }
  storyContext() {
    if (!this.story)
      throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: e } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e });
  }
  async render({
    initial: e = !1,
    forceRemount: t = !1
  } = {}) {
    let { canvasElement: o } = this;
    if (!this.story)
      throw new Error("cannot render when not prepared");
    let s = this.story;
    if (!o)
      throw new Error("cannot render when canvasElement is unset");
    let {
      id: i,
      componentId: a,
      title: c,
      name: l,
      tags: p,
      applyLoaders: u,
      applyBeforeEach: d,
      applyAfterEach: h,
      unboundStoryFn: S,
      playFunction: m,
      runStep: T
    } = s;
    t && !e && (this.cancelRender(), this.abortController = new ea());
    let y = this.abortController.signal, R = !1, x = s.usesMount;
    try {
      let g = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: y,
        canvasElement: o,
        loaded: {},
        step: /* @__PURE__ */ n((P, N) => T(P, N, g), "step"),
        context: null,
        canvas: {},
        renderToCanvas: /* @__PURE__ */ n(async () => {
          let P = await this.renderToScreen(b, o);
          this.teardownRender = P || (() => {
          }), R = !0;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ n(async (...P) => {
          this.callbacks.showStoryDuringRender?.();
          let N = null;
          return await this.runPhase(y, "rendering", async () => {
            N = await s.mount(g)(...P);
          }), x && await this.runPhase(y, "playing"), N;
        }, "mount")
      };
      g.context = g;
      let b = {
        componentId: a,
        title: c,
        kind: c,
        id: i,
        name: l,
        story: l,
        tags: p,
        ...this.callbacks,
        showError: /* @__PURE__ */ n((P) => (this.phase = "errored", this.callbacks.showError(P)), "showError"),
        showException: /* @__PURE__ */ n((P) => (this.phase = "errored", this.callbacks.showException(P)), "showException"),
        forceRemount: t || this.notYetRendered,
        storyContext: g,
        storyFn: /* @__PURE__ */ n(() => S(g), "storyFn"),
        unboundStoryFn: S
      };
      if (await this.runPhase(y, "loading", async () => {
        g.loaded = await u(g);
      }), y.aborted)
        return;
      let v = await d(g);
      if (this.store.addCleanupCallbacks(s, v), this.checkIfAborted(y) || (!R && !x && await g.mount(), this.notYetRendered = !1, y.aborted))
        return;
      let C = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0, F = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ n((P) => F.
      add("error" in P ? P.error : P.reason), "onError");
      if (this.renderOptions.autoplay && t && m && this.phase !== "errored") {
        window.addEventListener("error", G), window.addEventListener("unhandledrejection", G), this.disableKeyListeners = !0;
        try {
          if (x ? await m(g) : (g.mount = async () => {
            throw new Ie({ playFunction: m.toString() });
          }, await this.runPhase(y, "playing", async () => m(g))), !R)
            throw new Fr();
          this.checkIfAborted(y), !C && F.size > 0 ? await this.runPhase(y, "errored") : await this.runPhase(y, "played");
        } catch (P) {
          if (this.callbacks.showStoryDuringRender?.(), await this.runPhase(y, "errored", async () => {
            this.channel.emit(eo, ra(P));
          }), this.story.parameters.throwPlayFunctionExceptions !== !1)
            throw P;
          console.error(P);
        }
        if (!C && F.size > 0 && this.channel.emit(
          ro,
          Array.from(F).map(ra)
        ), this.disableKeyListeners = !1, window.removeEventListener("unhandledrejection", G), window.removeEventListener("error", G), y.aborted)
          return;
      }
      await this.runPhase(
        y,
        "completed",
        async () => this.channel.emit(Ye, i)
      ), this.phase !== "errored" && await this.runPhase(y, "afterEach", async () => {
        await h(g);
      });
      let B = !C && F.size > 0, z = g.reporting.reports.some(
        (P) => P.status === "failed"
      ), se = B || z;
      await this.runPhase(
        y,
        "finished",
        async () => this.channel.emit(it, {
          storyId: i,
          status: se ? "error" : "success",
          reporters: g.reporting.reports
        })
      );
    } catch (g) {
      this.phase = "errored", this.callbacks.showException(g), await this.runPhase(
        y,
        "finished",
        async () => this.channel.emit(it, {
          storyId: i,
          status: "error",
          reporters: []
        })
      );
    }
    this.rerenderEnqueued && (this.rerenderEnqueued = !1, this.render());
  }
  /**
   * Rerender the story. If the story is currently pending (loading/rendering), the rerender will be
   * enqueued, and will be executed after the current render is completed. Rerendering while playing
   * will not be enqueued, and will be executed immediately, to support rendering args changes while
   * playing.
   */
  async rerender() {
    if (this.isPending() && this.phase !== "playing")
      this.rerenderEnqueued = !0;
    else
      return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: !0 });
  }
  // If the story is torn down (either a new story is rendered or the docs page removes it)
  // we need to consider the fact that the initial render may not be finished
  // (possibly the loaders or the play function are still running). We use the controller
  // as a method to abort them, ASAP, but this is not foolproof as we cannot control what
  // happens inside the user's code.
  cancelRender() {
    this.abortController?.abort();
  }
  async teardown() {
    this.torndown = !0, this.cancelRender(), this.story && await this.store.cleanupStory(this.story);
    for (let e = 0; e < 3; e += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((t) => setTimeout(t, 0));
    }
    window.location.reload(), await new Promise(() => {
    });
  }
};
n(Ln, "StoryRender");
var Ue = Ln;

// src/preview-api/modules/preview-web/Preview.tsx
var { fetch: yu } = E, mu = "./index.json", Mn = class Mn {
  constructor(e, t, o = te.getChannel(), s = !0) {
    this.importFn = e;
    this.getProjectAnnotations = t;
    this.channel = o;
    this.storyRenders = [];
    this.storeInitializationPromise = new Promise((i, a) => {
      this.resolveStoreInitializationPromise = i, this.rejectStoreInitializationPromise = a;
    }), s && this.initialize();
  }
  // Create a proxy object for `__STORYBOOK_STORY_STORE__` and `__STORYBOOK_PREVIEW__.storyStore`
  // That proxies through to the store once ready, and errors beforehand. This means we can set
  // `__STORYBOOK_STORY_STORE__ = __STORYBOOK_PREVIEW__.storyStore` without having to wait, and
  // similarly integrators can access the `storyStore` on the preview at any time, although
  // it is considered deprecated and we will no longer allow access in 9.0
  get storyStore() {
    return new Proxy(
      {},
      {
        get: /* @__PURE__ */ n((e, t) => {
          if (this.storyStoreValue)
            return ae("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[t];
          throw new Or();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let e = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(e), await this.initializeWithProjectAnnotations(e);
    } catch (e) {
      this.rejectStoreInitializationPromise(e);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(co, this.onStoryIndexChanged.bind(this)), this.channel.on(mr, this.onUpdateGlobals.bind(this)), this.channel.on(hr, this.
    onUpdateArgs.bind(this)), this.channel.on(go, this.onRequestArgTypesInfo.bind(this)), this.channel.on(yr, this.onResetArgs.bind(this)), this.
    channel.on(fr, this.onForceReRender.bind(this)), this.channel.on(Zt, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let e = await this.getProjectAnnotations();
      if (this.renderToCanvas = e.renderToCanvas, !this.renderToCanvas)
        throw new xr();
      return e;
    } catch (e) {
      throw this.renderPreviewEntryError("Error reading preview.js:", e), e;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(e) {
    this.projectAnnotationsBeforeInitialization = e;
    try {
      let t = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(t);
    } catch (t) {
      throw this.renderPreviewEntryError("Error loading story index:", t), t;
    }
  }
  async runBeforeAllHook(e) {
    try {
      await this.beforeAllCleanup?.(), this.beforeAllCleanup = await e.beforeAll?.();
    } catch (t) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", t), t;
    }
  }
  async getStoryIndexFromServer() {
    let e = await yu(mu);
    if (e.status === 200)
      return e.json();
    throw new vr({ text: await e.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(e) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new je(
      e,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new V({ methodName: "emitGlobals" });
    let e = {
      globals: this.storyStoreValue.userGlobals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(so, e);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: e
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = e;
    let t = await this.getProjectAnnotationsOrRenderError();
    if (await this.runBeforeAllHook(t), !this.storyStoreValue) {
      await this.initializeWithProjectAnnotations(t);
      return;
    }
    this.storyStoreValue.setProjectAnnotations(t), this.emitGlobals();
  }
  async onStoryIndexChanged() {
    if (delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      try {
        let e = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(e);
          return;
        }
        await this.onStoriesChanged({ storyIndex: e });
      } catch (e) {
        throw this.renderPreviewEntryError("Error loading story index:", e), e;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: e, storyIndex: t });
  }
  async onUpdateGlobals({
    globals: e,
    currentStory: t
  }) {
    if (this.storyStoreValue || await this.storeInitializationPromise, !this.storyStoreValue)
      throw new V({ methodName: "onUpdateGlobals" });
    if (this.storyStoreValue.userGlobals.update(e), t) {
      let { initialGlobals: o, storyGlobals: s, userGlobals: i, globals: a } = this.storyStoreValue.getStoryContext(t);
      this.channel.emit(Pe, {
        initialGlobals: o,
        userGlobals: i,
        storyGlobals: s,
        globals: a
      });
    } else {
      let { initialGlobals: o, globals: s } = this.storyStoreValue.userGlobals;
      this.channel.emit(Pe, {
        initialGlobals: o,
        userGlobals: s,
        storyGlobals: {},
        globals: s
      });
    }
    await Promise.all(this.storyRenders.map((o) => o.rerender()));
  }
  async onUpdateArgs({ storyId: e, updatedArgs: t }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(e, t), await Promise.all(
      this.storyRenders.filter((o) => o.id === e && !o.renderOptions.forceInitialArgs).map(
        (o) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o.story && o.story.usesMount ? o.remount() : o.rerender()
        )
      )
    ), this.channel.emit(io, {
      storyId: e,
      args: this.storyStoreValue.args.get(e)
    });
  }
  async onRequestArgTypesInfo({ id: e, payload: t }) {
    try {
      await this.storeInitializationPromise;
      let o = await this.storyStoreValue?.loadStory(t);
      this.channel.emit(at, {
        id: e,
        success: !0,
        payload: { argTypes: o?.argTypes || {} },
        error: null
      });
    } catch (o) {
      this.channel.emit(at, {
        id: e,
        success: !1,
        error: o?.message
      });
    }
  }
  async onResetArgs({ storyId: e, argNames: t }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "onResetArgs" });
    let s = this.storyRenders.find((c) => c.id === e)?.story || await this.storyStoreValue.loadStory({ storyId: e }), a = (t || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(s.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(e))
      ])
    ]).reduce((c, l) => (c[l] = s.initialArgs[l], c), {});
    await this.onUpdateArgs({ storyId: e, updatedArgs: a });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((e) => e.rerender()));
  }
  async onForceRemount({ storyId: e }) {
    await Promise.all(this.storyRenders.filter((t) => t.id === e).map((t) => t.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(e, t, o, s) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new V({
        methodName: "renderStoryToElement"
      });
    let i = new Ue(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o,
      e.id,
      "docs",
      s,
      e
    );
    return i.renderToElement(t), this.storyRenders.push(i), async () => {
      await this.teardownRender(i);
    };
  }
  async teardownRender(e, { viewModeChanged: t } = {}) {
    this.storyRenders = this.storyRenders.filter((o) => o !== e), await e?.teardown?.({ viewModeChanged: t });
  }
  // API
  async loadStory({ storyId: e }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: e });
  }
  getStoryContext(e, { forceInitialArgs: t = !1 } = {}) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(e, { forceInitialArgs: t });
  }
  async extract(e) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "extract" });
    if (this.previewEntryError)
      throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e);
  }
  // UTILITIES
  renderPreviewEntryError(e, t) {
    this.previewEntryError = t, I.error(e), I.error(t), this.channel.emit(Jt, t);
  }
};
n(Mn, "Preview");
var Ge = Mn;

// src/preview-api/modules/preview-web/docs-context/DocsContext.ts
var jn = class jn {
  constructor(e, t, o, s) {
    this.channel = e;
    this.store = t;
    this.renderStoryToElement = o;
    this.storyIdByName = /* @__PURE__ */ n((e) => {
      let t = this.nameToStoryId.get(e);
      if (t)
        return t;
      throw new Error(`No story found with that name: ${e}`);
    }, "storyIdByName");
    this.componentStories = /* @__PURE__ */ n(() => this.componentStoriesValue, "componentStories");
    this.componentStoriesFromCSFFile = /* @__PURE__ */ n((e) => this.store.componentStoriesFromCSFFile({ csfFile: e }), "componentStoriesFro\
mCSFFile");
    this.storyById = /* @__PURE__ */ n((e) => {
      if (!e) {
        if (!this.primaryStory)
          throw new Error(
            "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
          );
        return this.primaryStory;
      }
      let t = this.storyIdToCSFFile.get(e);
      if (!t)
        throw new Error(`Called \`storyById\` for story that was never loaded: ${e}`);
      return this.store.storyFromCSFFile({ storyId: e, csfFile: t });
    }, "storyById");
    this.getStoryContext = /* @__PURE__ */ n((e) => ({
      ...this.store.getStoryContext(e),
      loaded: {},
      viewMode: "docs"
    }), "getStoryContext");
    this.loadStory = /* @__PURE__ */ n((e) => this.store.loadStory({ storyId: e }), "loadStory");
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.
    exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(),
    s.forEach((i, a) => {
      this.referenceCSFFile(i);
    });
  }
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(e) {
    this.exportsToCSFFile.set(e.moduleExports, e), this.exportsToCSFFile.set(e.moduleExports.default, e), this.store.componentStoriesFromCSFFile(
    { csfFile: e }).forEach((o) => {
      let s = e.stories[o.id];
      this.storyIdToCSFFile.set(s.id, e), this.exportToStory.set(s.moduleExport, o);
    });
  }
  attachCSFFile(e) {
    if (!this.exportsToCSFFile.has(e.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(e))
      return;
    this.attachedCSFFiles.add(e), this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((o) => {
      this.nameToStoryId.set(o.name, o.id), this.componentStoriesValue.push(o), this.primaryStory || (this.primaryStory = o);
    });
  }
  referenceMeta(e, t) {
    let o = this.resolveModuleExport(e);
    if (o.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your \
CSF file?"
      );
    t && this.attachCSFFile(o.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: e } = this.store;
    if (!e)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return e;
  }
  resolveAttachedModuleExportType(e) {
    if (e === "story") {
      if (!this.primaryStory)
        throw new Error(
          "No primary story attached to this docs file, did you forget to use <Meta of={} />?"
        );
      return { type: "story", story: this.primaryStory };
    }
    if (this.attachedCSFFiles.size === 0)
      throw new Error(
        "No CSF file attached to this docs file, did you forget to use <Meta of={} />?"
      );
    let t = Array.from(this.attachedCSFFiles)[0];
    if (e === "meta")
      return { type: "meta", csfFile: t };
    let { component: o } = t.meta;
    if (!o)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o };
  }
  resolveModuleExport(e) {
    let t = this.exportsToCSFFile.get(e);
    if (t)
      return { type: "meta", csfFile: t };
    let o = this.exportToStory.get(
      ir(e) ? e.input : e
    );
    return o ? { type: "story", story: o } : { type: "component", component: e };
  }
  resolveOf(e, t = []) {
    let o;
    if (["component", "meta", "story"].includes(e)) {
      let s = e;
      o = this.resolveAttachedModuleExportType(s);
    } else
      o = this.resolveModuleExport(e);
    if (t.length && !t.includes(o.type)) {
      let s = o.type === "component" ? "component or unknown" : o.type;
      throw new Error(_`Invalid value passed to the 'of' prop. The value was resolved to a '${s}' type but the only types for this block are: ${t.
      join(
        ", "
      )}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
    }
    switch (o.type) {
      case "component":
        return {
          ...o,
          projectAnnotations: this.projectAnnotations
        };
      case "meta":
        return {
          ...o,
          preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o.csfFile })
        };
      case "story":
      default:
        return o;
    }
  }
};
n(jn, "DocsContext");
var me = jn;

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
var Un = class Un {
  constructor(e, t, o, s) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = s;
    this.type = "docs";
    this.subtype = "csf";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw xe;
    let { importPath: o, title: s } = this.entry, i = this.store.processCSFFileWithCache(
      e,
      o,
      s
    ), a = Object.keys(i.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: a, csfFile: i }), this.csfFiles = [i, ...t], this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let t = new me(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
    return this.csfFiles.forEach((o) => t.attachCSFFile(o)), t;
  }
  async renderToElement(e, t) {
    if (!this.story || !this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: s } = this.story.parameters || {};
    if (!s)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = await s.renderer(), { render: a } = i, c = /* @__PURE__ */ n(async () => {
      try {
        await a(o, s, e), this.channel.emit(ur, this.id);
      } catch (l) {
        this.callbacks.showException(l);
      }
    }, "renderDocs");
    return this.rerender = async () => c(), this.teardownRender = async ({ viewModeChanged: l }) => {
      !l || !e || i.unmount(e);
    }, c();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(Un, "CsfDocsRender");
var Hr = Un;

// src/preview-api/modules/preview-web/render/MdxDocsRender.ts
var Gn = class Gn {
  constructor(e, t, o, s) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = s;
    this.type = "docs";
    this.subtype = "mdx";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw xe;
    this.csfFiles = t, this.exports = e, this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.exports && this.exports === e.exports);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    return new me(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
  }
  async renderToElement(e, t) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: s } = this.store.projectAnnotations.parameters || {};
    if (!s)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = { ...s, page: this.exports.default }, a = await s.renderer(), { render: c } = a, l = /* @__PURE__ */ n(async () => {
      try {
        await c(o, i, e), this.channel.emit(ur, this.id);
      } catch (p) {
        this.callbacks.showException(p);
      }
    }, "renderDocs");
    return this.rerender = async () => l(), this.teardownRender = async ({ viewModeChanged: p } = {}) => {
      !p || !e || (a.unmount(e), this.torndown = !0);
    }, l();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(Gn, "MdxDocsRender");
var Wr = Gn;

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
var hu = globalThis;
function gu(r) {
  let e = r.composedPath && r.composedPath()[0] || r.target;
  return /input|textarea/i.test(e.tagName) || e.getAttribute("contenteditable") !== null;
}
n(gu, "focusInInput");
var ta = "attached-mdx", Su = "unattached-mdx";
function bu({ tags: r }) {
  return r?.includes(Su) || r?.includes(ta);
}
n(bu, "isMdxEntry");
function qn(r) {
  return r.type === "story";
}
n(qn, "isStoryRender");
function Tu(r) {
  return r.type === "docs";
}
n(Tu, "isDocsRender");
function Eu(r) {
  return Tu(r) && r.subtype === "csf";
}
n(Eu, "isCsfDocsRender");
var Bn = class Bn extends Ge {
  constructor(t, o, s, i) {
    super(t, o, void 0, !1);
    this.importFn = t;
    this.getProjectAnnotations = o;
    this.selectionStore = s;
    this.view = i;
    this.initialize();
  }
  setupListeners() {
    super.setupListeners(), hu.onkeydown = this.onKeydown.bind(this), this.channel.on(no, this.onSetCurrentStory.bind(this)), this.channel.on(
    mo, this.onUpdateQueryParams.bind(this)), this.channel.on(to, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new V({ methodName: "setInitialGlobals" });
    let { globals: t } = this.selectionStore.selectionSpecifier || {};
    t && this.storyStoreValue.userGlobals.updateFromPersisted(t), this.emitGlobals();
  }
  // If initialization gets as far as the story index, this function runs.
  async initializeWithStoryIndex(t) {
    return await super.initializeWithStoryIndex(t), this.selectSpecifiedStory();
  }
  // Use the selection specifier to choose a story, then render it
  async selectSpecifiedStory() {
    if (!this.storyStoreValue)
      throw new V({
        methodName: "selectSpecifiedStory"
      });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let { storySpecifier: t, args: o } = this.selectionStore.selectionSpecifier, s = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
    if (!s) {
      t === "*" ? this.renderStoryLoadingException(t, new _r()) : this.renderStoryLoadingException(
        t,
        new Cr({ storySpecifier: t.toString() })
      );
      return;
    }
    let { id: i, type: a } = s;
    this.selectionStore.setSelection({ storyId: i, viewMode: a }), this.channel.emit(uo, this.selectionStore.selection), this.channel.emit(nt,
    this.selectionStore.selection), await this.renderSelection({ persistedArgs: o });
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: t
  }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: t }), this.selectionStore.selection && this.renderSelection();
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: t,
    storyIndex: o
  }) {
    await super.onStoriesChanged({ importFn: t, storyIndex: o }), this.selectionStore.selection ? await this.renderSelection() : await this.
    selectSpecifiedStory();
  }
  onKeydown(t) {
    if (!this.storyRenders.find((o) => o.disableKeyListeners) && !gu(t)) {
      let { altKey: o, ctrlKey: s, metaKey: i, shiftKey: a, key: c, code: l, keyCode: p } = t;
      this.channel.emit(oo, {
        event: { altKey: o, ctrlKey: s, metaKey: i, shiftKey: a, key: c, code: l, keyCode: p }
      });
    }
  }
  async onSetCurrentStory(t) {
    this.selectionStore.setSelection({ viewMode: "story", ...t }), await this.storeInitializationPromise, this.channel.emit(nt, this.selectionStore.
    selection), this.renderSelection();
  }
  onUpdateQueryParams(t) {
    this.selectionStore.setQueryParams(t);
  }
  async onUpdateGlobals({ globals: t }) {
    let o = this.currentRender instanceof Ue && this.currentRender.story || void 0;
    super.onUpdateGlobals({ globals: t, currentStory: o }), (this.currentRender instanceof Wr || this.currentRender instanceof Hr) && await this.
    currentRender.rerender?.();
  }
  async onUpdateArgs({ storyId: t, updatedArgs: o }) {
    super.onUpdateArgs({ storyId: t, updatedArgs: o });
  }
  async onPreloadStories({ ids: t }) {
    await this.storeInitializationPromise, this.storyStoreValue && await Promise.allSettled(t.map((o) => this.storyStoreValue?.loadEntry(o)));
  }
  // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story
  async renderSelection({ persistedArgs: t } = {}) {
    let { renderToCanvas: o } = this;
    if (!this.storyStoreValue || !o)
      throw new V({ methodName: "renderSelection" });
    let { selection: s } = this.selectionStore;
    if (!s)
      throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: i } = s, a;
    try {
      a = await this.storyStoreValue.storyIdToEntry(i);
    } catch (S) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(i, S);
      return;
    }
    let c = this.currentSelection?.storyId !== i, l = this.currentRender?.type !== a.type;
    a.type === "story" ? this.view.showPreparingStory({ immediate: l }) : this.view.showPreparingDocs({ immediate: l }), this.currentRender?.
    isPreparing() && await this.teardownRender(this.currentRender);
    let p;
    a.type === "story" ? p = new Ue(
      this.channel,
      this.storyStoreValue,
      o,
      this.mainStoryCallbacks(i),
      i,
      "story"
    ) : bu(a) ? p = new Wr(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(i)
    ) : p = new Hr(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(i)
    );
    let u = this.currentSelection;
    this.currentSelection = s;
    let d = this.currentRender;
    this.currentRender = p;
    try {
      await p.prepare();
    } catch (S) {
      d && await this.teardownRender(d), S !== xe && this.renderStoryLoadingException(i, S);
      return;
    }
    let h = !c && d && !p.isEqual(d);
    if (t && qn(p) && (fe(!!p.story), this.storyStoreValue.args.updateFromPersisted(p.story, t)), d && !d.torndown && !c && !h && !l) {
      this.currentRender = d, this.channel.emit(yo, i), this.view.showMain();
      return;
    }
    if (d && await this.teardownRender(d, { viewModeChanged: l }), u && (c || l) && this.channel.emit(ao, i), qn(p)) {
      fe(!!p.story);
      let {
        parameters: S,
        initialArgs: m,
        argTypes: T,
        unmappedArgs: y,
        initialGlobals: R,
        userGlobals: x,
        storyGlobals: g,
        globals: b
      } = this.storyStoreValue.getStoryContext(p.story);
      this.channel.emit(po, {
        id: i,
        parameters: S,
        initialArgs: m,
        argTypes: T,
        args: y
      }), this.channel.emit(Pe, { userGlobals: x, storyGlobals: g, globals: b, initialGlobals: R });
    } else {
      let { parameters: S } = this.storyStoreValue.projectAnnotations, { initialGlobals: m, globals: T } = this.storyStoreValue.userGlobals;
      if (this.channel.emit(Pe, {
        globals: T,
        initialGlobals: m,
        storyGlobals: {},
        userGlobals: T
      }), Eu(p) || p.entry.tags?.includes(ta)) {
        if (!p.csfFiles)
          throw new wr({ storyId: i });
        ({ parameters: S } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: p.csfFiles[0]
        }));
      }
      this.channel.emit(Qt, {
        id: i,
        parameters: S
      });
    }
    qn(p) ? (fe(!!p.story), this.storyRenders.push(p), this.currentRender.renderToElement(
      this.view.prepareForStory(p.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(t, { viewModeChanged: o = !1 } = {}) {
    this.storyRenders = this.storyRenders.filter((s) => s !== t), await t?.teardown?.({ viewModeChanged: o });
  }
  // UTILITIES
  mainStoryCallbacks(t) {
    return {
      showStoryDuringRender: /* @__PURE__ */ n(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ n(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ n((o) => this.renderError(t, o), "showError"),
      showException: /* @__PURE__ */ n((o) => this.renderException(t, o), "showException")
    };
  }
  renderPreviewEntryError(t, o) {
    super.renderPreviewEntryError(t, o), this.view.showErrorDisplay(o);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(st);
  }
  renderStoryLoadingException(t, o) {
    I.error(o), this.view.showErrorDisplay(o), this.channel.emit(st, t);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(t, o) {
    let { name: s = "Error", message: i = String(o), stack: a } = o;
    this.channel.emit(fo, { name: s, message: i, stack: a }), this.channel.emit(Oe, { newPhase: "errored", storyId: t }), this.view.showErrorDisplay(
    o), I.error(`Error rendering story '${t}':`), I.error(o);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(t, { title: o, description: s }) {
    I.error(`Error rendering story ${o}: ${s}`), this.channel.emit(lo, { title: o, description: s }), this.channel.emit(Oe, { newPhase: "err\
ored", storyId: t }), this.view.showErrorDisplay({
      message: o,
      stack: s
    });
  }
};
n(Bn, "PreviewWithSelection");
var qe = Bn;

// src/preview-api/modules/preview-web/UrlStore.ts
var $r = ue(Ut(), 1);

// src/preview-api/modules/preview-web/parseArgsParam.ts
var ma = ue(Ut(), 1);
var ya = /^[a-zA-Z0-9 _-]*$/, ha = /^-?[0-9]+(\.[0-9]+)?$/, $u = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i, ga = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
Kn = /* @__PURE__ */ n((r = "", e) => r === null || r === "" || !ya.test(r) ? !1 : e == null || e instanceof Date || typeof e == "number" ||
typeof e == "boolean" ? !0 : typeof e == "string" ? ya.test(e) || ha.test(e) || $u.test(e) || ga.test(e) : Array.isArray(e) ? e.every((t) => Kn(
r, t)) : $(e) ? Object.entries(e).every(([t, o]) => Kn(t, o)) : !1, "validateArgs"), Yu = {
  delimiter: ";",
  // we're parsing a single query param
  nesting: !0,
  arrayRepeat: !0,
  arrayRepeatSyntax: "bracket",
  nestingSyntax: "js",
  // objects are encoded using dot notation
  valueDeserializer(r) {
    if (r.startsWith("!")) {
      if (r === "!undefined")
        return;
      if (r === "!null")
        return null;
      if (r === "!true")
        return !0;
      if (r === "!false")
        return !1;
      if (r.startsWith("!date(") && r.endsWith(")"))
        return new Date(r.replaceAll(" ", "+").slice(6, -1));
      if (r.startsWith("!hex(") && r.endsWith(")"))
        return `#${r.slice(5, -1)}`;
      let e = r.slice(1).match(ga);
      if (e)
        return r.startsWith("!rgba") || r.startsWith("!RGBA") ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]}, ${e[5]})` : r.startsWith("!hsla") || r.startsWith(
        "!HSLA") ? `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%, ${e[5]})` : r.startsWith("!rgb") || r.startsWith("!RGB") ? `${e[1]}(${e[2]}, ${e[3]}\
, ${e[4]})` : `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%)`;
    }
    return ha.test(r) ? Number(r) : r;
  }
}, Xn = /* @__PURE__ */ n((r) => {
  let e = r.split(";").map((t) => t.replace("=", "~").replace(":", "="));
  return Object.entries((0, ma.parse)(e.join(";"), Yu)).reduce((t, [o, s]) => Kn(o, s) ? Object.assign(t, { [o]: s }) : (M.warn(_`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `), t), {});
}, "parseArgsParam");

// src/preview-api/modules/preview-web/UrlStore.ts
var { history: Sa, document: ve } = E;
function Ku(r) {
  let e = (r || "").match(/^\/story\/(.+)/);
  if (!e)
    throw new Error(`Invalid path '${r}',  must start with '/story/'`);
  return e[1];
}
n(Ku, "pathToId");
var ba = /* @__PURE__ */ n(({
  selection: r,
  extraParams: e
}) => {
  let t = ve?.location.search.slice(1), { path: o, selectedKind: s, selectedStory: i, ...a } = (0, $r.parse)(t);
  return `?${(0, $r.stringify)({
    ...a,
    ...e,
    ...r && { id: r.storyId, viewMode: r.viewMode }
  })}`;
}, "getQueryString"), Xu = /* @__PURE__ */ n((r) => {
  if (!r)
    return;
  let e = ba({ selection: r }), { hash: t = "" } = ve.location;
  ve.title = r.storyId, Sa.replaceState({}, "", `${ve.location.pathname}${e}${t}`);
}, "setPath"), Ju = /* @__PURE__ */ n((r) => r != null && typeof r == "object" && Array.isArray(r) === !1, "isObject"), zr = /* @__PURE__ */ n(
(r) => {
  if (r !== void 0) {
    if (typeof r == "string")
      return r;
    if (Array.isArray(r))
      return zr(r[0]);
    if (Ju(r))
      return zr(
        Object.values(r).filter(Boolean)
      );
  }
}, "getFirstString"), Qu = /* @__PURE__ */ n(() => {
  if (typeof ve < "u") {
    let r = ve.location.search.slice(1), e = (0, $r.parse)(r), t = typeof e.args == "string" ? Xn(e.args) : void 0, o = typeof e.globals == "\
string" ? Xn(e.globals) : void 0, s = zr(e.viewMode);
    (typeof s != "string" || !s.match(/docs|story/)) && (s = "story");
    let i = zr(e.path), a = i ? Ku(i) : zr(e.id);
    if (a)
      return { storySpecifier: a, args: t, globals: o, viewMode: s };
  }
  return null;
}, "getSelectionSpecifierFromPath"), Jn = class Jn {
  constructor() {
    this.selectionSpecifier = Qu();
  }
  setSelection(e) {
    this.selection = e, Xu(this.selection);
  }
  setQueryParams(e) {
    let t = ba({ extraParams: e }), { hash: o = "" } = ve.location;
    Sa.replaceState({}, "", `${ve.location.pathname}${t}${o}`);
  }
};
n(Jn, "UrlStore");
var He = Jn;

// src/preview-api/modules/preview-web/WebView.ts
var Ja = ue(Ya(), 1), Qa = ue(Ut(), 1);
var { document: W } = E, Ka = 100, Za = /* @__PURE__ */ ((i) => (i.MAIN = "MAIN", i.NOPREVIEW = "NOPREVIEW", i.PREPARING_STORY = "PREPARING_\
STORY", i.PREPARING_DOCS = "PREPARING_DOCS", i.ERROR = "ERROR", i))(Za || {}), ns = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
}, ss = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
}, Xa = new Ja.default({
  escapeXML: !0
}), is = class is {
  constructor() {
    this.testing = !1;
    if (typeof W < "u") {
      let { __SPECIAL_TEST_PARAMETER__: e } = (0, Qa.parse)(W.location.search.slice(1));
      switch (e) {
        case "preparing-story": {
          this.showPreparingStory(), this.testing = !0;
          break;
        }
        case "preparing-docs": {
          this.showPreparingDocs(), this.testing = !0;
          break;
        }
        default:
      }
    }
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(e) {
    return this.showStory(), this.applyLayout(e.parameters.layout), W.documentElement.scrollTop = 0, W.documentElement.scrollLeft = 0, this.
    storyRoot();
  }
  storyRoot() {
    return W.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), W.documentElement.scrollTop = 0, W.documentElement.scrollLeft =
    0, this.docsRoot();
  }
  docsRoot() {
    return W.getElementById("storybook-docs");
  }
  applyLayout(e = "padded") {
    if (e === "none") {
      W.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(e);
    let t = ss[e];
    W.body.classList.remove(this.currentLayoutClass), W.body.classList.add(t), this.currentLayoutClass = t;
  }
  checkIfLayoutExists(e) {
    ss[e] || I.warn(
      _`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(ss).join(", ")}, none.
        `
    );
  }
  showMode(e) {
    clearTimeout(this.preparingTimeout), Object.keys(Za).forEach((t) => {
      t === e ? W.body.classList.add(ns[t]) : W.body.classList.remove(ns[t]);
    });
  }
  showErrorDisplay({ message: e = "", stack: t = "" }) {
    let o = e, s = t, i = e.split(`
`);
    i.length > 1 && ([o] = i, s = i.slice(1).join(`
`).replace(/^\n/, "")), W.getElementById("error-message").innerHTML = Xa.toHtml(o), W.getElementById("error-stack").innerHTML = Xa.toHtml(s),
    this.showMode("ERROR");
  }
  showNoPreview() {
    this.testing || (this.showMode("NOPREVIEW"), this.storyRoot()?.setAttribute("hidden", "true"), this.docsRoot()?.setAttribute("hidden", "\
true"));
  }
  showPreparingStory({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      Ka
    );
  }
  showPreparingDocs({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPA\
RING_DOCS"), Ka);
  }
  showMain() {
    this.showMode("MAIN");
  }
  showDocs() {
    this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
  }
  showStory() {
    this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
  }
  showStoryDuringRender() {
    W.body.classList.add(ns.MAIN);
  }
};
n(is, "WebView");
var ze = is;

// src/preview-api/modules/preview-web/PreviewWeb.tsx
var as = class as extends qe {
  constructor(t, o) {
    super(t, o, new He(), new ze());
    this.importFn = t;
    this.getProjectAnnotations = o;
    E.__STORYBOOK_PREVIEW__ = this;
  }
};
n(as, "PreviewWeb");
var Kr = as;

// src/preview-api/modules/preview-web/simulate-pageload.ts
var { document: $e } = E, Df = [
  "application/javascript",
  "application/ecmascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  // Support modern javascript
  "module"
], kf = "script", el = "scripts-root";
function Xr() {
  let r = $e.createEvent("Event");
  r.initEvent("DOMContentLoaded", !0, !0), $e.dispatchEvent(r);
}
n(Xr, "simulateDOMContentLoaded");
function Lf(r, e, t) {
  let o = $e.createElement("script");
  o.type = r.type === "module" ? "module" : "text/javascript", r.src ? (o.onload = e, o.onerror = e, o.src = r.src) : o.textContent = r.innerText,
  t ? t.appendChild(o) : $e.head.appendChild(o), r.parentNode.removeChild(r), r.src || e();
}
n(Lf, "insertScript");
function rl(r, e, t = 0) {
  r[t](() => {
    t++, t === r.length ? e() : rl(r, e, t);
  });
}
n(rl, "insertScriptsSequentially");
function ls(r) {
  let e = $e.getElementById(el);
  e ? e.innerHTML = "" : (e = $e.createElement("div"), e.id = el, $e.body.appendChild(e));
  let t = Array.from(r.querySelectorAll(kf));
  if (t.length) {
    let o = [];
    t.forEach((s) => {
      let i = s.getAttribute("type");
      (!i || Df.includes(i)) && o.push((a) => Lf(s, a, e));
    }), o.length && rl(o, Xr, void 0);
  } else
    Xr();
}
n(ls, "simulatePageLoad");

// src/preview/globals/runtime.ts
var tl = {
  "@storybook/global": Yt,
  "storybook/internal/channels": Dr,
  "@storybook/channels": Dr,
  "@storybook/core/channels": Dr,
  "storybook/internal/client-logger": gr,
  "@storybook/client-logger": gr,
  "@storybook/core/client-logger": gr,
  "storybook/internal/core-events": ge,
  "@storybook/core-events": ge,
  "@storybook/core/core-events": ge,
  "storybook/internal/preview-errors": Nr,
  "@storybook/core-events/preview-errors": Nr,
  "@storybook/core/preview-errors": Nr,
  "storybook/internal/preview-api": Jr,
  "@storybook/preview-api": Jr,
  "@storybook/core/preview-api": Jr,
  "storybook/internal/types": kr,
  "@storybook/types": kr,
  "@storybook/core/types": kr
};

// src/preview/utils.ts
var nl = ue(ol(), 1);
var ds;
function Mf() {
  return ds || (ds = new nl.default(E.navigator?.userAgent).getBrowserInfo()), ds;
}
n(Mf, "getBrowserInfo");
function sl(r) {
  return r.browserInfo = Mf(), r;
}
n(sl, "prepareForTelemetry");

// src/preview/runtime.ts
function jf(r) {
  let e = r.error || r;
  e.fromStorybook && E.sendTelemetryError(e);
}
n(jf, "errorListener");
function Uf({ reason: r }) {
  r.fromStorybook && E.sendTelemetryError(r);
}
n(Uf, "unhandledRejectionListener");
function Gf() {
  us.forEach((r) => {
    E[So[r]] = tl[r];
  }), E.sendTelemetryError = (r) => {
    E.__STORYBOOK_ADDONS_CHANNEL__.emit(ho, sl(r));
  }, E.addEventListener("error", jf), E.addEventListener("unhandledrejection", Uf);
}
n(Gf, "setup");
Gf();
export {
  Gf as setup
};
