import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import appendCss from './helpers/appendCss';
import PlayManagerEventController from './event/PlayManagerEventController';

// TODO: implement play
class MoveData {
    renData: string;
    dom: HTMLElement;
    constructor({ containerDom, renData, title, str, onClick }: {
        containerDom: HTMLElement,
        renData: string,
        title: string,
        str: string,
        onClick: Function,
    }) {
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
}

export default class PlayManager {
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    containerClassName = 'player-table';
    containerDom: HTMLElement;
    renDataList: MoveData[] = [];
    playEventController: PlayManagerEventController<MoveData>;
    backBtnDom: HTMLElement;
    playBtnDom: HTMLElement;
    pauseBtnDom: HTMLElement;
    nextBtnDom: HTMLElement;
    constructor() {
        this.playEventController = new PlayManagerEventController();
    }
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.options = khmerChessBoard.options;
        appendCss(this.options.uniqueClassName, this.css());
    }
    add(str: string, title: string) {
        const moveData = new MoveData({
            containerDom: this.containerDom,
            renData: '',
            title,
            str,
            onClick: () => {
                this.playEventController.click(moveData);
            },
        });
        this.renDataList.push(moveData);
        this.rendCurrent();
    }
    rendCurrent() {
        this.renDataList.forEach(e => e.current(false));
        if (this.renDataList.length) {
            const moveData = this.renDataList[this.renDataList.length - 1];
            moveData.current(true);
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
            this.playEventController.back();
        };
        this.playBtnDom.onclick = () => {
            this.playEventController.play();
        };
        this.pauseBtnDom.onclick = () => {
            this.playEventController.pause();
        };
        this.nextBtnDom.onclick = () => {
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
    undo() {
        throw new Error('TODO undo');
    }
    stop() {
        this.khmerChessBoard.boardManager.clearTurnCells();
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