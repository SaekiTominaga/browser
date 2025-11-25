// ==UserScript==
// @name        alt to title
// @namespace   https://w0s.jp/
// @description `alt` 属性値をツールチップ表示するため `title` 属性にコピーする
// @author      SaekiTominaga
// @version     1.0.2
// ==/UserScript==
(() => {
    'use strict';
    document.querySelectorAll('img[alt]').forEach((imgElement) => {
        if (imgElement.alt !== '') {
            imgElement.title = imgElement.alt;
        }
    });
})();
