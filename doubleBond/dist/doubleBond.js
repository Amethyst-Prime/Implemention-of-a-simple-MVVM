/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./doubleBond.ts":
/*!***********************!*\
  !*** ./doubleBond.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Observer = exports.Subject = exports.currentObs = void 0;\r\nconst myMVVM_1 = __webpack_require__(/*! ./myMVVM */ \"./myMVVM.ts\");\r\nexports.currentObs = null;\r\nlet id = 0;\r\nclass Subject {\r\n    constructor() {\r\n        this.id = id++;\r\n        this.observers = [];\r\n    }\r\n    addObserver(observer) {\r\n        this.observers.push(observer);\r\n    }\r\n    notify() {\r\n        this.observers.forEach(observer => {\r\n            observer.update();\r\n        });\r\n    }\r\n}\r\nexports.Subject = Subject;\r\nclass Observer {\r\n    constructor(vm, key, callback) {\r\n        this.subjects = {};\r\n        this.vm = vm;\r\n        this.key = key;\r\n        this.callback = callback;\r\n        this.val = this.getVal();\r\n    }\r\n    update() {\r\n        var oldVal = this.val;\r\n        var newVal = this.getVal();\r\n        if (oldVal !== newVal) {\r\n            this.val = newVal;\r\n            this.callback.bind(this.vm)(newVal, oldVal);\r\n        }\r\n    }\r\n    getVal() {\r\n        console.log('getValue fun in class observer');\r\n        exports.currentObs = this;\r\n        let val = this.vm.data[this.key];\r\n        exports.currentObs = null;\r\n        return val;\r\n    }\r\n    subscribeTo(subj) {\r\n        //订阅到观测主体\r\n        let id = subj.id;\r\n        if (!this.subjects[id]) {\r\n            subj.addObserver(this);\r\n            this.subjects[id] = subj;\r\n            console.log('property ' + this.key + ' subscribe to ' + 'subject ' + subj.id);\r\n        }\r\n    }\r\n}\r\nexports.Observer = Observer;\r\nlet testMvvm = new myMVVM_1.MVVM({\r\n    node: \"#app\",\r\n    data: {\r\n        name: 'Reese',\r\n        age: 20,\r\n        sex: '',\r\n        major: '',\r\n        id: 1234567,\r\n    },\r\n    methods: {\r\n        hello: function () {\r\n            alert('welcome!');\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://doublebond/./doubleBond.ts?");

/***/ }),

/***/ "./myCompiler.ts":
/*!***********************!*\
  !*** ./myCompiler.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Compile = void 0;\r\nconst doubleBond_1 = __webpack_require__(/*! ./doubleBond */ \"./doubleBond.ts\");\r\nclass Compile {\r\n    constructor(vm) {\r\n        this.vm = vm;\r\n        this.node = vm.node;\r\n        this.compile();\r\n    }\r\n    compile() {\r\n        this.traverse(this.node);\r\n    }\r\n    traverse(node) {\r\n        if (node.nodeType === 1) {\r\n            this.compileNode(node);\r\n            node.childNodes.forEach((childNode) => {\r\n                this.traverse(childNode);\r\n            });\r\n        }\r\n        else if (node.nodeType === 3) {\r\n            this.renderText(node);\r\n        }\r\n    }\r\n    // 处理指令\r\n    compileNode(node) {\r\n        let attrsArr = Array.from(node.attributes);\r\n        attrsArr.forEach((attr) => {\r\n            if (this.isModel(attr.name)) {\r\n                this.bindModel(node, attr);\r\n            }\r\n            else if (this.isHandle(attr.name)) {\r\n                this.bindHandle(node, attr);\r\n            }\r\n        });\r\n    }\r\n    bindModel(node, attr) {\r\n        let key = attr.value;\r\n        node.value = this.vm.data[key];\r\n        console.log(node.value);\r\n        new doubleBond_1.Observer(this.vm, key, function (newVal) {\r\n            node.value = newVal;\r\n        });\r\n        /*node.addEventListener('oninput',(e:any) => {\r\n           this.vm.data[key] = e.target.value;\r\n\r\n        })*/\r\n        node.oninput = (e) => {\r\n            console.log('inputProcess');\r\n            this.vm.data[key] = e.target.value;\r\n        };\r\n    }\r\n    bindHandle(node, attr) {\r\n        let startIndex = attr.name.indexOf(':') + 1;\r\n        let endIndex = attr.name.length;\r\n        let eventType = attr.name.substring(startIndex, attr.name.length);\r\n        let method = attr.value;\r\n        node.addEventListener(eventType, this.vm.methods[method]);\r\n    }\r\n    // 判断指令\r\n    isModel(attrName) {\r\n        return (attrName === 'v-model');\r\n    }\r\n    isHandle(attrName) {\r\n        return (attrName.indexOf('v-on') > -1);\r\n    }\r\n    renderText(node) {\r\n        let reg = /{{(.+?)}}/g;\r\n        let match;\r\n        while (match = reg.exec(node.nodeValue)) {\r\n            let sample = match[0];\r\n            let key = match[1].trim();\r\n            node.nodeValue = node.nodeValue.replace(sample, this.vm.data[key]);\r\n            new doubleBond_1.Observer(this.vm, key, function (newVal, oldVal) {\r\n                node.nodeValue = node.nodeValue.replace(oldVal, newVal);\r\n            });\r\n        }\r\n    }\r\n}\r\nexports.Compile = Compile;\r\n\n\n//# sourceURL=webpack://doublebond/./myCompiler.ts?");

/***/ }),

/***/ "./myMVVM.ts":
/*!*******************!*\
  !*** ./myMVVM.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.MVVM = void 0;\r\nconst myCompiler_1 = __webpack_require__(/*! ./myCompiler */ \"./myCompiler.ts\");\r\nconst myObserve_1 = __webpack_require__(/*! ./myObserve */ \"./myObserve.ts\");\r\nclass MVVM {\r\n    constructor(opts) {\r\n        this.data = opts.data;\r\n        this.init(opts);\r\n        (0, myObserve_1.observe)(this.data);\r\n        new myCompiler_1.Compile(this);\r\n    }\r\n    init(opts) {\r\n        this.node = document.querySelector(opts.node);\r\n        //this.node= opts.node\r\n        this.data = opts.data || {};\r\n        this.methods = opts.methods || {};\r\n        for (let key in this.methods) {\r\n            this.methods[key] = this.methods[key].bind(this);\r\n        }\r\n        for (let key in this.data) {\r\n            Object.defineProperty(this, key, {\r\n                enumerable: true,\r\n                configurable: true,\r\n                get: () => {\r\n                    return this.data[key];\r\n                },\r\n                set: (newVal) => {\r\n                    this.data[key] = newVal;\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\nexports.MVVM = MVVM;\r\n\n\n//# sourceURL=webpack://doublebond/./myMVVM.ts?");

/***/ }),

/***/ "./myObserve.ts":
/*!**********************!*\
  !*** ./myObserve.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.observe = void 0;\r\nconst doubleBond_1 = __webpack_require__(/*! ./doubleBond */ \"./doubleBond.ts\");\r\nconst doubleBond_2 = __webpack_require__(/*! ./doubleBond */ \"./doubleBond.ts\");\r\nfunction observe(data) {\r\n    if (!data || typeof data !== 'object')\r\n        return;\r\n    for (var key in data) {\r\n        let val = data[key];\r\n        let subj = new doubleBond_1.Subject();\r\n        Object.defineProperty(data, key, {\r\n            enumerable: true,\r\n            configurable: true,\r\n            get: function () {\r\n                if (doubleBond_2.currentObs) {\r\n                    console.log('currentObs exist : ' + doubleBond_2.currentObs.key);\r\n                    doubleBond_2.currentObs.subscribeTo(subj);\r\n                }\r\n                return val;\r\n            },\r\n            set: function (newVal) {\r\n                console.log('set : ' + newVal);\r\n                val = newVal;\r\n                subj.notify();\r\n            }\r\n        });\r\n        if (typeof val === 'object') {\r\n            observe(val);\r\n        }\r\n    }\r\n}\r\nexports.observe = observe;\r\n\n\n//# sourceURL=webpack://doublebond/./myObserve.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./doubleBond.ts");
/******/ 	
/******/ })()
;