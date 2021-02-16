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
 *----------------------------------------------------------------------------*/

'use strict';

const { boardHelper } = require('khmer-chess');
const { SELECTED_CLASS_NAME, PIECE_CLASS_NAME, ATTACKED_ID_NAME } = require('./constance');
const { genBackgroundNote } = require('./svg');

class SquarePiece {
    x = 0;
    y = 0;
    get index() {
        return boardHelper.nerdXyToPos(this.x, this.y);
    }
    get indexCode() {
        return boardHelper.xyToIndexCode(this.x, this.y);
    }
    isGraveyard = false;
    container = document.createElement('td');
    piece = null;
    constructor(x, y, container, piece, isGraveyard) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.setPiece(piece);
        this.isGraveyard = isGraveyard;
    }
    removePiece() {
        this.setPiece(null);
    }
    setPiece(piece) {
        this.piece = piece;
        this.drawPiece();
    }
    drawPiece() {
        const classList = this.container.classList;
        classList.remove(PIECE_CLASS_NAME);
        if (this.piece) {
            classList.add(PIECE_CLASS_NAME);
            classList.add(`type-${this.piece.type}`);
            classList.add(`color-${this.piece.color}`);
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
            className: this.container.className,
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
        this.container.style.backgroundImage = genBackgroundNote(tObjects, squareWidth, fSize);
    }
    clearNote() {
        this.container.style.backgroundImage = '';
    }
}

module.exports = { SquarePiece };