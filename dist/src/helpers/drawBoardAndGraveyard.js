"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var CellManager_1 = __importDefault(require("../CellManager"));
var constance_1 = require("../providers/constance");
function drawBoardAndGraveyard(_a) {
    var uniqueClassName = _a.uniqueClassName, options = _a.options, container = _a.container, boardManager = _a.boardManager, graveyardManager = _a.graveyardManager;
    var width = options.width, cellWidth = options.cellWidth, graveyardContainerHeight = options.graveyardContainerHeight, graveyardWidth = options.graveyardWidth;
    var createTable = function (parent) {
        if (parent === void 0) { parent = container; }
        var table = document.createElement('table');
        parent.appendChild(table);
        return table;
    };
    var createTbody = function (parent) {
        var tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        return tbody;
    };
    var createTr = function (parent) {
        var tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
    };
    var createTd = function (parent) {
        var td = document.createElement('td');
        parent.appendChild(td);
        return td;
    };
    var table = createTable();
    table.classList.add(constance_1.TABLE_CLASS);
    table.classList.add(uniqueClassName);
    var tbody = createTbody(table);
    for (var i = 0; i < khmer_chess_1.ROW_NUMBER; i++) {
        var tr_1 = createTr(tbody);
        tr_1.classList.add(constance_1.TR_PIECE_CLASS_NAME);
        for (var j = 0; j < khmer_chess_1.ROW_NUMBER; j++) {
            var td = createTd(tr_1);
            var cell = new CellManager_1.default(boardManager.khmerChessBoard, new khmer_chess_1.Point(j, khmer_chess_1.ROW_NUMBER - i - 1), td, null);
            var index = khmer_chess_1.Point.xyToIndex(j, khmer_chess_1.ROW_NUMBER - i - 1);
            boardManager.set(index, cell);
        }
    }
    var tr = createTr(tbody);
    tr.classList.add(constance_1.TR_PIECE_SHADOW_CLASS_NAME);
    var tdShadow = createTd(tr);
    var trPlayerContainer = createTr(tbody);
    trPlayerContainer.classList.add('tr-player');
    trPlayerContainer.style.height = "" + graveyardContainerHeight / 3;
    var tdPlayerContainer = createTd(trPlayerContainer);
    tdPlayerContainer.classList.add('player');
    tdPlayerContainer.colSpan = 8;
    var trGraveyardContainer = createTr(tbody);
    trGraveyardContainer.classList.add(constance_1.TR_GRAVEYARD_CLASS_NAME);
    trGraveyardContainer.style.height = "" + graveyardContainerHeight;
    var tdGraveyardContainer = createTd(trGraveyardContainer);
    tdGraveyardContainer.classList.add('graveyard');
    tdGraveyardContainer.colSpan = 8;
    var div = document.createElement('div');
    div.style.overflowX = 'scroll';
    div.style.overflowY = 'hidden';
    tdGraveyardContainer.appendChild(div);
    var tableGraveyard = createTable(div);
    tableGraveyard.classList.add(constance_1.GRAVEYARD_CLASS_NAME);
    tableGraveyard.style.width = "" + graveyardWidth;
    tableGraveyard.style.height = "" + cellWidth;
    tableGraveyard.style.boxShadow = "inset 0 0 " + width / 60 + "px #000000";
    var tbodyGraveyard = createTbody(tableGraveyard);
    var trGraveyard = createTr(tbodyGraveyard);
    trGraveyard.classList.add(constance_1.TR_PIECE_CLASS_NAME);
    trGraveyard.style.width = "" + graveyardWidth;
    for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
        var tdGraveyard = createTd(trGraveyard);
        var cell = new CellManager_1.default(graveyardManager.khmerChessBoard, new khmer_chess_1.Point(i, 0), tdGraveyard, null, true);
        graveyardManager.push(cell);
    }
    return {
        domRootBoard: table,
        domGraveyard: tableGraveyard,
        playerContainer: tdPlayerContainer,
        tdShadow: tdShadow,
    };
}
exports.default = drawBoardAndGraveyard;
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
//# sourceMappingURL=drawBoardAndGraveyard.js.map