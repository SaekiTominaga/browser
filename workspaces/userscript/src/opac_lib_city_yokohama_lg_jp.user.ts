// ==UserScript==
// @name        opac.lib.city.yokohama.lg.jp
// @namespace   https://w0s.jp/
// @description 「横浜市立図書館蔵書検索ページ」のフォーム操作を改善
// @author      SaekiTominaga
// @version     1.0.1
// @match       https://opac.lib.city.yokohama.lg.jp/winj/opac/*
// ==/UserScript==
(() => {
	'use strict';

	/* `autocomplete` は常に有効（制作者スクリプト処理が終わった後に実行する必要がある） */
	window.addEventListener('load', () => {
		for (const inputElement of Array.from(document.querySelectorAll<HTMLInputElement>('input')).filter((element) => element.autocomplete === 'off')) {
			inputElement.autocomplete = '';
		}
	});

	/* 表示件数は常に最大を選択 */
	for (const selectElement of document.querySelectorAll<HTMLSelectElement>('select[name="opt_pagesize"]')) {
		selectElement.selectedIndex = selectElement.options.length - 1;
	}

	/* 雑誌一覧の発行日による絞り込み */
	const volumeListFormElement = document.getElementsByName('VolumeListForm')[0];
	if (volumeListFormElement !== undefined) {
		/* Enter キー押下で意図しない送信ボタンが submit されてしまうのを防止 */
		const hiddenSubmitsWrapElement = volumeListFormElement.querySelector('div[style="display:none;"]');
		if (hiddenSubmitsWrapElement !== null) {
			const FROM_ID = 'VolumeListForm';

			volumeListFormElement.id = FROM_ID;

			hiddenSubmitsWrapElement.querySelectorAll('input').forEach((inputElement): void => {
				inputElement.setAttribute('form', FROM_ID);
			});
			document.body.insertAdjacentElement('beforeend', hiddenSubmitsWrapElement);
		}

		/* 正確な日付を指定する必要性は薄いため、年のみの指定で送信できるようにする */
		for (const originInputElement of volumeListFormElement.querySelectorAll<HTMLInputElement>('input[name="txt_stisdate"], input[name="txt_edisdate"]')) {
			originInputElement.hidden = true;

			const customInputElement = document.createElement('input');
			customInputElement.className = originInputElement.name;
			customInputElement.max = String(new Date().getFullYear());
			customInputElement.min = '1900';
			customInputElement.pattern = '[1-9][0-9]{3}';
			customInputElement.placeholder = 'YYYY';
			customInputElement.style.inlineSize = '4em';
			customInputElement.type = 'number';
			customInputElement.value = originInputElement.value.substring(0, 4);
			customInputElement.addEventListener('change', () => {
				const { value } = customInputElement;
				const valuePad = value.padStart(4, '0');

				if (originInputElement.name === 'txt_stisdate') {
					originInputElement.value = `${valuePad}0101`;

					const pairElement = customInputElement.parentElement?.getElementsByClassName('txt_edisdate')[0] as HTMLInputElement;
					pairElement.min = value;
				} else {
					originInputElement.value = `${valuePad}1231`;
				}
			});

			originInputElement.parentElement?.insertBefore(customInputElement, originInputElement.nextSibling);
		}

		/* 存在意義の分からない要素を非表示にする */
		for (const element of volumeListFormElement.querySelectorAll<HTMLElement>('li:has(> select[name="cmb_colum"])')) {
			element.hidden = true;
		}
	}
})();
