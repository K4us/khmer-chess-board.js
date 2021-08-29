"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KhmerChessBoard_1 = __importDefault(require("./KhmerChessBoard"));
var khmer_chess_1 = require("khmer-chess");
var helper_1 = require("./test/helper");
describe("KhmerChessBoard", function () {
    var kcb = new KhmerChessBoard_1.default();
    beforeAll(function () {
        (0, helper_1.init)(kcb);
    });
    afterEach(function () {
        (0, helper_1.reset)(kcb);
    });
    it('should return correct cell', function () {
        var cell = kcb.boardManager.get(0);
        expect(cell.point.indexCode).toEqual('a1');
    });
    it('should be valid selection', function () {
        var cell = kcb.boardManager.pieceNotInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeFalse();
    });
    it('should make correct selected', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeTrue();
        // second selection to clear
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeFalse();
    });
    it('should select another one', function () {
        var cell1 = kcb.boardManager.pieceInTurnCells[0];
        var cell2 = kcb.boardManager.pieceInTurnCells[2];
        kcb.boardManager.selectCell(cell1);
        kcb.boardManager.selectCell(cell2);
        expect(cell1.isSelected).toBeFalse();
        expect(cell2.isSelected).toBeTrue();
    });
    it('should return king', function () {
        var cell = kcb.boardManager.getKing(KhmerChessBoard_1.default.PIECE_COLOR_BLACK);
        expect(cell.piece.isColorBlack).toBeTrue();
        expect(cell.piece.isTypeKing).toBeTrue();
        cell = kcb.boardManager.getKing(KhmerChessBoard_1.default.PIECE_COLOR_WHITE);
        expect(cell.piece.isColorWhite).toBeTrue();
        expect(cell.piece.isTypeKing).toBeTrue();
    });
    it('should return by index code', function () {
        var point = new khmer_chess_1.Point(0, 0);
        var cell = kcb.boardManager.getByIndexCode(point.indexCode);
        expect(cell.point.indexCode).toBe(point.indexCode);
    });
    it('should return by x,y', function () {
        var point = new khmer_chess_1.Point(0, 0);
        var cell = kcb.boardManager.getByXY(point.x, point.y);
        expect(cell.point.indexCode).toBe(point.indexCode);
    });
    it('should flip', function () {
        // TODO: test all possible flip features
        var cell0 = kcb.boardManager.get(0);
        var cell = kcb.boardManager.pieceInTurnCells[0];
        var index = cell.point.index;
        kcb.boardManager.selectCell(cell);
        expect(cell0.point.indexCode).toBe('a1');
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).toBe('h8');
        expect(cell.point.index).toBe(khmer_chess_1.CELL_COUNT - index - 1);
        // flip back
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).toBe('a1');
        expect(cell.point.index).toBe(index);
    });
    it('should return all cells that has piece', function () {
        var cells = kcb.boardManager.pieceCells;
        expect(cells.length).toBe(32);
    });
    it('should move', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        var piece = cell.piece;
        var point = cell.canMovePoints[0];
        var targetCell = kcb.boardManager.get(point.index);
        kcb.move(cell.point.index, targetCell.point.index);
        var movedCells = kcb.boardManager.movedCells;
        expect(movedCells[1].piece).toBe(piece);
    });
    it('should capture', function () {
        kcb.loadRen(helper_1.capturing.renStr);
        var piece = kcb.boardManager.get(helper_1.capturing.toIndex).piece;
        expect(kcb.graveyardManager.get(6).piece).toBeNull();
        kcb.move(helper_1.capturing.fromIndex, helper_1.capturing.toIndex);
        var capturedP = kcb.graveyardManager.get(6).piece;
        expect(capturedP).not.toBeNull();
        expect(capturedP).toBe(piece);
    });
    it('should call attack', function () {
        kcb.loadRen(helper_1.attacking.renStr);
        spyOn(kcb, 'attack');
        kcb.move(helper_1.attacking.fromIndex, helper_1.attacking.toIndex);
        expect(kcb.attack).toHaveBeenCalled();
    });
    it('should attack', function () {
        kcb.loadRen(helper_1.attacking.renStr);
        kcb.move(helper_1.attacking.fromIndex, helper_1.attacking.toIndex);
        var cell = kcb.boardManager.get(helper_1.attacking.toIndex);
        var king = kcb.boardManager.getKing(cell.piece.colorOpponent);
        expect(king.isAttacked).toBeTrue();
    });
    it('should detach click event', function () {
        kcb.boardManager.detachClickEvent();
        var cell = kcb.boardManager.get(0);
        expect(cell.onClick).toBeNull();
    });
});
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
//# sourceMappingURL=BoardManager.Spec.js.map