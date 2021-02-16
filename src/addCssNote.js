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

const { boardHelper } = require('khmer-chess');
const appendCss = require('./appendCss');
const { squareWidth, genBackgroundNote } = require('./svg');
const {
    TD_GRAVEYARD_NUMBER,
    TABLE_CLASS,
    GRAVEYARD_NOTE_PREFIX_CLASS,
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
    FLIPPED_CLASS
} = require('./constance');

function addCssNote(width) {
    const sqWidth = squareWidth(width);
    let css = '';
    const fSize = 15 * width / 600;
    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const bgImg = genBackgroundNote([{
            x: sqWidth / 2 - sqWidth / 10,
            y: sqWidth,
            t: boardHelper.VERTICAL_NOTE_LETTERS[i]
        }], sqWidth, fSize);
        css += `
        table.${TABLE_CLASS} td.${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1} {
            background-image: ${bgImg};
        }
        `;
    }

    const hx = sqWidth / 2 - sqWidth / 10;
    const vy = sqWidth / 2 + sqWidth / 10;
    for (let i = 0; i < boardHelper.ROW_NUMBER; i++) {
        const bgImg = genBackgroundNote([{
            x: hx,
            y: sqWidth,
            t: boardHelper.HORIZONTAL_NOTE_LETTERS[i]
        }]);
        const bgImgFlipped = genBackgroundNote([{
            x: hx,
            y: sqWidth,
            t: boardHelper.HORIZONTAL_NOTE_LETTERS[boardHelper.ROW_NUMBER - i - 1]
        }]);
        css += `
            table.${TABLE_CLASS} td.${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1} {
                background-image: ${bgImg};
            }
            table.${TABLE_CLASS} td.${FLIPPED_CLASS}.${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1} {
                background-image: ${bgImgFlipped};
            }
            `;
    }
    for (let j = 0; j < boardHelper.ROW_NUMBER; j++) {
        const bgImg = genBackgroundNote([{
            x: 0,
            y: vy,
            t: boardHelper.VERTICAL_NOTE_LETTERS[j]
        }]);
        const bgImgFlipped = genBackgroundNote([{
            x: 0,
            y: vy,
            t: boardHelper.VERTICAL_NOTE_LETTERS[boardHelper.ROW_NUMBER - j - 1]
        }]);
        css += `
            table.${TABLE_CLASS} td.${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1} {
                background-image: ${bgImg};
            }
            table.${TABLE_CLASS} td.flipped.${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1} {
                background-image: ${bgImgFlipped};
            }
            `;
    }

    const bgImg = genBackgroundNote([
        {
            x: hx,
            y: sqWidth,
            t: boardHelper.HORIZONTAL_NOTE_LETTERS[0]
        }, {
            x: 0,
            y: vy,
            t: boardHelper.VERTICAL_NOTE_LETTERS[0]
        }
    ]);
    const bgImgFlipped = genBackgroundNote([
        {
            x: hx,
            y: sqWidth,
            t: boardHelper.HORIZONTAL_NOTE_LETTERS[0]
        }, {
            x: 0,
            y: vy,
            t: boardHelper.VERTICAL_NOTE_LETTERS[0]
        }
    ]);
    css += `
    table.${TABLE_CLASS} td.${BOARD_NOTE_V_PREFIX_CLASS}-1.${BOARD_NOTE_H_PREFIX_CLASS}-1 {
        background-image: ${bgImg};
    }
    table.${TABLE_CLASS} td.${FLIPPED_CLASS}.${BOARD_NOTE_V_PREFIX_CLASS}-1.${BOARD_NOTE_H_PREFIX_CLASS}-1 {
        background-image: ${bgImgFlipped};
    }
    `;

    appendCss(css);
}

module.exports = addCssNote;