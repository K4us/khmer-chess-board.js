import {
    ListenerType,
    EventHandler,
} from 'khmer-chess';

export default class PlayManagerEventController<T> extends EventHandler {
    static CLICK = 'click';
    static BLACK = 'back';
    static PLAY = 'play';
    static PAUSE = 'pause';
    static NEXT = 'next';
    constructor() {
        super({
            events: {
                CLICK: PlayManagerEventController.CLICK,
                SELECTED: PlayManagerEventController.BLACK,
                ATTEMPT_MOVE: PlayManagerEventController.PAUSE,
                CHANGE_TURN: PlayManagerEventController.NEXT,
            },
        });
    }
    click(data: T) {
        this._addPropEvent(PlayManagerEventController.CLICK, data);
    }
    back() {
        this._addPropEvent(PlayManagerEventController.BLACK);
    }
    play() {
        this._addPropEvent(PlayManagerEventController.PLAY);
    }
    pause() {
        this._addPropEvent(PlayManagerEventController.PAUSE);
    }
    next() {
        this._addPropEvent(PlayManagerEventController.NEXT);
    }
    addOnDataClickEventListener(listener: ListenerType<T>) {
        this._addOnEventListener(PlayManagerEventController.CLICK, listener);
    }
    removeOnDataClickEventListener(listener: ListenerType<T>) {
        this._removeOnEventListener(PlayManagerEventController.CLICK, listener);
    }
    addOnBackEventListener(listener: ListenerType<T>) {
        this._addOnEventListener(PlayManagerEventController.BLACK, listener);
    }
    removeOnBackEventListener(listener: ListenerType<T>) {
        this._removeOnEventListener(PlayManagerEventController.BLACK, listener);
    }
    addOnPlayEventListener(listener: ListenerType<T>) {
        this._addOnEventListener(PlayManagerEventController.PLAY, listener);
    }
    removeOnPlayEventListener(listener: ListenerType<T>) {
        this._removeOnEventListener(PlayManagerEventController.PLAY, listener);
    }
    addOnPauseEventListener(listener: ListenerType<T>) {
        this._addOnEventListener(PlayManagerEventController.PAUSE, listener);
    }
    removeOnPauseEventListener(listener: ListenerType<T>) {
        this._removeOnEventListener(PlayManagerEventController.PAUSE, listener);
    }
    addOnNextEventListener(listener: ListenerType<T>) {
        this._addOnEventListener(PlayManagerEventController.NEXT, listener);
    }
    removeOnNextEventListener(listener: ListenerType<T>) {
        this._removeOnEventListener(PlayManagerEventController.NEXT, listener);
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