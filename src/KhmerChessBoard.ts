import config from '../package.json';
import GraveyardManager from './GraveyardManager';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import { POPUP_CLASS_NAME } from './providers/constance';
import addCss from './helpers/addCss';
import addCssNote from './helpers/addCssNote';
import drawBoardAndGraveyard from './helpers/drawBoardAndGraveyard';
import OptionsManager from './OptionsManager';
import {
    BoardEvent,
    KhmerChess,
    Move,
    Piece,
} from 'khmer-chess';
import MessageManager from './MessageManager';
import PlayManager from './PlayManager';
import PieceShadowManager from './PieceShadowManager';

import {
    PIECE_COLOR_BLACK,
    PIECE_COLOR_WHITE,
    PIECE_TYPE_BOAT,
    PIECE_TYPE_TRANSFORM_FISH,
    PIECE_TYPE_GENERAL,
    PIECE_TYPE_QUEEN,
    PIECE_TYPE_KING,
    PIECE_TYPE_HORSE,
    PIECE_TYPE_FISH,
} from 'khmer-chess';

export default class KhmerChessBoard {
    static PIECE_COLOR_BLACK = PIECE_COLOR_BLACK;
    static PIECE_COLOR_WHITE = PIECE_COLOR_WHITE;
    static PIECE_TYPE_BOAT = PIECE_TYPE_BOAT;
    static PIECE_TYPE_TRANSFORM_FISH = PIECE_TYPE_TRANSFORM_FISH;
    static PIECE_TYPE_GENERAL = PIECE_TYPE_GENERAL;
    static PIECE_TYPE_QUEEN = PIECE_TYPE_QUEEN;
    static PIECE_TYPE_KING = PIECE_TYPE_KING;
    static PIECE_TYPE_HORSE = PIECE_TYPE_HORSE;
    static PIECE_TYPE_FISH = PIECE_TYPE_FISH;
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
    setOptions(options: {
        container: HTMLElement;
        width: number;
    }) {

        this.khmerChess = new KhmerChess();
        this.options = new OptionsManager();
        this.playManager = new PlayManager();
        this.graveyardManager = new GraveyardManager();
        this.boardManager = new BoardManager();
        this.soundManager = new SoundManager();
        this.messageManager = new MessageManager();
        this.pieceShadowManager = new PieceShadowManager();

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

        this.playManager.setProps(this);
        this.graveyardManager.setProps(this);
        this.boardManager.setProps(this);
        this.soundManager.setProps(this);
        this.messageManager.setProps(this);
        this.pieceShadowManager.setProps(this);

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
        this.khmerChess.addBoardEventListener((boardEvent: BoardEvent) => {
            if (boardEvent.isAttack) {
                this.attack(boardEvent);
            }
        });
    }
    attack(boardEvent: BoardEvent) {
        const actorPieceIndex = boardEvent.actorPieceIndex;
        const cell = this.boardManager.get(actorPieceIndex.point.index);
        cell.attack(true);
        const king = this.boardManager.getKing(actorPieceIndex.piece.colorOpponent);
        king.attack(true);
    }
    move(fromIndex: number, toIndex: number) {
        const move = this.khmerChess.move(fromIndex, toIndex);
        this.boardManager.clearSelectedCells();
        if (move !== null) {
            this.applyMove(move);
        }
    }

    setFullScreen(isFullScreen: boolean) {
        this.options.isFullScreen = isFullScreen;
        const table = this.domRootBoard;

        table.classList.remove(POPUP_CLASS_NAME);
        table.style.top = '0';
        table.style.left = '0';
        table.style.transform = '';
        table.style.zIndex = null;

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

    loadRen(renStr?: string) {
        this.khmerChess.loadRENStr(renStr);
        this.applyPieces();
        this.boardManager.changeTurn(this.khmerChess.turn);
    }

    applyPieces() {
        this.graveyardManager.renderKhmerChessPieces();
        this.boardManager.renderKhmerChessPieces();
    }

    removeAllDomElements() {
        const elements = document.querySelectorAll(`table.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement.removeChild(element);
        });
        this.removeAllDomCss();
    }

    removeAllDomCss() {
        const elements = document.querySelectorAll(`style.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement.removeChild(element);
        });
    }

    destroy() {
        this.removeAllDomElements();
        this.containerDom = null;
        this.graveyardManager = null;
        this.boardManager = null;
        this.soundManager = null;
        this.khmerChess = null;
    }

    applyMove(move: Move) {
        this.boardManager.clearMovedCells();
        this.boardManager.clearAttackCells();
        if (move.captured) {
            const fromBCell = this.boardManager.get(move.captured.fromBoardPoint.index);
            const toGYCell = this.graveyardManager.get(move.captured.toGraveyardPoint.index);
            this.pieceShadowManager.movingPiece(fromBCell, toGYCell, () => {
                fromBCell.movePieceToGraveyard(toGYCell);
            });
            this.soundManager.playCapture();
        }
        const fromCell = this.boardManager.get(move.moveFrom.index);
        const toCell = this.boardManager.get(move.moveTo.index);
        this.pieceShadowManager.movingPiece(fromCell, toCell, () => {
            fromCell.movePieceTo(toCell);
        });
        this.soundManager.playMove();
        this.khmerChess.checkBoardEvent();
        const turn = Piece.oppositeColor(this.khmerChess.turn);
        this.playManager.addMoveData(move.toString(), move.getMessage(this.options.isEnglish));
        this.boardManager.changeTurn(turn);
    }

    start(turningColor?: string) {
        this.boardManager.changeTurn(turningColor);
    }

    reset() {
        // TODO: reset all state
        this.boardManager.clearSelectedCells();
        this.boardManager.clearAttackCells();
        this.boardManager.clearMovedCells();
        this.playManager.stop();
        this.loadRen();
        this.boardManager.attachClickEvent();
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