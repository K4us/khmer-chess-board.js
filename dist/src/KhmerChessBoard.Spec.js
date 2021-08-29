"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KhmerChessBoard_1 = __importDefault(require("./KhmerChessBoard"));
var helper_1 = require("./test/helper");
describe("KhmerChessBoard", function () {
    var kcb = new KhmerChessBoard_1.default();
    beforeAll(function () {
        (0, helper_1.init)(kcb);
    });
    afterEach(function () {
        (0, helper_1.reset)(kcb);
    });
    it('should be function', function () {
        expect(typeof KhmerChessBoard_1.default).toEqual('function');
    });
    it('should has class', function () {
        expect(typeof kcb.options.uniqueClassName).toEqual('string');
    });
    it('should can move', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        var point = cell.canMovePoints[0];
        var targetCell = kcb.boardManager.get(point.index);
        expect(targetCell.isCanMove).toBeTrue();
    });
    it('should move', function () {
        var cell = kcb.boardManager.pieceInTurnCells[0];
        expect(cell.isCanSelect).toBeTrue();
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).toBeTrue();
        var point = cell.canMovePoints[0];
        var targetCell = kcb.boardManager.get(point.index);
        spyOn(kcb, 'move');
        kcb.boardManager.selectCell(targetCell);
        expect(kcb.move).toHaveBeenCalledWith(cell.point.index, targetCell.point.index);
    });
    it('should thrown', function () {
        var kcb1 = new KhmerChessBoard_1.default();
        expect(function () {
            kcb1.setOptions({
                width: 600,
                container: null
            });
        }).toThrow(new Error('Container is required!'));
        var minWidth = kcb1.options.minWidth;
        expect(function () {
            kcb1.setOptions({
                width: minWidth - 1,
                container: document.createElement("div")
            });
        }).toThrow(new Error("Board width must more than " + minWidth + " "));
    });
    it('should set locale', function () {
        var cell = kcb.boardManager.get(0);
        var locales = [KhmerChessBoard_1.default.LOCALE_ENGLISH, KhmerChessBoard_1.default.LOCALE_KHMER];
        var locale = KhmerChessBoard_1.default.LOCALE_ENGLISH + 1;
        expect(function () {
            kcb.setLocale(KhmerChessBoard_1.default.LOCALE_ENGLISH + 1);
        }).toThrow(new Error("Unsupported locale: " + locale + ", supported locales: " + locales.join(',')));
        kcb.setLocale(KhmerChessBoard_1.default.LOCALE_ENGLISH);
        expect(cell.hasClassName(kcb.options.enClass)).toBeTrue();
        expect(kcb.options.isEnglish).toBeTrue();
        kcb.setLocale(KhmerChessBoard_1.default.LOCALE_KHMER);
        expect(cell.hasClassName(kcb.options.enClass)).toBeFalse();
        expect(kcb.options.isEnglish).toBeFalse();
    });
    it('should root board should on top', function () {
        kcb.setFullScreen(true);
        var table = kcb.domRootBoard;
        expect(table.style.zIndex).toBe('9999');
    });
    it('should load REN', function () {
        var renStr = 'BHGKQ2B/4GH2/TFFFFFFF/8/8/5ff1/2qg2b1/bhgk2h1 w ---- -- -.- ffffff';
        kcb.loadRen(renStr);
        expect(kcb.boardManager.toString()).toBe(kcb.khmerChess.renInstance.board.toString());
    });
    it('should destroyed', function () {
        var container = document.createElement("div");
        document.body.appendChild(container);
        var kcb1 = new KhmerChessBoard_1.default();
        kcb1.setOptions({
            width: 600,
            container: container
        });
        kcb1.destroy();
        expect(kcb1.khmerChess).toBeNull();
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
//# sourceMappingURL=KhmerChessBoard.Spec.js.map