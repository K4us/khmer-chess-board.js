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
import OptionsManager from '../OptionsManager';

import {
    HORIZONTAL_NOTE_LETTERS,
    HORIZONTAL_NOTE_LETTERS_ENGLISH,
    KhmerChess,
    ROW_NUMBER,
} from 'khmer-chess';
import appendCss from './appendCss';
import { genBackgroundNote } from '../providers/svg';
import {
    TD_GRAVEYARD_NUMBER,
    CSS_TABLE_SELECTOR,
    GRAVEYARD_NOTE_PREFIX_CLASS,
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
    FLIPPED_CLASS,
    CSS_PSEUDO_NOTE,
} from '../providers/constance';

export default function addCssNote({ uniqueClassName, options, isEnglish }:
    { uniqueClassName: string, options: OptionsManager, isEnglish?: boolean }) {
    const tranIndex = (i: number) => {
        return isEnglish ? `${i}` : KhmerChess.toKhmerNum(i);
    };
    const horizontalLetters = isEnglish ? HORIZONTAL_NOTE_LETTERS_ENGLISH : HORIZONTAL_NOTE_LETTERS;
    const { width, cellWidth } = options;
    const selector = `${CSS_TABLE_SELECTOR}.${uniqueClassName}`;
    let css = '';
    const fSize = 15 * width / 600;
    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const bgImg = genBackgroundNote([{
            x: cellWidth / 2 - cellWidth / 10,
            y: cellWidth,
            t: tranIndex(i),
        }], cellWidth, fSize);
        css += `
        ${selector} td${isEnglish ? '.' + options.enClass : ''}.${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1}${CSS_PSEUDO_NOTE} {
            background-image: ${bgImg};
        }
        `;
    }

    const hx = cellWidth / 2 - cellWidth / 10;
    const vy = cellWidth / 2 + cellWidth / 10;
    let bgImg = (i: number) => genBackgroundNote([{
        x: hx,
        y: cellWidth,
        t: horizontalLetters[i],
    }], cellWidth, fSize);
    for (let i = 0; i < ROW_NUMBER; i++) {
        css += `
        ${selector} td${isEnglish ? '.' + options.enClass : ''}.${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}${CSS_PSEUDO_NOTE} {
            background-image: ${bgImg(i)};
        }
        ${selector} td${isEnglish ? '.' + options.enClass : ''}.${FLIPPED_CLASS}.${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}${CSS_PSEUDO_NOTE} {
            background-image: ${bgImg(ROW_NUMBER - i - 1)};
        }
        `;
    }
    bgImg = (i) => genBackgroundNote([{
        x: 0,
        y: vy,
        t: tranIndex(i),
    }], cellWidth, fSize);
    for (let j = 0; j < ROW_NUMBER; j++) {
        css += `
            ${selector} td${isEnglish ? '.' + options.enClass : ''}.${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}${CSS_PSEUDO_NOTE} {
                background-image: ${bgImg(j)};
            }
            ${selector} td${isEnglish ? '.' + options.enClass : ''}.flipped.${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}${CSS_PSEUDO_NOTE} {
                background-image: ${bgImg(ROW_NUMBER - j - 1)};
            }
            `;
    }

    bgImg = (i) => genBackgroundNote([
        {
            x: hx,
            y: cellWidth,
            t: horizontalLetters[i],
        }, {
            x: 0,
            y: vy,
            t: tranIndex(i),
        },
    ], cellWidth, fSize);
    css += `
    ${selector} td${isEnglish ? '.' + options.enClass : ''}.${BOARD_NOTE_V_PREFIX_CLASS}-1.${BOARD_NOTE_H_PREFIX_CLASS}-1${CSS_PSEUDO_NOTE} {
        background-image: ${bgImg(0)};
    }
    ${selector} td${isEnglish ? '.' + options.enClass : ''}.${FLIPPED_CLASS}.${BOARD_NOTE_V_PREFIX_CLASS}-1.${BOARD_NOTE_H_PREFIX_CLASS}-1${CSS_PSEUDO_NOTE} {
        background-image: ${bgImg(7)};
    }
    `;

    appendCss(uniqueClassName, css);
}
