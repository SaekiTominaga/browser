// ==UserScript==
// @name        auctions.yahoo.co.jp
// @namespace   https://w0s.jp/
// @description 出品フォームをキーボードのみで操作できるようにする
// @author      SaekiTominaga
// @version     1.1.1
// @match       https://auctions.yahoo.co.jp/jp/show/*
// ==/UserScript==
(() => {
	'use strict';

	for (const expandElement of document.querySelectorAll<HTMLElement>('.js-expand')) {
		const bodyElement = expandElement.querySelector<HTMLElement>('.js-expand-body');
		const triggerElement = expandElement.querySelector<HTMLElement>('.js-expand-trigger');

		if (bodyElement !== null && triggerElement !== null) {
			triggerElement.tabIndex = 0;
			triggerElement.addEventListener('keydown', (ev: KeyboardEvent) => {
				switch (ev.key) {
					case 'Enter': {
						bodyElement.classList.toggle('is-close');
						bodyElement.classList.toggle('is-open');

						break;
					}
					default:
				}
			});
		}
	}

	for (const toggleExpandElement of document.querySelectorAll<HTMLElement>('.js-toggleExpand')) {
		const bodyElement = toggleExpandElement.querySelector<HTMLElement>('.js-toggleExpand-body');
		const triggerElement = toggleExpandElement.querySelector<HTMLElement>('.js-toggleExpand-trigger');

		if (bodyElement !== null && triggerElement !== null) {
			triggerElement.tabIndex = 0;
			triggerElement.addEventListener('keydown', (ev: KeyboardEvent) => {
				switch (ev.key) {
					case 'Enter': {
						bodyElement.classList.toggle('is-close');
						bodyElement.classList.toggle('is-open');

						break;
					}
					default:
				}
			});
		}
	}
})();
