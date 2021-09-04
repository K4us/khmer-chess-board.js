import BoardManager from '../BoardManager';
import GraveyardManager from '../GraveyardManager';
import OptionsManager from '../OptionsManager';

import {
    Point,
    ROW_NUMBER,
} from 'khmer-chess';
import CellManager from '../CellManager';
import {
    TD_GRAVEYARD_NUMBER,
    TABLE_CLASS,
    GRAVEYARD_CLASS_NAME,
    TR_PIECE_CLASS_NAME,
    TR_PIECE_SHADOW_CLASS_NAME,
} from '../providers/constance';

type Type = {
    uniqueClassName: string;
    options: OptionsManager;
    container: HTMLElement;
    boardManager: BoardManager;
    graveyardManager: GraveyardManager;
};
export default function drawBoardAndGraveyard({
    uniqueClassName, options, container, boardManager, graveyardManager }: Type) {
    const {
        width,
        cellWidth,
        graveyardContainerHeight,
        graveyardWidth,
        graveyardContainerPadding,
    } = options;

    const createTable = (parent = container) => {
        const table = document.createElement('table');
        parent.appendChild(table);
        return table;
    };
    const createTbody = (parent: HTMLTableElement) => {
        const tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        return tbody;
    };
    const createTr = (parent: HTMLTableSectionElement) => {
        const tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
    };
    const createTd = (parent: HTMLTableRowElement) => {
        const td = document.createElement('td');
        parent.appendChild(td);
        return td;
    };

    const table = createTable();
    table.classList.add(TABLE_CLASS);
    table.classList.add(uniqueClassName);
    const tbody = createTbody(table);

    for (let i = 0; i < ROW_NUMBER; i++) {
        const tr = createTr(tbody);
        tr.classList.add(TR_PIECE_CLASS_NAME);
        for (let j = 0; j < ROW_NUMBER; j++) {
            const td = createTd(tr);
            const cell = new CellManager(new Point(j, ROW_NUMBER - i - 1), td, null);
            const index = Point.xyToIndex(j, ROW_NUMBER - i - 1);
            boardManager.set(index, cell);
        }
    }
    const tr = createTr(tbody);
    tr.classList.add(TR_PIECE_SHADOW_CLASS_NAME);
    const tdShadow = createTd(tr);

    const trPlayerContainer = createTr(tbody);
    trPlayerContainer.classList.add('tr-player');
    trPlayerContainer.style.height = `${graveyardContainerHeight / 3}`;

    const tdPlayerContainer = createTd(trPlayerContainer);
    tdPlayerContainer.classList.add('player');
    tdPlayerContainer.addEventListener('mousewheel', function (e: any) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);
    tdPlayerContainer.colSpan = 8;

    const trGraveyardContainer = createTr(tbody);
    trGraveyardContainer.classList.add('tr-graveyard');
    trGraveyardContainer.style.height = `${graveyardContainerHeight}`;

    const tdGraveyardContainer = createTd(trGraveyardContainer);
    tdGraveyardContainer.classList.add('graveyard');
    tdGraveyardContainer.addEventListener('mousewheel', function (e: any) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);
    tdGraveyardContainer.colSpan = 8;

    const div = document.createElement('div');
    div.style.overflowX = 'scroll';
    div.style.overflowY = 'hidden';

    tdGraveyardContainer.appendChild(div);
    const tableGraveyard = createTable(div);
    tableGraveyard.classList.add(GRAVEYARD_CLASS_NAME);
    tableGraveyard.style.width = `${graveyardWidth}`;
    tableGraveyard.style.height = `${cellWidth}`;
    tableGraveyard.style.boxShadow = `inset 0 0 ${width / 60}px #000000`;

    const tbodyGraveyard = createTbody(tableGraveyard);
    const trGraveyard = createTr(tbodyGraveyard);
    trGraveyard.classList.add(TR_PIECE_CLASS_NAME);
    trGraveyard.style.width = `${graveyardWidth}`;

    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const tdGraveyard = createTd(trGraveyard);
        const cell = new CellManager(new Point(i, 0), tdGraveyard, null, true);
        graveyardManager.push(cell);
    }

    return {
        domRootBoard: table,
        domGraveyard: tableGraveyard,
        playerContainer: tdPlayerContainer,
        tdShadow,
    };
}

/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>, K4us Net <k4us.net@gmail.com>
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