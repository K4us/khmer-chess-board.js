import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
import OptionsManager from './OptionsManager';

export default class PieceShadowManager {
    tdShadowDom: HTMLElement;
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    _quickMove = false;
    pending: {
        resolvers: Array<() => void>,
        callbacks: Array<() => void>,
    } = {
            resolvers: [],
            callbacks: [],
        }
    quickMove(enable: boolean) {
        this._quickMove = enable;
        if (enable) {
            this.finishAnimations();
        }
    }
    setTdShadow(tdShadowDown: HTMLElement) {
        this.tdShadowDom = tdShadowDown;
    }
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.options = khmerChessBoard.options;
    }
    movingPiece(fromCell: CellManager, toCell: CellManager, callback: Function) {
        if (this._quickMove) {
            fromCell.removePieceClasses();
            callback();
        } else {
            const div = document.createElement('div');
            const pice = fromCell.piece;
            if (!pice || !div.animate || this.options.isFullScreen) {
                callback();
            } else {

                const fromBc = fromCell.containerDom.getBoundingClientRect();
                const toBc = toCell.containerDom.getBoundingClientRect();
                this.tdShadowDom.appendChild(div);
                div.style.top = `${fromBc.top}`;
                div.style.left = `${fromBc.left}`;
                div.classList.add(`type-${pice.type}`);
                div.classList.add(`color-${pice.color}`);
                fromCell.removePieceClasses();
                const option = [
                    {
                        transform: 'translate(0px)',
                        opacity: 1,
                    },
                    {
                        transform: `translate(${toBc.left - fromBc.left}px, ${toBc.top - fromBc.top}px)`,
                        opacity: 0,
                    },
                ];
                const animation = div.animate(option, 100);

                let pendingCallback = () => {
                    animation.cancel();
                    this.removePendingCallback(pendingCallback);
                    this._resolve();
                }
                this.addPendingCallback(pendingCallback);
                const timeout = setTimeout(() => pendingCallback(), 1e3);
                animation.onfinish = animation.oncancel = () => {
                    clearTimeout(timeout);
                    this.removePendingCallback(pendingCallback);
                    this.tdShadowDom.removeChild(div);
                    callback();
                    callback = () => { };
                };
            }
        }
    }
    addPendingCallback(callback: () => void) {
        this.pending.callbacks.push(callback);
    }
    removePendingCallback(callback: () => void) {
        this.pending.callbacks = this.pending.callbacks.filter((cb) => {
            return cb !== callback;
        });
    }
    finishAnimations() {
        while (this.pending.callbacks.length) {
            this.pending.callbacks[0]();
        }
        this._resolve();
    }
    _resolve() {
        while (!this.pending.callbacks.length && this.pending.resolvers.length) {
            const resolve = this.pending.resolvers.shift();
            resolve();
        }
    }
    resolveAnimation(): Promise<void> {
        return new Promise((resolve, _) => {
            this.pending.resolvers.push(resolve);
            this._resolve();
        });
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