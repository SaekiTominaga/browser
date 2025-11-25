// ==UserScript==
// @name        Amazon.co.jp
// @namespace   https://w0s.jp/
// @description 「Amazon.co.jp」のリンク改善
// @author      SaekiTominaga
// @version     1.0.1
// @match       https://www.amazon.co.jp/*
// ==/UserScript==
(() => {
    'use strict';
    /* outline: none を制裁 */
    document.querySelectorAll('.s-no-outline').forEach((anchorElement) => {
        anchorElement.classList.remove('s-no-outline');
    });
    /* リンクが別タブで開かれるのを防ぐ */
    document.querySelectorAll('a[target="_blank"]').forEach((anchorElement) => {
        anchorElement.removeAttribute('target');
    });
})();
