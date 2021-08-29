"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var audio_1 = __importDefault(require("./providers/audio"));
var SoundManager = /** @class */ (function () {
    function SoundManager() {
        this.move = null;
        this.capture = null;
        this.check = null;
        this.isEnable = false;
    }
    SoundManager.prototype.setProps = function (khmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
    };
    SoundManager.prototype.disable = function () {
        this.isEnable = false;
        if (this.move) {
            this.move.parentElement.removeChild(this.move);
            this.move = null;
        }
        if (this.capture) {
            this.capture.parentElement.removeChild(this.capture);
            this.capture = null;
        }
        if (this.check) {
            this.check.parentElement.removeChild(this.check);
            this.check = null;
        }
        this.khmerChessBoard.messageManager.log('Sound is disabled');
    };
    SoundManager.prototype.enable = function () {
        this.isEnable = true;
        this.move = this._addSound(audio_1.default.move);
        this.capture = this._addSound(audio_1.default.capture);
        this.check = this._addSound(audio_1.default.check);
        this.khmerChessBoard.messageManager.log('Sound is enabled');
    };
    SoundManager.prototype._addSound = function (src) {
        var sound = document.createElement('audio');
        sound.src = src;
        sound.setAttribute('preload', 'auto');
        sound.setAttribute('controls', 'none');
        sound.style.display = 'none';
        document.body.appendChild(sound);
        return sound;
    };
    SoundManager.prototype.play = function (flag) {
        if (!this.isEnable) {
            this.khmerChessBoard.messageManager.log('Sound is disable');
            return;
        }
        switch (flag) {
            case SoundManager.MOVE_FLAG:
                this.move && this.move.play();
                break;
            case SoundManager.CAPTURE_FLAG:
                this.capture && this.capture.play();
                break;
            case SoundManager.CHECK_FLAG:
                this.check && this.check.play();
                break;
            default:
                this.khmerChessBoard.messageManager.log('Invalid sound flag');
        }
    };
    SoundManager.prototype.playMove = function () {
        this.play(SoundManager.MOVE_FLAG);
    };
    SoundManager.prototype.playCapture = function () {
        this.play(SoundManager.CAPTURE_FLAG);
    };
    SoundManager.prototype.playCheck = function () {
        this.play(SoundManager.CHECK_FLAG);
    };
    SoundManager.MOVE_FLAG = 'm';
    SoundManager.CAPTURE_FLAG = 'ct';
    SoundManager.CHECK_FLAG = 'c';
    return SoundManager;
}());
exports.default = SoundManager;
/*
 * Copyright (c) 2021, K4us
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
//# sourceMappingURL=SoundManager.js.map