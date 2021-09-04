import KhmerChessBoard from './KhmerChessBoard';
import { init, reset } from './test/helper';
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

    it('should be function', () => {
        expect(typeof KhmerChessBoard).to.eql('function');
    });

    it('should has class', () => {
        expect(typeof kcb.options.uniqueClassName).to.eql('string');
    });

    it('should can move', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        kcb.boardManager.selectCell(cell);
        const point = cell.canMovePoints[0];
        const targetCell = kcb.boardManager.get(point.index);
        expect(targetCell.isCanMove).to.true;
    });

    it('should move', () => {
        const cell = kcb.boardManager.pieceInTurnCells[0];
        expect(cell.isCanSelect).to.true;
        kcb.boardManager.selectCell(cell);
        expect(cell.isSelected).to.true;

        const point = cell.canMovePoints[0];

        const targetCell = kcb.boardManager.get(point.index);

        const spy = chai.spy.on(kcb, 'move');

        kcb.boardManager.selectCell(targetCell);
        expect(kcb.move).to.have.been.called.with(cell.point.index, targetCell.point.index);
    });

    it('should thrown', () => {
        const kcb1 = new KhmerChessBoard();
        expect(() => {
            kcb1.setOptions({
                width: 600,
                container: null,
            });
        }).to.throw('Container is required!');
        const minWidth = kcb1.options.minWidth;
        expect(() => {
            kcb1.setOptions({
                width: minWidth - 1,
                container: document.createElement('div'),
            });
        }).to.throw(`Board width must more than ${minWidth} `);
    });

    it('should set locale', () => {
        const cell = kcb.boardManager.get(0);
        const locales = [KhmerChessBoard.LOCALE_ENGLISH, KhmerChessBoard.LOCALE_KHMER];
        const locale = KhmerChessBoard.LOCALE_ENGLISH + 1;
        expect(() => {
            kcb.setLocale(KhmerChessBoard.LOCALE_ENGLISH + 1);
        }).to.throw(`Unsupported locale: ${locale}, supported locales: ${locales.join(',')}`);

        kcb.setLocale(KhmerChessBoard.LOCALE_ENGLISH);
        expect(cell.hasClassName(kcb.options.enClass)).to.true;
        expect(kcb.options.isEnglish).to.true;

        kcb.setLocale(KhmerChessBoard.LOCALE_KHMER);
        expect(cell.hasClassName(kcb.options.enClass)).to.false;
        expect(kcb.options.isEnglish).to.false;
    });

    it('should root board should on top', () => {
        kcb.setFullScreen(true);
        const table = kcb.domRootBoard;
        expect(table?.style.zIndex).to.eql('9999');
    });

    it('should load REN', () => {
        const renStr = 'BHGKQ2B/4GH2/TFFFFFFF/8/8/5ff1/2qg2b1/bhgk2h1 w ---- -- -.- ffffff';
        kcb.loadRen(renStr);
        kcb.playManager.play();
        expect(kcb.boardManager.toString()).to.eql(kcb.khmerChess.kpgn.ren.board.toString());
    });

    it('should destroyed', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const kcb1 = new KhmerChessBoard();
        kcb1.setOptions({
            width: 600,
            container,
        });
        kcb1.destroy();
        expect(kcb1.khmerChess).to.null;
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