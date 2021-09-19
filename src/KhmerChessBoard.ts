// FIXME: chrome horizontal scroll not work
import config from '../package.json';
import GraveyardManager from './GraveyardManager';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import { POPUP_CLASS_NAME } from './providers/constance';
import addCss from './helpers/addCss';
import addCssNote from './helpers/addCssNote';
import drawBoardAndGraveyard from './helpers/drawBoardAndGraveyard';
import OptionsManager from './OptionsManager';
import { EVENT_FLAG_MOVING, KhmerChess } from 'khmer-chess';
import type { KPGNOption } from 'khmer-chess';
import MessageManager from './MessageManager';
import PlayManager from './PlayManager';
import PieceShadowManager from './PieceShadowManager';

import { BoardStatusEvent } from './event/BoardStatusEvent';

export default class KhmerChessBoard {
    static LOCALE_ENGLISH = 'en';
    static LOCALE_KHMER = 'km';
    static info = config;
    static title = config.name;
    static version = config.version;
    containerDom: HTMLElement;
    domRootBoard: HTMLElement;
    options: OptionsManager;
    playManager: PlayManager;
    graveyardManager: GraveyardManager;
    boardManager: BoardManager;
    khmerChess: KhmerChess;
    soundManager: SoundManager;
    messageManager: MessageManager;
    pieceShadowManager: PieceShadowManager;
    constructor() {
        this.containerDom = document.createElement('div');
        this.domRootBoard = document.createElement('table');
        this.khmerChess = new KhmerChess();
        this.options = new OptionsManager();
        this.playManager = new PlayManager(this);
        this.graveyardManager = new GraveyardManager(this);
        this.boardManager = new BoardManager(this);
        this.soundManager = new SoundManager(this);
        this.messageManager = new MessageManager(this);
        this.pieceShadowManager = new PieceShadowManager(this);
    }
    setOptions(options: {
        container?: HTMLElement | null;
        width: number;
    }) {


        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.containerDom = options.container;

        if (options.width < this.options.minWidth) {
            throw new Error(`Board width must more than ${this.options.minWidth} `);
        }
        if (options.width) {
            this.options.width = options.width;
        }
        if (options.width) {
            this.options.width = options.width;
        }

        this.render();
        this.boardManager.attachClickEvent();

        const boardEventController = this.boardManager.boardEventController;
        boardEventController.addOnCellSelectedEventListener((cell) => {
            const points = cell.canMovePoints;
            points.forEach((point) => {
                const targetCell = this.boardManager.get(point.index);
                targetCell.setCanMove();
            });
        });
        boardEventController.addOnCellDeselectedEventListener((cell) => {
            this.boardManager.clearCanMoveCells();
        });
        boardEventController.addOnAttemptMoveEventListener(({ fromCell, toCell }) => {
            this.move(fromCell.point.index, toCell.point.index);
        });
    }
    move(fromIndex: number, toIndex: number) {
        const move = this.khmerChess.move(fromIndex, toIndex);
        if (move !== null) {
            this.boardManager.clearTurnCells();
            this.playManager.next(() => {
                this.playManager.turning();
            });
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard: this,
                flag: EVENT_FLAG_MOVING,
                move,
            });
            this.boardManager.boardStatusEventController.fireEvent(boardEvent);
        }
    }

    setFullScreen(isFullScreen: boolean) {
        this.options.isFullScreen = isFullScreen;
        const table = this.domRootBoard;

        table.classList.remove(POPUP_CLASS_NAME);
        table.style.top = '0';
        table.style.left = '0';
        table.style.transform = '';
        table.style.zIndex = '';

        if (isFullScreen) {
            table.classList.add(POPUP_CLASS_NAME);
            table.style.top = '50%';
            table.style.left = '50%';
            const scaleFit = this.options.getScaleFit(table.getBoundingClientRect());
            table.style.transform = `translate(-50%,-50%) scale(${scaleFit})`;
            table.style.zIndex = '9999';
        }
    }

    render() {
        this.addAllDomCss();
        const {
            domRootBoard,
            domGraveyard,
            playerContainer,
            tdShadow,
        } = drawBoardAndGraveyard({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
            container: this.containerDom,
            boardManager: this.boardManager,
            graveyardManager: this.graveyardManager,
        });
        this.domRootBoard = domRootBoard;
        this.graveyardManager.setDom(domGraveyard);
        this.pieceShadowManager.setTdShadow(tdShadow);
        this.setCellNote();
        this.applyPieces();
        this.messageManager.draw();
        this.playManager.draw(playerContainer);
    }

    setLocale(locale: string) {
        const locales = [KhmerChessBoard.LOCALE_ENGLISH, KhmerChessBoard.LOCALE_KHMER];
        if (!~locales.indexOf(locale)) {
            throw new Error(`Unsupported locale: ${locale}, supported locales: ${locales.join(',')}`);
        } else {
            this.options.isEnglish = locale === locales[0];
            this.setCellNote();
        }
    }

    setCellNote() {
        this.boardManager.clearCellNote();
        this.graveyardManager.clearCellNote();

        this.boardManager.setCellNote();
        this.graveyardManager.setCellNote();
    }

    addAllDomCss() {
        addCss({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
        });
        addCssNote({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
        });
        addCssNote({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
            isEnglish: true,
        });
    }

    loadKpng(kpng: KPGNOption | string) {
        if (typeof kpng === 'string') {
            this.khmerChess.kpgn.fromBase64(kpng);
        } else {
            this.khmerChess.kpgn.fromJson(kpng);
        }
        this.applyPieces();
        this.playManager.resetCurrentIndex();
        this.playManager.highlightCurrentMove();
        this.boardManager.checkBoardEvent();
    }

    reset() {
        this.playManager.pause();
        this.loadKpng({});
        this.boardManager.attachClickEvent();
    }

    loadRen(renStr?: string) {
        this.khmerChess.kpgn.loadRENStr(renStr);
        this.applyPieces();
    }

    applyPieces() {
        this.graveyardManager.renderKhmerChessPieces();
        this.boardManager.renderKhmerChessPieces();
    }

    removeAllDomElements() {
        const elements = document.querySelectorAll(`table.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement?.removeChild(element);
        });
        this.removeAllDomCss();
    }

    removeAllDomCss() {
        const elements = document.querySelectorAll(`style.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement?.removeChild(element);
        });
    }

    destroy() {
        this.removeAllDomElements();
        this.playManager.destroy();
        this.graveyardManager.destroy();
        this.boardManager.destroy();
        this.soundManager.destroy();
        this.messageManager.destroy();
        this.pieceShadowManager.destroy();
        (this.khmerChess as any) = null;
        (this.options as any) = null;
        (this.playManager as any) = null;
        (this.graveyardManager as any) = null;
        (this.boardManager as any) = null;
        (this.soundManager as any) = null;
        (this.messageManager as any) = null;
        (this.pieceShadowManager as any) = null;
    }
}

/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */

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