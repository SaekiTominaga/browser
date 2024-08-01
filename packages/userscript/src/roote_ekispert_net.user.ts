// ==UserScript==
// @name        Ekispert for web
// @namespace   https://w0s.jp/
// @grant       GM_getValue
// @description 「駅すぱあと for web」のキーボード操作を改善する
// @author      SaekiTominaga
// @version     1.1.1
// @match       https://roote.ekispert.net/*
// ==/UserScript==

interface CourseSetting {
	sexp: boolean /* 新幹線 */;
	express: boolean /* 有料特急 */;
	local: boolean /* 路線バス */;
	highway: boolean /* 高速バス */;
	plane: boolean /* 飛行機 */;
	connect: boolean /* 連絡バス */;
	liner: boolean /* ライナー */;
	sleep: boolean /* 寝台列車 */;
	ship: boolean /* 海路 */;
}

(() => {
	'use strict';

	/* 交通手段の初期設定（ユーザースクリプトの設定画面からこの定数名と同名のキーを設定することでカスタマイズ可能です） */
	const COURSE_SETTING: CourseSetting = {
		sexp: true /* 新幹線 */,
		express: true /* 有料特急 */,
		local: true /* 路線バス */,
		highway: false /* 高速バス */,
		plane: false /* 飛行機 */,
		connect: true /* 連絡バス */,
		liner: true /* ライナー */,
		sleep: true /* 寝台列車 */,
		ship: false /* 海路 */,
	};

	/* CSS */
	const CSS = `
		#search_area {
			:not([tabindex="-1"]):focus {
				outline: 2px solid #4d90fe;
			}

			/* 「検索」ボタン */
			#submit_btn {
				outline-offset: 0.1em;
			}

			#submit_btn::-moz-focus-inner {
				border: none;
				padding: 0;
			}

			/* 経路検索の入力欄 */
			:is(#dep, #arr, #via1, #via2) {
				position: relative;
				top: 0.2em;
				padding: 0.25em 0;
				font-size: 150%;
			}

			/* 「現在地」ボタンは不要なので消す */
			:is(#dep_current_location_button, #arr_current_location_button) {
				display: none;
			}

			/* 「経由」欄を最初から表示 */
			:is(#via1_area, #via2_area) {
				display: block flow list-item !important;
			}

			/* 「経由」表示ボタンは不要なので消す */
			#via {
				display: none !important;
			}

			/* 日時のプルダウンやカレンダーボタンはユーザースクリプトで別途 <input type="date"> を表示するため不要 */
			:is(#yyyymm, #day, .ui-datepicker-trigger) {
				display: none;
			}

			#datepicker {
				margin-inline-end: 0.5em;
				padding: 0.25em 0;
				font-size: 150%;
			}

			:is(#hour, #minute10, #minute1) {
				font-size: 150%;
			}

			/* 「詳細設定」欄を最初から表示 */
			#option_area {
				display: block flow list-item;
			}

			/* 「詳細設定」開閉ボタンは不要なので消す */
			:is(#btn_option, #result_btn_option) {
				display: none;
			}

			/* 「リアルタイム経路検索」は不要なので消す */
			:is(#btn_option, #result_btn_option) + .toggle_button {
				display: none;
			}

			/* 「詳細設定」開閉ボタンを消した代わりに余白を付ける */
			#option_area {
				margin-block-start: 1em;
			}

			/* 「詳細設定」開閉ボタン関連のスタイルを消す */
			#option {
				background-image: none;
			}
		}
	`;

	const supportGMgetValue = window.GM_getValue !== undefined; // GM_getValue() をサポートしているか

	/* 【検索画面】余計な tabindex 属性を除去する */
	for (const tabindexRemoveElement of document.querySelectorAll('#search_area input[tabindex]')) {
		tabindexRemoveElement.removeAttribute('tabindex');
	}

	/* 【検索画面】日付入力欄を <input type="date"> に */
	const yyyymmElement = document.getElementById('yyyymm') as HTMLSelectElement | null;
	const dayElement = document.getElementById('day') as HTMLSelectElement | null;
	const datepickerElement = document.getElementById('datepicker') as HTMLInputElement | null;
	if (yyyymmElement !== null && dayElement !== null && datepickerElement !== null) {
		console.debug('【検索画面】日付入力欄を <input type="date"> に');

		const today = new Date();
		const maxDate = new Date();
		maxDate.setMonth(today.getMonth() + 3); // 3か月後

		datepickerElement.type = 'date';
		datepickerElement.required = true;
		datepickerElement.min = `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate())}`;
		datepickerElement.max = `${String(maxDate.getFullYear())}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate())}`;
		datepickerElement.addEventListener('change', () => {
			let { value } = datepickerElement;
			if (value === '') {
				value = `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate())}`; // クリアボタンが押された場合は現在日付にする
				datepickerElement.value = value;
			}
			const valueSplit = value.split('-');
			const yyyymm = `${String(valueSplit.at(0))}${String(valueSplit.at(1))}`;
			const dd = String(Number(valueSplit.at(2))); // 先頭 0 除去

			yyyymmElement.value = yyyymm;
			dayElement.value = dd;
		});
	}

	/* 【検索画面】交通手段の初期設定 */
	const optionAreaElement = document.getElementById('option_area');
	if (optionAreaElement !== null) {
		console.debug('【検索画面】交通手段の初期設定');

		// eslint-disable-next-line new-cap, @typescript-eslint/no-unsafe-call
		const courseSetting = supportGMgetValue ? (window.GM_getValue('COURSE_SETTING', COURSE_SETTING) as CourseSetting) : COURSE_SETTING;
		for (const [courseName, checked] of Object.entries(courseSetting)) {
			const courseCheckboxElement = document.getElementById(courseName) as HTMLInputElement | null;
			if (courseCheckboxElement === null) {
				console.error(`Element: #${courseName} can not found.`);
			} else {
				courseCheckboxElement.checked = Boolean(checked);
			}
		}
	}

	/* 【経路検索画面】初期フォーカスを設定 */
	const courseElement = document.querySelector<HTMLElement>('#course_section h1 + #course');
	if (courseElement !== null) {
		console.debug('【経路検索画面】初期フォーカスを設定');
		courseElement.tabIndex = -1;
		courseElement.focus();
	}

	/* スタイルを CSS で設定 */
	const styleElement = document.createElement('style');
	styleElement.textContent = CSS;
	document.head.appendChild(styleElement);
})();
