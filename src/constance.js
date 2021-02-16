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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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

'use strict';

const BORDER_WIDTH = 1;
const MIN_SQUARE_WIDTH = 5;
const TD_GRAVEYARD_NUMBER = 30;
const TABLE_CLASS = 'khmer-chess-board';
const SELECTED_CLASS_NAME = 'selected';
const ATTACKED_ID_NAME = 'attacked';
const PIECE_CLASS_NAME = 'piece';
const GRAVEYARD_NOTE_PREFIX_CLASS = 'note-gy';
const BOARD_NOTE_V_PREFIX_CLASS = 'note-board-v';
const BOARD_NOTE_H_PREFIX_CLASS = 'note-board-h';
const FLIPPED_CLASS = 'flipped';

module.exports = {
    BORDER_WIDTH,
    MIN_SQUARE_WIDTH,
    TD_GRAVEYARD_NUMBER,
    TABLE_CLASS,
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_ID_NAME,
    GRAVEYARD_NOTE_PREFIX_CLASS,
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
    FLIPPED_CLASS
};
