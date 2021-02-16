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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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
const { SquarePiece } = require('./SquarePiece');
const { squareWidth } = require('./svg');
const {
    BORDER_WIDTH,
    TD_GRAVEYARD_NUMBER,
    TABLE_CLASS
} = require('./constance');

function drawBoardAndGraveyard(options = {}) {
    const { width, container, boardManager, graveyardManager } = options;
    const sqWidth = squareWidth(width);

    const createTable = (parent = container) => {
        const table = document.createElement('table');
        table.classList.add(TABLE_CLASS);
        parent.appendChild(table);
        return table;
    };
    const createTbody = (parent) => {
        const tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        return tbody;
    };
    const createTr = (parent) => {
        const tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
    };
    const createTd = (parent) => {
        const td = document.createElement('td');
        parent.appendChild(td);
        return td;
    };

    const table = createTable();
    const tbody = createTbody(table);

    for (let i = 0; i < boardHelper.ROW_NUMBER; i++) {
        const tr = createTr(tbody);
        for (let j = 0; j < boardHelper.ROW_NUMBER; j++) {
            const td = createTd(tr);
            const squarePiece = new SquarePiece(j, boardHelper.ROW_NUMBER - i - 1, td, null);
            const index = boardHelper.nerdXyToPos(j, boardHelper.ROW_NUMBER - i - 1);
            boardManager.put(index, squarePiece);
        }
    }

    const graveyardContainerHeight = sqWidth + 10 * BORDER_WIDTH;
    table.style.height = width + graveyardContainerHeight;
    const trGraveyardContainer = createTr(tbody);
    trGraveyardContainer.style.height = graveyardContainerHeight;
    const tdGraveyardContainer = createTd(trGraveyardContainer);
    tdGraveyardContainer.classList.add('graveyard');
    tdGraveyardContainer.addEventListener('mousewheel', function (e) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);
    tdGraveyardContainer.style.width = width;
    tdGraveyardContainer.style.height = graveyardContainerHeight;
    tdGraveyardContainer.style.overflowX = 'scroll';
    tdGraveyardContainer.style.overflowY = 'hidden';
    tdGraveyardContainer.colSpan = 8;
    tdGraveyardContainer.style.padding = 8 * BORDER_WIDTH * width / 600;
    tdGraveyardContainer.style.boxShadow = `inset 0 0 ${width / 60}px #000000`;
    const tableGraveyard = createTable(tdGraveyardContainer);
    const graveyardWidth = BORDER_WIDTH * (TD_GRAVEYARD_NUMBER - 1) + sqWidth * TD_GRAVEYARD_NUMBER;
    tableGraveyard.style.width = graveyardWidth;
    tableGraveyard.style.height = sqWidth;
    const tbodyGraveyard = createTbody(tableGraveyard);
    const trGraveyard = createTr(tbodyGraveyard);
    trGraveyard.style.width = graveyardWidth;

    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const tdGraveyard = createTd(trGraveyard);
        const squarePiece = new SquarePiece(i, 0, tdGraveyard, null, true);
        graveyardManager.push(squarePiece);
    }
}

module.exports = drawBoardAndGraveyard;
