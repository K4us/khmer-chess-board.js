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
 *---------------------------------------------------------------------------- */
import CellManager from './CellManager';
import {
    ListenerType,
    EventHandler,
} from 'khmer-chess';

export default class BoardManagerEventController extends EventHandler {
    static CLICK = 'click';
    static SELECTED = 'selected';
    static DESELECTED = 'deselected';
    static ATTEMPT_MOVE = 'attempt-move';
    static CHANGE_TURN = 'change-turn';
    constructor() {
        super({
            events: {
                CLICK: BoardManagerEventController.CLICK,
                SELECTED: BoardManagerEventController.SELECTED,
                ATTEMPT_MOVE: BoardManagerEventController.ATTEMPT_MOVE,
                CHANGE_TURN: BoardManagerEventController.CHANGE_TURN,
            },
        });
    }
    click(cellManager: CellManager) {
        this._addPropEvent(BoardManagerEventController.CLICK, cellManager);
    }
    selected(cellManager: CellManager) {
        this._addPropEvent(BoardManagerEventController.SELECTED, cellManager);
    }
    deselected(cellManager: CellManager) {
        this._addPropEvent(BoardManagerEventController.DESELECTED, cellManager);
    }
    attemptMove(fromCell: CellManager, toCell: CellManager) {
        this._addPropEvent(BoardManagerEventController.ATTEMPT_MOVE, {
            fromCell,
            toCell,
        });
    }
    changeTurn() {
        this._addPropEvent(BoardManagerEventController.CHANGE_TURN);
    }
    addOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this._addOnEventListener(BoardManagerEventController.CLICK, listener);
    }
    removeOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this._removeOnEventListener(BoardManagerEventController.CLICK, listener);
    }
    addOnCellSelectedEventListener(listener: ListenerType<CellManager>) {
        this._addOnEventListener(BoardManagerEventController.SELECTED, listener);
    }
    removeOnCellSelectedEventListener(listener: ListenerType<CellManager>) {
        this._removeOnEventListener(BoardManagerEventController.SELECTED, listener);
    }
    addOnCellDeselectedEventListener(listener: ListenerType<CellManager>) {
        this._addOnEventListener(BoardManagerEventController.DESELECTED, listener);
    }
    removeOnCellDeselectedEventListener(listener: ListenerType<CellManager>) {
        this._removeOnEventListener(BoardManagerEventController.DESELECTED, listener);
    }
    addOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._addOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    }
    removeOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._removeOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    }
    addOnChangeTurnEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._addOnEventListener(BoardManagerEventController.CHANGE_TURN, listener);
    }
    removeOnChangeTurnEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._removeOnEventListener(BoardManagerEventController.CHANGE_TURN, listener);
    }
}
