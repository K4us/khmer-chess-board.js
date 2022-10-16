"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2021-2022, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 **/
var khmer_chess_1 = require("khmer-chess");
var PlayManagerEventController = /** @class */ (function (_super) {
    __extends(PlayManagerEventController, _super);
    function PlayManagerEventController() {
        return _super.call(this, {
            events: {
                CLICK: PlayManagerEventController.CLICK,
                SELECTED: PlayManagerEventController.BLACK,
                ATTEMPT_MOVE: PlayManagerEventController.PAUSE,
                CHANGE_TURN: PlayManagerEventController.NEXT,
            },
        }) || this;
    }
    PlayManagerEventController.prototype.click = function (data) {
        this._addPropEvent(PlayManagerEventController.CLICK, data);
    };
    PlayManagerEventController.prototype.back = function () {
        this._addPropEvent(PlayManagerEventController.BLACK);
    };
    PlayManagerEventController.prototype.play = function () {
        this._addPropEvent(PlayManagerEventController.PLAY);
    };
    PlayManagerEventController.prototype.pause = function () {
        this._addPropEvent(PlayManagerEventController.PAUSE);
    };
    PlayManagerEventController.prototype.next = function () {
        this._addPropEvent(PlayManagerEventController.NEXT);
    };
    PlayManagerEventController.prototype.addOnDataClickEventListener = function (listener) {
        this._addOnEventListener(PlayManagerEventController.CLICK, listener);
    };
    PlayManagerEventController.prototype.removeOnDataClickEventListener = function (listener) {
        this._removeOnEventListener(PlayManagerEventController.CLICK, listener);
    };
    PlayManagerEventController.prototype.addOnBackEventListener = function (listener) {
        this._addOnEventListener(PlayManagerEventController.BLACK, listener);
    };
    PlayManagerEventController.prototype.removeOnBackEventListener = function (listener) {
        this._removeOnEventListener(PlayManagerEventController.BLACK, listener);
    };
    PlayManagerEventController.prototype.addOnPlayEventListener = function (listener) {
        this._addOnEventListener(PlayManagerEventController.PLAY, listener);
    };
    PlayManagerEventController.prototype.removeOnPlayEventListener = function (listener) {
        this._removeOnEventListener(PlayManagerEventController.PLAY, listener);
    };
    PlayManagerEventController.prototype.addOnPauseEventListener = function (listener) {
        this._addOnEventListener(PlayManagerEventController.PAUSE, listener);
    };
    PlayManagerEventController.prototype.removeOnPauseEventListener = function (listener) {
        this._removeOnEventListener(PlayManagerEventController.PAUSE, listener);
    };
    PlayManagerEventController.prototype.addOnNextEventListener = function (listener) {
        this._addOnEventListener(PlayManagerEventController.NEXT, listener);
    };
    PlayManagerEventController.prototype.removeOnNextEventListener = function (listener) {
        this._removeOnEventListener(PlayManagerEventController.NEXT, listener);
    };
    PlayManagerEventController.CLICK = 'click';
    PlayManagerEventController.BLACK = 'back';
    PlayManagerEventController.PLAY = 'play';
    PlayManagerEventController.PAUSE = 'pause';
    PlayManagerEventController.NEXT = 'next';
    return PlayManagerEventController;
}(khmer_chess_1.EventHandler));
exports.default = PlayManagerEventController;
//# sourceMappingURL=PlayManagerEventController.js.map