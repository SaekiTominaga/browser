// ==UserScript==
// @name        DeepL 翻訳
// @namespace   https://w0s.jp/
// @description Cookie を有効にしていてもなおアクセスする度に表示される Cloudflare の CAPTCHA を消す
// @author      SaekiTominaga
// @version     1.0.0
// @match       https://www.deepl.com/*
// ==/UserScript==
(() => {
	'use strict';

	const $targetParent = document.querySelector('nav[aria-labelledby="translation-modes-heading"] + div > .relative');
	if ($targetParent === null) {
		return;
	}

	const $inert = $targetParent.querySelector(':scope > div');
	if ($inert === null) {
		return;
	}

	const observerParent = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type !== 'childList') {
				return;
			}

			(mutation.addedNodes.item(0) as HTMLElement).hidden = true;

			observerParent.disconnect();
		});
	});
	observerParent.observe($targetParent, {
		childList: true,
	});

	const observerInert = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type !== 'attributes') {
				return;
			}

			(mutation.target as HTMLElement).removeAttribute('inert');

			observerInert.disconnect();
		});
	});
	observerInert.observe($inert, {
		attributes: true,
	});
})();
