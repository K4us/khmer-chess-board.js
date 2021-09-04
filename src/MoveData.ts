export default class MoveData {
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
        containerDom.appendChild(span);
        this.dom = span;

        const indexSpan = document.createElement('span');
        indexSpan.innerText = `${index}`;
        indexSpan.classList.add('index');
        span.appendChild(indexSpan);

        const infoSpan = document.createElement('span');
        infoSpan.classList.add('info');
        infoSpan.innerText = str;
        span.appendChild(infoSpan);
        infoSpan.onclick = () => {
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
        if (this.dom !== null) {
            this.dom.onclick = null;
            this.dom.parentElement?.removeChild(this.dom);
        }
    }
    scrollIntoView() {
        this.dom.scrollIntoView();
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