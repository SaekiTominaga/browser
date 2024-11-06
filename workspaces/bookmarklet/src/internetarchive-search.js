'use strict';

/**
 * 表示しているページを Internet Archive で検索する
 */
(() => {
	if (location.host === 'web.archive.org') {
		alert('表示しているサイトは Internet Archive 自身です。');
		return;
	}

	window.open(`https://web.archive.org/web/*/${location}`);
})();
