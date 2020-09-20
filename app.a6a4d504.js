// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Vendors/ogl/src/math/functions/Vec3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat4 = transformMat4;
exports.scaleRotateMat4 = scaleRotateMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.exactEquals = exactEquals;
exports.angle = void 0;
var EPSILON = 0.000001;
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */


function scaleRotateMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var uvx = qy * z - qz * y;
  var uvy = qz * x - qx * z;
  var uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy;
  var uuvy = qz * uvx - qx * uvz;
  var uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


var angle = function () {
  var tempA = [0, 0, 0];
  var tempB = [0, 0, 0];
  return function (a, b) {
    copy(tempA, a);
    copy(tempB, b);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  };
}();
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


exports.angle = angle;

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
},{}],"Vendors/ogl/src/math/Vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec3 = void 0;

var Vec3Func = _interopRequireWildcard(require("./functions/Vec3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Vec3 = /*#__PURE__*/function (_Array) {
  _inherits(Vec3, _Array);

  var _super = _createSuper(Vec3);

  function Vec3() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;

    _classCallCheck(this, Vec3);

    _this = _super.call(this, x, y, z);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      Vec3Func.set(this, x, y, z);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec3Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec3Func.add(this, va, vb);else Vec3Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec3Func.subtract(this, va, vb);else Vec3Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec3Func.multiply(this, this, v);else Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec3Func.divide(this, this, v);else Vec3Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec3Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec3Func.distance(this, v);else return Vec3Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return Vec3Func.squaredLength(this);
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec3Func.squaredDistance(this, v);else return Vec3Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) Vec3Func.cross(this, va, vb);else Vec3Func.cross(this, this, va);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec3Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec3Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec3Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec3Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "scaleRotateMatrix4",
    value: function scaleRotateMatrix4(mat4) {
      Vec3Func.scaleRotateMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      Vec3Func.transformQuat(this, this, q);
      return this;
    }
  }, {
    key: "angle",
    value: function angle(v) {
      return Vec3Func.angle(this, v);
    }
  }, {
    key: "lerp",
    value: function lerp(v, t) {
      Vec3Func.lerp(this, this, v, t);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(mat4) {
      var x = this[0];
      var y = this[1];
      var z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
    }
  }]);

  return Vec3;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Vec3 = Vec3;
},{"./functions/Vec3Func.js":"Vendors/ogl/src/math/functions/Vec3Func.js"}],"Vendors/ogl/src/core/Renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _Vec = require("../math/Vec3.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost
// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );
var tempVec3 = new _Vec.Vec3();
var ID = 1;

var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$canvas = _ref.canvas,
        canvas = _ref$canvas === void 0 ? document.createElement('canvas') : _ref$canvas,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 300 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 150 : _ref$height,
        _ref$dpr = _ref.dpr,
        dpr = _ref$dpr === void 0 ? 1 : _ref$dpr,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === void 0 ? false : _ref$alpha,
        _ref$depth = _ref.depth,
        depth = _ref$depth === void 0 ? true : _ref$depth,
        _ref$stencil = _ref.stencil,
        stencil = _ref$stencil === void 0 ? false : _ref$stencil,
        _ref$antialias = _ref.antialias,
        antialias = _ref$antialias === void 0 ? false : _ref$antialias,
        _ref$premultipliedAlp = _ref.premultipliedAlpha,
        premultipliedAlpha = _ref$premultipliedAlp === void 0 ? false : _ref$premultipliedAlp,
        _ref$preserveDrawingB = _ref.preserveDrawingBuffer,
        preserveDrawingBuffer = _ref$preserveDrawingB === void 0 ? false : _ref$preserveDrawingB,
        _ref$powerPreference = _ref.powerPreference,
        powerPreference = _ref$powerPreference === void 0 ? 'default' : _ref$powerPreference,
        _ref$autoClear = _ref.autoClear,
        autoClear = _ref$autoClear === void 0 ? true : _ref$autoClear,
        _ref$webgl = _ref.webgl,
        webgl = _ref$webgl === void 0 ? 2 : _ref$webgl;

    _classCallCheck(this, Renderer);

    var attributes = {
      alpha: alpha,
      depth: depth,
      stencil: stencil,
      antialias: antialias,
      premultipliedAlpha: premultipliedAlpha,
      preserveDrawingBuffer: preserveDrawingBuffer,
      powerPreference: powerPreference
    };
    this.dpr = dpr;
    this.alpha = alpha;
    this.color = true;
    this.depth = depth;
    this.stencil = stencil;
    this.premultipliedAlpha = premultipliedAlpha;
    this.autoClear = autoClear;
    this.id = ID++; // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1

    if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
    this.isWebgl2 = !!this.gl;

    if (!this.gl) {
      this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    } // Attach renderer to gl so that all classes have access to internal state functions


    this.gl.renderer = this; // initialise size values

    this.setSize(width, height); // gl state stores to avoid redundant calls on methods used internally

    this.state = {};
    this.state.blendFunc = {
      src: this.gl.ONE,
      dst: this.gl.ZERO
    };
    this.state.blendEquation = {
      modeRGB: this.gl.FUNC_ADD
    };
    this.state.cullFace = null;
    this.state.frontFace = this.gl.CCW;
    this.state.depthMask = true;
    this.state.depthFunc = this.gl.LESS;
    this.state.premultiplyAlpha = false;
    this.state.flipY = false;
    this.state.unpackAlignment = 4;
    this.state.framebuffer = null;
    this.state.viewport = {
      width: null,
      height: null
    };
    this.state.textureUnits = [];
    this.state.activeTextureUnit = 0;
    this.state.boundBuffer = null;
    this.state.uniformLocations = new Map(); // store requested extensions

    this.extensions = {}; // Initialise extra format types

    if (this.isWebgl2) {
      this.getExtension('EXT_color_buffer_float');
      this.getExtension('OES_texture_float_linear');
    } else {
      this.getExtension('OES_texture_float');
      this.getExtension('OES_texture_float_linear');
      this.getExtension('OES_texture_half_float');
      this.getExtension('OES_texture_half_float_linear');
      this.getExtension('OES_element_index_uint');
      this.getExtension('OES_standard_derivatives');
      this.getExtension('EXT_sRGB');
      this.getExtension('WEBGL_depth_texture');
      this.getExtension('WEBGL_draw_buffers');
    } // Create method aliases using extension (WebGL1) or native if available (WebGL2)


    this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
    this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
    this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
    this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
    this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
    this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
    this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL'); // Store device parameters

    this.parameters = {};
    this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic') ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }

  _createClass(Renderer, [{
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
      this.gl.canvas.width = width * this.dpr;
      this.gl.canvas.height = height * this.dpr;
      Object.assign(this.gl.canvas.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }
  }, {
    key: "setViewport",
    value: function setViewport(width, height) {
      if (this.state.viewport.width === width && this.state.viewport.height === height) return;
      this.state.viewport.width = width;
      this.state.viewport.height = height;
      this.gl.viewport(0, 0, width, height);
    }
  }, {
    key: "enable",
    value: function enable(id) {
      if (this.state[id] === true) return;
      this.gl.enable(id);
      this.state[id] = true;
    }
  }, {
    key: "disable",
    value: function disable(id) {
      if (this.state[id] === false) return;
      this.gl.disable(id);
      this.state[id] = false;
    }
  }, {
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha) return;
      this.state.blendFunc.src = src;
      this.state.blendFunc.dst = dst;
      this.state.blendFunc.srcAlpha = srcAlpha;
      this.state.blendFunc.dstAlpha = dstAlpha;
      if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);else this.gl.blendFunc(src, dst);
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
      this.state.blendEquation.modeRGB = modeRGB;
      this.state.blendEquation.modeAlpha = modeAlpha;
      if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);else this.gl.blendEquation(modeRGB);
    }
  }, {
    key: "setCullFace",
    value: function setCullFace(value) {
      if (this.state.cullFace === value) return;
      this.state.cullFace = value;
      this.gl.cullFace(value);
    }
  }, {
    key: "setFrontFace",
    value: function setFrontFace(value) {
      if (this.state.frontFace === value) return;
      this.state.frontFace = value;
      this.gl.frontFace(value);
    }
  }, {
    key: "setDepthMask",
    value: function setDepthMask(value) {
      if (this.state.depthMask === value) return;
      this.state.depthMask = value;
      this.gl.depthMask(value);
    }
  }, {
    key: "setDepthFunc",
    value: function setDepthFunc(value) {
      if (this.state.depthFunc === value) return;
      this.state.depthFunc = value;
      this.gl.depthFunc(value);
    }
  }, {
    key: "activeTexture",
    value: function activeTexture(value) {
      if (this.state.activeTextureUnit === value) return;
      this.state.activeTextureUnit = value;
      this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }
  }, {
    key: "bindFramebuffer",
    value: function bindFramebuffer() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$target = _ref2.target,
          target = _ref2$target === void 0 ? this.gl.FRAMEBUFFER : _ref2$target,
          _ref2$buffer = _ref2.buffer,
          buffer = _ref2$buffer === void 0 ? null : _ref2$buffer;

      if (this.state.framebuffer === buffer) return;
      this.state.framebuffer = buffer;
      this.gl.bindFramebuffer(target, buffer);
    }
  }, {
    key: "getExtension",
    value: function getExtension(extension, webgl2Func, extFunc) {
      // if webgl2 function supported, return func bound to gl context
      if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl); // fetch extension once only

      if (!this.extensions[extension]) {
        this.extensions[extension] = this.gl.getExtension(extension);
      } // return extension if no function requested


      if (!webgl2Func) return this.extensions[extension]; // Return null if extension not supported

      if (!this.extensions[extension]) return null; // return extension function, bound to extension

      return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }
  }, {
    key: "sortOpaque",
    value: function sortOpaque(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else if (a.zDepth !== b.zDepth) {
        return a.zDepth - b.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortTransparent",
    value: function sortTransparent(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      }

      if (a.zDepth !== b.zDepth) {
        return b.zDepth - a.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortUI",
    value: function sortUI(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "getRenderList",
    value: function getRenderList(_ref3) {
      var scene = _ref3.scene,
          camera = _ref3.camera,
          frustumCull = _ref3.frustumCull,
          sort = _ref3.sort;
      var renderList = [];
      if (camera && frustumCull) camera.updateFrustum(); // Get visible

      scene.traverse(function (node) {
        if (!node.visible) return true;
        if (!node.draw) return;

        if (frustumCull && node.frustumCulled && camera) {
          if (!camera.frustumIntersectsMesh(node)) return;
        }

        renderList.push(node);
      });

      if (sort) {
        var opaque = [];
        var transparent = []; // depthTest true

        var ui = []; // depthTest false

        renderList.forEach(function (node) {
          // Split into the 3 render groups
          if (!node.program.transparent) {
            opaque.push(node);
          } else if (node.program.depthTest) {
            transparent.push(node);
          } else {
            ui.push(node);
          }

          node.zDepth = 0; // Only calculate z-depth if renderOrder unset and depthTest is true

          if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return; // update z-depth

          node.worldMatrix.getTranslation(tempVec3);
          tempVec3.applyMatrix4(camera.projectionViewMatrix);
          node.zDepth = tempVec3.z;
        });
        opaque.sort(this.sortOpaque);
        transparent.sort(this.sortTransparent);
        ui.sort(this.sortUI);
        renderList = opaque.concat(transparent, ui);
      }

      return renderList;
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var scene = _ref4.scene,
          camera = _ref4.camera,
          _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? null : _ref4$target,
          _ref4$update = _ref4.update,
          update = _ref4$update === void 0 ? true : _ref4$update,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? true : _ref4$sort,
          _ref4$frustumCull = _ref4.frustumCull,
          frustumCull = _ref4$frustumCull === void 0 ? true : _ref4$frustumCull,
          clear = _ref4.clear;

      if (target === null) {
        // make sure no render target bound so draws to canvas
        this.bindFramebuffer();
        this.setViewport(this.width * this.dpr, this.height * this.dpr);
      } else {
        // bind supplied render target and update viewport
        this.bindFramebuffer(target);
        this.setViewport(target.width, target.height);
      }

      if (clear || this.autoClear && clear !== false) {
        // Ensure depth buffer writing is enabled so it can be cleared
        if (this.depth && (!target || target.depth)) {
          this.enable(this.gl.DEPTH_TEST);
          this.setDepthMask(true);
        }

        this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0));
      } // updates all scene graph matrices


      if (update) scene.updateMatrixWorld(); // Update camera separately, in case not in scene graph

      if (camera) camera.updateMatrixWorld(); // Get render list - entails culling and sorting

      var renderList = this.getRenderList({
        scene: scene,
        camera: camera,
        frustumCull: frustumCull,
        sort: sort
      });
      renderList.forEach(function (node) {
        node.draw({
          camera: camera
        });
      });
    }
  }]);

  return Renderer;
}();

exports.Renderer = Renderer;
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/math/functions/Vec4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.scale = scale;
exports.length = length;
exports.normalize = normalize;
exports.dot = dot;
exports.lerp = lerp;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
},{}],"Vendors/ogl/src/math/functions/QuatFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = identity;
exports.setAxisAngle = setAxisAngle;
exports.multiply = multiply;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.slerp = slerp;
exports.invert = invert;
exports.conjugate = conjugate;
exports.fromMat3 = fromMat3;
exports.fromEuler = fromEuler;
exports.normalize = exports.length = exports.lerp = exports.dot = exports.scale = exports.add = exports.set = exports.copy = void 0;

var vec4 = _interopRequireWildcard(require("./Vec4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/


function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */


function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */


function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */


function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */


function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */


function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */


function fromEuler(out, euler) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';
  var sx = Math.sin(euler[0] * 0.5);
  var cx = Math.cos(euler[0] * 0.5);
  var sy = Math.sin(euler[1] * 0.5);
  var cy = Math.cos(euler[1] * 0.5);
  var sz = Math.sin(euler[2] * 0.5);
  var cz = Math.cos(euler[2] * 0.5);

  if (order === 'XYZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'YXZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'ZXY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'ZYX') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'YZX') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'XZY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  }

  return out;
}
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */


var copy = vec4.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

exports.copy = copy;
var set = vec4.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

exports.set = set;
var add = vec4.add;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

exports.add = add;
var scale = vec4.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

exports.scale = scale;
var dot = vec4.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */

exports.dot = dot;
var lerp = vec4.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

exports.lerp = lerp;
var length = vec4.length;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

exports.length = length;
var normalize = vec4.normalize;
exports.normalize = normalize;
},{"./Vec4Func.js":"Vendors/ogl/src/math/functions/Vec4Func.js"}],"Vendors/ogl/src/math/Quat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quat = void 0;

var QuatFunc = _interopRequireWildcard(require("./functions/QuatFunc.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Quat = /*#__PURE__*/function (_Array) {
  _inherits(Quat, _Array);

  var _super = _createSuper(Quat);

  function Quat() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Quat);

    _this = _super.call(this, x, y, z, w);

    _this.onChange = function () {};

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Quat, [{
    key: "identity",
    value: function identity() {
      QuatFunc.identity(this);
      this.onChange();
      return this;
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      if (x.length) return this.copy(x);
      QuatFunc.set(this, x, y, z, w);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateX",
    value: function rotateX(a) {
      QuatFunc.rotateX(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateY",
    value: function rotateY(a) {
      QuatFunc.rotateY(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateZ",
    value: function rotateZ(a) {
      QuatFunc.rotateZ(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.invert(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.conjugate(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(q) {
      QuatFunc.copy(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.normalize(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(qA, qB) {
      if (qB) {
        QuatFunc.multiply(this, qA, qB);
      } else {
        QuatFunc.multiply(this, this, qA);
      }

      this.onChange();
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return QuatFunc.dot(this, v);
    }
  }, {
    key: "fromMatrix3",
    value: function fromMatrix3(matrix3) {
      QuatFunc.fromMat3(this, matrix3);
      this.onChange();
      return this;
    }
  }, {
    key: "fromEuler",
    value: function fromEuler(euler) {
      QuatFunc.fromEuler(this, euler, euler.order);
      return this;
    }
  }, {
    key: "fromAxisAngle",
    value: function fromAxisAngle(axis, a) {
      QuatFunc.setAxisAngle(this, axis, a);
      return this;
    }
  }, {
    key: "slerp",
    value: function slerp(q, t) {
      QuatFunc.slerp(this, this, q, t);
      return this;
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }, {
    key: "w",
    get: function get() {
      return this[3];
    },
    set: function set(v) {
      this[3] = v;
      this.onChange();
    }
  }]);

  return Quat;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Quat = Quat;
},{"./functions/QuatFunc.js":"Vendors/ogl/src/math/functions/QuatFunc.js"}],"Vendors/ogl/src/math/functions/Mat4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getMaxScaleOnAxis = getMaxScaleOnAxis;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromQuat = fromQuat;
exports.perspective = perspective;
exports.ortho = ortho;
exports.targetTo = targetTo;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.getRotation = void 0;
var EPSILON = 0.000001;
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (Math.abs(len) < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}

function getMaxScaleOnAxis(mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  var x = m11 * m11 + m12 * m12 + m13 * m13;
  var y = m21 * m21 + m22 * m22 + m23 * m23;
  var z = m31 * m31 + m32 * m32 + m33 * m33;
  return Math.sqrt(Math.max(x, y, z));
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


var getRotation = function () {
  var temp = [0, 0, 0];
  return function (out, mat) {
    var scaling = temp;
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  };
}();
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


exports.getRotation = getRotation;

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  var nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len === 0) {
    // eye and target are in the same position
    z2 = 1;
  } else {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len === 0) {
    // up and z are parallel
    if (upz) {
      upx += 1e-6;
    } else if (upy) {
      upz += 1e-6;
    } else {
      upy += 1e-6;
    }

    x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
  }

  len = 1 / Math.sqrt(len);
  x0 *= len;
  x1 *= len;
  x2 *= len;
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
},{}],"Vendors/ogl/src/math/Mat4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat4 = void 0;

var Mat4Func = _interopRequireWildcard(require("./functions/Mat4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Mat4 = /*#__PURE__*/function (_Array) {
  _inherits(Mat4, _Array);

  var _super = _createSuper(Mat4);

  function Mat4() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m03 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m10 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var m11 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var m12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m13 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m20 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var m21 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var m22 = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
    var m23 = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var m30 = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var m31 = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var m32 = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var m33 = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 1;

    _classCallCheck(this, Mat4);

    _this = _super.call(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Mat4, [{
    key: "set",
    value: function set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      if (m00.length) return this.copy(m00);
      Mat4Func.set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v, axis) {
      var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      Mat4Func.rotate(this, m, v, axis);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.scale(this, m, typeof v === 'number' ? [v, v, v] : v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat4Func.multiply(this, ma, mb);
      } else {
        Mat4Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat4Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat4Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromPerspective",
    value: function fromPerspective() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          fov = _ref.fov,
          aspect = _ref.aspect,
          near = _ref.near,
          far = _ref.far;

      Mat4Func.perspective(this, fov, aspect, near, far);
      return this;
    }
  }, {
    key: "fromOrthogonal",
    value: function fromOrthogonal(_ref2) {
      var left = _ref2.left,
          right = _ref2.right,
          bottom = _ref2.bottom,
          top = _ref2.top,
          near = _ref2.near,
          far = _ref2.far;
      Mat4Func.ortho(this, left, right, bottom, top, near, far);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat4Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "setPosition",
    value: function setPosition(v) {
      this.x = v[0];
      this.y = v[1];
      this.z = v[2];
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat4Func.invert(this, m);
      return this;
    }
  }, {
    key: "compose",
    value: function compose(q, pos, scale) {
      Mat4Func.fromRotationTranslationScale(this, q, pos, scale);
      return this;
    }
  }, {
    key: "getRotation",
    value: function getRotation(q) {
      Mat4Func.getRotation(q, this);
      return this;
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(pos) {
      Mat4Func.getTranslation(pos, this);
      return this;
    }
  }, {
    key: "getScaling",
    value: function getScaling(scale) {
      Mat4Func.getScaling(scale, this);
      return this;
    }
  }, {
    key: "getMaxScaleOnAxis",
    value: function getMaxScaleOnAxis() {
      return Mat4Func.getMaxScaleOnAxis(this);
    }
  }, {
    key: "lookAt",
    value: function lookAt(eye, target, up) {
      Mat4Func.targetTo(this, eye, target, up);
      return this;
    }
  }, {
    key: "determinant",
    value: function determinant() {
      return Mat4Func.determinant(this);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      this[4] = a[o + 4];
      this[5] = a[o + 5];
      this[6] = a[o + 6];
      this[7] = a[o + 7];
      this[8] = a[o + 8];
      this[9] = a[o + 9];
      this[10] = a[o + 10];
      this[11] = a[o + 11];
      this[12] = a[o + 12];
      this[13] = a[o + 13];
      this[14] = a[o + 14];
      this[15] = a[o + 15];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      a[o + 4] = this[4];
      a[o + 5] = this[5];
      a[o + 6] = this[6];
      a[o + 7] = this[7];
      a[o + 8] = this[8];
      a[o + 9] = this[9];
      a[o + 10] = this[10];
      a[o + 11] = this[11];
      a[o + 12] = this[12];
      a[o + 13] = this[13];
      a[o + 14] = this[14];
      a[o + 15] = this[15];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[12];
    },
    set: function set(v) {
      this[12] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[13];
    },
    set: function set(v) {
      this[13] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[14];
    },
    set: function set(v) {
      this[14] = v;
    }
  }, {
    key: "w",
    get: function get() {
      return this[15];
    },
    set: function set(v) {
      this[15] = v;
    }
  }]);

  return Mat4;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Mat4 = Mat4;
},{"./functions/Mat4Func.js":"Vendors/ogl/src/math/functions/Mat4Func.js"}],"Vendors/ogl/src/math/functions/EulerFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRotationMatrix = fromRotationMatrix;

// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';

  if (order === 'XYZ') {
    out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));

    if (Math.abs(m[8]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[10]);
      out[2] = Math.atan2(-m[4], m[0]);
    } else {
      out[0] = Math.atan2(m[6], m[5]);
      out[2] = 0;
    }
  } else if (order === 'YXZ') {
    out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));

    if (Math.abs(m[9]) < 0.99999) {
      out[1] = Math.atan2(m[8], m[10]);
      out[2] = Math.atan2(m[1], m[5]);
    } else {
      out[1] = Math.atan2(-m[2], m[0]);
      out[2] = 0;
    }
  } else if (order === 'ZXY') {
    out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));

    if (Math.abs(m[6]) < 0.99999) {
      out[1] = Math.atan2(-m[2], m[10]);
      out[2] = Math.atan2(-m[4], m[5]);
    } else {
      out[1] = 0;
      out[2] = Math.atan2(m[1], m[0]);
    }
  } else if (order === 'ZYX') {
    out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));

    if (Math.abs(m[2]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[10]);
      out[2] = Math.atan2(m[1], m[0]);
    } else {
      out[0] = 0;
      out[2] = Math.atan2(-m[4], m[5]);
    }
  } else if (order === 'YZX') {
    out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));

    if (Math.abs(m[1]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[5]);
      out[1] = Math.atan2(-m[2], m[0]);
    } else {
      out[0] = 0;
      out[1] = Math.atan2(m[8], m[10]);
    }
  } else if (order === 'XZY') {
    out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));

    if (Math.abs(m[4]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[5]);
      out[1] = Math.atan2(m[8], m[0]);
    } else {
      out[0] = Math.atan2(-m[9], m[10]);
      out[1] = 0;
    }
  }

  return out;
}
},{}],"Vendors/ogl/src/math/Euler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Euler = void 0;

var EulerFunc = _interopRequireWildcard(require("./functions/EulerFunc.js"));

var _Mat = require("./Mat4.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var tmpMat4 = new _Mat.Mat4();

var Euler = /*#__PURE__*/function (_Array) {
  _inherits(Euler, _Array);

  var _super = _createSuper(Euler);

  function Euler() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
    var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'YXZ';

    _classCallCheck(this, Euler);

    _this = _super.call(this, x, y, z);
    _this.order = order;

    _this.onChange = function () {};

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Euler, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this[0] = v[0];
      this[1] = v[1];
      this[2] = v[2];
      this.onChange();
      return this;
    }
  }, {
    key: "reorder",
    value: function reorder(order) {
      this.order = order;
      this.onChange();
      return this;
    }
  }, {
    key: "fromRotationMatrix",
    value: function fromRotationMatrix(m) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      EulerFunc.fromRotationMatrix(this, m, order);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      tmpMat4.fromQuaternion(q);
      return this.fromRotationMatrix(tmpMat4, order);
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }]);

  return Euler;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Euler = Euler;
},{"./functions/EulerFunc.js":"Vendors/ogl/src/math/functions/EulerFunc.js","./Mat4.js":"Vendors/ogl/src/math/Mat4.js"}],"Vendors/ogl/src/core/Transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = void 0;

var _Vec = require("../math/Vec3.js");

var _Quat = require("../math/Quat.js");

var _Mat = require("../math/Mat4.js");

var _Euler = require("../math/Euler.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transform = /*#__PURE__*/function () {
  function Transform() {
    var _this = this;

    _classCallCheck(this, Transform);

    this.parent = null;
    this.children = [];
    this.visible = true;
    this.matrix = new _Mat.Mat4();
    this.worldMatrix = new _Mat.Mat4();
    this.matrixAutoUpdate = true;
    this.position = new _Vec.Vec3();
    this.quaternion = new _Quat.Quat();
    this.scale = new _Vec.Vec3(1);
    this.rotation = new _Euler.Euler();
    this.up = new _Vec.Vec3(0, 1, 0);

    this.rotation.onChange = function () {
      return _this.quaternion.fromEuler(_this.rotation);
    };

    this.quaternion.onChange = function () {
      return _this.rotation.fromQuaternion(_this.quaternion);
    };
  }

  _createClass(Transform, [{
    key: "setParent",
    value: function setParent(parent) {
      var notifyParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (notifyParent && this.parent && parent !== this.parent) this.parent.removeChild(this, false);
      this.parent = parent;
      if (notifyParent && parent) parent.addChild(this, false);
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!~this.children.indexOf(child)) this.children.push(child);
      if (notifyChild) child.setParent(this, false);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
      if (notifyChild) child.setParent(null, false);
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld(force) {
      if (this.matrixAutoUpdate) this.updateMatrix();

      if (this.worldMatrixNeedsUpdate || force) {
        if (this.parent === null) this.worldMatrix.copy(this.matrix);else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
        this.worldMatrixNeedsUpdate = false;
        force = true;
      }

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].updateMatrixWorld(force);
      }
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale);
      this.worldMatrixNeedsUpdate = true;
    }
  }, {
    key: "traverse",
    value: function traverse(callback) {
      // Return true in callback to stop traversing children
      if (callback(this)) return;

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].traverse(callback);
      }
    }
  }, {
    key: "decompose",
    value: function decompose() {
      this.matrix.getTranslation(this.position);
      this.matrix.getRotation(this.quaternion);
      this.matrix.getScaling(this.scale);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      var invert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (invert) this.matrix.lookAt(this.position, target, this.up);else this.matrix.lookAt(target, this.position, this.up);
      this.matrix.getRotation(this.quaternion);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }]);

  return Transform;
}();

exports.Transform = Transform;
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js","../math/Quat.js":"Vendors/ogl/src/math/Quat.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js","../math/Euler.js":"Vendors/ogl/src/math/Euler.js"}],"Vendors/ogl/src/core/Camera.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat4.js");

var _Vec = require("../math/Vec3.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var tempMat4 = new _Mat.Mat4();
var tempVec3a = new _Vec.Vec3();
var tempVec3b = new _Vec.Vec3();

var Camera = /*#__PURE__*/function (_Transform) {
  _inherits(Camera, _Transform);

  var _super = _createSuper(Camera);

  function Camera(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$near = _ref.near,
        near = _ref$near === void 0 ? 0.1 : _ref$near,
        _ref$far = _ref.far,
        far = _ref$far === void 0 ? 100 : _ref$far,
        _ref$fov = _ref.fov,
        fov = _ref$fov === void 0 ? 45 : _ref$fov,
        _ref$aspect = _ref.aspect,
        aspect = _ref$aspect === void 0 ? 1 : _ref$aspect,
        left = _ref.left,
        right = _ref.right,
        bottom = _ref.bottom,
        top = _ref.top,
        _ref$zoom = _ref.zoom,
        zoom = _ref$zoom === void 0 ? 1 : _ref$zoom;

    _classCallCheck(this, Camera);

    _this = _super.call(this);
    Object.assign(_assertThisInitialized(_this), {
      near: near,
      far: far,
      fov: fov,
      aspect: aspect,
      left: left,
      right: right,
      bottom: bottom,
      top: top,
      zoom: zoom
    });
    _this.projectionMatrix = new _Mat.Mat4();
    _this.viewMatrix = new _Mat.Mat4();
    _this.projectionViewMatrix = new _Mat.Mat4();
    _this.worldPosition = new _Vec.Vec3(); // Use orthographic if left/right set, else default to perspective camera

    _this.type = left || right ? 'orthographic' : 'perspective';
    if (_this.type === 'orthographic') _this.orthographic();else _this.perspective();
    return _this;
  }

  _createClass(Camera, [{
    key: "perspective",
    value: function perspective() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$near = _ref2.near,
          near = _ref2$near === void 0 ? this.near : _ref2$near,
          _ref2$far = _ref2.far,
          far = _ref2$far === void 0 ? this.far : _ref2$far,
          _ref2$fov = _ref2.fov,
          fov = _ref2$fov === void 0 ? this.fov : _ref2$fov,
          _ref2$aspect = _ref2.aspect,
          aspect = _ref2$aspect === void 0 ? this.aspect : _ref2$aspect;

      Object.assign(this, {
        near: near,
        far: far,
        fov: fov,
        aspect: aspect
      });
      this.projectionMatrix.fromPerspective({
        fov: fov * (Math.PI / 180),
        aspect: aspect,
        near: near,
        far: far
      });
      this.type = 'perspective';
      return this;
    }
  }, {
    key: "orthographic",
    value: function orthographic() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$near = _ref3.near,
          near = _ref3$near === void 0 ? this.near : _ref3$near,
          _ref3$far = _ref3.far,
          far = _ref3$far === void 0 ? this.far : _ref3$far,
          _ref3$left = _ref3.left,
          left = _ref3$left === void 0 ? this.left : _ref3$left,
          _ref3$right = _ref3.right,
          right = _ref3$right === void 0 ? this.right : _ref3$right,
          _ref3$bottom = _ref3.bottom,
          bottom = _ref3$bottom === void 0 ? this.bottom : _ref3$bottom,
          _ref3$top = _ref3.top,
          top = _ref3$top === void 0 ? this.top : _ref3$top,
          _ref3$zoom = _ref3.zoom,
          zoom = _ref3$zoom === void 0 ? this.zoom : _ref3$zoom;

      Object.assign(this, {
        near: near,
        far: far,
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        zoom: zoom
      });
      left /= zoom;
      right /= zoom;
      bottom /= zoom;
      top /= zoom;
      this.projectionMatrix.fromOrthogonal({
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        near: near,
        far: far
      });
      this.type = 'orthographic';
      return this;
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld() {
      _get(_getPrototypeOf(Camera.prototype), "updateMatrixWorld", this).call(this);

      this.viewMatrix.inverse(this.worldMatrix);
      this.worldMatrix.getTranslation(this.worldPosition); // used for sorting

      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
      return this;
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      _get(_getPrototypeOf(Camera.prototype), "lookAt", this).call(this, target, true);

      return this;
    } // Project 3D coordinate to 2D point

  }, {
    key: "project",
    value: function project(v) {
      v.applyMatrix4(this.viewMatrix);
      v.applyMatrix4(this.projectionMatrix);
      return this;
    } // Unproject 2D point to 3D coordinate

  }, {
    key: "unproject",
    value: function unproject(v) {
      v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
      v.applyMatrix4(this.worldMatrix);
      return this;
    }
  }, {
    key: "updateFrustum",
    value: function updateFrustum() {
      if (!this.frustum) {
        this.frustum = [new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3()];
      }

      var m = this.projectionViewMatrix;
      this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x

      this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x

      this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y

      this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y

      this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)

      this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

      for (var i = 0; i < 6; i++) {
        var invLen = 1.0 / this.frustum[i].distance();
        this.frustum[i].multiply(invLen);
        this.frustum[i].constant *= invLen;
      }
    }
  }, {
    key: "frustumIntersectsMesh",
    value: function frustumIntersectsMesh(node) {
      // If no position attribute, treat as frustumCulled false
      if (!node.geometry.attributes.position) return true;
      if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();
      if (!node.geometry.bounds) return true;
      var center = tempVec3a;
      center.copy(node.geometry.bounds.center);
      center.applyMatrix4(node.worldMatrix);
      var radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(center, radius);
    }
  }, {
    key: "frustumIntersectsSphere",
    value: function frustumIntersectsSphere(center, radius) {
      var normal = tempVec3b;

      for (var i = 0; i < 6; i++) {
        var plane = this.frustum[i];
        var distance = normal.copy(plane).dot(center) + plane.constant;
        if (distance < -radius) return false;
      }

      return true;
    }
  }]);

  return Camera;
}(_Transform2.Transform);

exports.Camera = Camera;
},{"./Transform.js":"Vendors/ogl/src/core/Transform.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js","../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/core/Texture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads
var emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

var ID = 1;

var Texture = /*#__PURE__*/function () {
  function Texture(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        image = _ref.image,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? gl.TEXTURE_2D : _ref$target,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? gl.RGBA : _ref$format,
        _ref$internalFormat = _ref.internalFormat,
        internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
        _ref$wrapS = _ref.wrapS,
        wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
        _ref$wrapT = _ref.wrapT,
        wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
        _ref$generateMipmaps = _ref.generateMipmaps,
        generateMipmaps = _ref$generateMipmaps === void 0 ? true : _ref$generateMipmaps,
        _ref$minFilter = _ref.minFilter,
        minFilter = _ref$minFilter === void 0 ? generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR : _ref$minFilter,
        _ref$magFilter = _ref.magFilter,
        magFilter = _ref$magFilter === void 0 ? gl.LINEAR : _ref$magFilter,
        _ref$premultiplyAlpha = _ref.premultiplyAlpha,
        premultiplyAlpha = _ref$premultiplyAlpha === void 0 ? false : _ref$premultiplyAlpha,
        _ref$unpackAlignment = _ref.unpackAlignment,
        unpackAlignment = _ref$unpackAlignment === void 0 ? 4 : _ref$unpackAlignment,
        _ref$flipY = _ref.flipY,
        flipY = _ref$flipY === void 0 ? target == gl.TEXTURE_2D ? true : false : _ref$flipY,
        _ref$anisotropy = _ref.anisotropy,
        anisotropy = _ref$anisotropy === void 0 ? 0 : _ref$anisotropy,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        width = _ref.width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? width : _ref$height;

    _classCallCheck(this, Texture);

    this.gl = gl;
    this.id = ID++;
    this.image = image;
    this.target = target;
    this.type = type;
    this.format = format;
    this.internalFormat = internalFormat;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmaps = generateMipmaps;
    this.premultiplyAlpha = premultiplyAlpha;
    this.unpackAlignment = unpackAlignment;
    this.flipY = flipY;
    this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
    this.level = level;
    this.width = width;
    this.height = height;
    this.texture = this.gl.createTexture();
    this.store = {
      image: null
    }; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // State store to avoid redundant calls for per-texture state

    this.state = {};
    this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
    this.state.magFilter = this.gl.LINEAR;
    this.state.wrapS = this.gl.REPEAT;
    this.state.wrapT = this.gl.REPEAT;
    this.state.anisotropy = 0;
  }

  _createClass(Texture, [{
    key: "bind",
    value: function bind() {
      // Already bound to active texture unit
      if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
      this.gl.bindTexture(this.target, this.texture);
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }
  }, {
    key: "update",
    value: function update() {
      var textureUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var needsUpdate = !(this.image === this.store.image && !this.needsUpdate); // Make sure that texture is bound to its texture unit

      if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
        // set active texture unit to perform texture functions
        this.gl.renderer.activeTexture(textureUnit);
        this.bind();
      }

      if (!needsUpdate) return;
      this.needsUpdate = false;

      if (this.flipY !== this.glState.flipY) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.glState.flipY = this.flipY;
      }

      if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.glState.premultiplyAlpha = this.premultiplyAlpha;
      }

      if (this.unpackAlignment !== this.glState.unpackAlignment) {
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        this.glState.unpackAlignment = this.unpackAlignment;
      }

      if (this.minFilter !== this.state.minFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.state.minFilter = this.minFilter;
      }

      if (this.magFilter !== this.state.magFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.state.magFilter = this.magFilter;
      }

      if (this.wrapS !== this.state.wrapS) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.state.wrapS = this.wrapS;
      }

      if (this.wrapT !== this.state.wrapT) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.state.wrapT = this.wrapT;
      }

      if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
        this.gl.texParameterf(this.target, this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy);
        this.state.anisotropy = this.anisotropy;
      }

      if (this.image) {
        if (this.image.width) {
          this.width = this.image.width;
          this.height = this.image.height;
        }

        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // For cube maps
          for (var i = 0; i < 6; i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.level, this.internalFormat, this.format, this.type, this.image[i]);
          }
        } else if (ArrayBuffer.isView(this.image)) {
          // Data texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        } else if (this.image.isCompressedTexture) {
          // Compressed texture
          for (var level = 0; level < this.image.length; level++) {
            this.gl.compressedTexImage2D(this.target, level, this.internalFormat, this.image[level].width, this.image[level].height, 0, this.image[level].data);
          }
        } else {
          // Regular texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        }

        if (this.generateMipmaps) {
          // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
          if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
            this.generateMipmaps = false;
            this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
            this.minFilter = this.gl.LINEAR;
          } else {
            this.gl.generateMipmap(this.target);
          }
        } // Callback for when data is pushed to GPU


        this.onUpdate && this.onUpdate();
      } else {
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // Upload empty pixel for each side while no image to avoid errors while image or video loading
          for (var _i = 0; _i < 6; _i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
          }
        } else if (this.width) {
          // image intentionally left null for RenderTarget
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
        } else {
          // Upload empty pixel if no image to avoid errors while image or video loading
          this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      }

      this.store.image = this.image;
    }
  }]);

  return Texture;
}();

exports.Texture = Texture;
},{}],"Vendors/ogl/src/core/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geometry = void 0;

var _Vec = require("../math/Vec3.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tempVec3 = new _Vec.Vec3();
var ID = 1;
var ATTR_ID = 1; // To stop inifinite warnings

var isBoundsWarned = false;

var Geometry = /*#__PURE__*/function () {
  function Geometry(gl) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Geometry);

    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++; // Store one VAO per program attribute locations order

    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0; // Unbind current VAO so that new buffers don't get added to active mesh

    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // create the buffers

    for (var key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }

  _createClass(Geometry, [{
    key: "addAttribute",
    value: function addAttribute(key, attr) {
      this.attributes[key] = attr; // Set options

      attr.id = ATTR_ID++; // TODO: currently unused, remove?

      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array

      attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;

      if (!attr.buffer) {
        attr.buffer = this.gl.createBuffer(); // Push data to buffer

        this.updateAttribute(attr);
      } // Update geometry counts. If indexed, ignore regular attributes


      if (attr.divisor) {
        this.isInstanced = true;

        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn('geometry has multiple instanced buffers of different length');
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }

        this.instancedCount = attr.count * attr.divisor;
      } else if (key === 'index') {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
  }, {
    key: "updateAttribute",
    value: function updateAttribute(attr) {
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }

      this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
      attr.needsUpdate = false;
    }
  }, {
    key: "setIndex",
    value: function setIndex(value) {
      this.addAttribute('index', value);
    }
  }, {
    key: "setDrawRange",
    value: function setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
  }, {
    key: "setInstancedCount",
    value: function setInstancedCount(value) {
      this.instancedCount = value;
    }
  }, {
    key: "createVAO",
    value: function createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
  }, {
    key: "bindAttributes",
    value: function bindAttributes(program) {
      var _this = this;

      // Link all attributes to program using gl.vertexAttribPointer
      program.attributeLocations.forEach(function (location, _ref) {
        var name = _ref.name,
            type = _ref.type;

        // If geometry missing a required shader attribute
        if (!_this.attributes[name]) {
          console.warn("active attribute ".concat(name, " not being supplied"));
          return;
        }

        var attr = _this.attributes[name];

        _this.gl.bindBuffer(attr.target, attr.buffer);

        _this.glState.boundBuffer = attr.buffer; // For matrix attributes, buffer needs to be defined per column

        var numLoc = 1;
        if (type === 35674) numLoc = 2; // mat2

        if (type === 35675) numLoc = 3; // mat3

        if (type === 35676) numLoc = 4; // mat4

        var size = attr.size / numLoc;
        var stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
        var offset = numLoc === 1 ? 0 : numLoc * numLoc;

        for (var i = 0; i < numLoc; i++) {
          _this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);

          _this.gl.enableVertexAttribArray(location + i); // For instanced attributes, divisor needs to be set.
          // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render


          _this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
        }
      }); // Bind indices if geometry indexed

      if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var _this2 = this;

      var program = _ref2.program,
          _ref2$mode = _ref2.mode,
          mode = _ref2$mode === void 0 ? this.gl.TRIANGLES : _ref2$mode;

      if (this.gl.renderer.currentGeometry !== "".concat(this.id, "_").concat(program.attributeOrder)) {
        if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = "".concat(this.id, "_").concat(program.attributeOrder);
      } // Check if any attributes need updating


      program.attributeLocations.forEach(function (location, _ref3) {
        var name = _ref3.name;
        var attr = _this2.attributes[name];
        if (attr.needsUpdate) _this2.updateAttribute(attr);
      });

      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.drawRange.start, this.instancedCount);
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
  }, {
    key: "getPositionArray",
    value: function getPositionArray() {
      // Use position buffer, or min/max if available
      var attr = this.attributes.position;
      if (attr.min) return [].concat(_toConsumableArray(attr.min), _toConsumableArray(attr.max));
      if (attr.data) return attr.data;
      if (isBoundsWarned) return;
      console.warn('No position buffer data found to compute bounds');
      return isBoundsWarned = true;
    }
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox(array) {
      if (!array) array = this.getPositionArray();

      if (!this.bounds) {
        this.bounds = {
          min: new _Vec.Vec3(),
          max: new _Vec.Vec3(),
          center: new _Vec.Vec3(),
          scale: new _Vec.Vec3(),
          radius: Infinity
        };
      }

      var min = this.bounds.min;
      var max = this.bounds.max;
      var center = this.bounds.center;
      var scale = this.bounds.scale;
      min.set(+Infinity);
      max.set(-Infinity); // TODO: use offset/stride if exists
      // TODO: check size of position (eg triangle with Vec2)

      for (var i = 0, l = array.length; i < l; i += 3) {
        var x = array[i];
        var y = array[i + 1];
        var z = array[i + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }

      scale.sub(max, min);
      center.add(min, max).divide(2);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere(array) {
      if (!array) array = this.getPositionArray();
      if (!this.bounds) this.computeBoundingBox(array);
      var maxRadiusSq = 0;

      for (var i = 0, l = array.length; i < l; i += 3) {
        tempVec3.fromArray(array, i);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }

      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);

      for (var key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  }]);

  return Geometry;
}();

exports.Geometry = Geometry;
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/extras/Plane.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

var _Geometry2 = require("../core/Geometry.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Plane = /*#__PURE__*/function (_Geometry) {
  _inherits(Plane, _Geometry);

  var _super = _createSuper(Plane);

  function Plane(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 1 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 1 : _ref$height,
        _ref$widthSegments = _ref.widthSegments,
        widthSegments = _ref$widthSegments === void 0 ? 1 : _ref$widthSegments,
        _ref$heightSegments = _ref.heightSegments,
        heightSegments = _ref$heightSegments === void 0 ? 1 : _ref$heightSegments,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    _classCallCheck(this, Plane);

    var wSegs = widthSegments;
    var hSegs = heightSegments; // Determine length of arrays

    var num = (wSegs + 1) * (hSegs + 1);
    var numIndices = wSegs * hSegs * 6; // Generate empty arrays once

    var position = new Float32Array(num * 3);
    var normal = new Float32Array(num * 3);
    var uv = new Float32Array(num * 2);
    var index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    return _super.call(this, gl, attributes);
  }

  _createClass(Plane, null, [{
    key: "buildPlane",
    value: function buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs) {
      var u = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      var v = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var w = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 2;
      var uDir = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
      var vDir = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : -1;
      var i = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
      var ii = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;
      var io = i;
      var segW = width / wSegs;
      var segH = height / hSegs;

      for (var iy = 0; iy <= hSegs; iy++) {
        var y = iy * segH - height / 2;

        for (var ix = 0; ix <= wSegs; ix++, i++) {
          var x = ix * segW - width / 2;
          position[i * 3 + u] = x * uDir;
          position[i * 3 + v] = y * vDir;
          position[i * 3 + w] = depth / 2;
          normal[i * 3 + u] = 0;
          normal[i * 3 + v] = 0;
          normal[i * 3 + w] = depth >= 0 ? 1 : -1;
          uv[i * 2] = ix / wSegs;
          uv[i * 2 + 1] = 1 - iy / hSegs;
          if (iy === hSegs || ix === wSegs) continue;
          var a = io + ix + iy * (wSegs + 1);
          var b = io + ix + (iy + 1) * (wSegs + 1);
          var c = io + ix + (iy + 1) * (wSegs + 1) + 1;
          var d = io + ix + iy * (wSegs + 1) + 1;
          index[ii * 6] = a;
          index[ii * 6 + 1] = b;
          index[ii * 6 + 2] = d;
          index[ii * 6 + 3] = b;
          index[ii * 6 + 4] = c;
          index[ii * 6 + 5] = d;
          ii++;
        }
      }
    }
  }]);

  return Plane;
}(_Geometry2.Geometry);

exports.Plane = Plane;
},{"../core/Geometry.js":"Vendors/ogl/src/core/Geometry.js"}],"Vendors/ogl/src/core/Program.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube
var ID = 1; // cache of typed arrays used to flatten uniform arrays

var arrayCacheF32 = {};

var Program = /*#__PURE__*/function () {
  function Program(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        vertex = _ref.vertex,
        fragment = _ref.fragment,
        _ref$uniforms = _ref.uniforms,
        uniforms = _ref$uniforms === void 0 ? {} : _ref$uniforms,
        _ref$transparent = _ref.transparent,
        transparent = _ref$transparent === void 0 ? false : _ref$transparent,
        _ref$cullFace = _ref.cullFace,
        cullFace = _ref$cullFace === void 0 ? gl.BACK : _ref$cullFace,
        _ref$frontFace = _ref.frontFace,
        frontFace = _ref$frontFace === void 0 ? gl.CCW : _ref$frontFace,
        _ref$depthTest = _ref.depthTest,
        depthTest = _ref$depthTest === void 0 ? true : _ref$depthTest,
        _ref$depthWrite = _ref.depthWrite,
        depthWrite = _ref$depthWrite === void 0 ? true : _ref$depthWrite,
        _ref$depthFunc = _ref.depthFunc,
        depthFunc = _ref$depthFunc === void 0 ? gl.LESS : _ref$depthFunc;

    _classCallCheck(this, Program);

    if (!gl.canvas) console.error('gl not passed as fist argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied'); // Store program state

    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {}; // set default blendFunc if transparent flagged

    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } // compile vertex shader and log errors


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(vertexShader), "\nVertex Shader\n").concat(addLineNumbers(vertex)));
    } // compile fragment shader and log errors


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(fragmentShader), "\nFragment Shader\n").concat(addLineNumbers(fragment)));
    } // compile program and log errors


    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    } // Remove shader once linked


    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader); // Get active uniform locations

    this.uniformLocations = new Map();
    var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (var uIndex = 0; uIndex < numUniforms; uIndex++) {
      var uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name)); // split uniforms' names to separate array and struct declarations

      var split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];

      if (split.length === 3) {
        uniform.isStructArray = true;
        uniform.structIndex = Number(split[1]);
        uniform.structProperty = split[2];
      } else if (split.length === 2 && isNaN(Number(split[1]))) {
        uniform.isStruct = true;
        uniform.structProperty = split[1];
      }
    } // Get active attribute locations


    this.attributeLocations = new Map();
    var locations = [];
    var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (var aIndex = 0; aIndex < numAttribs; aIndex++) {
      var attribute = gl.getActiveAttrib(this.program, aIndex);
      var location = gl.getAttribLocation(this.program, attribute.name);
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }

    this.attributeOrder = locations.join('');
  }

  _createClass(Program, [{
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src) this.transparent = true;
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
  }, {
    key: "applyState",
    value: function applyState() {
      if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      if (this.blendEquation.modeRGB) this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
  }, {
    key: "use",
    value: function use() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$flipFaces = _ref2.flipFaces,
          flipFaces = _ref2$flipFaces === void 0 ? false : _ref2$flipFaces;

      var textureUnit = -1;
      var programActive = this.gl.renderer.currentProgram === this.id; // Avoid gl call if program already in use

      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.currentProgram = this.id;
      } // Set only the active uniforms found in the shader


      this.uniformLocations.forEach(function (location, activeUniform) {
        var name = activeUniform.uniformName; // get supplied uniform

        var uniform = _this.uniforms[name]; // For structs, get the specific property instead of the entire object

        if (activeUniform.isStruct) {
          uniform = uniform[activeUniform.structProperty];
          name += ".".concat(activeUniform.structProperty);
        }

        if (activeUniform.isStructArray) {
          uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
          name += "[".concat(activeUniform.structIndex, "].").concat(activeUniform.structProperty);
        }

        if (!uniform) {
          return warn("Active uniform ".concat(name, " has not been supplied"));
        }

        if (uniform && uniform.value === undefined) {
          return warn("".concat(name, " uniform is missing a value parameter"));
        }

        if (uniform.value.texture) {
          textureUnit = textureUnit + 1; // Check if texture needs to be updated

          uniform.value.update(textureUnit);
          return setUniform(_this.gl, activeUniform.type, location, textureUnit);
        } // For texture arrays, set uniform as an array of texture units instead of just one


        if (uniform.value.length && uniform.value[0].texture) {
          var textureUnits = [];
          uniform.value.forEach(function (value) {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(_this.gl, activeUniform.type, location, textureUnits);
        }

        setUniform(_this.gl, activeUniform.type, location, uniform.value);
      });
      this.applyState();
      if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.gl.deleteProgram(this.program);
    }
  }]);

  return Program;
}();

exports.Program = Program;

function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  var setValue = gl.renderer.state.uniformLocations.get(location); // Avoid redundant uniform commands

  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return; // Update cached array values

      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }

  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT

    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2

    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3

    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4

    case 35670: // BOOL

    case 5124: // INT

    case 35678: // SAMPLER_2D

    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE

    case 35671: // BOOL_VEC2

    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2

    case 35672: // BOOL_VEC3

    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3

    case 35673: // BOOL_VEC4

    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4

    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2

    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3

    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  var lines = string.split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function flatten(a) {
  var arrayLen = a.length;
  var valueLen = a[0].length;
  if (valueLen === undefined) return a;
  var length = arrayLen * valueLen;
  var value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);

  for (var i = 0; i < arrayLen; i++) {
    value.set(a[i], i * valueLen);
  }

  return value;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function setArray(a, b) {
  for (var i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}

var warnCount = 0;

function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}
},{}],"Vendors/ogl/src/math/functions/Mat3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromMat4 = fromMat4;
exports.fromQuat = fromQuat;
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
var EPSILON = 0.000001;
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */


function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */


function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */


function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
},{}],"Vendors/ogl/src/math/Mat3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat3 = void 0;

var Mat3Func = _interopRequireWildcard(require("./functions/Mat3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Mat3 = /*#__PURE__*/function (_Array) {
  _inherits(Mat3, _Array);

  var _super = _createSuper(Mat3);

  function Mat3() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m10 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m11 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var m12 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var m20 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m21 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m22 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;

    _classCallCheck(this, Mat3);

    _this = _super.call(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Mat3, [{
    key: "set",
    value: function set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      if (m00.length) return this.copy(m00);
      Mat3Func.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.rotate(this, m, v);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.scale(this, m, v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat3Func.multiply(this, ma, mb);
      } else {
        Mat3Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat3Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat3Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromMatrix4",
    value: function fromMatrix4(m) {
      Mat3Func.fromMat4(this, m);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat3Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "fromBasis",
    value: function fromBasis(vec3a, vec3b, vec3c) {
      this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat3Func.invert(this, m);
      return this;
    }
  }, {
    key: "getNormalMatrix",
    value: function getNormalMatrix(m) {
      Mat3Func.normalFromMat4(this, m);
      return this;
    }
  }]);

  return Mat3;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Mat3 = Mat3;
},{"./functions/Mat3Func.js":"Vendors/ogl/src/math/functions/Mat3Func.js"}],"Vendors/ogl/src/core/Mesh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = void 0;

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat3.js");

var _Mat2 = require("../math/Mat4.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ID = 0;

var Mesh = /*#__PURE__*/function (_Transform) {
  _inherits(Mesh, _Transform);

  var _super = _createSuper(Mesh);

  function Mesh(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        geometry = _ref.geometry,
        program = _ref.program,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? gl.TRIANGLES : _ref$mode,
        _ref$frustumCulled = _ref.frustumCulled,
        frustumCulled = _ref$frustumCulled === void 0 ? true : _ref$frustumCulled,
        _ref$renderOrder = _ref.renderOrder,
        renderOrder = _ref$renderOrder === void 0 ? 0 : _ref$renderOrder;

    _classCallCheck(this, Mesh);

    _this = _super.call(this);
    if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
    _this.gl = gl;
    _this.id = ID++;
    _this.geometry = geometry;
    _this.program = program;
    _this.mode = mode; // Used to skip frustum culling

    _this.frustumCulled = frustumCulled; // Override sorting to force an order

    _this.renderOrder = renderOrder;
    _this.modelViewMatrix = new _Mat2.Mat4();
    _this.normalMatrix = new _Mat.Mat3();
    _this.beforeRenderCallbacks = [];
    _this.afterRenderCallbacks = [];
    return _this;
  }

  _createClass(Mesh, [{
    key: "onBeforeRender",
    value: function onBeforeRender(f) {
      this.beforeRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "onAfterRender",
    value: function onAfterRender(f) {
      this.afterRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          camera = _ref2.camera;

      this.beforeRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });

      if (camera) {
        // Add empty matrix uniforms to program if unset
        if (!this.program.uniforms.modelMatrix) {
          Object.assign(this.program.uniforms, {
            modelMatrix: {
              value: null
            },
            viewMatrix: {
              value: null
            },
            modelViewMatrix: {
              value: null
            },
            normalMatrix: {
              value: null
            },
            projectionMatrix: {
              value: null
            },
            cameraPosition: {
              value: null
            }
          });
        } // Set the matrix uniforms


        this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
        this.program.uniforms.cameraPosition.value = camera.worldPosition;
        this.program.uniforms.viewMatrix.value = camera.viewMatrix;
        this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
        this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
        this.program.uniforms.modelMatrix.value = this.worldMatrix;
        this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
        this.program.uniforms.normalMatrix.value = this.normalMatrix;
      } // determine if faces need to be flipped - when mesh scaled negatively


      var flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({
        flipFaces: flipFaces
      });
      this.geometry.draw({
        mode: this.mode,
        program: this.program
      });
      this.afterRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });
    }
  }]);

  return Mesh;
}(_Transform2.Transform);

exports.Mesh = Mesh;
},{"./Transform.js":"Vendors/ogl/src/core/Transform.js","../math/Mat3.js":"Vendors/ogl/src/math/Mat3.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js"}],"Vendors/ogl/src/math/functions/Vec2Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.exactEquals = exactEquals;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */


function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */


function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */


function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
},{}],"Vendors/ogl/src/math/Vec2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec2 = void 0;

var Vec2Func = _interopRequireWildcard(require("./functions/Vec2Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Vec2 = /*#__PURE__*/function (_Array) {
  _inherits(Vec2, _Array);

  var _super = _createSuper(Vec2);

  function Vec2() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

    _classCallCheck(this, Vec2);

    _this = _super.call(this, x, y);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      if (x.length) return this.copy(x);
      Vec2Func.set(this, x, y);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec2Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec2Func.add(this, va, vb);else Vec2Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec2Func.subtract(this, va, vb);else Vec2Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec2Func.multiply(this, this, v);else Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec2Func.divide(this, this, v);else Vec2Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec2Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec2Func.distance(this, v);else return Vec2Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return this.squaredDistance();
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec2Func.squaredDistance(this, v);else return Vec2Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) return Vec2Func.cross(va, vb);
      return Vec2Func.cross(this, va);
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec2Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec2Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec2Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(mat3) {
      Vec2Func.transformMat3(this, this, mat3);
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec2Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(v, a) {
      Vec2Func.lerp(this, this, v, a);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this[0], this[1]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }]);

  return Vec2;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Vec2 = Vec2;
},{"./functions/Vec2Func.js":"Vendors/ogl/src/math/functions/Vec2Func.js"}],"src/Quad/shader/quad.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nuniform vec2 _Resolution;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    vec3 pos = position;\n    pos.xy *= 0.8;\n    pos.x /= _Resolution.x / _Resolution.y;\n\n    pos.x -= 0.8;\n    pos.y += 0.1;\n\n    // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n    gl_Position = vec4(pos, 1.0);\n\n    vUV = uv;\n\n}";
},{}],"src/Quad/shader/quad.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _Video;\nuniform sampler2D _Output;\nuniform vec2 _Resolution;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    vec2 cameraUV = vec2(1.0 - vUV.x, vUV.y);\n    cameraUV -= 0.5;\n    float aspect = (_Resolution.x / _Resolution.y) / (640.0 / 480.0);\n    cameraUV.y /= aspect;\n    cameraUV += 0.5;\n\n    vec3 flow = texture2D(_Output, vec2(1.0 - cameraUV.x, cameraUV.y)).xyz;\n\n    gl_FragColor = vec4(flow, 1.0);\n\n}";
},{}],"src/Quad/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Plane = require("../../Vendors/ogl/src/extras/Plane");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Texture = require("../../Vendors/ogl/src/core/Texture");

var _Mesh2 = require("../../Vendors/ogl/src/core/Mesh");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var vert = require("./shader/quad.vert");

var frag = require("./shader/quad.frag");

var Quad = /*#__PURE__*/function (_Mesh) {
  _inherits(Quad, _Mesh);

  var _super = _createSuper(Quad);

  function Quad(gl) {
    var _this;

    _classCallCheck(this, Quad);

    _this = _super.call(this, gl);
    _this.gl = gl;
    _this.geometry = new _Plane.Plane(_this.gl, {
      width: 1,
      height: 1
    });
    _this.texture = new _Texture.Texture(_this.gl, {
      generateMipmaps: false,
      minFilter: _this.gl.LINEAR,
      magFilter: _this.gl.LINEAR
    });
    var uniforms = {
      _Video: {
        value: _this.texture
      },
      _Output: {
        value: new _Texture.Texture(_this.gl)
      },
      _Resolution: {
        value: new _Vec.Vec2(_this.gl.renderer.width, _this.gl.renderer.height)
      }
    };
    _this.program = new _Program.Program(_this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: uniforms,
      transparent: false,
      depthTest: false,
      depthWrite: false
    });
    return _this;
  }

  _createClass(Quad, [{
    key: "update",
    value: function update(_ref) {
      var inputVideo = _ref.inputVideo;

      if (inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {
        this.texture.image = inputVideo;
        this.texture.needsUpdate = true;
      }
    }
  }, {
    key: "Output",
    set: function set(t) {
      this.program.uniforms._Output.value = t;
    }
  }]);

  return Quad;
}(_Mesh2.Mesh);

exports.default = Quad;
},{"../../Vendors/ogl/src/extras/Plane":"Vendors/ogl/src/extras/Plane.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","./shader/quad.vert":"src/Quad/shader/quad.vert","./shader/quad.frag":"src/Quad/shader/quad.frag"}],"Vendors/ogl/src/extras/Triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangle = void 0;

var _Geometry2 = require("../core/Geometry.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Triangle = /*#__PURE__*/function (_Geometry) {
  _inherits(Triangle, _Geometry);

  var _super = _createSuper(Triangle);

  function Triangle(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    _classCallCheck(this, Triangle);

    Object.assign(attributes, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });
    return _super.call(this, gl, attributes);
  }

  return Triangle;
}(_Geometry2.Geometry);

exports.Triangle = Triangle;
},{"../core/Geometry.js":"Vendors/ogl/src/core/Geometry.js"}],"Vendors/ogl/src/core/RenderTarget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTarget = void 0;

var _Texture = require("./Texture.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderTarget = function RenderTarget(gl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? gl.canvas.width : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? gl.canvas.height : _ref$height,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? gl.FRAMEBUFFER : _ref$target,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 1 : _ref$color,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? true : _ref$depth,
      _ref$stencil = _ref.stencil,
      stencil = _ref$stencil === void 0 ? false : _ref$stencil,
      _ref$depthTexture = _ref.depthTexture,
      depthTexture = _ref$depthTexture === void 0 ? false : _ref$depthTexture,
      _ref$wrapS = _ref.wrapS,
      wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
      _ref$wrapT = _ref.wrapT,
      wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
      _ref$minFilter = _ref.minFilter,
      minFilter = _ref$minFilter === void 0 ? gl.LINEAR : _ref$minFilter,
      _ref$magFilter = _ref.magFilter,
      magFilter = _ref$magFilter === void 0 ? minFilter : _ref$magFilter,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? gl.RGBA : _ref$format,
      _ref$internalFormat = _ref.internalFormat,
      internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
      unpackAlignment = _ref.unpackAlignment,
      premultiplyAlpha = _ref.premultiplyAlpha;

  _classCallCheck(this, RenderTarget);

  this.gl = gl;
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.buffer = this.gl.createFramebuffer();
  this.target = target;
  this.gl.bindFramebuffer(this.target, this.buffer);
  this.textures = [];
  var drawBuffers = []; // create and attach required num of color textures

  for (var i = 0; i < color; i++) {
    this.textures.push(new _Texture.Texture(gl, {
      width: width,
      height: height,
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      type: type,
      format: format,
      internalFormat: internalFormat,
      unpackAlignment: unpackAlignment,
      premultiplyAlpha: premultiplyAlpha,
      flipY: false,
      generateMipmaps: false
    }));
    this.textures[i].update();
    this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0
    /* level */
    );
    drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
  } // For multi-render targets shader access


  if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers); // alias for majority of use cases

  this.texture = this.textures[0]; // note depth textures break stencil - so can't use together

  if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
    this.depthTexture = new _Texture.Texture(gl, {
      width: width,
      height: height,
      minFilter: this.gl.NEAREST,
      magFilter: this.gl.NEAREST,
      format: this.gl.DEPTH_COMPONENT,
      internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
      type: this.gl.UNSIGNED_INT
    });
    this.depthTexture.update();
    this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0
    /* level */
    );
  } else {
    // Render buffers
    if (depth && !stencil) {
      this.depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
    }

    if (stencil && !depth) {
      this.stencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
    }

    if (depth && stencil) {
      this.depthStencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
    }
  }

  this.gl.bindFramebuffer(this.target, null);
};

exports.RenderTarget = RenderTarget;
},{"./Texture.js":"Vendors/ogl/src/core/Texture.js"}],"src/params.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.params = void 0;
var params = {
  // blur: {
  //     ITERATIONS: 5
  // },
  // opticalFlow: {
  //     TINY: 1.0,
  //     THRESHOLD: 1.0,
  //     FADE: 0.6,
  //     OFFSETSCALE: 1.5
  // }
  // blur: {
  //     ITERATIONS: 8
  // },
  // opticalFlow: {
  //     TINY: 1.0,
  //     THRESHOLD: 0.0,
  //     FADE: 0.6,
  //     OFFSETSCALE: 2.5
  // }
  //cleanest so far
  blur: {
    ITERATIONS: 4
  },
  opticalFlow: {
    TINY: 0.001,
    // THRESHOLD: 0.53, //used 0.09 originally...
    THRESHOLD: 0.6,
    //used 0.09 originally...
    FADE: 0.0,
    OFFSETSCALE: 3.5
  },
  simulation: {
    velocity: {
      // FORCE: 0.0010,
      FORCE: 0.8,
      INERTIA: 0.87
    }
  },
  shadow: {
    // BIAS: 0.001
    SIZE: 1024.0 * 1.0,
    BIAS: 0.001
  }
};
exports.params = params;
},{}],"src/Flow/shaders/triangle.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec2 position;\nattribute vec2 uv;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    gl_Position = vec4(position, 0.0, 1.0);\n    vUV = uv;\n\n}";
},{}],"src/Flow/shaders/opticalflow.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _CurrentFrame;\nuniform sampler2D _PrevFrame;\nuniform sampler2D _PrevFlow;\n\nuniform vec2 _Resolution;\nuniform vec2 _TexelSize;\nuniform float _Scale;\nuniform float _Tiny;\nuniform float _Threshold;\nuniform float _Fade;\nuniform float _OffsetScale;\n\nvarying vec2 vUV;\n\n// #define TINY 0.001\n// #define THRESHOLD 0.05\n// #define THRESHOLD 0.02\n\n#define TINY 1.0\n#define THRESHOLD 10.0\n\n#define OFFSETSCALE 2.0\n\n//HEAVILY INSPIRED FROM FOLLOWING SHADER: https://github.com/moostrik/ofxFlowTools/blob/master/src/core/opticalflow/ftOpticalFlowShader.h\n//By: Matthias Oostrik https://github.com/moostrik\n\nvoid main() {\n\n    vec2 uv = vec2(1.0 - vUV.x, vUV.y);\n\n    vec2 offsetX = vec2(_TexelSize.x, 0.0) * _OffsetScale;\n    vec2 offsetY = vec2(0.0, _TexelSize.y) * _OffsetScale;\n\n    //derivative X\n    float dX = texture2D(_PrevFrame, uv + offsetX).x - texture2D(_PrevFrame, uv - offsetX).x;\n    dX += texture2D(_CurrentFrame, uv + offsetX).x - texture2D(_CurrentFrame, uv - offsetX).x;\n\n    //derivative y\n    float dY = texture2D(_PrevFrame, uv + offsetY).x - texture2D(_PrevFrame, uv - offsetY).x;\n    dY += texture2D(_CurrentFrame, uv + offsetY).x - texture2D(_CurrentFrame, uv - offsetY).x;\n\n    //gradient magnitude\n    float mag = sqrt((dX * dX) + (dY * dY) + _Tiny);\n\n    //brightness difference\n    float dT = texture2D(_CurrentFrame, uv).x - texture2D(_PrevFrame, uv).x;\n\n    float vX = (dX / mag) * dT;\n    float vY = (dY / mag) * dT;\n\n    vec2 flow = vec2(vX, vY * -1.0);\n\n    flow *= _Scale; \n\n    float oldLen = sqrt((flow.x * flow.x) + (flow.y * flow.y) + 0.00001);\n    float newLen = max(oldLen - _Threshold, 0.0);\n    flow = (newLen * flow)/oldLen;\n\n    vec3 prevFlow = texture2D(_PrevFlow, vUV).xyz;\n    vec3 forward = cross(vec3(flow.x, 0.0, 0.0), vec3(0.0, flow.y, 0.0));\n    // vec3 outPut = mix(vec3(flow, forward.z), prevFlow, _Fade);\n    // vec3 outPut = mix(vec3(flow, flow.y - flow.x), prevFlow, _Fade);\n    // vec3 outPut = mix(vec3(flow, forward.z), prevFlow, _Fade);\n    vec3 outPut = vec3(flow, forward.z);\n    \n    gl_FragColor = vec4(outPut, 1.0);\n\n}";
},{}],"src/Flow/shaders/capture.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _CameraFrame;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    vec3 col = texture2D(_CameraFrame, vUV).xyz;\n    gl_FragColor = vec4(col, 1.0);\n\n}";
},{}],"src/Flow/shaders/blur.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 _Resolution;\nuniform sampler2D _Texture;\nuniform bool _Flip;\nuniform vec2 _BlurDirection;\n\nvarying vec2 vUV;\n\n//inspired by: https://github.com/Jam3/glsl-fast-gaussian-blur/blob/master/5.glsl\n\nvec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3333333333333333) * direction * resolution;\n  color += texture2D(image, uv).x * 0.29411764705882354;\n  color += texture2D(image, uv + off1).x * 0.35294117647058826;\n  color += texture2D(image, uv - off1).x * 0.35294117647058826;\n  return color; \n}\n\nvec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = (vec2(1.3846153846) * direction) * resolution;\n  vec2 off2 = (vec2(3.2307692308) * direction) * resolution;\n  color += texture2D(image, uv).x * 0.2270270270;\n  color += texture2D(image, uv + off1).x * 0.3162162162;\n  color += texture2D(image, uv - off1).x * 0.3162162162;\n  color += texture2D(image, uv + off2).x * 0.0702702703;\n  color += texture2D(image, uv - off2).x * 0.0702702703;\n  return color;\n}\n\nvoid main() {\n\n    gl_FragColor = blur5(_Texture, vUV, _Resolution, _BlurDirection);\n\n}";
},{}],"src/Flow/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Triangle = require("../../Vendors/ogl/src/extras/Triangle");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Texture = require("../../Vendors/ogl/src/core/Texture");

var _Mesh = require("../../Vendors/ogl/src/core/Mesh");

var _RenderTarget = require("../../Vendors/ogl/src/core/RenderTarget");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

var _params = require("../params.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var vert = require('./shaders/triangle.vert');

var opticalFlowFrag = require('./shaders/opticalflow.frag');

var captureFrag = require('./shaders/capture.frag');

var blur = require('./shaders/blur.frag');

var Flow = /*#__PURE__*/function () {
  function Flow(gl, _ref) {
    var _ref$width = _ref.width,
        width = _ref$width === void 0 ? 2 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 2 : _ref$height;

    _classCallCheck(this, Flow);

    this.gl = gl;
    this.width = width;
    this.height = height;
    this.firstTick = true;
    this.initCameraCapture();
    this.initBlurPass();
    this.initOpticalFlowPass();
  }

  _createClass(Flow, [{
    key: "initCameraCapture",
    value: function initCameraCapture() {
      this.cameraFrame = new _Texture.Texture(this.gl, {
        generateMipmaps: false,
        width: this.width,
        height: this.height
      });
      var params = {
        width: this.width,
        height: this.height,
        minFilter: this.gl.LINEAR,
        magFilter: this.gl.LINEAR,
        depth: false
      };
      this.currentFrame = new _RenderTarget.RenderTarget(this.gl, params);
      this.prevFrame = new _RenderTarget.RenderTarget(this.gl, params);
      var uniforms = {
        _CameraFrame: {
          value: this.cameraFrame
        }
      };
      this.cameraCapturePass = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          vertex: vert,
          fragment: captureFrag,
          uniforms: uniforms,
          transparent: false,
          depthTest: false,
          depthWrite: false
        })
      });
    }
  }, {
    key: "initBlurPass",
    value: function initBlurPass() {
      var textureParams = {
        width: this.width,
        height: this.height,
        minFilter: this.gl.LINEAR,
        magFilter: this.gl.LINEAR,
        depth: false
      };
      this.blurTextureWrite = new _RenderTarget.RenderTarget(this.gl, textureParams);
      this.blurTextureRead = new _RenderTarget.RenderTarget(this.gl, textureParams);
      this.blurDirectionX = new _Vec.Vec2(1.0, 0.0);
      this.blurDirectionY = new _Vec.Vec2(0.0, 1.0); // const blurParams = gui.addFolder("blur");
      // blurParams.add(params.blur, "ITERATIONS", 0, 12, 2).listen();

      var uniforms = {
        _Texture: {
          value: this.blurTextureRead.texture
        },
        _Resolution: {
          value: new _Vec.Vec2(1.0 / this.gl.renderer.width, 1.0 / this.gl.renderer.height)
        },
        _Flip: {
          value: false
        },
        _BlurDirection: {
          value: new _Vec.Vec2(0.0, 0.0)
        }
      };
      this.blurPass = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          vertex: vert,
          fragment: blur,
          uniforms: uniforms,
          transparent: false,
          depthTest: false,
          depthWrite: false
        })
      });
    }
  }, {
    key: "initOpticalFlowPass",
    value: function initOpticalFlowPass() {
      var textureParams = {
        width: this.width,
        height: this.height,
        type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
        format: this.gl.RGBA,
        internalFormat: this.gl.RGBA16F,
        depth: false
      };
      this.flowVectorTextureWrite = new _RenderTarget.RenderTarget(this.gl, textureParams);
      this.flowVectorTextureRead = new _RenderTarget.RenderTarget(this.gl, textureParams); // const opticalFlowparams = gui.addFolder("Optical Flow");
      // opticalFlowparams.add(params.opticalFlow, "TINY",  0.001, 1.0, 0.0001).listen();
      // opticalFlowparams.add(params.opticalFlow, "THRESHOLD", 0.0, 20.0, 0.001).listen();
      // opticalFlowparams.add(params.opticalFlow, "OFFSETSCALE", 1.0, 5.0, 0.5).listen();
      // opticalFlowparams.add(params.opticalFlow, "FADE", 0.0, 0.99).listen();
      // this.opticalFlowScene = new Transform();

      var uniforms = {
        _CurrentFrame: {
          value: this.currentFrame.texture
        },
        _PrevFrame: {
          value: this.prevFrame.texture
        },
        _PrevFlow: {
          value: this.flowVectorTextureRead.texture
        },
        _Resolution: {
          value: new _Vec.Vec2(this.gl.renderer.width, this.gl.renderer.height)
        },
        _TexelSize: {
          value: new _Vec.Vec2(1.0 / 640, 1.0 / 480) // value: new Vec2(0.1, 0.1)

        },
        _Tiny: {
          value: _params.params.opticalFlow.TINY
        },
        _Threshold: {
          value: _params.params.opticalFlow.THRESHOLD
        },
        _Fade: {
          value: _params.params.opticalFlow.FADE
        },
        _OffsetScale: {
          value: _params.params.opticalFlow.OFFSETSCALE
        },
        _Scale: {
          value: 10
        }
      };
      this.opticalFlowPass = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          uniforms: uniforms,
          vertex: vert,
          fragment: opticalFlowFrag,
          transparent: false,
          depthTest: false,
          depthWrite: false
        })
      });
    }
  }, {
    key: "blurInputVideo",
    value: function blurInputVideo() {
      var blurIterationCount = _params.params.blur.ITERATIONS;

      this.blurPass.program.uniforms._Resolution.value.set(1.0 / this.gl.renderer.width, 1.0 / this.gl.renderer.height); // this.gl.renderer.autoClear = false;


      for (var i = 0; i < blurIterationCount; i++) {
        var blurRadius = blurIterationCount - i - 1;
        this.blurPass.program.uniforms._Texture.value = i === 0 ? this.cameraFrame : this.blurTextureRead.texture;

        this.blurPass.program.uniforms._BlurDirection.value.set(i % 2 === 0 ? blurRadius : 0, i % 2 === 0 ? 0 : blurRadius);

        this.gl.renderer.render({
          scene: this.blurPass,
          target: this.blurTextureWrite,
          clear: false
        });
        var tmp = this.blurTextureRead;
        this.blurTextureRead = this.blurTextureWrite;
        this.blurTextureWrite = tmp;
      } // this.gl.renderer.autoClear = true;

    }
  }, {
    key: "saveCameraFrame",
    value: function saveCameraFrame() {
      var tmp = this.prevFrame;
      this.prevFrame = this.currentFrame;
      this.currentFrame = tmp;
      this.cameraCapturePass.program.uniforms._CameraFrame.value = this.blurTextureRead.texture;
      this.gl.renderer.render({
        scene: this.cameraCapturePass,
        target: this.currentFrame
      }); //prewarm to prevent spike in optical flow

      if (this.firstTick) {
        var tmp2 = this.prevFrame;
        this.prevFrame = this.currentFrame;
        this.currentFrame = tmp2;
        this.cameraCapturePass.program.uniforms._CameraFrame.value = this.prevFrame.texture;
        this.gl.renderer.render({
          scene: this.cameraCapturePass,
          target: this.currentFrame
        });
        this.firstTick = false;
      }
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var inputVideo = _ref2.inputVideo;
      this.cameraFrame = inputVideo;
      this.blurInputVideo();
      this.saveCameraFrame();
      this.opticalFlowPass.program.uniforms._CurrentFrame.value = this.currentFrame.texture;
      this.opticalFlowPass.program.uniforms._PrevFrame.value = this.prevFrame.texture; // this.opticalFlowPass.program.uniforms._PrevFlow.value = this.flowVectorTextureRead.texture;

      this.opticalFlowPass.program.uniforms._Tiny.value = _params.params.opticalFlow.TINY;
      this.opticalFlowPass.program.uniforms._Threshold.value = _params.params.opticalFlow.THRESHOLD;
      this.opticalFlowPass.program.uniforms._OffsetScale.value = _params.params.opticalFlow.OFFSETSCALE;
      this.opticalFlowPass.program.uniforms._Fade.value = _params.params.opticalFlow.FADE;

      this.opticalFlowPass.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);

      this.gl.renderer.render({
        scene: this.opticalFlowPass,
        target: this.flowVectorTextureWrite,
        clear: true
      }); // let tmp = this.flowVectorTextureRead;
      // this.flowVectorTextureRead = this.flowVectorTextureWrite;
      // this.flowVectorTextureWrite = tmp;
    }
  }]);

  return Flow;
}();

exports.default = Flow;
},{"../../Vendors/ogl/src/extras/Triangle":"Vendors/ogl/src/extras/Triangle.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/core/RenderTarget":"Vendors/ogl/src/core/RenderTarget.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","../params.js":"src/params.js","./shaders/triangle.vert":"src/Flow/shaders/triangle.vert","./shaders/opticalflow.frag":"src/Flow/shaders/opticalflow.frag","./shaders/capture.frag":"src/Flow/shaders/capture.frag","./shaders/blur.frag":"src/Flow/shaders/blur.frag"}],"Vendors/ogl/src/extras/Shadow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shadow = void 0;

var _Camera = require("../core/Camera.js");

var _Program = require("../core/Program.js");

var _RenderTarget = require("../core/RenderTarget.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shadow = /*#__PURE__*/function () {
  function Shadow(gl, _ref) {
    var _ref$light = _ref.light,
        light = _ref$light === void 0 ? new _Camera.Camera(gl) : _ref$light,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 1024 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? width : _ref$height;

    _classCallCheck(this, Shadow);

    this.gl = gl;
    this.light = light;
    this.target = new _RenderTarget.RenderTarget(gl, {
      width: width,
      height: height
    });
    this.depthProgram = new _Program.Program(gl, {
      vertex: defaultVertex,
      fragment: defaultFragment,
      cullFace: null
    });
    this.castMeshes = [];
  }

  _createClass(Shadow, [{
    key: "add",
    value: function add(_ref2) {
      var mesh = _ref2.mesh,
          _ref2$receive = _ref2.receive,
          receive = _ref2$receive === void 0 ? true : _ref2$receive,
          _ref2$cast = _ref2.cast,
          cast = _ref2$cast === void 0 ? true : _ref2$cast,
          _ref2$vertex = _ref2.vertex,
          vertex = _ref2$vertex === void 0 ? defaultVertex : _ref2$vertex,
          _ref2$fragment = _ref2.fragment,
          fragment = _ref2$fragment === void 0 ? defaultFragment : _ref2$fragment,
          _ref2$uniformProjecti = _ref2.uniformProjection,
          uniformProjection = _ref2$uniformProjecti === void 0 ? 'shadowProjectionMatrix' : _ref2$uniformProjecti,
          _ref2$uniformView = _ref2.uniformView,
          uniformView = _ref2$uniformView === void 0 ? 'shadowViewMatrix' : _ref2$uniformView,
          _ref2$uniformTexture = _ref2.uniformTexture,
          uniformTexture = _ref2$uniformTexture === void 0 ? 'tShadow' : _ref2$uniformTexture;

      // Add uniforms to existing program
      if (receive && !mesh.program.uniforms[uniformProjection]) {
        mesh.program.uniforms[uniformProjection] = {
          value: this.light.projectionMatrix
        };
        mesh.program.uniforms[uniformView] = {
          value: this.light.viewMatrix
        };
        mesh.program.uniforms[uniformTexture] = {
          value: this.target.texture
        };
      }

      if (!cast) return;
      this.castMeshes.push(mesh); // Store program for when switching between depth override

      mesh.colorProgram = mesh.program; // Check if depth program already attached

      if (mesh.depthProgram) return; // Use global depth override if nothing custom passed in

      if (vertex === defaultVertex && fragment === defaultFragment) {
        mesh.depthProgram = this.depthProgram;
        return;
      } // Create custom override program


      mesh.depthProgram = new _Program.Program(this.gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: mesh.program.uniforms !== null ? mesh.program.uniforms : null,
        cullFace: null
      });
    }
  }, {
    key: "render",
    value: function render(_ref3) {
      var _this = this;

      var scene = _ref3.scene;
      // For depth render, replace program with depth override.
      // Hide meshes not casting shadows.
      scene.traverse(function (node) {
        if (!node.draw) return;

        if (!!~_this.castMeshes.indexOf(node)) {
          // let u;
          // if(node.program.uniforms) {
          //     u = node.program.uniforms;
          // }
          node.program = node.depthProgram; // node.program.uniforms = u;
        } else {
          node.isForceVisibility = node.visible;
          node.visible = false;
        }
      }); // Render the depth shadow map using the light as the camera

      this.gl.renderer.render({
        scene: scene,
        camera: this.light,
        target: this.target
      }); // Then switch the program back to the normal one

      scene.traverse(function (node) {
        if (!node.draw) return;

        if (!!~_this.castMeshes.indexOf(node)) {
          node.program = node.colorProgram;
        } else {
          node.visible = node.isForceVisibility;
        }
      });
    }
  }]);

  return Shadow;
}();

exports.Shadow = Shadow;
var defaultVertex =
/* glsl */
"\n    attribute vec3 position;\n    attribute vec2 uv;\n\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n\n    void main() {\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n";
var defaultFragment =
/* glsl */
"\n    precision highp float;\n\n    vec4 packRGBA (float v) {\n        vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);\n        pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;\n        return pack;\n    }\n\n    void main() {\n        gl_FragColor = packRGBA(gl_FragCoord.z);\n    }\n";
},{"../core/Camera.js":"Vendors/ogl/src/core/Camera.js","../core/Program.js":"Vendors/ogl/src/core/Program.js","../core/RenderTarget.js":"Vendors/ogl/src/core/RenderTarget.js"}],"Vendors/ogl/src/extras/GPGPU.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GPGPU = void 0;

var _Program = require("../core/Program.js");

var _Mesh = require("../core/Mesh.js");

var _Texture = require("../core/Texture.js");

var _RenderTarget = require("../core/RenderTarget.js");

var _Triangle = require("./Triangle.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GPGPU = /*#__PURE__*/function () {
  function GPGPU(gl, _ref) {
    var _this = this;

    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? new Float32Array(16) : _ref$data,
        _ref$geometry = _ref.geometry,
        geometry = _ref$geometry === void 0 ? new _Triangle.Triangle(gl) : _ref$geometry,
        type = _ref.type;

    _classCallCheck(this, GPGPU);

    this.gl = gl;
    var initialData = data;
    this.passes = [];
    this.geometry = geometry;
    this.dataLength = initialData.length / 4; // Windows and iOS only like power of 2 textures
    // Find smallest PO2 that fits data

    this.size = Math.pow(2, Math.ceil(Math.log(Math.ceil(Math.sqrt(this.dataLength))) / Math.LN2)); // Create coords for output texture

    this.coords = new Float32Array(this.dataLength * 2);

    for (var i = 0; i < this.dataLength; i++) {
      var x = i % this.size / this.size; // to add 0.5 to be center pixel ?

      var y = Math.floor(i / this.size) / this.size;
      this.coords.set([x, y], i * 2);
    } // Use original data if already correct length of PO2 texture, else copy to new array of correct length


    var floatArray = function () {
      if (initialData.length === _this.size * _this.size * 4) {
        return initialData;
      } else {
        var a = new Float32Array(_this.size * _this.size * 4);
        a.set(initialData);
        return a;
      }
    }(); // Create output texture uniform using input float texture with initial data


    this.uniform = {
      value: new _Texture.Texture(gl, {
        image: floatArray,
        target: gl.TEXTURE_2D,
        type: gl.FLOAT,
        format: gl.RGBA,
        internalFormat: gl.renderer.isWebgl2 ? gl.RGBA32F : gl.RGBA,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
        generateMipmaps: false,
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
        width: this.size,
        flipY: false
      })
    }; // Create FBOs

    var options = {
      width: this.size,
      height: this.size,
      type: type || gl.HALF_FLOAT || gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
      format: gl.RGBA,
      internalFormat: gl.renderer.isWebgl2 ? type === gl.FLOAT ? gl.RGBA32F : gl.RGBA16F : gl.RGBA,
      minFilter: gl.NEAREST,
      depth: false,
      unpackAlignment: 1
    };
    this.fbo = {
      read: new _RenderTarget.RenderTarget(gl, options),
      write: new _RenderTarget.RenderTarget(gl, options),
      swap: function swap() {
        var temp = _this.fbo.read;
        _this.fbo.read = _this.fbo.write;
        _this.fbo.write = temp;
        _this.uniform.value = _this.fbo.read.texture;
      }
    };
  }

  _createClass(GPGPU, [{
    key: "addPass",
    value: function addPass() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$vertex = _ref2.vertex,
          vertex = _ref2$vertex === void 0 ? defaultVertex : _ref2$vertex,
          _ref2$fragment = _ref2.fragment,
          fragment = _ref2$fragment === void 0 ? defaultFragment : _ref2$fragment,
          _ref2$uniforms = _ref2.uniforms,
          uniforms = _ref2$uniforms === void 0 ? {} : _ref2$uniforms,
          _ref2$textureUniform = _ref2.textureUniform,
          textureUniform = _ref2$textureUniform === void 0 ? 'tMap' : _ref2$textureUniform,
          _ref2$enabled = _ref2.enabled,
          enabled = _ref2$enabled === void 0 ? true : _ref2$enabled;

      uniforms[textureUniform] = this.uniform;
      var program = new _Program.Program(this.gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: uniforms
      });
      var mesh = new _Mesh.Mesh(this.gl, {
        geometry: this.geometry,
        program: program
      });
      var pass = {
        mesh: mesh,
        program: program,
        uniforms: uniforms,
        enabled: enabled,
        textureUniform: textureUniform
      };
      this.passes.push(pass);
      return pass;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var enabledPasses = this.passes.filter(function (pass) {
        return pass.enabled;
      });
      enabledPasses.forEach(function (pass, i) {
        _this2.gl.renderer.render({
          scene: pass.mesh,
          target: _this2.fbo.write,
          clear: false
        });

        _this2.fbo.swap();
      });
    }
  }]);

  return GPGPU;
}();

exports.GPGPU = GPGPU;
var defaultVertex =
/* glsl */
"\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n";
var defaultFragment =
/* glsl */
"\n    precision highp float;\n\n    uniform sampler2D tMap;\n    varying vec2 vUv;\n\n    void main() {\n        gl_FragColor = texture2D(tMap, vUv);\n    }\n";
},{"../core/Program.js":"Vendors/ogl/src/core/Program.js","../core/Mesh.js":"Vendors/ogl/src/core/Mesh.js","../core/Texture.js":"Vendors/ogl/src/core/Texture.js","../core/RenderTarget.js":"Vendors/ogl/src/core/RenderTarget.js","./Triangle.js":"Vendors/ogl/src/extras/Triangle.js"}],"src/Particles/simulation/kernels/velocityCapture.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nuniform sampler2D _Position;\nuniform sampler2D _OpticalFlow;\n\nuniform mat4 _TextureProjectionMatrix;\nuniform float _Aspect;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 pos = texture2D(_Position, vUv);\n    vec3 currentCapturedVel = texture2D(tMap, vUv).xyz;\n    float life = pos.w;\n    \n    //if particle is recently spawned: get the color at the spawned location\n    if(life >= 1.0) {\n\n        vec4 clipPos = _TextureProjectionMatrix * vec4(pos.xyz, 1.0);\n        clipPos /= clipPos.w;\n        clipPos.xy = clipPos.xy * 0.5 + 0.5;\n\n        // float aspect = (_Resolution.x / _Resolution.y) / (640.0/480.0);\n        clipPos -= 0.5;\n        clipPos.y /= _Aspect;\n        clipPos += 0.5;\n\n        currentCapturedVel = texture2D(_OpticalFlow, clipPos.xy).xyz;\n\n    }\n\n    gl_FragColor = vec4(currentCapturedVel, 1.0);\n\n}";
},{}],"src/Particles/simulation/kernels/position.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nuniform sampler2D _OpticalFlow;\nuniform sampler2D _Velocity;\nuniform sampler2D _Params;\n\nuniform mat4 _TextureProjectionMatrix;\n\nuniform float _Seed;\nuniform float _Aspect;\nuniform vec2 _Bounds;\n\nvarying vec2 vUv;\n\nvec2 hash22(vec2 p)\n{\n\tvec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));\n    p3 += dot(p3, p3.yzx+33.33);\n    return fract((p3.xx+p3.yz)*p3.zy);\n\n}\n\nvoid main() {\n\n    vec4 pos = texture2D(tMap, vUv);\n    vec3 vel = texture2D(_Velocity, vUv).xyz;\n    float lifeRate = texture2D(_Params, vUv).x;\n\n    float life = pos.w;\n\n    if(life <= 0.0) {\n\n        life = 0.0;\n        //generate random position\n        vec2 hash = hash22(vec2(gl_FragCoord.xy * 10.0 + _Seed));\n        pos.x = mix(-_Bounds.x, _Bounds.x, hash.x);\n        pos.y = mix(-_Bounds.y, _Bounds.y, hash.y);\n\n        //get clip position of random position\n        vec4 clipPos = _TextureProjectionMatrix * vec4(pos.x, pos.y, 0.0, 1.0);\n        clipPos /= clipPos.w;\n        clipPos.xy = clipPos.xy * 0.5 + 0.5;\n\n        //aspect correct\n        clipPos -= 0.5;\n        clipPos.y /= _Aspect;\n        clipPos += 0.5;\n\n        //Sample optical flow texture and get it's length\n        vec3 opticalFlow = texture2D(_OpticalFlow, clipPos.xy).xyz;\n        float opticalFlowMag = dot(opticalFlow, opticalFlow);\n        // pos.w = 1.0;\n        //if there is motion at the sampled location, assign the random position\n        //as new position and restore lifespan\n        if(opticalFlowMag > 0.0) {\n            pos.xyz = vec3(pos.x, pos.y, 0.0);\n            life = 1.0;\n        }\n\n    } else {\n        \n        pos.xyz += vel.xyz;\n        // life -= mix(0.005, 0.02, lifeRate);\n        // life -= mix(0.005, 0.02, lifeRate);\n        life -= mix(0.01, 0.02, lifeRate);\n\n    }\n\n    gl_FragColor = vec4(pos.xyz, life);\n\n}";
},{}],"src/Particles/simulation/kernels/velocity.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nuniform sampler2D _OpticalFlowVelocity;\nuniform float _Force;\nuniform float _Inertia;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 vel = texture2D(tMap, vUv);\n    vec3 opticalFlowVel = texture2D(_OpticalFlowVelocity, vUv).xyz;\n    vec3 acc = vec3(0.0, 0.0, 0.0);\n\n    // acc += (opticalFlowVel * _Force);\n    acc += (opticalFlowVel * mix(0.0005, 0.002, _Force));\n\n    vel.xyz += acc;\n    vel.xyz *= _Inertia;\n    vel.w = length(opticalFlowVel);\n\n    gl_FragColor = vel;\n\n}";
},{}],"src/Particles/simulation/kernels/colorCapture.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nuniform sampler2D _Position;\nuniform sampler2D _OpticalFlow;\nuniform sampler2D _InputImg;\n\nuniform mat4 _TextureProjectionMatrix;\nuniform vec2 _Resolution;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 pos = texture2D(_Position, vUv);\n    vec3 currentCol = texture2D(tMap, vUv).xyz;\n    float life = pos.w;\n    \n    //if particle is recently spawned: get the color at the spawned location\n    if(life >= 1.0) {\n\n        vec4 clipPos = _TextureProjectionMatrix * vec4(pos.xyz, 1.0);\n        clipPos.xy = clipPos.xy * 0.5 + 0.5;\n\n        float aspect = (_Resolution.x / _Resolution.y) / (640.0/480.0);\n        clipPos -= 0.5;\n        clipPos.y /= aspect;\n        clipPos += 0.5;\n\n        currentCol = texture2D(_InputImg, clipPos.xy).xyz;\n\n    }\n\n    gl_FragColor = vec4(currentCol, 1.0);\n\n}";
},{}],"src/Particles/simulation/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GPGPU = require("../../../Vendors/ogl/src/extras/GPGPU");

var _Texture = require("../../../Vendors/ogl/src/core/Texture");

var _params = require("../../params.js");

var _Vec = require("../../../Vendors/ogl/src/math/Vec2");

var _Mat = require("../../../Vendors/ogl/src/math/Mat4");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var velocityCaptureKernel = require('./kernels/velocityCapture.frag');

var positionKernel = require('./kernels/position.frag');

var velocityKernel = require('./kernels/velocity.frag');

var colorCaptureKernel = require('./kernels/colorCapture.frag');

var Simulator = /*#__PURE__*/function () {
  function Simulator(gl, _ref) {
    var _this = this;

    var width = _ref.width,
        height = _ref.height,
        camera = _ref.camera;

    _classCallCheck(this, Simulator);

    _defineProperty(this, "onResize", function () {
      _this.calcViewportDimensions();

      var aspect = _this.gl.renderer.width / _this.gl.renderer.height / (640.0 / 480.0);
      _this.position.passes[0].program.uniforms._Aspect.value = aspect;
      _this.velocity.passes[0].program.uniforms._Aspect.value = aspect;
      _this.velocityCapture.passes[0].program.uniforms._Aspect.value = aspect;
    });

    this.gl = gl;
    this.countX = width;
    this.countY = height;
    this.camera = camera;
    this.viewportWidth;
    this.viewportHeight;
    this.modelViewMatrix = new _Mat.Mat4();
    this.viewProjectionMatrix = new _Mat.Mat4();
    this.calcViewportDimensions();
    this.initEvents();
    this.initVelocityCapture();
    this.initVelocity();
    this.initPosition();
  }

  _createClass(Simulator, [{
    key: "calcViewportDimensions",
    value: function calcViewportDimensions() {
      var dist = this.camera.position.z;
      this.viewportHeight = Math.tan(this.camera.fov * (Math.PI / 180.0) * 0.5) * dist;
      this.viewportWidth = this.viewportHeight * this.camera.aspect;
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: "initVelocityCapture",
    value: function initVelocityCapture() {
      var initCapturedVelocityData = new Float32Array(this.countX * this.countY * 4);
      this.velocityCapture = new _GPGPU.GPGPU(this.gl, {
        data: initCapturedVelocityData
      });
      var uniforms = {
        _OpticalFlow: {
          value: new _Texture.Texture(this.gl)
        },
        _Position: null,
        _TextureProjectionMatrix: {
          value: this.viewProjectionMatrix
        },
        _Aspect: {
          value: this.gl.renderer.width / this.gl.renderer.height / (640.0 / 480.0)
        }
      };
      this.velocityCapture.addPass({
        fragment: velocityCaptureKernel,
        uniforms: uniforms
      });
    }
  }, {
    key: "initVelocity",
    value: function initVelocity() {
      var initVelocityData = new Float32Array(this.countX * this.countY * 4.0);
      this.velocity = new _GPGPU.GPGPU(this.gl, {
        data: initVelocityData
      }); // const velocityParams = gui.addFolder("velocity");
      // velocityParams.add(params.simulation.velocity, "FORCE", 0.0001, 0.002).listen();
      // velocityParams.add(params.simulation.velocity, "FORCE", 0.0, 1.0).listen();

      gui.add(_params.params.simulation.velocity, "INERTIA", 0.1, 0.99).listen();
      var uniforms = {
        _OpticalFlowVelocity: null,
        _Position: null,
        _Force: {
          value: _params.params.simulation.velocity.FORCE
        },
        _Inertia: {
          value: _params.params.simulation.velocity.INERTIA
        },
        _Aspect: {
          value: this.gl.renderer.width / this.gl.renderer.height / (640.0 / 480.0)
        }
      };
      this.velocity.addPass({
        fragment: velocityKernel,
        uniforms: uniforms
      });
    }
  }, {
    key: "initPosition",
    value: function initPosition() {
      var initPositionData = new Float32Array(this.countX * this.countY * 4);
      var widthBounds = this.viewportWidth;
      var heightBounds = this.viewportHeight;
      var positionIterator = 0;

      for (var y = 0; y < this.countY; y++) {
        for (var x = 0; x < this.countX; x++) {
          var posX = (Math.random() * 2.0 - 1.0) * widthBounds;
          var posY = (Math.random() * 2.0 - 1.0) * heightBounds; // initSpawnPositionData[(spawnPositionIterator * 4.0) + 0] = posX;
          // initSpawnPositionData[(spawnPositionIterator * 4.0) + 1] = posY;
          // initSpawnPositionData[(spawnPositionIterator * 4.0) + 2] = 0.0;
          // initSpawnPositionData[(spawnPositionIterator * 4.0) + 3] = 0.0;
          // spawnPositionIterator++;

          initPositionData[positionIterator++] = posX;
          initPositionData[positionIterator++] = posY;
          initPositionData[positionIterator++] = 0.0;
          initPositionData[positionIterator++] = 0.0;
        }
      }

      var paramsData = new Float32Array(this.countX * this.countY * 4.0);
      var paramsDataIterator = 0;

      for (var i = 0; i < this.countX * this.countY; i++) {
        paramsData[paramsDataIterator++] = Math.random();
        paramsData[paramsDataIterator++] = Math.random();
        paramsData[paramsDataIterator++] = Math.random();
        paramsData[paramsDataIterator++] = Math.random();
      }

      var paramsTexture = this.createDataTexture({
        data: paramsData,
        size: this.countX
      });
      this.position = new _GPGPU.GPGPU(this.gl, {
        data: initPositionData
      });
      var uniforms = {
        _OpticalFlow: {
          value: new _Texture.Texture(this.gl)
        },
        _TextureProjectionMatrix: {
          value: this.viewProjectionMatrix
        },
        _Aspect: {
          value: this.gl.renderer.width / this.gl.renderer.height / (640.0 / 480.0)
        },
        _Velocity: {
          value: null
        },
        _Params: {
          value: paramsTexture
        },
        _Bounds: {
          value: new _Vec.Vec2(widthBounds, heightBounds)
        },
        _Seed: {
          value: 0
        }
      };
      this.position.addPass({
        fragment: positionKernel,
        uniforms: uniforms
      });
    }
  }, {
    key: "initColorCapture",
    value: function initColorCapture() {
      var initColorData = new Float32Array(this.countX * this.countY * 4);
      this.colorCapture = new _GPGPU.GPGPU(this.gl, {
        data: initColorData
      });
      var uniforms = {
        _OpticalFlow: {
          value: new _Texture.Texture(this.gl)
        },
        _TextureProjectionMatrix: {
          value: this.viewProjectionMatrix
        },
        _InputImg: {
          value: new _Texture.Texture(this.gl)
        },
        _Resolution: {
          value: new _Vec.Vec2(this.gl.renderer.width, this.gl.renderer.height)
        },
        _Position: null
      };
      this.colorCapture.addPass({
        fragment: colorCaptureKernel,
        uniforms: uniforms
      });
    }
  }, {
    key: "captureVelocity",
    value: function captureVelocity(_ref2) {
      var opticalFlow = _ref2.opticalFlow;
      this.velocityCapture.passes[0].program.uniforms._OpticalFlow.value = opticalFlow;
      this.velocityCapture.passes[0].program.uniforms._Position = this.position.uniform;
      this.velocityCapture.render();
    }
  }, {
    key: "updateVelocity",
    value: function updateVelocity() {
      this.velocity.passes[0].program.uniforms._Position = this.position.uniform;
      this.velocity.passes[0].program.uniforms._OpticalFlowVelocity = this.velocityCapture.uniform;
      this.velocity.passes[0].program.uniforms._Force.value = _params.params.simulation.velocity.FORCE;
      this.velocity.passes[0].program.uniforms._Inertia.value = _params.params.simulation.velocity.INERTIA;
      this.velocity.render();
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(_ref3) {
      var opticalFlow = _ref3.opticalFlow,
          t = _ref3.t;
      this.position.passes[0].program.uniforms._Velocity = this.velocity.uniform;
      this.position.passes[0].program.uniforms._OpticalFlow.value = opticalFlow;
      this.position.passes[0].program.uniforms._Seed.value += t;

      this.position.passes[0].uniforms._Bounds.value.set(this.viewportWidth, this.viewportHeight);

      this.position.render();
    }
  }, {
    key: "update",
    value: function update(_ref4) {
      var opticalFlow = _ref4.opticalFlow,
          worldMatrix = _ref4.worldMatrix,
          t = _ref4.t;
      this.modelViewMatrix.multiply(this.camera.viewMatrix, worldMatrix);
      this.viewProjectionMatrix.multiply(this.camera.projectionMatrix, this.modelViewMatrix);
      this.updateVelocity();
      this.updatePosition({
        opticalFlow: opticalFlow,
        t: t
      });
      this.captureVelocity({
        opticalFlow: opticalFlow
      });
    }
  }, {
    key: "createDataTexture",
    value: function createDataTexture(_ref5) {
      var data = _ref5.data,
          size = _ref5.size;
      return new _Texture.Texture(this.gl, {
        image: data,
        target: this.gl.TEXTURE_2D,
        type: this.gl.FLOAT,
        format: this.gl.RGBA,
        internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA32F : this.gl.RGBA,
        wrapS: this.gl.CLAMP_TO_EDGE,
        wrapT: this.gl.CLAMP_TO_EDGE,
        generateMipmaps: false,
        minFilter: this.gl.NEAREST,
        magFilter: this.gl.NEAREST,
        width: size,
        flipY: false
      });
    }
  }, {
    key: "Velocity",
    get: function get() {
      return this.velocity.uniform;
    }
  }, {
    key: "Position",
    get: function get() {
      return this.position.uniform;
    }
  }]);

  return Simulator;
}();

exports.default = Simulator;
},{"../../../Vendors/ogl/src/extras/GPGPU":"Vendors/ogl/src/extras/GPGPU.js","../../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../params.js":"src/params.js","../../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","../../../Vendors/ogl/src/math/Mat4":"Vendors/ogl/src/math/Mat4.js","./kernels/velocityCapture.frag":"src/Particles/simulation/kernels/velocityCapture.frag","./kernels/position.frag":"src/Particles/simulation/kernels/position.frag","./kernels/velocity.frag":"src/Particles/simulation/kernels/velocity.frag","./kernels/colorCapture.frag":"src/Particles/simulation/kernels/colorCapture.frag"}],"src/Particles/shader/particles.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 worldPosition;\n// attribute vec3 normal;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\n// uniform mat3 normalMatrix;\n\nuniform mat4 shadowProjectionMatrix;\nuniform mat4 shadowViewMatrix;\n\nuniform sampler2D _Position;\nuniform sampler2D _Velocity;\n\nvarying vec2 vUv;\nvarying vec4 vShadowCoord;\nvarying vec3 vNormal;\nvarying float vLife;\nvarying vec3 vWorldPos;\nvarying float vVelocity;\n\n// #define SCALE 0.0085\n// #define SCALE 0.0085\n// #define SCALE 0.0075\n// #define SCALE 0.035\n#define SCALE 0.025\n\nvoid main() {\n\n    vec4 worldPos = texture2D(_Position, worldPosition.xy);\n    float velocityScale = texture2D(_Velocity, worldPosition.xy).w;\n\n    float scalePhase = (worldPos.w * 4.0 * (1.0 - worldPos.w));\n    // float scalePhase = worldPos.w;\n\n    vec4 modelViewPos = modelViewMatrix * vec4(worldPos.xyz, 1.0);\n    modelViewPos.xy += position.xy * SCALE * scalePhase * mix(0.7, 1.1, min(1.0, velocityScale));\n\n    gl_Position = projectionMatrix * modelViewPos;\n\n    vec4 shadowModelViewPos = shadowViewMatrix * modelMatrix * vec4(worldPos.xyz, 1.0);\n    //shadowModelViewPos.xy += position.xy * SCALE* scalePhase;\n    vec4 shadowCoord = shadowProjectionMatrix * shadowModelViewPos;\n    vShadowCoord = shadowCoord;\n\n    vUv = uv;\n    // vNormal = normal;\n    vLife = worldPos.w;\n    vWorldPos = worldPos.xyz;\n    vVelocity = velocityScale;\n\n}";
},{}],"src/Particles/shader/particles.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _Normal;\nuniform sampler2D tShadow;\n\nuniform vec2 _Resolution;\nuniform float _ShadowMapTexelSize;\nuniform float _ShadowWeight;\nuniform float _Bias;\nuniform mat3 normalMatrix;\n\nvarying vec2 vUv;\nvarying vec4 vShadowCoord;\nvarying vec3 vNormal;\nvarying float vLife;\nvarying vec3 vWorldPos;\nvarying float vVelocity;\n\n// #define LIGHT vec3(0.0, 10.0, 2.0)\n#define LIGHT vec3(0.0, 10.0, 1.0)\n\nfloat unpackRGBA (vec4 v) {\n    return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\nvec2 hash22(in vec2 p)\n{\n\tvec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));\n    p3 += dot(p3, p3.yzx+33.33);\n    return fract((p3.xx+p3.yz)*p3.zy);\n\n}\n\nfloat softShadow(in vec3 shadowCoord) {\n\n    //if particle is outside the shadowmap, then it's for sure not being occluded\n    if(shadowCoord.x < 0.0 || shadowCoord.x > 1.0) return 1.0;\n    if(shadowCoord.y < 0.0 || shadowCoord.y > 1.0) return 1.0;\n    if(shadowCoord.z < 0.0 || shadowCoord.z > 1.0) return 1.0;\n\n    float shadow = 9.0;\n    for(int y = -1; y <= 1; y++) {\n        for(int x = -1; x <= 1; x++) {\n\n            vec2 hash = hash22((1000.0 * shadowCoord.xy) + vec2(float(x), float(y))) * 2.0 - 1.0;\n            // vec2 hash = hash22((1000.0 * shadowCoord.xy) + vec2(float(x), float(y))) - 0.5;\n            vec2 offset = (vec2(float(x), float(y)) + hash) * _ShadowMapTexelSize;\n\n            float sampledShadow = unpackRGBA(texture2D(tShadow, shadowCoord.xy + offset));\n            if(shadowCoord.z - _Bias > sampledShadow) {\n                shadow -= 1.0;\n            }\n\n        }\n    }\n\n    return shadow * _ShadowWeight;\n\n}\n\nvoid main() {\n    \n    vec3 normal = texture2D(_Normal, vUv).xyz;\n    vec2 c = 2.0 * vUv - 1.0;\n    if(dot(c,c) > 0.8) discard;\n    normal = normal * 2.0 - 1.0;\n\n    float light = max(0.0, dot(normal, normalize(LIGHT)));\n\n    vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;\n    shadowCoord = shadowCoord * 0.5 + 0.5;\n\n    float shadow = softShadow(shadowCoord.xyz);\n    vec3 col = vec3(0.61, 0.8, 0.98);\n    col = mix(col * 0.3, col, light) + (light * 0.2);\n    col *= mix(0.15, 1.0, shadow);\n    \n    gl_FragColor = vec4(col, 1.0);\n\n}";
},{}],"src/Particles/shader/particlesShadow.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 worldPosition;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nuniform sampler2D _Position;\nuniform sampler2D _Velocity;\n\nvarying vec2 vUv;\nvarying float vLife;\n\n// #define SCALE 0.0085\n// #define SCALE 0.0075\n// #define SCALE 0.035\n#define SCALE 0.025\n\nvoid main() {\n\n    vec4 worldPos = texture2D(_Position, worldPosition.xy);\n    float velocityScale = texture2D(_Velocity, worldPosition.xy).w;\n\n    float scalePhase = (worldPos.w * 4.0 * (1.0 - worldPos.w));\n\n    vec4 modelViewPos = modelViewMatrix * vec4(worldPos.xyz, 1.0);\n    modelViewPos.xy += position.xy * SCALE * scalePhase * mix(0.7, 1.1, min(1.0, velocityScale));\n\n    gl_Position = projectionMatrix * modelViewPos;\n\n    vUv = uv;\n    vLife = worldPos.w;\n\n}";
},{}],"src/Particles/shader/particlesShadow.frag":[function(require,module,exports) {
module.exports = "    precision highp float;\n#define GLSLIFY 1\n\n\n    uniform sampler2D _Normal;\n    varying vec2 vUv;\n    varying float vLife;\n\n    vec4 packRGBA (float v) {\n        vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);\n        pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;\n        return pack;\n    }\n\n    void main() {\n\n        // float normal = texture2D(_Normal, vUv).x;\n        // if(normal <= 0.0) discard;\n        vec2 uv = 2.0 * vUv - 1.0;\n        if(dot(uv, uv) > 1.0) discard;\n        vec4 depth = packRGBA(gl_FragCoord.z);\n\n        gl_FragColor = depth;\n    }";
},{}],"src/Particles/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mesh2 = require("../../Vendors/ogl/src/core/Mesh");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Plane = require("../../Vendors/ogl/src/extras/Plane");

var _Geometry = require("../../Vendors/ogl/src/core/Geometry");

var _Shadow = require("../../Vendors/ogl/src/extras/Shadow");

var _index = _interopRequireDefault(require("./simulation/index.js"));

var _Camera = require("../../Vendors/ogl/src/core/Camera");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

var _params = require("../params");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var vertex = require('./shader/particles.vert');

var fragment = require('./shader/particles.frag');

var shadowVertex = require('./shader/particlesShadow.vert');

var shadowFragment = require('./shader/particlesShadow.frag');

var Particles = /*#__PURE__*/function (_Mesh) {
  _inherits(Particles, _Mesh);

  var _super = _createSuper(Particles);

  function Particles(gl, _ref) {
    var _this;

    var camera = _ref.camera,
        normal = _ref.normal;

    _classCallCheck(this, Particles);

    _this = _super.call(this, gl);
    _this.gl = gl;
    _this.camera = camera;
    _this.countX = 256;
    _this.countY = _this.countX;

    _this.initSimulator();

    _this.initGeometry();

    _this.initProgram({
      normal: normal
    });

    _this.initShadowPass({
      normal: normal
    });

    return _this;
  }

  _createClass(Particles, [{
    key: "initSimulator",
    value: function initSimulator() {
      this.simulator = new _index.default(this.gl, {
        width: this.countX,
        height: this.countY,
        camera: this.camera
      });
    }
  }, {
    key: "initGeometry",
    value: function initGeometry() {
      var scale = 0.003;
      var refGeometry = new _Plane.Plane(this.gl, {
        width: 1.0,
        height: 1.0
      });
      var _refGeometry$attribut = refGeometry.attributes,
          position = _refGeometry$attribut.position,
          normal = _refGeometry$attribut.normal,
          uv = _refGeometry$attribut.uv,
          index = _refGeometry$attribut.index;
      var localPositionData = position.data;
      var normalData = normal.data;
      var uvData = uv.data;
      var indexData = index.data;
      this.geometry = new _Geometry.Geometry(this.gl, {
        position: {
          size: 3,
          data: localPositionData
        },
        worldPosition: {
          instanced: 1,
          size: 2,
          data: this.simulator.position.coords
        },
        uv: {
          size: 2,
          data: uvData
        },
        normal: {
          size: 3,
          data: normalData
        },
        index: {
          data: indexData
        }
      });
    }
  }, {
    key: "initProgram",
    value: function initProgram(_ref2) {
      var normal = _ref2.normal;
      // const shadowParams = gui.addFolder("shadow");
      // shadowParams.add(params.shadow, "BIAS", 0.0, 0.1, 0.0001).listen();
      var uniforms = {
        _Position: this.simulator.Position,
        _Velocity: this.simulator.Velocity,
        _Color: this.simulator.Color,
        _Resolution: {
          value: new _Vec.Vec2(this.gl.renderer.width, this.gl.renderer.height)
        },
        _ShadowMapTexelSize: {
          value: 1.0 / _params.params.shadow.SIZE
        },
        _ShadowWeight: {
          value: 1.0 / 9.0
        },
        _Bias: {
          value: _params.params.shadow.BIAS
        },
        _Normal: {
          value: normal
        }
      };
      this.program = new _Program.Program(this.gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: uniforms,
        cullFace: this.gl.BACK,
        transparent: false
      });
    }
  }, {
    key: "initShadowPass",
    value: function initShadowPass(_ref3) {
      var normal = _ref3.normal;
      this.shadowCamera = new _Camera.Camera(this.gl, {
        near: 1.0,
        far: 20.0,
        left: -4.0,
        right: 4.0,
        top: 4.0,
        bottom: -4.0
      }); // this.shadowCamera.position.set(0.0, 5.0, 5.0);
      // this.shadowCamera.position.set(0.0, 8.0, 0.25);
      // this.shadowCamera.position.set(0.0, 10.0, 1.0);
      // this.shadowCamera.position.set(0.0, 10.0, 2.0);

      this.shadowCamera.position.set(0.0, 10.0, 1.0);
      this.shadowCamera.lookAt([0.0, 0.0, 0.0]);
      this.shadowPass = new _Shadow.Shadow(this.gl, {
        light: this.shadowCamera,
        width: _params.params.shadow.SIZE,
        height: _params.params.shadow.SIZE
      });
      this.shadowPass.add({
        mesh: this,
        vertex: shadowVertex,
        fragment: shadowFragment
      });
    }
  }, {
    key: "update",
    value: function update(_ref4) {
      var scene = _ref4.scene,
          opticalFlow = _ref4.opticalFlow,
          t = _ref4.t;
      var worldMatrix = this.worldMatrix;
      this.simulator.update({
        opticalFlow: opticalFlow,
        worldMatrix: worldMatrix,
        t: t
      });
      this.depthProgram.uniforms._Position = this.simulator.Position;
      this.depthProgram.uniforms._Velocity = this.simulator.Velocity;
      this.shadowPass.render({
        scene: scene
      });
      this.program.uniforms._Position = this.simulator.Position;
      this.program.uniforms._Velocity = this.simulator.Velocity;
      this.program.uniforms._Bias.value = _params.params.shadow.BIAS;
    }
  }]);

  return Particles;
}(_Mesh2.Mesh);

exports.default = Particles;
},{"../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/extras/Plane":"Vendors/ogl/src/extras/Plane.js","../../Vendors/ogl/src/core/Geometry":"Vendors/ogl/src/core/Geometry.js","../../Vendors/ogl/src/extras/Shadow":"Vendors/ogl/src/extras/Shadow.js","./simulation/index.js":"src/Particles/simulation/index.js","../../Vendors/ogl/src/core/Camera":"Vendors/ogl/src/core/Camera.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","../params":"src/params.js","./shader/particles.vert":"src/Particles/shader/particles.vert","./shader/particles.frag":"src/Particles/shader/particles.frag","./shader/particlesShadow.vert":"src/Particles/shader/particlesShadow.vert","./shader/particlesShadow.frag":"src/Particles/shader/particlesShadow.frag"}],"Vendors/ogl/src/extras/Sphere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = void 0;

var _Geometry2 = require("../core/Geometry.js");

var _Vec = require("../math/Vec3.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Sphere = /*#__PURE__*/function (_Geometry) {
  _inherits(Sphere, _Geometry);

  var _super = _createSuper(Sphere);

  function Sphere(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$radius = _ref.radius,
        radius = _ref$radius === void 0 ? 0.5 : _ref$radius,
        _ref$widthSegments = _ref.widthSegments,
        widthSegments = _ref$widthSegments === void 0 ? 16 : _ref$widthSegments,
        _ref$heightSegments = _ref.heightSegments,
        heightSegments = _ref$heightSegments === void 0 ? Math.ceil(widthSegments * 0.5) : _ref$heightSegments,
        _ref$phiStart = _ref.phiStart,
        phiStart = _ref$phiStart === void 0 ? 0 : _ref$phiStart,
        _ref$phiLength = _ref.phiLength,
        phiLength = _ref$phiLength === void 0 ? Math.PI * 2 : _ref$phiLength,
        _ref$thetaStart = _ref.thetaStart,
        thetaStart = _ref$thetaStart === void 0 ? 0 : _ref$thetaStart,
        _ref$thetaLength = _ref.thetaLength,
        thetaLength = _ref$thetaLength === void 0 ? Math.PI : _ref$thetaLength,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    _classCallCheck(this, Sphere);

    var wSegs = widthSegments;
    var hSegs = heightSegments;
    var pStart = phiStart;
    var pLength = phiLength;
    var tStart = thetaStart;
    var tLength = thetaLength;
    var num = (wSegs + 1) * (hSegs + 1);
    var numIndices = wSegs * hSegs * 6;
    var position = new Float32Array(num * 3);
    var normal = new Float32Array(num * 3);
    var uv = new Float32Array(num * 2);
    var index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    var i = 0;
    var iv = 0;
    var ii = 0;
    var te = tStart + tLength;
    var grid = [];
    var n = new _Vec.Vec3();

    for (var iy = 0; iy <= hSegs; iy++) {
      var vRow = [];
      var v = iy / hSegs;

      for (var ix = 0; ix <= wSegs; ix++, i++) {
        var u = ix / wSegs;
        var x = -radius * Math.cos(pStart + u * pLength) * Math.sin(tStart + v * tLength);
        var y = radius * Math.cos(tStart + v * tLength);
        var z = radius * Math.sin(pStart + u * pLength) * Math.sin(tStart + v * tLength);
        position[i * 3] = x;
        position[i * 3 + 1] = y;
        position[i * 3 + 2] = z;
        n.set(x, y, z).normalize();
        normal[i * 3] = n.x;
        normal[i * 3 + 1] = n.y;
        normal[i * 3 + 2] = n.z;
        uv[i * 2] = u;
        uv[i * 2 + 1] = 1 - v;
        vRow.push(iv++);
      }

      grid.push(vRow);
    }

    for (var _iy = 0; _iy < hSegs; _iy++) {
      for (var _ix = 0; _ix < wSegs; _ix++) {
        var a = grid[_iy][_ix + 1];
        var b = grid[_iy][_ix];
        var c = grid[_iy + 1][_ix];
        var d = grid[_iy + 1][_ix + 1];

        if (_iy !== 0 || tStart > 0) {
          index[ii * 3] = a;
          index[ii * 3 + 1] = b;
          index[ii * 3 + 2] = d;
          ii++;
        }

        if (_iy !== hSegs - 1 || te < Math.PI) {
          index[ii * 3] = b;
          index[ii * 3 + 1] = c;
          index[ii * 3 + 2] = d;
          ii++;
        }
      }
    }

    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    return _super.call(this, gl, attributes);
  }

  return Sphere;
}(_Geometry2.Geometry);

exports.Sphere = Sphere;
},{"../core/Geometry.js":"Vendors/ogl/src/core/Geometry.js","../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"src/SphereNormal/shader/normal.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 normal;\n\nvarying vec3 vNormal;\n\nvoid main() {\n\n    gl_Position = vec4(position, 1.0);\n\n    vNormal = normal;\n\n}";
},{}],"src/SphereNormal/shader/normal.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vNormal;\n\nvoid main() {\n\n    gl_FragColor = vec4(normalize(vNormal) * 0.5 + 0.5, 1.0);\n\n}";
},{}],"src/SphereNormal/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sphere = require("../../Vendors/ogl/src/extras/Sphere");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Transform = require("../../Vendors/ogl/src/core/Transform");

var _Mesh = require("../../Vendors/ogl/src/core/Mesh");

var _RenderTarget = require("../../Vendors/ogl/src/core/RenderTarget");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var vertex = require('./shader/normal.vert');

var fragment = require('./shader/normal.frag');

var SphereNormal = /*#__PURE__*/function () {
  function SphereNormal(gl) {
    _classCallCheck(this, SphereNormal);

    this.gl = gl;
    this.scene = new _Transform.Transform();
    this.texture = new _RenderTarget.RenderTarget(this.gl, {
      width: 128.0,
      height: 128.0,
      depth: false,
      depthTexture: false
    });
    var geometry = new _Sphere.Sphere(this.gl, {
      radius: 0.9,
      widthSegments: 64.0,
      heightSegments: 32.0
    });
    var program = new _Program.Program(this.gl, {
      vertex: vertex,
      fragment: fragment,
      depthTest: false,
      depthWrite: false
    });
    var normalSphere = new _Mesh.Mesh(this.gl, {
      geometry: geometry,
      program: program,
      frustumCulled: false
    });
    normalSphere.setParent(this.scene);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.renderer.render({
      scene: this.scene,
      target: this.texture
    }); // this.gl.clearColor(0.7, 0.7, 0.7, 1.0);
  }

  _createClass(SphereNormal, [{
    key: "Texture",
    get: function get() {
      return this.texture.texture;
    }
  }]);

  return SphereNormal;
}();

exports.default = SphereNormal;
},{"../../Vendors/ogl/src/extras/Sphere":"Vendors/ogl/src/extras/Sphere.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Transform":"Vendors/ogl/src/core/Transform.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/core/RenderTarget":"Vendors/ogl/src/core/RenderTarget.js","./shader/normal.vert":"src/SphereNormal/shader/normal.vert","./shader/normal.frag":"src/SphereNormal/shader/normal.frag"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Renderer = require("../Vendors/ogl/src/core/Renderer.js");

var _Camera = require("../Vendors/ogl/src/core/Camera.js");

var _Transform = require("../Vendors/ogl/src/core/Transform.js");

var _Texture = require("../Vendors/ogl/src/core/Texture.js");

var _index = _interopRequireDefault(require("./Quad/index.js"));

var _index2 = _interopRequireDefault(require("./Flow/index.js"));

var _index3 = _interopRequireDefault(require("./Particles/index.js"));

var _index4 = _interopRequireDefault(require("./SphereNormal/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OpticalFlowParticles = /*#__PURE__*/function () {
  function OpticalFlowParticles() {
    var _this = this;

    _classCallCheck(this, OpticalFlowParticles);

    _defineProperty(this, "onResize", function () {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var aspect = w / h;

      _this.renderer.setSize(w, h);

      _this.camera.perspective({
        aspect: aspect
      });
    });

    this.renderer = new _Renderer.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: false
    });
    this.gl = this.renderer.gl;
    this.gl.canvas.style.position = "absolute";
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // this.gl.clearColor(0.7, 0.7, 0.7, 1.0);

    this.gl.canvas.style.top = "0";
    this.gl.canvas.style.left = "0";
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.overflow = "hidden";
    this.gl.canvas.style.zIndex = "-1";
    document.body.appendChild(this.gl.canvas);
    this.scene = new _Transform.Transform();
    this.camera = new _Camera.Camera(this.gl, {
      fov: 35,
      far: 50,
      aspect: window.innerWidth / window.innerHeight
    });
    this.camera.position.z = 5;
    this.initVideo();
    this.initOpticalFlow();
    this.initParticles();
    this.initQuad();
    this.initEvents();
    this.start();
  }

  _createClass(OpticalFlowParticles, [{
    key: "initVideo",
    value: function initVideo() {
      var _this2 = this;

      this.streamAvailable = false;
      this.video = document.createElement("video");
      this.videoTexture = new _Texture.Texture(this.gl, {
        generateMipmaps: false,
        width: 640,
        height: 480
      });
      var options = {
        audio: false,
        video: {
          width: 640,
          height: 480
        }
      };
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        _this2.video.srcObject = stream;

        _this2.video.play();

        _this2.streamAvailable = true;
      }).catch(function (error) {
        console.error("no camera found");
      });
    }
  }, {
    key: "initOpticalFlow",
    value: function initOpticalFlow() {
      this.flow = new _index2.default(this.gl, {
        width: 640,
        height: 480
      });
    }
  }, {
    key: "initParticles",
    value: function initParticles() {
      this.sphereNormal = new _index4.default(this.gl);
      this.particles = new _index3.default(this.gl, {
        camera: this.camera,
        normal: this.sphereNormal.Texture
      });
      this.particles.setParent(this.scene);
    }
  }, {
    key: "initQuad",
    value: function initQuad() {// this.quad = new Quad(this.gl);
      // this.quad.Output = this.flow.flowVectorTextureRead.texture;
      // this.quad.setParent(this.scene);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      window.addEventListener("resize", this.onResize);
    }
  }, {
    key: "start",
    value: function start() {
      this.t = 0.0016;
      this.update();
    }
  }, {
    key: "render",
    value: function render() {
      this.renderer.render({
        scene: this.scene,
        camera: this.camera
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      window.requestAnimationFrame(function () {
        return _this3.update();
      });

      if (this.streamAvailable) {
        if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
          this.videoTexture.image = this.video;
          this.videoTexture.needsUpdate = true;
          this.flow.update({
            inputVideo: this.videoTexture
          });
        }

        this.particles.update({
          scene: this.scene,
          opticalFlow: this.flow.flowVectorTextureWrite.texture,
          t: this.t
        }); // this.quad.update({
        //     inputVideo: this.video
        // });
        // this.quad.Output = this.particles.shadowPass.target.texture;
        // this.quad.Output = this.flow.flowVectorTextureWrite.texture;
      }

      this.render();
    }
  }]);

  return OpticalFlowParticles;
}();

exports.default = OpticalFlowParticles;
},{"../Vendors/ogl/src/core/Renderer.js":"Vendors/ogl/src/core/Renderer.js","../Vendors/ogl/src/core/Camera.js":"Vendors/ogl/src/core/Camera.js","../Vendors/ogl/src/core/Transform.js":"Vendors/ogl/src/core/Transform.js","../Vendors/ogl/src/core/Texture.js":"Vendors/ogl/src/core/Texture.js","./Quad/index.js":"src/Quad/index.js","./Flow/index.js":"src/Flow/index.js","./Particles/index.js":"src/Particles/index.js","./SphereNormal/index.js":"src/SphereNormal/index.js"}],"node_modules/dat.gui/build/dat.gui.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GUI = exports.gui = exports.dom = exports.controllers = exports.color = void 0;

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function colorToString(color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();

  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);

  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);

    while (str.length < 6) {
      str = '0' + str;
    }

    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }

  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);

      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }

      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;

      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;

      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }

    isNaN.toString = function () {
      return _isNaN.toString();
    };

    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};
var INTERPRETATIONS = [{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
}, {
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
}, {
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }

        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
}, {
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;

var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);

        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;

    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h /= 6;

    if (h < 0) {
      h += 1;
    }

    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }

    this.__state.a = this.__state.a || 1;
  }

  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();

function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }

      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }

      this.__state[component] = v;
    }
  });
}

function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }

      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }

      this.__state[component] = v;
    }
  });
}

Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};

Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });

  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};

Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }

    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }

  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;

      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }

      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }

  var match = val.match(CSS_VALUE_PIXELS);

  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }

  return 0;
}

var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;

    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }

    if (Common.isUndefined(vertical)) {
      vertical = true;
    }

    elem.style.position = 'absolute';

    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }

    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];

    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }

    var evt = document.createEvent(className);

    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
          break;
        }

      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }

      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }

    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }

    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }

    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);

      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }

    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);

        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }

    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = {
      left: 0,
      top: 0
    };

    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }

    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);

  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);

    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));

    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');

    _this2.__checkbox.setAttribute('type', 'checkbox');

    function onChange() {
      _this.setValue(!_this.__prev);
    }

    dom.bind(_this2.__checkbox, 'change', onChange, false);

    _this2.domElement.appendChild(_this2.__checkbox);

    _this2.updateDisplay();

    return _this2;
  }

  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');

        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }

      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);

  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);

    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));

    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');

    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }

    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);

      _this.__select.appendChild(opt);
    });

    _this2.updateDisplay();

    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;

      _this.setValue(desiredValue);
    });

    _this2.domElement.appendChild(_this2.__select);

    return _this2;
  }

  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);

  function StringController(object, property) {
    classCallCheck(this, StringController);

    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));

    var _this = _this2;

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }

      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();

  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }

  return 0;
}

var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);

  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);

    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));

    var _params = params || {};

    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;

    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }

    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }

  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;

      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }

      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }

      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);

  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);

    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));

    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;

    function onChange() {
      var attempted = parseFloat(_this.__input.value);

      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onBlur() {
      onFinish();
    }

    function onMouseDrag(e) {
      var diff = prevY - e.clientY;

      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prevY = e.clientY;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);

  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);

    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, {
      min: min,
      max: max,
      step: step
    }));

    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');

    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }

    function onMouseDrag(e) {
      e.preventDefault();

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));

      return false;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }

      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }

    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }

    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.updateDisplay();

    _this2.__background.appendChild(_this2.__foreground);

    _this2.domElement.appendChild(_this2.__background);

    return _this2;
  }

  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);

      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);

  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);

    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));

    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();

      _this.fire();

      return false;
    });
    dom.addClass(_this2.__button, 'button');

    _this2.domElement.appendChild(_this2.__button);

    return _this2;
  }

  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }

      this.getValue().call(this.object);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);

  function ColorController(object, property) {
    classCallCheck(this, ColorController);

    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));

    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function () {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function () {
      dom.addClass(this, 'drag').bind(window, 'touchend', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);

    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }

    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }

    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }

    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }

    function onBlur() {
      var i = interpret(this.value);

      if (i !== false) {
        _this.__color.__state = i;

        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }

    _this2.__saturation_field.appendChild(valueField);

    _this2.__selector.appendChild(_this2.__field_knob);

    _this2.__selector.appendChild(_this2.__saturation_field);

    _this2.__selector.appendChild(_this2.__hue_field);

    _this2.__hue_field.appendChild(_this2.__hue_knob);

    _this2.domElement.appendChild(_this2.__input);

    _this2.domElement.appendChild(_this2.__selector);

    _this2.updateDisplay();

    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__saturation_field.getBoundingClientRect();

      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;

      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__hue_field.getBoundingClientRect();

      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;

      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    return _this2;
  }

  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());

      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);

        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }

      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;

      var _flip = 255 - flip;

      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);

var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}

function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];

    try {
      head.appendChild(injected);
    } catch (e) {}
  }
};
var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];

  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }

  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }

      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }

    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, {
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
      });
    }

    return new NumberControllerBox(object, property, {
      min: arguments[2],
      max: arguments[3]
    });
  }

  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }

  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }

  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }

  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}

var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;

    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }

  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;

      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;

      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };

      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();

var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];

var GUI = function GUI(pars) {
  var _this = this;

  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });

  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = {
      preset: DEFAULT_DEFAULT_PRESET_NAME
    };
  }

  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }

  params.resizable = Common.isUndefined(params.parent) && params.resizable;

  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }

  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this, {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }

        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }

        setPresetSelectIndex(this);

        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;

        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;

        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }

        this.onResize();

        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;

          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }

          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });

  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);

    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }

    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);

    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }

    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }

    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);

    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };

    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);

    if (!params.closed) {
      this.closed = false;
    }
  }

  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }

      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }

    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }

  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };

  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();

  if (params.resizable) {
    addResizeHandle(this);
  }

  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };

  this.saveToLocalStorageIfPossible = saveToLocalStorage;

  function resetWidth() {
    var root = _this.getRoot();

    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }

  if (!params.parent) {
    resetWidth();
  }
};

GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};

GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';

GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};

dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype, {
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);

    this.__controllers.splice(this.__controllers.indexOf(controller), 1);

    var _this = this;

    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }

    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }

    var _this = this;

    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }

    var newGuiParams = {
      name: name,
      parent: this
    };
    newGuiParams.autoPlace = this.autoPlace;

    if (this.load && this.load.folders && this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }

    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);

    delete this.__folders[folder.name];

    if (this.load && this.load.folders && this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }

    removeListeners(folder);

    var _this = this;

    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();

    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });

      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }

    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }

    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }

    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }

    var _this = this;

    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }

      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });

    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;

    while (gui.parent) {
      gui = gui.parent;
    }

    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;

    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;

      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }

      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }

    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }

    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }

    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }

      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });

    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;

    this.__listening.push(controller);

    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});

function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');

  if (newDom) {
    li.appendChild(newDom);
  }

  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }

  gui.onResize();
  return li;
}

function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);

  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}

function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];

  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}

function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller, {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }

      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);

      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);

      return controller;
    }
  });

  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, {
      min: controller.__min,
      max: controller.__max,
      step: controller.__step
    });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];

      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();

        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });

        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }

      return returned;
    };

    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }

  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }

    return val;
  }, controller.setValue);
}

function recallSavedValue(gui, controller) {
  var root = gui.getRoot();

  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);

  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }

    controllerMap[controller.property] = controller;

    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;

      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }

      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}

function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }

  var controller = void 0;

  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }

  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }

  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);

  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }

  augmentController(gui, li, controller);

  gui.__controllers.push(controller);

  return controller;
}

function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}

function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;

  gui.__preset_select.appendChild(opt);

  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}

function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}

function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');

  gui.__ul.insertBefore(div, gui.__ul.firstChild);

  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');

  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }

  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }

    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);

  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';

    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }

    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }

  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');

    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}

function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });

  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }

  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }

  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }

  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}

function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';

  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }

  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}

function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}

function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}

function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }

  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
exports.color = color;
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
exports.controllers = controllers;
var dom$1 = {
  dom: dom
};
exports.dom = dom$1;
var gui = {
  GUI: GUI
};
exports.gui = gui;
var GUI$1 = GUI;
exports.GUI = GUI$1;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};
var _default = index;
exports.default = _default;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./index.js"));

var dat = _interopRequireWildcard(require("dat.gui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  window.gui = new dat.GUI();
  console.log('◕‿◕');
  console.log('douglas@adventureclub.io');
  console.log('douglas.lilliequist@gmail.com');
  console.log('twitter: @DougLilliequist');
  var opticalflowParticles = new _index.default();
};

window.onload = function () {
  return new App();
};
},{"./index.js":"src/index.js","dat.gui":"node_modules/dat.gui/build/dat.gui.module.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "192.168.1.109" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51341" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map