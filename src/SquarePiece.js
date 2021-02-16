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
 *---------------------------------------------------------------------------- */

'use strict';

const { boardHelper } = require('khmer-chess');
const {
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_ID_NAME,
    FLIPPED_CLASS
} = require('./constance');
const { genBackgroundNote } = require('./svg');

class SquarePiece {
    _x = 0;
    _y = 0;
    get x() {
        return this.isUpsideDown ? boardHelper.ROW_NUMBER - this._x - 1 : this._x;
    }

    get y() {
        return this.isUpsideDown ? boardHelper.ROW_NUMBER - this._y - 1 : this._y;
    }

    get index() {
        return boardHelper.nerdXyToPos(this.x, this.y);
    }

    get indexCode() {
        return boardHelper.xyToIndexCode(this.x, this.y);
    }

    isGraveyard = false;
    container = document.createElement('td');
    piece = null;
    isUpsideDown = false;
    constructor(x, y, container, piece, isGraveyard) {
        this._x = x;
        this._y = y;
        this.container = container;
        this.setPiece(piece);
        this.isGraveyard = isGraveyard;
    }

    removePiece() {
        const piece = this.piece;
        if (piece) {
            this.removeClassName(PIECE_CLASS_NAME);
            this.removeClassName(`type-${piece.type}`);
            this.removeClassName(`color-${piece.color}`);
            this.piece = null;
        }
        return piece;
    }

    setPiece(piece) {
        this.removePiece();
        this.piece = piece;
        if (this.piece) {
            this.addClassName(`type-${this.piece.type}`);
            this.addClassName(`color-${this.piece.color}`);
            this.addClassName(PIECE_CLASS_NAME);
        }
    }

    addClassName(className) {
        this.container.classList.add(className);
    }

    removeClassName(className) {
        this.container.classList.remove(className);
    }

    hasClassName(className) {
        return this.container.classList.contains(className);
    }

    select() {
        this.addClassName(SELECTED_CLASS_NAME);
    }

    unselect() {
        this.removeClassName(SELECTED_CLASS_NAME);
    }

    isSelected() {
        return this.hasClassName(SELECTED_CLASS_NAME);
    }

    attacked() {
        this.addClassName(ATTACKED_ID_NAME);
    }

    notAttacked() {
        this.removeClassName(ATTACKED_ID_NAME);
    }

    isAttacked() {
        return this.hasClassName(ATTACKED_ID_NAME);
    }

    getProperties() {
        return {
            className: this.container.className
        };
    }

    clear() {
        this.container.className = '';
    }

    setProperties(prop) {
        this.container.className = prop.className;
    }

    setOnClick(listener) {
        this.container.onclick = listener;
    }

    removeOnClick() {
        this.container.onclick = null;
    }

    addNote(tObjects, squareWidth, fSize) {
        const backgroundImage = genBackgroundNote(tObjects, squareWidth, fSize);
        this.container.style.backgroundImage = backgroundImage;
    }

    setFlipped(isUpsideDown) {
        this.removeClassName(FLIPPED_CLASS);
        this.isUpsideDown = isUpsideDown;
        if (isUpsideDown) {
            this.addClassName(FLIPPED_CLASS);
        }
    }

    clone() {
        return new SquarePiece(this.x, this.y, document.createElement('div'), this.piece);
    }
}

module.exports = { SquarePiece };
