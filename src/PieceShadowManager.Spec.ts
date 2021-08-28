import KhmerChessBoard from "./KhmerChessBoard";
import { capturing, init, reset } from "./test/helper";

describe("KhmerChessBoard", function () {
    const kcb: KhmerChessBoard = new KhmerChessBoard();

    let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1e3 * 10; // 10 seconds
    });

    beforeAll(() => {
        init(kcb);
    });

    afterEach(() => {
        reset(kcb);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should move with shadow', async () => {
        kcb.pieceShadowManager.disableQuickMove();
        kcb.loadRen(capturing.renStr);
        const cell = kcb.boardManager.get(capturing.fromIndex);
        const targetCell = kcb.boardManager.get(capturing.toIndex);
        kcb.boardManager.selectCell(cell);
        kcb.boardManager.selectCell(targetCell);
        await kcb.pieceShadowManager.resolveAnimation();
        const movedCells = kcb.boardManager.movedCells;
        expect(movedCells.length).toBe(2);
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