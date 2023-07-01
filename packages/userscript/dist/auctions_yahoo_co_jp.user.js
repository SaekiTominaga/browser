// ==UserScript==
// @name        auctions.yahoo.co.jp
// @namespace   https://w0s.jp/
// @description 出品フォームをキーボードのみで操作できるようにする
// @author      SaekiTominaga
// @version     1.0.1
// @match       https://auctions.yahoo.co.jp/sell/*
// ==/UserScript==
(() => {
    'use strict';
    for (const expandElement of document.querySelectorAll('.js-expand')) {
        const bodyElement = expandElement.querySelector('.js-expand-body');
        const triggerElement = expandElement.querySelector('.js-expand-trigger');
        if (bodyElement !== null && triggerElement !== null) {
            triggerElement.tabIndex = 0;
            triggerElement.addEventListener('keydown', (ev) => {
                switch (ev.key) {
                    case 'Enter': {
                        bodyElement.classList.toggle('is-close');
                        bodyElement.classList.toggle('is-open');
                        break;
                    }
                    default:
                }
            });
        }
    }
})();
