// ==UserScript==
// @name        Google redirect
// @namespace   https://w0s.jp/
// @description リダイレクト画面を表示せず即リダイレクトする
// @author      SaekiTominaga
// @version     1.0.0
// @match       https://www.google.com/url?*
// ==/UserScript==
(() => {
    'use strict';
    const redirectUrl = document.querySelector('a[href]')?.href;
    if (redirectUrl === undefined) {
        throw new Error('The redirect link does not exist');
    }
    location.replace(redirectUrl);
})();
