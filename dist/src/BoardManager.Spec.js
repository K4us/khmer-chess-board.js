"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
var KhmerChessBoard_1 = __importDefault(require("./KhmerChessBoard"));
var khmer_chess_1 = require("khmer-chess");
var helper_1 = require("./test/helper");
var chai_spies_1 = __importDefault(require("chai-spies"));
chai.use(chai_spies_1.default);
var expect = chai.expect;
describe('KhmerChessBoard', function () {
    var kcb = new KhmerChessBoard_1.default();
    before(function () {
        (0, helper_1.init)(kcb);
    });
    afterEach(function () {
        (0, helper_1.reset)(kcb);
    });
    it('should return correct cell', function () {
        var cell = kcb.boardManager.get(0);
        expect(cell.point.indexCode).to.eql('a1');
    });
    it('should be valid selection', function () {
        var cell = kcb.boardManager.pieceNotInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.false;
    });
    it('should make correct selected', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.true;
        // second selection to clear
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.false;
    });
    it('should select another one', function () {
        var cell1 = kcb.boardManager.pieceInTurnCells[0];
        var cell2 = kcb.boardManager.pieceInTurnCells[2];
        kcb.boardManager.selectCell(cell1);
        kcb.boardManager.selectCell(cell2);
        expect(cell1.isSelected).to.false;
        expect(cell2.isSelected).to.true;
    });
    it('should return king', function () {
        var _a, _b, _c, _d;
        var cell = kcb.boardManager.getKing(khmer_chess_1.PIECE_COLOR_BLACK);
        expect((_a = cell.piece) === null || _a === void 0 ? void 0 : _a.isColorBlack).to.true;
        expect((_b = cell.piece) === null || _b === void 0 ? void 0 : _b.isTypeKing).to.true;
        cell = kcb.boardManager.getKing(khmer_chess_1.PIECE_COLOR_WHITE);
        expect((_c = cell.piece) === null || _c === void 0 ? void 0 : _c.isColorWhite).to.true;
        expect((_d = cell.piece) === null || _d === void 0 ? void 0 : _d.isTypeKing).to.true;
    });
    it('should return by index code', function () {
        var point = new khmer_chess_1.Point(0, 0);
        var cell = kcb.boardManager.getByIndexCode(point.indexCode);
        expect(cell.point.indexCode).to.eql(point.indexCode);
    });
    it('should return by x,y', function () {
        var point = new khmer_chess_1.Point(0, 0);
        var cell = kcb.boardManager.getByXY(point.x, point.y);
        expect(cell.point.indexCode).to.eql(point.indexCode);
    });
    it('should flip', function () {
        // TODO: test all possible flip features
        var cell0 = kcb.boardManager.get(0);
        var cell = kcb.boardManager.pieceInTurnCells[0];
        var index = cell.point.index;
        kcb.boardManager.selectCell(cell);
        expect(cell0.point.indexCode).to.eql('a1');
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).to.eql('h8');
        expect(cell.point.index).to.eql(khmer_chess_1.CELL_COUNT - index - 1);
        // flip back
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).to.eql('a1');
        expect(cell.point.index).to.eql(index);
    });
    it('should return all cells that has piece', function () {
        var cells = kcb.boardManager.pieceCells;
        expect(cells.length).to.eql(32);
    });
    it('should move', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        var piece = cell.piece;
        var point = cell.canMovePoints[0];
        var targetCell = kcb.boardManager.get(point.index);
        kcb.move(cell.point.index, targetCell.point.index);
        var movedCells = kcb.boardManager.movedCells;
        expect(movedCells[1].piece).to.eql(piece);
    });
    it('should capture', function () {
        kcb.loadRen(helper_1.capturing.renStr);
        kcb.playManager.play();
        var piece = kcb.boardManager.get(helper_1.capturing.toIndex).piece;
        expect(kcb.graveyardManager.get(6).piece).to.null;
        kcb.move(helper_1.capturing.fromIndex, helper_1.capturing.toIndex);
        var capturedP = kcb.graveyardManager.get(6).piece;
        expect(capturedP).not.to.null;
        expect(capturedP).to.eql(piece);
    });
    it('should attack', function () {
        kcb.loadRen(helper_1.attacking.renStr);
        kcb.playManager.play();
        kcb.move(helper_1.attacking.fromIndex, helper_1.attacking.toIndex);
        var cell = kcb.boardManager.get(helper_1.attacking.toIndex);
        var king = kcb.boardManager.getKing(cell.piece.colorOpponent);
        expect(king.isAttacked).to.true;
    });
    it('should detach click event', function () {
        kcb.boardManager.detachClickEvent();
        var cell = kcb.boardManager.get(0);
        expect(cell.onClick).to.null;
    });
});
//# sourceMappingURL=BoardManager.Spec.js.map