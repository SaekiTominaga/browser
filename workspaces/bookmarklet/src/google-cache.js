'use strict';

/**
 * 表示しているページの Google キャッシュを表示する
 */
(() => {
	const param = `${location}`;
	window.open(`https://webcache.googleusercontent.com/search?q=cache:${param}`);
})();
