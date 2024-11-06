'use strict';

/**
 * はてなブックマークのエントリーページを表示する
 */
(() => {
	const ORIGIN = 'https://b.hatena.ne.jp';
	const param = `${location.host}${location.pathname}${location.search}`;

	switch (location.protocol) {
		case 'https:':
			window.open(`${ORIGIN}/entry/s/${param}`);
			break;
		case 'http:':
			window.open(`${ORIGIN}/entry/${param}`);
			break;
		default:
			alert('対応しているプロトコルは https: / http: のみです。');
	}
})();
