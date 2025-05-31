/**
 * WordPress dependencies
 */
import { store, getElement, getContext } from '@wordpress/interactivity';

const { state, actions, callbacks } = store('tabbed-content', {
	state: {
		get tabButtons() {
			const getTabs = state.domElement.querySelectorAll('button');
			return getTabs;
		},
		get tabContents() {
			const loopContent = state.domElement.querySelectorAll('[role="tabpanel"]');
			return loopContent;
		},
	},
	actions: {
		toggle(e) {
			Array.from(state.tabContents, (element, index) => {
				element.hidden = true;
				state.tabButtons[index].ariaSelected = false;

				if (element.dataset.id === e.target.id) {
					e.target.ariaSelected = true,
						element.hidden = false;
				}
			});
		},
		// Ref: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
		logKeydown: (e) => {
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
		},
	},
	callbacks: {
		tabbedInit: () => {
			const { ref } = getElement();
			state.domElement = ref;

			const firstTab = ref.querySelector('button');
			const firstContent = ref.querySelector('[role="tabpanel"]');

			if (firstTab && firstContent) {
				firstTab.ariaSelected = true;
				firstTab.tabIndex = 0;
				firstContent.hidden = false;
			}
		},
	},
});
