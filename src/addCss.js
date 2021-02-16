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
const { PIECES_SVG, squareWidth, svgCSS, WOOD_COLORS } = require('./svg');
const {
    TABLE_CLASS,
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_ID_NAME
} = require('./constance');
const appendCss = require('./appendCss');

function addCss(width) {
    const sqWidth = squareWidth(width);
    const pieceFontSize = width / 12;
    const highlightPseudo = 'after';
    const piecePseudo = 'before';

    let css = `
        table.${TABLE_CLASS}  {
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
        table.${TABLE_CLASS} td table {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: white;
        }
        table.${TABLE_CLASS} tr {
            width: ${width}px;
            height: ${sqWidth}px;
        }
        table.${TABLE_CLASS} td {
            user-select: none;
            background-color: #f4d1a6;
            border: 1px solid white;
            padding: 0px;
            margin: 0px;
            max-width: ${sqWidth}px;
            max-height: ${sqWidth}px;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        table.${TABLE_CLASS} td, table.${TABLE_CLASS} td::${highlightPseudo},
        table.${TABLE_CLASS} td::${piecePseudo} {
            font-size: ${pieceFontSize}px;
        }
        table.${TABLE_CLASS} td::${highlightPseudo} {
            opacity: 0.4;
        }
        table.${TABLE_CLASS} td::${piecePseudo} {
            float: left;
        }
        table.${TABLE_CLASS} td:not(.graveyard)::${highlightPseudo},
        table.${TABLE_CLASS} td:not(.graveyard)::${piecePseudo} {
            width: ${sqWidth}px;
            height: ${sqWidth}px;
            background-size: ${sqWidth}px ${sqWidth}px;
            display: block;
            content: ' ';
        }
        table.${TABLE_CLASS} td.${SELECTED_CLASS_NAME}::${highlightPseudo} {
            background: radial-gradient(#f4d1a6, #e66465) !important;
        }
    `;
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
                table.${TABLE_CLASS} td.${PIECE_CLASS_NAME}.${ATTACKED_ID_NAME}.type-${type}.color-${color}::${piecePseudo} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(attackedSVG)}');
                }
                table.${TABLE_CLASS} td.${PIECE_CLASS_NAME}.type-${type}.color-${color}::${piecePseudo} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(notAttackedSVG)}');
                }
                `;
        });
    });

    appendCss(css);
}

module.exports = addCss;
