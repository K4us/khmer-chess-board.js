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
import {
   PIECE_COLOR_BLACK,
   PIECE_COLOR_WHITE,
   PIECE_TYPE_BOAT,
   PIECE_TYPE_TRANSFORM_FISH,
   PIECE_TYPE_GENERAL,
   PIECE_TYPE_QUEEN,
   PIECE_TYPE_KING,
   PIECE_TYPE_HORSE,
   PIECE_TYPE_FISH,
} from 'khmer-chess';
import {
   boatSVG,
   fishSVG,
   generalSVG,
   horseSVG,
   kingSVG,
   queenSVG,
   transformFishSVG,
} from 'k4us-share';

export const WOOD_COLORS = {
   WHITE: '#ffffff',
   BLACK: '#422007',
};

const filterId = 'drop-shadow';
const SVG_FILTER = `<defs>
<filter id="${filterId}" height="130%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
  <feOffset dx="5" dy="5" result="offsetblur"/>
  <feMerge>
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
</defs>`;

boatSVG.init();
horseSVG.init();
generalSVG.init();
kingSVG.init();
queenSVG.init();
fishSVG.init();
transformFishSVG.init();

export const PIECES_SVG = {
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_BOAT}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${boatSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_HORSE}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${horseSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_GENERAL}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${generalSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_KING}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${kingSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_QUEEN}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${queenSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_FISH}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
    d="${fishSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_WHITE}${PIECE_TYPE_TRANSFORM_FISH}`]: `
    ${SVG_FILTER}
     <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})"
     d="${transformFishSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_BOAT}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${boatSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_HORSE}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${horseSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_GENERAL}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${generalSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_KING}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${kingSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_QUEEN}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${queenSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_FISH}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${fishSVG.pathData[0]}" />
 `,
   [`${PIECE_COLOR_BLACK}${PIECE_TYPE_TRANSFORM_FISH}`]: `
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})"
    d="${transformFishSVG.pathData[0]}" />
 `,
};

export const svgCSS = {
   attacked: (color?: string) => `path {
      stroke: red;
      stroke-width: 1px;
      stroke-linejoin: round;
      animation-name: attacking;
      animation-duration: 1s;
      animation-iteration-count: infinite;
   }
   @keyframes attacking {
      0% {
         stroke-width: 20px;
      }
      50% {
         stroke-width: 1px;
      }
      100% {
         stroke-width: 20px;
      }
   }`,
   notAttacked: (color?: string) => `path {
   }`,
   turn: (color?: string) => `path {
      stroke: #3d8a365f;
      stroke-width: 10px;
      stroke-linejoin: round;
   }
   `,
   selected: (color?: string) => 'background: radial-gradient(#ff00f577, #3d8a3677) !important;',
   moved: (color?: string) => 'background: radial-gradient(#c0aeee99, #94e9d788) !important;',
   canMove: (color?: string) => 'background: radial-gradient(#ff00f500, #3d8a3677) !important;',
};

type NoteText = {
   x: number,
   y: number,
   t: string
}
export function genBackgroundNote(tObjects: Array<NoteText>, cellWidth: number, fSize: number) {
   const text = tObjects.map((obj) => {
      return `<text x='${obj.x}' y='${obj.y}' fill='grey' font-size='${fSize}'>${obj.t}</text>`;
   }).join('');
   const svg = `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${cellWidth}px' width='${cellWidth}px'>
      ${text}
   </svg>`;
   return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
