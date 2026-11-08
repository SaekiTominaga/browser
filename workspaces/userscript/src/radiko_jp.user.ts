// ==UserScript==
// @name        radiko
// @namespace   https://w0s.jp/
// @description 次の番組に自動リダイレクト
// @author      SaekiTominaga
// @version     1.0.0
// @match       https://radiko.jp/#!/ts/*
// ==/UserScript==
(() => {
	'use strict';

	if (/https:\/\/radiko\.jp\/#!\/ts\/([A-Z]+)\/([0-9]{14})/u.exec(location.toString()) === null) {
		return;
	}

	const $contents = document.querySelector('#contents');
	if ($contents === null) {
		throw new Error('`#contents` does not exist');
	}

	const observerContents = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type !== 'childList') {
				return;
			}

			const $target = mutation.target as HTMLElement;

			const $nowProgramsList = $target.querySelector('#now-programs-list');
			if ($nowProgramsList === null) {
				throw new Error('`#now-programs-list` does not exist');
			}

			const observerNowProgramsList = new MutationObserver((mutationsNowProgramsList) => {
				mutationsNowProgramsList.forEach((mutationNowProgramsList) => {
					if (mutationNowProgramsList.type !== 'childList') {
						return;
					}

					observerNowProgramsList.disconnect();

					const $playButton = $target.querySelector('.play-radio');
					if ($playButton !== null) {
						/* 再生可能な場合は何もしない */
						observerNowProgramsList.disconnect();
						return;
					}

					const $title = (mutationNowProgramsList.target as HTMLElement).querySelector('.live-detail__title');
					if ($title === null) {
						throw new Error('`.live-detail__title` does not exist');
					}

					const $programTableItems = $target.querySelector('.program-table__items');
					if ($programTableItems === null) {
						throw new Error('`.program-table__items` does not exist');
					}

					const newPageUrl = [...$programTableItems.querySelectorAll('.title')]
						.find(($programTableTitle) => $programTableTitle.textContent === $title.textContent)
						?.closest('a')?.href;

					if (newPageUrl !== undefined) {
						if (confirm(`${newPageUrl} にリダイレクトします`)) {
							location.assign(newPageUrl);
						}
					}

					observerNowProgramsList.disconnect();
				});
			});
			observerNowProgramsList.observe($nowProgramsList, {
				childList: true,
			});
		});
	});
	observerContents.observe($contents, {
		childList: true,
	});
})();
