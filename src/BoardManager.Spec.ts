import KhmerChessBoard from './KhmerChessBoard';
import { Point, CELL_COUNT } from 'khmer-chess';
import { init, capturing, reset, attacking } from './test/helper';
import spies from 'chai-spies';
chai.use(spies);
const { expect } = chai;

describe('KhmerChessBoard', function () {
    const kcb: KhmerChessBoard = new KhmerChessBoard();

    before(() => {
        init(kcb);
    });

    afterEach(() => {
        reset(kcb);
    });

    it('should return correct cell', () => {
        const cell = kcb.boardManager.get(0);
        expect(cell.point.indexCode).to.eql('a1');
    });

    it('should be valid selection', () => {
        const cell = kcb.boardManager.pieceNotInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.false;
    });

    it('should make correct selected', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.true;
        // second selection to clear
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.false;
    });

    it('should select another one', () => {
        const cell1 = kcb.boardManager.pieceInTurnCells[0];
        const cell2 = kcb.boardManager.pieceInTurnCells[2];
        kcb.boardManager.selectCell(cell1);
        kcb.boardManager.selectCell(cell2);
        expect(cell1.isSelected).to.false;
        expect(cell2.isSelected).to.true;
    });

    it('should return king', () => {
        let cell = kcb.boardManager.getKing(KhmerChessBoard.PIECE_COLOR_BLACK);
        expect(cell.piece.isColorBlack).to.true;
        expect(cell.piece.isTypeKing).to.true;
        cell = kcb.boardManager.getKing(KhmerChessBoard.PIECE_COLOR_WHITE);
        expect(cell.piece.isColorWhite).to.true;
        expect(cell.piece.isTypeKing).to.true;
    });

    it('should return by index code', () => {
        const point = new Point(0, 0);
        const cell = kcb.boardManager.getByIndexCode(point.indexCode);
        expect(cell.point.indexCode).to.eql(point.indexCode);
    });

    it('should return by x,y', () => {
        const point = new Point(0, 0);
        const cell = kcb.boardManager.getByXY(point.x, point.y);
        expect(cell.point.indexCode).to.eql(point.indexCode);
    });

    it('should flip', () => {
        // TODO: test all possible flip features
        const cell0 = kcb.boardManager.get(0);
        const cell = kcb.boardManager.pieceInTurnCells[0];
        const index = cell.point.index;
        kcb.boardManager.selectCell(cell);
        expect(cell0.point.indexCode).to.eql('a1');
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).to.eql('h8');
        expect(cell.point.index).to.eql(CELL_COUNT - index - 1);
        // flip back
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).to.eql('a1');
        expect(cell.point.index).to.eql(index);
    });

    it('should return all cells that has piece', () => {
        const cells = kcb.boardManager.pieceCells;
        expect(cells.length).to.eql(32);
    });

    it('should move', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        const piece = cell.piece;
        const point = cell.canMovePoints[0];
        const targetCell = kcb.boardManager.get(point.index);
        kcb.move(cell.point.index, targetCell.point.index);
        const movedCells = kcb.boardManager.movedCells;
        expect(movedCells[1].piece).to.eql(piece);
    });

    it('should capture', () => {
        kcb.loadRen(capturing.renStr);
        kcb.playManager.play();
        const piece = kcb.boardManager.get(capturing.toIndex).piece;
        expect(kcb.graveyardManager.get(6).piece).to.null;
        kcb.move(capturing.fromIndex, capturing.toIndex);
        const capturedP = kcb.graveyardManager.get(6).piece;
        expect(capturedP).not.to.null;
        expect(capturedP).to.eql(piece);
    });

    it('should attack', () => {
        kcb.loadRen(attacking.renStr);
        kcb.playManager.play();
        kcb.move(attacking.fromIndex, attacking.toIndex);
        const cell = kcb.boardManager.get(attacking.toIndex);
        const king = kcb.boardManager.getKing(cell.piece.colorOpponent);
        expect(king.isAttacked).to.true;
    });

    it('should detach click event', () => {
        kcb.boardManager.detachClickEvent();
        const cell = kcb.boardManager.get(0);
        expect(cell.onClick).to.null;
    });
});

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