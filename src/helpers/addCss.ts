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
import { Piece, PIECE_COLOR_BLACK, PIECE_COLOR_WHITE } from 'khmer-chess';
import {
    PIECES_SVG,
    svgCSS,
} from '../providers/svg';
import {
    CSS_TABLE_SELECTOR,
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_CLASS_NAME,
    CSS_PSEUDO_HIGHLIGHT,
    CSS_PSEUDO_PIECE,
    POPUP_CLASS_NAME,
    MOVED_CLASS_NAME,
    CAN_MOVE_CLASS_NAME,
    TURN_CLASS_NAME,
    GRAVEYARD_CLASS_NAME,
    TR_PIECE_CLASS_NAME,
    TR_PIECE_SHADOW_CLASS_NAME,
    CSS_P2P,
    KC_FONT_CLASS_NAME,
} from '../providers/constance';
import appendCss from './appendCss';
import OptionsManager from '../OptionsManager';
import { khmerChessFont } from 'k4us-share';

export default function addCss({ uniqueClassName, options }:
    { uniqueClassName: string, options: OptionsManager }) {
    const { width, cellWidth } = options;
    const pieceFontSize = width / 12;
    const selector = `${CSS_TABLE_SELECTOR}.${uniqueClassName}`;
    const p2pSelector = `${CSS_TABLE_SELECTOR}.${CSS_P2P}.${uniqueClassName}`;

    let css = '';
    css += `
        ${khmerChessFont.css}
        ${selector} {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            width: ${width}px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: #f4d1a6;
        }
        ${selector} .${KC_FONT_CLASS_NAME} {
            font-family: ${khmerChessFont.fontName};
        }
        ${selector} .white {
            color: white;
        }
        ${selector}.${POPUP_CLASS_NAME} {
            position: fixed;
            box-shadow: 10px 10px 80px #000000, -10px -10px 80px #000000;
        }
        ${selector} table.${GRAVEYARD_CLASS_NAME} {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: #ffc57d;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} {
            width: ${width}px;
            height: ${cellWidth}px;
        }
        ${selector} .${TR_PIECE_SHADOW_CLASS_NAME} {
            width: ${width}px;
            height: 0;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} td {
            user-select: none;
            border: 1px solid #9e9e9e87;
            padding: 0px;
            margin: 0px;
            max-width: ${cellWidth}px;
            max-height: ${cellWidth}px;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        ${selector} .${TR_PIECE_SHADOW_CLASS_NAME} div {
            width: ${cellWidth}px;
            height: ${cellWidth}px;
            position: absolute;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} td,
        ${selector} .${TR_PIECE_CLASS_NAME} td::before,
        ${selector} .${TR_PIECE_CLASS_NAME} td::after {
            font-size: ${pieceFontSize}px;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} td::after {
            opacity: 0.4;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} td::before {
            float: left;
        }
        ${selector} .${TR_PIECE_CLASS_NAME} td:not(.graveyard)::before,
        ${selector} .${TR_PIECE_CLASS_NAME} td:not(.graveyard)::after {
            width: ${cellWidth}px;
            height: ${cellWidth}px;
            background-size: ${cellWidth}px ${cellWidth}px;
            display: block;
            content: ' ';
        }
    `;
    // moved cells
    css += `
    ${selector} .${TR_PIECE_CLASS_NAME} td.${MOVED_CLASS_NAME}${CSS_PSEUDO_HIGHLIGHT} {
        ${svgCSS.moved()}
    }`;
    // selected pice
    css += `
    ${selector} .${TR_PIECE_CLASS_NAME} td.${SELECTED_CLASS_NAME}${CSS_PSEUDO_HIGHLIGHT} {
        ${svgCSS.selected()}
    }`;
    // can move
    css += `
    ${selector} .${TR_PIECE_CLASS_NAME} td.${CAN_MOVE_CLASS_NAME}${CSS_PSEUDO_HIGHLIGHT} {
        ${svgCSS.canMove()}
    }`;

    css += piecesImageBackground(selector);
    css += piecesImageBackground(p2pSelector, {
        color: PIECE_COLOR_BLACK,
        css: `path {
        transform-origin: center;
        transform: scaleY(-1);
     }`});

    appendCss(uniqueClassName, css);
}

function piecesImageBackground(selector: string, moreBG?: { css: string, color?: string }) {
    const moreCss: { [key: string]: string } = {
        [PIECE_COLOR_WHITE]: '',
        [PIECE_COLOR_BLACK]: '',
    };
    if (moreBG) {
        if (moreBG.color) {
            moreCss[moreBG.color] = moreBG.css;
        } else {
            moreCss[PIECE_COLOR_WHITE] = moreBG.css;
            moreCss[PIECE_COLOR_BLACK] = moreBG.css;
        }
    }
    let css = '';
    // Turn
    css += Piece.colorChars.map((color) => {
        return Piece.pieceChars.map((type) => {
            const attackedSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
                <style>
                    ${svgCSS.turn()}
                    ${moreCss[color]}
                </style>
                ${PIECES_SVG[color + type]}
            </svg>`;
            return `
                ${selector} .${TR_PIECE_CLASS_NAME} td.${PIECE_CLASS_NAME}.${TURN_CLASS_NAME}.type-${type}.color-${color}${CSS_PSEUDO_PIECE} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(attackedSVG)}');
                }
                `;
        }).join('');
    }).join('');
    // Attacked
    css += Piece.colorChars.map((color) => {
        return Piece.pieceChars.map((type) => {
            const attackedSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
                <style>
                    ${svgCSS.attacked()}
                    ${moreCss[color]}
                </style>
                ${PIECES_SVG[color + type]}
            </svg>`;
            const notAttackedSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
                <style>
                    ${svgCSS.notAttacked()}
                    ${moreCss[color]}
                </style>
                ${PIECES_SVG[color + type]}
            </svg>`;
            return `
                ${selector} .${TR_PIECE_CLASS_NAME} td.${PIECE_CLASS_NAME}.${ATTACKED_CLASS_NAME}.type-${type}.color-${color}${CSS_PSEUDO_PIECE} {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(attackedSVG)}');
                }
                ${selector} .${TR_PIECE_CLASS_NAME} td.${PIECE_CLASS_NAME}.type-${type}.color-${color}${CSS_PSEUDO_PIECE}
                , ${selector} .${TR_PIECE_SHADOW_CLASS_NAME} div.type-${type}.color-${color}{
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(notAttackedSVG)}');
                }
                `;
        }).join('');
    }).join('');
    return css;
}
