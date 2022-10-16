"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_PSEUDO_NOTE = exports.CSS_PSEUDO_PIECE = exports.CSS_PSEUDO_HIGHLIGHT = exports.FLIPPED_CLASS = exports.BOARD_NOTE_H_PREFIX_CLASS = exports.BOARD_NOTE_V_PREFIX_CLASS = exports.GRAVEYARD_NOTE_PREFIX_CLASS = exports.POPUP_CLASS_NAME = exports.PIECE_CLASS_NAME = exports.TR_PIECE_SHADOW_CLASS_NAME = exports.TR_GRAVEYARD_CLASS_NAME = exports.TR_PIECE_CLASS_NAME = exports.GRAVEYARD_CLASS_NAME = exports.TURN_CLASS_NAME = exports.ATTACKED_CLASS_NAME = exports.MOVED_CLASS_NAME = exports.CAN_MOVE_CLASS_NAME = exports.KC_FONT_CLASS_NAME = exports.SELECTED_CLASS_NAME = exports.CSS_TABLE_SELECTOR = exports.CSS_P2P = exports.TABLE_CLASS = exports.TD_GRAVEYARD_NUMBER = exports.MIN_CELL_WIDTH = exports.BORDER_WIDTH = void 0;
/*
 * Copyright (c) 2021-2022, K4us
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
exports.BORDER_WIDTH = 1;
exports.MIN_CELL_WIDTH = 5;
exports.TD_GRAVEYARD_NUMBER = 30;
exports.TABLE_CLASS = 'khmer-chess-board';
exports.CSS_P2P = 'p2p';
exports.CSS_TABLE_SELECTOR = "table." + exports.TABLE_CLASS;
exports.SELECTED_CLASS_NAME = 'selected';
exports.KC_FONT_CLASS_NAME = 'kc-font';
exports.CAN_MOVE_CLASS_NAME = 'can-move';
exports.MOVED_CLASS_NAME = 'moved';
exports.ATTACKED_CLASS_NAME = 'attacked';
exports.TURN_CLASS_NAME = 'turn';
exports.GRAVEYARD_CLASS_NAME = 'tb-graveyard';
exports.TR_PIECE_CLASS_NAME = 'tr-piece';
exports.TR_GRAVEYARD_CLASS_NAME = 'tr-graveyard';
exports.TR_PIECE_SHADOW_CLASS_NAME = 'tr-piece-shadow';
exports.PIECE_CLASS_NAME = 'piece';
exports.POPUP_CLASS_NAME = 'popup';
exports.GRAVEYARD_NOTE_PREFIX_CLASS = 'note-gy';
exports.BOARD_NOTE_V_PREFIX_CLASS = 'note-board-v';
exports.BOARD_NOTE_H_PREFIX_CLASS = 'note-board-h';
exports.FLIPPED_CLASS = 'flipped';
exports.CSS_PSEUDO_HIGHLIGHT = '::after';
exports.CSS_PSEUDO_PIECE = '';
exports.CSS_PSEUDO_NOTE = '::before';
//# sourceMappingURL=constance.js.map