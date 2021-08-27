import KhmerChessBoard from "./KhmerChessBoard";

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

    it('should be function', () => {
        expect(typeof KhmerChessBoard).toEqual('function');
    });

    it('should has class', () => {
        expect(typeof kcb.options.uniqueClassName).toEqual('string');
    });

    it('should move', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        expect(cell.isCanSelect).toBeTrue();
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeTrue();

        const point = cell.canMovePoints[0];

        const targetCell = kcb.boardManager.get(point.index);

        spyOn(kcb, 'move');

        kcb.boardManager.selectCell(targetCell);
        expect(kcb.move).toHaveBeenCalledWith(cell.point.index, targetCell.point.index);
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