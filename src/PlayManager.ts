import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import appendCss from './helpers/appendCss';
import PlayManagerEventController from './event/PlayManagerEventController';
import {
    Move,
} from 'khmer-chess';

class MoveData {
    index: number;
    renData: string;
    dom: HTMLElement;
    constructor({ index, containerDom, renData, title, str, onClick }: {
        index: number,
        containerDom: HTMLElement,
        renData: string,
        title: string,
        str: string,
        onClick: Function,
    }) {
        this.index = index;
        this.renData = renData;
        const span = document.createElement('span');
        span.title = title;
        span.innerText = str;
        containerDom.appendChild(span);
        this.dom = span;
        span.onclick = () => {
            if (!this.isCurrent) {
                onClick();
            }
        };
    }
    get isCurrent() {
        return this.dom.classList.contains('current');
    }
    current(b: boolean) {
        this.dom.classList.remove('current');
        if (b) {
            this.dom.classList.add('current');
        }
    }
    destroy() {
        this.dom.onclick = null;
        this.dom.parentElement.removeChild(this.dom);
    }
    scrollIntoView() {
        this.dom.scrollIntoView();
    }
}

export default class PlayManager {
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    containerClassName = 'player-table';
    containerDom: HTMLElement;
    renDataList: MoveData[] = [];
    playEventController: PlayManagerEventController<MoveData>;
    backBtnDom: HTMLButtonElement;
    playBtnDom: HTMLButtonElement;
    pauseBtnDom: HTMLButtonElement;
    nextBtnDom: HTMLButtonElement;
    currentIndex = 0;
    constructor() {
        this.playEventController = new PlayManagerEventController();
    }
    get isCanBack() {
        return !!(this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex);
    }
    get isCanNext() {
        const movesLength = this.khmerChessBoard.khmerChess.kpgn.moves.length;
        return this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex < movesLength;
    }
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.options = khmerChessBoard.options;
        appendCss(this.options.uniqueClassName, this.css());
    }
    renderMoveData() {
        this.renDataList.forEach((moveData) => {
            moveData.destroy();
        })
        const isEnglish = this.options.isEnglish;
        const current = this.currentIndex - 1;
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.renDataList = moves.map((move, i) => {
            const moveData = new MoveData({
                index: i + 1,
                containerDom: this.containerDom,
                renData: '',
                title: move.getMessage(isEnglish),
                str: move.toString(),
                onClick: () => {
                    this.toIndex(moveData.index);
                    this.playEventController.click(moveData);
                },
            });
            if (current === i) {
                moveData.current(true);
            }
            return moveData;
        });
        if (this.renDataList.length) {
            this.renDataList[this.renDataList.length - 1].scrollIntoView();
        }
    }
    draw(playerContainer: HTMLElement) {
        const containerWidth = ~~(this.options.width * 3 / 4);
        const table = document.createElement('table');
        table.classList.add(this.options.uniqueClassName);
        table.classList.add(this.containerClassName);
        playerContainer.appendChild(table);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        let tdHistory = document.createElement('td');
        const div = document.createElement('div');
        div.style.width = `${containerWidth}px`;
        div.classList.add('container');
        this.containerDom = div;
        tdHistory.appendChild(div);
        tdHistory.style.width = `${containerWidth}px`;
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        let btn = document.createElement('button');
        btn.innerHTML = '<';
        this.backBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '^';
        this.playBtnDom = btn;
        tdHistory.appendChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = '#';
        this.pauseBtnDom = btn;
        tdHistory.appendChild(btn);
        btn.style.display = 'none';
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '>';
        this.nextBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        this.btnListen();
    }
    btnListen() {
        this.backBtnDom.onclick = () => {
            this.back();
            this.playEventController.back();
        };
        this.playBtnDom.onclick = () => {
            this.playEventController.play();
        };
        this.pauseBtnDom.onclick = () => {
            this.playEventController.pause();
        };
        this.nextBtnDom.onclick = () => {
            this.next();
            this.playEventController.next();
        };
    }
    css(): string {
        const containerSelector = `table.${this.options.uniqueClassName}.${this.containerClassName}`;
        return `
        ${containerSelector} {
            width: 100%;
            height: 100%;
            box-shadow: rgb(0, 0, 0) 0px 0px 2px inset;
        }
        ${containerSelector} td {
            padding: 0px;
            margin: 0px;
            text-align: center;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px inset;
        }
        ${containerSelector} .container {
            font-size: 14px;
            text-align: right;
            overflow-x: auto;
        }
        ${containerSelector} .container::-webkit-scrollbar {
            width: 1em;
        }
        ${containerSelector} .container span{
            margin: 0 2px;
            padding: 0 2px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            cursor: pointer;
        }
        ${containerSelector} .container span.current{
            background-color: rgba(255, 255, 255, 0.3);
            cursor: auto;
        }
        `;
    }
    isCanUndo() {
        return !!this.khmerChessBoard.khmerChess.kpgn.latestMove;
    }
    undo() {
        if (this.isCanUndo) {
            this.back(() => {
                this.khmerChessBoard.khmerChess.kpgn.moves.pop();
                this.render();
            });
        }
    }
    play() {
        this.khmerChessBoard.boardManager.takeTurn();
        this.render();
    }
    pause() {
        this.khmerChessBoard.boardManager.clearTurnCells();
        this.render();
    }
    render() {
        this.playBtnDom.style.display = 'none';
        this.pauseBtnDom.style.display = 'none';
        this.backBtnDom.disabled = true;
        this.nextBtnDom.disabled = true;
        if (this.khmerChessBoard.boardManager.isTurning) {
            this.pauseBtnDom.style.display = '';
        } else {
            this.playBtnDom.style.display = '';
        }
        this.backBtnDom.disabled = !this.isCanBack;
        this.nextBtnDom.disabled = !this.isCanNext;
        this.playBtnDom.disabled = this.isCanNext;
        this.renderMoveData();
    }
    loadCurrentRen() {
        this.khmerChessBoard.loadRen(this.currentMove ? this.currentMove.renStr : '');
        this.khmerChessBoard.boardManager.takeTurn();
    }
    get currentMove() {
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        return moves[this.currentIndex - 1] || null;
    }
    back(callback = () => { }) {
        if (!this.isCanBack) {
            return false;
        }
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.currentIndex--;
        this.applyMoveReverse(moves[this.currentIndex], () => {
            this.loadCurrentRen();
            callback();
        });
        this.pause();
        return true;
    }
    next(callback = () => { }) {
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        if (!moves[this.currentIndex]) {
            return false;
        }
        this.currentIndex++;
        this.applyMove(moves[this.currentIndex - 1], () => {
            this.loadCurrentRen();
            callback();
        });
        return true;
    }
    applyMove(move: Move, callback = () => { }) {
        const {
            boardManager,
            graveyardManager,
            pieceShadowManager,
            soundManager,
        } = this.khmerChessBoard;
        pieceShadowManager.finishAnimations();

        const finish = () => {
            const fromCell = boardManager.get(move.moveFrom.index);
            const toCell = boardManager.get(move.moveTo.index);
            pieceShadowManager.movingPiece(fromCell, toCell, () => {
                fromCell.movePieceTo(toCell);
                if (move.isUpgrading) {
                    toCell.upgrade();
                }
                callback();
            });
            this.highlightCurrentMove();
            soundManager.playMove();
            this.render();
        }

        if (move.captured) {
            const fromBCell = boardManager.get(move.captured.fromBoardPoint.index);
            const toGYCell = graveyardManager.get(move.captured.toGraveyardPoint.index);
            pieceShadowManager.movingPiece(fromBCell, toGYCell, () => {
                fromBCell.movePieceToGraveyard(toGYCell);
                finish();
            });
            soundManager.playCapture();
        } else {
            finish();
        }
    }
    applyMoveReverse(move: Move, callback = () => { }) {
        const {
            boardManager,
            graveyardManager,
            pieceShadowManager,
            soundManager,
        } = this.khmerChessBoard;
        pieceShadowManager.finishAnimations();
        pieceShadowManager

        const fromCell = boardManager.get(move.moveTo.index);
        const toCell = boardManager.get(move.moveFrom.index);

        const finish = () => {
            this.highlightCurrentMove();
            soundManager.playMove();
            callback();
            this.render();
        }

        pieceShadowManager.movingPiece(fromCell, toCell, () => {
            fromCell.movePieceTo(toCell);
            if (move.isUpgrading) {
                toCell.downgrade();
            }
            if (move.captured) {
                const fromGYCell = graveyardManager.get(move.captured.toGraveyardPoint.index);
                const toBCell = boardManager.get(move.captured.fromBoardPoint.index);
                pieceShadowManager.movingPiece(fromGYCell, toBCell, () => {
                    fromGYCell.movePieceFromGraveyard(toBCell);
                    finish();
                });
                soundManager.playCapture();
            } else {
                finish();
            }
        });
    }
    highlightCurrentMove() {
        const boardManager = this.khmerChessBoard.boardManager;

        boardManager.clearMovedCells();
        boardManager.clearAttackCells();

        const currentMove = this.currentMove;
        if (currentMove) {
            const lastFromCell = boardManager.get(currentMove.moveFrom.index);
            const lastToCell = boardManager.get(currentMove.moveTo.index);
            boardManager.highlightMovedCells([lastFromCell, lastToCell]);
            if (currentMove.attacker) {
                const attacker = currentMove.attacker;
                const cell = boardManager.get(attacker.point.index);
                cell.attack(true);
                const king = boardManager.getKing(attacker.piece.colorOpponent);
                king.attack(true);
            }
        }
    }
    toIndex(index: number) {
        this.pause();
        while (this.currentIndex !== index) {
            this.khmerChessBoard.pieceShadowManager.quickMove(~~(this.currentIndex - index) !== 1);
            if (this.currentIndex < index) {
                this.next();
            } else {
                this.back();
            }
        }
        this.khmerChessBoard.pieceShadowManager.quickMove(false);
        this.highlightCurrentMove();
    }
    resetCurrentIndex() {
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.currentIndex = moves.length;
    }
}

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