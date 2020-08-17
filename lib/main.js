"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  var t = {};

  function r(o) {
    if (t[o]) return t[o].exports;
    var n = t[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[o].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
  }

  r.m = e, r.c = t, r.d = function (e, t, o) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: o
    });
  }, r.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, r.t = function (e, t) {
    if (1 & t && (e = r(e)), 8 & t) return e;
    if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
    var o = Object.create(null);
    if (r.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var n in e) {
      r.d(o, n, function (t) {
        return e[t];
      }.bind(null, n));
    }
    return o;
  }, r.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return r.d(t, "a", t), t;
  }, r.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, r.p = "", r(r.s = 0);
}([function (e, t, r) {
  "use strict";

  r.r(t);
  console.log("Hello World! Am here");
  document.querySelectorAll("div").forEach(function (e) {
    e.setAttribute("oncontextmenu", "return false");
    var t = 1;
    console.log("Hello" + t), t += 1;
  }), alert("Hello World");

  var o = _toConsumableArray(new Set([1, 2, 3, 3, 3, "school", "school", "ball", !1, !1, !0, !0]));

  o = o.filter(Boolean);
  var n = [5, 6, 2, 4, 7, 3, 76, 33, 77, 66, 25, 24, 89].sort(function (e, t) {
    return e - t;
  });
  console.log(n);
  var l = {
    number: 10
  },
      u = l.number,
      c = l.number;
}]);