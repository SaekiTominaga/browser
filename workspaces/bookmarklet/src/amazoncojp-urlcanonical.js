'use strict';

/**
 * Amazon.co.jp の商品ページURLを正規化する
 */
(() => {
	if (location.host !== 'www.amazon.co.jp') {
		alert('表示しているページは Amazon.co.jp の画面ではなさそうです。');
		return;
	}

	if (/^\/dp\/([0-9A-Z]{10})$/.test(location.pathname)) {
		/* すでに正規化済み */
		return;
	}

	const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href;
	if (canonicalUrl === undefined) {
		alert('<link rel="canonical"> がありません。');
		return;
	}
	location.assign(/^https:\/\/www.amazon.co.jp\/dp\/([0-9A-Z]{10})$/.test(canonicalUrl) ? canonicalUrl : canonicalUrl.replace(/\/([^/]*)\/dp\//, '/dp/'));
})();
