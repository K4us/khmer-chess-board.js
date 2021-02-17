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
const {
    PIECES_SVG,
    svgCSS,
    WOOD_COLORS
} = require('./svg');
const {
    CSS_TABLE_SELECTOR,
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_ID_NAME,
    CSS_PSEUDO_HIGHLIGHT,
    CSS_PSEUDO_PIECE,
    POPUP_CLASS_NAME
} = require('./constance');
const appendCss = require('./appendCss');

function addCss({ uniqueClassName, options }) {
    const { width, squareWidth } = options;
    const pieceFontSize = width / 12;
    const selector = `${CSS_TABLE_SELECTOR}.${uniqueClassName}`;

    let css = '';
    css += `
        ${selector} {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            width: ${width}px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: white;
        }
        ${selector}.${POPUP_CLASS_NAME} {
            position: fixed;
            box-shadow: 10px 10px 80px #000000, -10px -10px 80px #000000;
        }
        ${selector} td table {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: white;
        }
        ${selector} tr {
            width: ${width}px;
            height: ${squareWidth}px;
        }
        ${selector} td {
            user-select: none;
            background-color: #f4d1a6;
            border: 1px solid white;
            padding: 0px;
            margin: 0px;
            max-width: ${squareWidth}px;
            max-height: ${squareWidth}px;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        ${selector} td,
        ${selector} td::before,
        ${selector} td::after {
            font-size: ${pieceFontSize}px;
        }
        ${selector} td::after {
            opacity: 0.4;
        }
        ${selector} td::before {
            float: left;
        }
        ${selector} td:not(.graveyard)::before,
        ${selector} td:not(.graveyard)::after {
            width: ${squareWidth}px;
            height: ${squareWidth}px;
            background-size: ${squareWidth}px ${squareWidth}px;
            display: block;
            content: ' ';
        }
    `;

    css += `
    ${selector} td.${SELECTED_CLASS_NAME}${CSS_PSEUDO_HIGHLIGHT} {
        background: radial-gradient(#f4d1a6, #e66465) !important;
    }`;

    boardHelper.getColorArray().forEach((color) => {
        boardHelper.getPieceCharArray().forEach((type) => {
            const woodColor = color === boardHelper.PIECE_COLOR_BLACK ? WOOD_COLORS.BLACK : WOOD_COLORS.WHITE;
            const attackedSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
                <style>${svgCSS.attacked(woodColor)}</style>
                ${PIECES_SVG[color + type]}
            </svg>`;
            const notAttackedSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
                <style>${svgCSS.notAttacked(woodColor)}</style>
                ${PIECES_SVG[color + type]}
            </svg>`;
            css += `
                ${selector} td.${PIECE_CLASS_NAME}.${ATTACKED_ID_NAME}.type-${type}.color-${color}${CSS_PSEUDO_PIECE} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(attackedSVG)}');
                }
                ${selector} td.${PIECE_CLASS_NAME}.type-${type}.color-${color}${CSS_PSEUDO_PIECE} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(notAttackedSVG)}');
                }
                `;
        });
    });

    appendCss(uniqueClassName, css);
}

module.exports = addCss;
