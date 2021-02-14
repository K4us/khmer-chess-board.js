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
 *----------------------------------------------------------------------------*/

'use strict';

const { boardHelper } = require('khmer-chess');

const WOOD_COLORS = {
   WHITE: '#ffffff',
   BLACK: '#422007',
}

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
const PIECES_SVG = {
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_TOUK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_SES}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_KOL}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_SDECH}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_NEANG}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_TREY}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_WHITE}${boardHelper.PIECE_TYPE_BORK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_TOUK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_SES}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_KOL}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_SDECH}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_NEANG}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_TREY}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
   [`${boardHelper.PIECE_COLOR_BLACK}${boardHelper.PIECE_TYPE_BORK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
};

function addBackgroundNote(target, tObjects = [], squareWidth, fSize) {
   let bgImg = `url("data:image/svg+xml;utf8,`;
   bgImg += `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${squareWidth}px' width='${squareWidth}px'>`;

   tObjects.forEach((obj) => {
      bgImg += `<text x='${obj.x}' y='${obj.y}' `;
      bgImg += `fill='white' font-size='${fSize}'>${obj.t}</text>`;
   })

   bgImg += `</svg>")`;
   target.style.backgroundImage = bgImg;
}

module.exports = {
   PIECES_SVG,
   addBackgroundNote,
};