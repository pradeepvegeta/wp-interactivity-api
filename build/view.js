import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/**
 * WordPress dependencies
 */

const {
  state,
  actions,
  callbacks
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('tabbed-content', {
  state: {
    get tabButtons() {
      const getTabs = state.domElement.querySelectorAll('button');
      return getTabs;
    },
    get tabContents() {
      const loopContent = state.domElement.querySelectorAll('[role="tabpanel"]');
      return loopContent;
    }
  },
  actions: {
    toggle(e) {
      Array.from(state.tabContents, (element, index) => {
        element.hidden = true;
        state.tabButtons[index].ariaSelected = false;
        if (element.dataset.id === e.target.id) {
          e.target.ariaSelected = true, element.hidden = false;
        }
      });
    },
    // Ref: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
    logKeydown: e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        state.tabButtons[state.tabFocus].setAttribute("tabindex", -1);
        if (e.key === "ArrowRight") {
          state.tabFocus++;
          if (state.tabFocus >= state.tabButtons.length) {
            state.tabFocus = 0;
          }
        } else if (e.key === "ArrowLeft") {
          state.tabFocus--;
          if (state.tabFocus < 0) {
            state.tabFocus = state.tabButtons.length - 1;
          }
        }
        state.tabButtons[state.tabFocus].setAttribute("tabindex", 0);
        state.tabButtons[state.tabFocus].focus();
      }
    }
  },
  callbacks: {
    tabbedInit: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      state.domElement = ref;
      const firstTab = ref.querySelector('button');
      const firstContent = ref.querySelector('[role="tabpanel"]');
      if (firstTab && firstContent) {
        firstTab.ariaSelected = true;
        firstTab.tabIndex = 0;
        firstContent.hidden = false;
      }
    }
  }
});
})();


//# sourceMappingURL=view.js.map