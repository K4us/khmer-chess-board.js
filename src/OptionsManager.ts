import {
    BORDER_WIDTH,
    MIN_CELL_WIDTH,
    TD_GRAVEYARD_NUMBER,
} from './providers/constance';
import { genId } from './helpers/uniqueIdHelper';
import { ROW_NUMBER } from 'khmer-chess';
import KhmerChessBoard from './KhmerChessBoard';

export default class OptionsManager {
    _width = 500;
    isFullScreen = false;
    uniqueClassName = '';
    isEnglish = false;
    constructor() {
        this.uniqueClassName = `kcb-${genId()}`;
    }
    get width() {
        return this._width;
    }
    get enClass() {
        return KhmerChessBoard.LOCALE_ENGLISH;
    }

    getScaleFit(btr: ClientRect) {
        if (this.isFullScreen && btr) {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            if (vw < vh) {
                return vw / btr.width;
            }
            return vh / btr.height;
        }
        return 1;
    }

    set width(width) {
        this._width = width;
    }

    get cellWidth() {
        const sqWidth = (this.width - (ROW_NUMBER - 1) * this.borderWidth) / ROW_NUMBER;
        return sqWidth;
    }

    get graveyardContainerHeight() {
        const gyCHeight = this.cellWidth + 10 * this.borderWidth;
        return gyCHeight;
    }

    get minWidth() {
        return (ROW_NUMBER - 1) * this.borderWidth + ROW_NUMBER * MIN_CELL_WIDTH;
    }

    get graveyardWidth() {
        return this.borderWidth * (TD_GRAVEYARD_NUMBER - 1) + this.cellWidth * TD_GRAVEYARD_NUMBER;
    }

    get graveyardContainerPadding() {
        return 8 * this.borderWidth * this.width / 600;
    }

    get borderWidth() {
        return this.width * BORDER_WIDTH / this._width;
    }
}

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