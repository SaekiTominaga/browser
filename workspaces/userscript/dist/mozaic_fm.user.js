// ==UserScript==
// @name        mozaic.fm
// @namespace   https://w0s.jp/
// @description Web podcast を Cookie 無効環境でも聴けるようにする
// @author      SaekiTominaga
// @version     1.1.0
// @match       https://mozaic.fm/*
// ==/UserScript==
(() => {
    'use strict';
    if (!navigator.cookieEnabled) {
        const mozaicPlayerAudioElement = document.querySelector('mozaic-player > audio');
        if (mozaicPlayerAudioElement !== null) {
            mozaicPlayerAudioElement.controls = true;
            mozaicPlayerAudioElement.style.inlineSize = '100%';
        }
    }
})();
