'use strict';

/**
 * 選択文字列の情報を Scroll To Text Fragment 用にURLに追加する
 */
(() => {
	const selectionStr = getSelection()?.toString();
	if (selectionStr === undefined || selectionStr === '') {
		alert('文字列が選択されていません。');
		return;
	}

	const newUrl = new URL(location.toString());
	newUrl.hash = `#:~:text=${encodeURIComponent(selectionStr)}`;

	location.assign(newUrl.toString());
})();
