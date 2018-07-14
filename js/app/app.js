/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DatePicker = __webpack_require__(1);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showAsteroids = new _DatePicker2.default().showAsteroids; /*import MobileMenu from "./modules/MobileMenu";
                                                              import RevealOnScroll from "./modules/RevealOnScroll";
                                                              import $ from "jquery";
                                                              import StickyHeader from "./modules/StickyHeader";
                                                              import Modal from "./modules/Modal";
                                                              
                                                              var mobileMenu = new MobileMenu();
                                                              new RevealOnScroll($(".feature-item"), "85%");
                                                              new RevealOnScroll($(".testimonial"), "60%");
                                                              var stickyHeader = new StickyHeader();
                                                              var modal = new Modal;*/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatePicker = function () {
    function DatePicker() {
        _classCallCheck(this, DatePicker);

        this.start_date = document.getElementById("start_date");
        this.end_date = document.getElementById("end_date");
        this.message = document.getElementById("message");

        document.getElementById("showAsteroids").onclick = this.showAsteroids.bind(this);
    }

    // Calculate the difference


    _createClass(DatePicker, [{
        key: "dateDiffInDays",
        value: function dateDiffInDays(date1, date2) {
            var dt1 = new Date(date1);
            var dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
        }
    }, {
        key: "showAsteroids",
        value: function showAsteroids() {
            // Calculate the difference
            var difference = this.dateDiffInDays.call(this, start_date.value, end_date.value);

            if (this.start_date.value && this.end_date.value) {
                // Show the asteroids only if difference is no more than 7 days
                if (difference >= 0 && difference <= 7) {
                    // Clear existing alert message
                    this.message.innerHTML = "";

                    // Show asteroids
                    //fetchAsteroidsData(start_date, end_date);
                } else {
                    message.innerHTML = "";
                    message.innerHTML = "<p>Date difference must be between 0 and 7</p>";
                }
            } else {
                message.innerHTML = "";
                message.innerHTML = "<p>Please choose both start date and end date.</p>";
            }
        }
    }]);

    return DatePicker;
}();

exports.default = DatePicker;

/***/ })
/******/ ]);