(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<h1>Work In Progress</h1>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/navbar/navbar.component.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/navbar/navbar.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"navbar\">\n    <ul id=\"navbar-left-section\">\n        <li><a href=\"#about\">About</a></li>\n        <li><a href=\"#projects\">Projects</a></li>\n        <li><a href=\"#contact\">Contact</a></li>\n    </ul>\n    <ul id=\"navbar-right-section\">\n        <li><a href=\"https://github.com/MrMagma\"><fa-icon [icon]=\"faGithub\"></fa-icon></a></li>\n        <li><a href=\"https://www.linkedin.com/in/joshua-gammage-2431a1103/\"><fa-icon [icon]=\"faLinkedin\"></fa-icon></a></li>\n    </ul>\n</div>"

/***/ }),

/***/ "./src/app/app.component.sass":
/*!************************************!*\
  !*** ./src/app/app.component.sass ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Joshua Gammage';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.sass */ "./src/app/app.component.sass")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");






let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/navbar/navbar.component.sass":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.sass ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#navbar {\n  height: 50px;\n  line-height: 50px;\n  font-size: 20px;\n  background-color: black;\n  color: white;\n}\n#navbar #navbar-left-section {\n  float: left;\n  font-weight: bolder;\n}\n#navbar #navbar-left-section li {\n  position: relative;\n  text-align: center;\n  width: 100px;\n}\n#navbar #navbar-left-section li::after {\n  content: \"\";\n  position: absolute;\n  left: 20px;\n  right: 20px;\n  bottom: 0;\n  border-color: white;\n  border-style: solid;\n  border-bottom-width: 1px;\n  transition: left 0.5s ease, right 0.5s ease, border-bottom-width 0.5s ease;\n}\n#navbar #navbar-left-section li:hover::after {\n  left: 10px;\n  right: 10px;\n  transition: left 0.5s ease, right 0.5s ease, border-bottom-width 0.5s ease;\n}\n#navbar #navbar-right-section {\n  float: right;\n  font-size: 30px;\n}\n#navbar #navbar-right-section li {\n  margin-right: 10px;\n}\n#navbar #navbar-right-section, #navbar #navbar-left-section {\n  list-style-type: none;\n}\n#navbar #navbar-right-section li, #navbar #navbar-left-section li {\n  display: inline-block;\n}\n#navbar #navbar-right-section li a, #navbar #navbar-left-section li a {\n  color: white;\n  text-decoration: none;\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL0Q6XFxkZXZcXG1ybWFnbWEuZ2l0aHViLmlvL3NyY1xcYXBwXFxuYXZiYXJcXG5hdmJhci5jb21wb25lbnQuc2FzcyIsInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNJLFlBTEs7RUFNTCxpQkFOSztFQU9MLGVBTlE7RUFPUix1QkFBQTtFQUNBLFlBQUE7QUNISjtBREtJO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0FDSFI7QURJUTtFQUVJLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUhRO0FDQXBCO0FES1k7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSwwRUFBQTtBQ0hoQjtBRE1ZO0VBQ0ksVUFBQTtFQUNBLFdBQUE7RUFDQSwwRUFBQTtBQ0poQjtBRE1JO0VBQ0ksWUFBQTtFQUNBLGVBckNJO0FDaUNaO0FES1E7RUFDSSxrQkFBQTtBQ0haO0FES0k7RUFDSSxxQkFBQTtBQ0hSO0FES1E7RUFDSSxxQkFBQTtBQ0haO0FESVk7RUFDSSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDRmhCIiwiZmlsZSI6InNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiRoZWlnaHQ6IDUwcHhcbiRmb250LXNpemU6IDIwcHhcbiRpY29uLXNpemU6IDMwcHhcblxuI25hdmJhclxuICAgIGhlaWdodDogJGhlaWdodFxuICAgIGxpbmUtaGVpZ2h0OiAkaGVpZ2h0XG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2tcbiAgICBjb2xvcjogd2hpdGVcblxuICAgICNuYXZiYXItbGVmdC1zZWN0aW9uXG4gICAgICAgIGZsb2F0OiBsZWZ0XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXJcbiAgICAgICAgbGlcbiAgICAgICAgICAgICR3aWR0aDogMTAwcHhcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZVxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyXG4gICAgICAgICAgICB3aWR0aDogJHdpZHRoXG5cbiAgICAgICAgICAgICY6OmFmdGVyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJcIlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgIGxlZnQ6IDIwcHhcbiAgICAgICAgICAgICAgICByaWdodDogMjBweFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMFxuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogd2hpdGVcbiAgICAgICAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkXG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbGVmdCAwLjVzIGVhc2UsIHJpZ2h0IDAuNXMgZWFzZSwgYm9yZGVyLWJvdHRvbS13aWR0aCAwLjVzIGVhc2VcblxuXG4gICAgICAgICAgICAmOmhvdmVyOjphZnRlclxuICAgICAgICAgICAgICAgIGxlZnQ6IDEwcHhcbiAgICAgICAgICAgICAgICByaWdodDogMTBweFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGxlZnQgMC41cyBlYXNlLCByaWdodCAwLjVzIGVhc2UsIGJvcmRlci1ib3R0b20td2lkdGggMC41cyBlYXNlXG5cbiAgICAjbmF2YmFyLXJpZ2h0LXNlY3Rpb25cbiAgICAgICAgZmxvYXQ6IHJpZ2h0XG4gICAgICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZVxuICAgICAgICBsaVxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAoJGhlaWdodCAtICRpY29uLXNpemUpIC8gMlxuXG4gICAgI25hdmJhci1yaWdodC1zZWN0aW9uLCAjbmF2YmFyLWxlZnQtc2VjdGlvblxuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmVcblxuICAgICAgICBsaVxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrXG4gICAgICAgICAgICBhXG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlXG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lXG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCVcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCUiLCIjbmF2YmFyIHtcbiAgaGVpZ2h0OiA1MHB4O1xuICBsaW5lLWhlaWdodDogNTBweDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgY29sb3I6IHdoaXRlO1xufVxuI25hdmJhciAjbmF2YmFyLWxlZnQtc2VjdGlvbiB7XG4gIGZsb2F0OiBsZWZ0O1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuI25hdmJhciAjbmF2YmFyLWxlZnQtc2VjdGlvbiBsaSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwcHg7XG59XG4jbmF2YmFyICNuYXZiYXItbGVmdC1zZWN0aW9uIGxpOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMjBweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJvdHRvbTogMDtcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xuICB0cmFuc2l0aW9uOiBsZWZ0IDAuNXMgZWFzZSwgcmlnaHQgMC41cyBlYXNlLCBib3JkZXItYm90dG9tLXdpZHRoIDAuNXMgZWFzZTtcbn1cbiNuYXZiYXIgI25hdmJhci1sZWZ0LXNlY3Rpb24gbGk6aG92ZXI6OmFmdGVyIHtcbiAgbGVmdDogMTBweDtcbiAgcmlnaHQ6IDEwcHg7XG4gIHRyYW5zaXRpb246IGxlZnQgMC41cyBlYXNlLCByaWdodCAwLjVzIGVhc2UsIGJvcmRlci1ib3R0b20td2lkdGggMC41cyBlYXNlO1xufVxuI25hdmJhciAjbmF2YmFyLXJpZ2h0LXNlY3Rpb24ge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cbiNuYXZiYXIgI25hdmJhci1yaWdodC1zZWN0aW9uIGxpIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuI25hdmJhciAjbmF2YmFyLXJpZ2h0LXNlY3Rpb24sICNuYXZiYXIgI25hdmJhci1sZWZ0LXNlY3Rpb24ge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG59XG4jbmF2YmFyICNuYXZiYXItcmlnaHQtc2VjdGlvbiBsaSwgI25hdmJhciAjbmF2YmFyLWxlZnQtc2VjdGlvbiBsaSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbiNuYXZiYXIgI25hdmJhci1yaWdodC1zZWN0aW9uIGxpIGEsICNuYXZiYXIgI25hdmJhci1sZWZ0LXNlY3Rpb24gbGkgYSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");



let NavbarComponent = class NavbarComponent {
    constructor() {
        this.faLinkedin = _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faLinkedin"];
        this.faGithub = _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faGithub"];
    }
    ngOnInit() {
    }
};
NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__(/*! raw-loader!./navbar.component.html */ "./node_modules/raw-loader/index.js!./src/app/navbar/navbar.component.html"),
        styles: [__webpack_require__(/*! ./navbar.component.sass */ "./src/app/navbar/navbar.component.sass")]
    })
], NavbarComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\dev\mrmagma.github.io\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map