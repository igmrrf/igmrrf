"use strict";

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

console.log(_test.default);
var div = document.querySelectorAll("div"); // querySelector takes a single tag or the first element with that tag
// div.classList.add("fish");
//querySelector for all takes all element with that and creates a Nodelist
// console.log(div);

div.forEach(function (result) {
  //setting oncontextmenu to disable right click
  result.setAttribute("oncontextmenu", "return false");
  var num = 1;
  console.log("Hello" + num);
  num += 1;
});
alert("Hello World"); //Method Parameter Validation

var isRequired = function isRequired() {
  throw new Error("Param is required");
};

var print = function print() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isRequired();
  console.log("printing ".concat(num));
}; // print(null);
// print(2);
// print();
//Format JSON code
//console.log(JSON.stringify({ name: "John", Age: 23 }, null, `\t`));
//Get Unique Values from an Array


var uniqueArray = _toConsumableArray(new Set([1, 2, 3, 3, 3, "school", "school", "ball", false, false, true, true])); // console.log(uniqueArray);
//Extract falsy values from an array {undefined, null, NaN, 0, '', false}


uniqueArray = uniqueArray.filter(Boolean); // console.log(uniqueArray);
//Merge Several Objects Together

var user = {
  name: "John Ludwig",
  gender: "Male"
};
var college = {
  primary: "Mani Primary School",
  secondary: "Lass Secondary School"
};
var skills = {
  programming: "Extreme",
  swimming: "Average",
  sleeping: "Pro"
};

var summary = _objectSpread(_objectSpread(_objectSpread({}, user), college), skills); // console.log(summary);


var unsortedArray = [5, 6, 2, 4, 7, 3, 76, 33, 77, 66, 25, 24, 89];
var sortedArray = unsortedArray.sort(function (a, b) {
  return a - b;
});
console.log(sortedArray); //Destructuring with Aliases

var object = {
  number: 10
}; //Grabbing

var number = object.number; //renaming

var otherNumber = object.number; // console.log(object);
// console.log(otherNumber);
//Get the Last Items in an Array
// console.log(sortedArray.slice(-1));
// console.log(sortedArray.slice(-2));
//Wait Until Promises Are Complete