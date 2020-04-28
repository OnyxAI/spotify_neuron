/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var spotify;spotify =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "?554d":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__.d, __webpack_require__.o, __webpack_exports__, __webpack_require__.e, __webpack_require__, __webpack_require__.* */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var moduleMap = {\n\t\"Spotify\": () => {\n\t\treturn Promise.all([__webpack_require__.e(\"vendors-node_modules_prop-types_index_js-node_modules_spotify-web-api-js_src_spotify-web-api_-33eec6\"), __webpack_require__.e(\"src_containers_Spotify_index_js\"), __webpack_require__.e(\"-_9a3c\"), __webpack_require__.e(\"index_js-_12601\")]).then(() => () => __webpack_require__(/*! ./index.js */ \"./index.js\"));\n\t},\n\t\"SpotifyWidget\": () => {\n\t\treturn Promise.all([__webpack_require__.e(\"vendors-node_modules_prop-types_index_js-node_modules_spotify-web-api-js_src_spotify-web-api_-33eec6\"), __webpack_require__.e(\"src_containers_Spotify_index_js\"), __webpack_require__.e(\"-_9a3c\"), __webpack_require__.e(\"spotify_widget_js\")]).then(() => () => __webpack_require__(/*! ./spotify_widget.js */ \"./spotify_widget.js\"));\n\t},\n\t\"i18n\": () => {\n\t\treturn __webpack_require__.e(\"src_i18n_js\").then(() => () => __webpack_require__(/*! ./src/i18n.js */ \"./src/i18n.js\"));\n\t}\n};\nvar get = (module) => {\n\treturn (\n\t\t__webpack_require__.o(moduleMap, module)\n\t\t\t? moduleMap[module]()\n\t\t\t: Promise.resolve().then(() => {\n\t\t\t\tthrow new Error(\"Module \" + module + \" does not exist in container.\");\n\t\t\t})\n\t);\n};\nvar override = (override) => {\n\tObject.assign(__webpack_require__.O, override);\n}\n\n// This exports getters to disallow modifications\n__webpack_require__.d(exports, {\n\tget: () => get,\n\toverride: () => override\n});\n\n//# sourceURL=webpack://spotify/container_entry?");

/***/ }),

/***/ "container-reference/onyx":
/*!***********************!*\
  !*** external "onyx" ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = onyx;\n\n//# sourceURL=webpack://spotify/external_%22onyx%22?");

/***/ }),

/***/ "?599b":
/*!************************************************!*\
  !*** remote override container-reference/onyx ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, __webpack_require__.e, __webpack_require__.* */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var external = __webpack_require__(\"container-reference/onyx\");\nexternal.override(Object.assign({\n\t\"react\": () => {\n\t\treturn Promise.resolve().then(() => {\n\t\t\treturn () => __webpack_require__(\"?9a3c\")\n\t\t})\n\t},\n\t\"react-dom\": () => {\n\t\treturn __webpack_require__.e(\"-_06d7\").then(() => {\n\t\t\treturn () => __webpack_require__(\"?06d7\")\n\t\t})\n\t},\n\t\"react-intl\": () => {\n\t\treturn Promise.resolve().then(() => {\n\t\t\treturn () => __webpack_require__(\"?244e\")\n\t\t})\n\t},\n\t\"react-redux\": () => {\n\t\treturn Promise.resolve().then(() => {\n\t\t\treturn () => __webpack_require__(\"?1277\")\n\t\t})\n\t},\n\t\"redux\": () => {\n\t\treturn Promise.resolve().then(() => {\n\t\t\treturn () => __webpack_require__(\"?3edc\")\n\t\t})\n\t},\n\t\"reselect\": () => {\n\t\treturn Promise.resolve().then(() => {\n\t\t\treturn () => __webpack_require__(\"?fdf0\")\n\t\t})\n\t},\n\t\"react-materialize\": () => {\n\t\treturn __webpack_require__.e(\"-_58b7\").then(() => {\n\t\t\treturn () => __webpack_require__(\"?58b7\")\n\t\t})\n\t},\n\t\"materialize-css\": () => {\n\t\treturn __webpack_require__.e(\"-_f292\").then(() => {\n\t\t\treturn () => __webpack_require__(\"?f292\")\n\t\t})\n\t}\n}, __webpack_require__.O));\nmodule.exports = external;\n\n//# sourceURL=webpack://spotify/remote_override_container-reference/onyx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/overridables */
/******/ 	(() => {
/******/ 		__webpack_require__.O = {};
/******/ 		var chunkMapping = {
/******/ 			"src_containers_Spotify_index_js": [
/******/ 				"?244e",
/******/ 				"?1277",
/******/ 				"?3edc",
/******/ 				"?fdf0"
/******/ 			],
/******/ 			"-_9a3c": [
/******/ 				"?9a3c"
/******/ 			],
/******/ 			"-_06d7": [
/******/ 				"?06d7"
/******/ 			],
/******/ 			"-_58b7": [
/******/ 				"?58b7"
/******/ 			],
/******/ 			"-_f292": [
/******/ 				"?f292"
/******/ 			]
/******/ 		};
/******/ 		var idToNameMapping = {
/******/ 			"?244e": "react-intl",
/******/ 			"?1277": "react-redux",
/******/ 			"?3edc": "redux",
/******/ 			"?fdf0": "reselect",
/******/ 			"?9a3c": "react",
/******/ 			"?06d7": "react-dom",
/******/ 			"?58b7": "react-materialize",
/******/ 			"?f292": "materialize-css"
/******/ 		};
/******/ 		var fallbackMapping = {
/******/ 			"?244e": () => {
/******/ 				return __webpack_require__.e("vendors-node_modules_react-intl_lib_index_js").then(() => () => __webpack_require__("./node_modules/react-intl/lib/index.js"))
/******/ 			},
/******/ 			"?1277": () => {
/******/ 				return Promise.all([__webpack_require__.e("vendors-node_modules_react-dom_index_js-_ee79"), __webpack_require__.e("vendors-node_modules_react-redux_es_index_js")]).then(() => () => __webpack_require__("../../node_modules/react-redux/es/index.js"))
/******/ 			},
/******/ 			"?3edc": () => {
/******/ 				return __webpack_require__.e("vendors-node_modules_redux_es_redux_js").then(() => () => __webpack_require__("../../node_modules/redux/es/redux.js"))
/******/ 			},
/******/ 			"?fdf0": () => {
/******/ 				return __webpack_require__.e("node_modules_reselect_es_index_js").then(() => () => __webpack_require__("../../node_modules/reselect/es/index.js"))
/******/ 			},
/******/ 			"?9a3c": () => {
/******/ 				return __webpack_require__.e("vendors-node_modules_react_index_js").then(() => () => __webpack_require__("./node_modules/react/index.js"))
/******/ 			},
/******/ 			"?06d7": () => {
/******/ 				return __webpack_require__.e("vendors-node_modules_react-dom_index_js-_8bc8").then(() => () => __webpack_require__("./node_modules/react-dom/index.js"))
/******/ 			},
/******/ 			"?58b7": () => {
/******/ 				return Promise.all([__webpack_require__.e("vendors-node_modules_react-dom_index_js-_ee79"), __webpack_require__.e("vendors-node_modules_react-materialize_lib_index_js")]).then(() => () => __webpack_require__("../../node_modules/react-materialize/lib/index.js"))
/******/ 			},
/******/ 			"?f292": () => {
/******/ 				return __webpack_require__.e("vendors-node_modules_materialize-css_dist_js_materialize_js").then(() => () => __webpack_require__("../../node_modules/materialize-css/dist/js/materialize.js"))
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.f.overridables = (chunkId, promises) => {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach((id) => {
/******/ 					if(__webpack_modules__[id]) return;
/******/ 					promises.push(Promise.resolve((__webpack_require__.O[idToNameMapping[id]] || fallbackMapping[id])()).then((factory) => {
/******/ 						__webpack_modules__[id] = (module) => {
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					}))
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/api/neurons/serve/spotify/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/remotes loading */
/******/ 	(() => {
/******/ 		var chunkMapping = {
/******/ 			"src_containers_Spotify_index_js": [
/******/ 				"?3158",
/******/ 				"?1509"
/******/ 			]
/******/ 		};
/******/ 		var idToExternalAndNameMapping = {
/******/ 			"?3158": [
/******/ 				"?599b",
/******/ 				"components"
/******/ 			],
/******/ 			"?1509": [
/******/ 				"?599b",
/******/ 				"utils"
/******/ 			]
/******/ 		};
/******/ 		__webpack_require__.f.remotes = (chunkId, promises) => {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach((id) => {
/******/ 					if(__webpack_modules__[id]) return;
/******/ 					var data = idToExternalAndNameMapping[id];
/******/ 					promises.push(Promise.resolve(__webpack_require__(data[0]).get(data[1])).then((factory) => {
/******/ 						__webpack_modules__[id] = (module) => {
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					}))
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"spotify": 0
/******/ 		};
/******/ 		
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(!/^\-_(06d7|58b7|9a3c|f292)$/.test(chunkId)) {
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => {
/******/ 								installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 							});
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							var loadingEnded = () => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) return installedChunkData[1];
/******/ 								}
/******/ 							};
/******/ 							var script = document.createElement('script');
/******/ 							var onScriptComplete;
/******/ 		
/******/ 							script.charset = 'utf-8';
/******/ 							script.timeout = 120;
/******/ 							if (__webpack_require__.nc) {
/******/ 								script.setAttribute("nonce", __webpack_require__.nc);
/******/ 							}
/******/ 							script.src = url;
/******/ 		
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							onScriptComplete = (event) => {
/******/ 								onScriptComplete = () => {
/******/ 		
/******/ 								}
/******/ 								// avoid mem leaks in IE.
/******/ 								script.onerror = script.onload = null;
/******/ 								clearTimeout(timeout);
/******/ 								var reportError = loadingEnded();
/******/ 								if(reportError) {
/******/ 									var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 									var realSrc = event && event.target && event.target.src;
/******/ 									error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 									error.name = 'ChunkLoadError';
/******/ 									error.type = errorType;
/******/ 									error.request = realSrc;
/******/ 									reportError(error);
/******/ 								}
/******/ 							}
/******/ 							;
/******/ 							var timeout = setTimeout(() => {
/******/ 								onScriptComplete({ type: 'timeout', target: script })
/******/ 							}, 120000);
/******/ 							script.onerror = script.onload = onScriptComplete;
/******/ 							document.head.appendChild(script);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no deferred startup
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		function webpackJsonpCallback(data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 		
/******/ 			var runtime = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 		};
/******/ 		
/******/ 		var jsonpArray = window["webpackJsonpspotify"] = window["webpackJsonpspotify"] || [];
/******/ 		var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 		jsonpArray.push = webpackJsonpCallback;
/******/ 		var parentJsonpFunction = oldJsonpFunction;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module factories are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("?554d");
/******/ })()
;