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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsteroidsTable = function () {
    function AsteroidsTable() {
        _classCallCheck(this, AsteroidsTable);
    }

    _createClass(AsteroidsTable, [{
        key: "fetchAsteroidsData",
        value: function fetchAsteroidsData(start_date, end_date) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start_date + "&end_date=" + end_date + "&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2");

            xhr.send(null);

            var self = this;

            xhr.onreadystatechange = function () {
                var DONE = 4;
                var OK = 200;
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        var res = JSON.parse(xhr.responseText);
                        var days = Object.keys(res.near_earth_objects); // Collect all the keys/days, so you can access all asteroids by day

                        var hazardousAsteroids = self.fetchHazardousAsteroids.call(self, res, days); // Store only hazardous asteroids

                        // Save the resulting array to local storage for future use
                        localStorage.setItem("hazardousAsteroids", JSON.stringify(hazardousAsteroids));

                        self.createTable.call(self, hazardousAsteroids);
                        self.createAsteroidsList.call(self, hazardousAsteroids);
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };
        }
    }, {
        key: "fetchHazardousAsteroids",
        value: function fetchHazardousAsteroids(response, days) {
            var results = []; // Store all hazardous asteroids here

            for (var i = 0; i < days.length; i++) {

                var asteroidsOnEachDay = response.near_earth_objects[days[i]]; // Check all asteroids on a given day

                for (var j = 0; j < asteroidsOnEachDay.length; j++) {
                    // Look for a asteroid that is hazardous
                    if (asteroidsOnEachDay[j].is_potentially_hazardous_asteroid === true) {
                        results.push(asteroidsOnEachDay[j]); // Add hazardous asteroid to a resulting array
                    }
                }
            }

            return results;
        }
    }, {
        key: "createTable",
        value: function createTable(array) {
            var tableBody = document.getElementById("table-body");

            // Before creating a table make sure to clear existing data, if any
            tableBody.innerHTML = "";

            // Create a new row for each hazardous asteroid
            for (var i = 0; i < array.length; i++) {

                var tr = document.createElement("tr"); // Create table row

                // Create all table cells and append them to table row, five in total
                var date = document.createElement("td");
                var dateText = document.createTextNode(array[i].close_approach_data["0"].close_approach_date);
                date.appendChild(dateText);
                tr.appendChild(date);

                var name = document.createElement("td");
                var nameText = document.createTextNode(array[i].name);
                name.appendChild(nameText);
                tr.appendChild(name);

                var speed = document.createElement("td");
                var speedText = document.createTextNode(array[i].close_approach_data["0"].relative_velocity.kilometers_per_hour);
                speed.appendChild(speedText);
                tr.appendChild(speed);

                var min = document.createElement("td");
                var minText = document.createTextNode(array[i].estimated_diameter.meters.estimated_diameter_min);
                min.appendChild(minText);
                tr.appendChild(min);

                var max = document.createElement("td");
                var maxText = document.createTextNode(array[i].estimated_diameter.meters.estimated_diameter_min);
                max.appendChild(maxText);
                tr.appendChild(max);

                // Append the whole row to the table
                tableBody.appendChild(tr);

                // Show the preview
                var asteroidSection = document.getElementById("asteroids-preview");
                asteroidSection.style.display = "block";

                // Clear the input field, if there is any data from previous search
                document.getElementById("asteroidList").value = "";
            }
        }
    }, {
        key: "createAsteroidsList",
        value: function createAsteroidsList(array) {
            var dropdown = document.getElementById("asteroids");

            // Before creating a dropdown make sure to clear existing data, if any
            dropdown.innerHTML = "";

            for (var i = 0; i < array.length; i++) {

                var option = document.createElement("option"); // Create the option tag

                option.setAttribute("value", array[i].name); // Set the value

                // Append all the options to the dropdown
                dropdown.appendChild(option);
            }
        }
    }]);

    return AsteroidsTable;
}();

exports.default = AsteroidsTable;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DatePicker = __webpack_require__(2);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _AsteroidsTable = __webpack_require__(0);

var _AsteroidsTable2 = _interopRequireDefault(_AsteroidsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _DatePicker2.default();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AsteroidsTable = __webpack_require__(0);

var _AsteroidsTable2 = _interopRequireDefault(_AsteroidsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

                    // Fetch and show asteroids
                    _AsteroidsTable2.default.prototype.fetchAsteroidsData(this.start_date.value, this.end_date.value);
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