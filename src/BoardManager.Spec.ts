import KhmerChessBoard from "./KhmerChessBoard";
import { Point, CELL_COUNT } from "khmer-chess";

describe("KhmerChessBoard", function () {
    let kcb: KhmerChessBoard = null;

    beforeAll(() => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        kcb = new KhmerChessBoard();
        kcb.setOptions({
            width: 600,
            container
        });
        kcb.start();
    });

    it('should return correct cell', () => {
        const cell = kcb.boardManager.get(0);
        expect(cell.point.indexCode).toEqual('a1');
    });

    it('should be valid selection', () => {
        const cell = kcb.boardManager.pieceNotInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeFalse();
    });

    it('should make correct selected', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeTrue();
        // second selection to clear
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeFalse();
    });

    it('should select another one', () => {
        const cell1 = kcb.boardManager.pieceInTurnCells[0];
        const cell2 = kcb.boardManager.pieceInTurnCells[2];
        kcb.boardManager.selectCell(cell1);
        kcb.boardManager.selectCell(cell2);
        expect(cell1.isSelected).toBeFalse();
        expect(cell2.isSelected).toBeTrue();
    });

    it('should return king', () => {
        let cell = kcb.boardManager.getKing(KhmerChessBoard.PIECE_COLOR_BLACK);
        expect(cell.piece.isColorBlack).toBeTrue();
        expect(cell.piece.isTypeKing).toBeTrue();
        cell = kcb.boardManager.getKing(KhmerChessBoard.PIECE_COLOR_WHITE);
        expect(cell.piece.isColorWhite).toBeTrue();
        expect(cell.piece.isTypeKing).toBeTrue();
    });

    it('should return by index code', () => {
        const point = new Point(0, 0);
        const cell = kcb.boardManager.getByIndexCode(point.indexCode);
        expect(cell.point.indexCode).toBe(point.indexCode);
    });

    it('should return by x,y', () => {
        const point = new Point(0, 0);
        const cell = kcb.boardManager.getByXY(point.x, point.y);
        expect(cell.point.indexCode).toBe(point.indexCode);
    });

    it('should flip', () => {
        // TODO: test all possible flip features
        const cell0 = kcb.boardManager.get(0);
        const cell = kcb.boardManager.pieceInTurnCells[0];
        const index = cell.point.index;
        kcb.boardManager.selectCell(cell);
        expect(cell0.point.indexCode).toBe('a1');
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).toBe('h8');
        expect(cell.point.index).toBe(CELL_COUNT - index - 1);
        // turn back
        kcb.boardManager.selectCell(cell);
        kcb.boardManager.flip();
        expect(cell0.point.indexCode).toBe('a1');
        expect(cell.point.index).toBe(index);
    });

    it('should return all cells that has piece', () => {
        const cells = kcb.boardManager.pieceCells;
        expect(cells.length).toBe(32);
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