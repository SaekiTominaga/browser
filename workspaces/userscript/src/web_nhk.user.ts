// ==UserScript==
// @name        NHK ONE
// @namespace   https://w0s.jp/
// @description 自動で開かれるモーダルダイアログを消す
// @author      SaekiTominaga
// @version     1.0.1
// @match       https://*.web.nhk/*
// ==/UserScript==
(() => {
	'use strict';

	/* 未ログイン警告 */
	{
		const $observeTarget = document.querySelector('body'); // 監視対象の要素
		if ($observeTarget === null) {
			throw new Error('`<body>` element does not exist');
		}

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				const $bindEnforcementModal = [...mutation.addedNodes].find(
					($) => $ instanceof HTMLElement && $.dataset['modalType'] === 'RegistrationEnforcementModal',
				);
				if ($bindEnforcementModal instanceof HTMLDialogElement) {
					$bindEnforcementModal.addEventListener('toggle', (event) => {
						if (event.newState === 'open') {
							(event.target as HTMLDialogElement).close();

							document.documentElement.style.setProperty('overflow', 'unset');
						}
					});

					observer.disconnect();
				}
			});
		});
		observer.observe($observeTarget, {
			childList: true,
		});
	}
})();
