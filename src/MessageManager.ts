import KhmerChessBoard from './KhmerChessBoard';
import appendCss from './helpers/appendCss';

export default class MessageManager {
    khmerChessBoard: KhmerChessBoard;
    containerClassName = 'message-container';
    messageClassName = 'message';
    domContainer: HTMLDivElement;
    domMessage: HTMLDivElement;
    logEnabled = true;
    constructor(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        appendCss(this.khmerChessBoard.options.uniqueClassName, this.css());
    }
    destroy() {
        (this.khmerChessBoard as any) = null;
    }
    enableLog() {
        this.logEnabled = true;
    }
    disableLog() {
        this.logEnabled = false;
    }
    log(message?: any, ...optionalParams: any[]) {
        if (!this.logEnabled) {
            return;
        }
        console.log(message, ...optionalParams);
    }
    showMessage(message: string) {
        this.domContainer.style.display = 'block';
        this.domMessage.innerHTML = message;
    }
    hide() {
        this.domContainer.style.display = 'none';
    }
    draw() {
        const container = this.khmerChessBoard.domRootBoard;
        const bc = this.khmerChessBoard.domRootBoard.getBoundingClientRect();
        const div = document.createElement('div');
        this.domContainer = div;
        div.classList.add(this.khmerChessBoard.options.uniqueClassName);
        div.classList.add(this.containerClassName);
        container.appendChild(div);
        div.style.height = `${bc.height}px`;
        div.style.transform = `translateY(-${bc.height}px)`;

        const divMessage = document.createElement('div');
        this.domMessage = divMessage;
        divMessage.classList.add(this.messageClassName);
        div.appendChild(divMessage);

        this.hide();
    }
    css(): string {
        const containerSelector = `.${this.khmerChessBoard.options.uniqueClassName}.${this.containerClassName}`;
        return `
        ${containerSelector} {
            width: ${this.khmerChessBoard.options.width}px;
            text-align: center;
            border: 0px;
            padding: 10px;
            box-sizing: border-box;
            margin: auto;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 18px;
        }
        ${containerSelector} .${this.messageClassName} {
            margin-top: 50%;
        }
        `;
    }
}

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