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
import { boardHelper, Piece, ROW_NUMBER } from 'khmer-chess';
import {
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_ID_NAME,
    FLIPPED_CLASS,
} from './constance';

export default class SquareOnBoard {
    _x = 0;
    _y = 0;
    get x(): number {
        return this.isUpsideDown ? ROW_NUMBER - this._x - 1 : this._x;
    }

    get y(): number {
        return this.isUpsideDown ? ROW_NUMBER - this._y - 1 : this._y;
    }

    get index(): number {
        return boardHelper.nerdXyToPos(this.x, this.y);
    }

    get indexCode(): string {
        return boardHelper.xyToIndexCode(this.x, this.y);
    }

    isGraveyard = false;
    container: HTMLDivElement = document.createElement('td');
    piece: Piece = null;
    isUpsideDown = false;
    constructor(x: number, y: number, container: HTMLDivElement,
        piece: Piece, isGraveyard = false) {
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

    setPiece(piece: Piece) {
        this.removePiece();
        this.piece = piece;
        if (this.piece) {
            this.addClassName(`type-${this.piece.type}`);
            this.addClassName(`color-${this.piece.color}`);
            this.addClassName(PIECE_CLASS_NAME);
        }
    }

    addClassName(className: string) {
        this.container.classList.add(className);
    }

    removeClassName(className: string) {
        this.container.classList.remove(className);
    }

    hasClassName(className: string) {
        return this.container.classList.contains(className);
    }

    select() {
        if (this.piece) {
            this.addClassName(SELECTED_CLASS_NAME);
        }
        return this.piece;
    }

    unselect() {
        this.removeClassName(SELECTED_CLASS_NAME);
    }

    isSelected() {
        return this.hasClassName(SELECTED_CLASS_NAME);
    }

    attack(attacked: boolean) {
        if (this.piece) {
            this.removeClassName(ATTACKED_ID_NAME);
            if (attacked) {
                this.addClassName(ATTACKED_ID_NAME);
            }
        }
        return this.piece;
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

    setProperties(prop: { className: string; }) {
        this.container.className = prop.className;
    }

    setOnClick(listener: (this: GlobalEventHandlers, ev: MouseEvent) => any) {
        this.container.onclick = listener;
    }

    removeOnClick() {
        this.container.onclick = null;
    }

    setFlipped(isUpsideDown: boolean) {
        this.removeClassName(FLIPPED_CLASS);
        this.isUpsideDown = isUpsideDown;
        if (isUpsideDown) {
            this.addClassName(FLIPPED_CLASS);
        }
    }

    clone() {
        const div = document.createElement('div');
        return new SquareOnBoard(this.x, this.y, div, this.piece);
    }
}