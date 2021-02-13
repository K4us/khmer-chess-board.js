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

/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */
"use strict";

const COLUMN_NUMBER = 8;
const BORDER_WIDTH = 1
const MIN_SQUARE_WIDTH = 5
const TD_GRAVEYARD_NUMBER = 30;
const HORIZONTAL_CODE_LETTERS = 'abcdefgh';
const TABLE_CLASS = 'khmer-chess-board';

const COLORS = {
    PIECE_COLOR_WHITE: "w",
    PIECE_COLOR_BLACK: "b",
};
const WOOD_COLORS = {
    WHITE: '#ffffff',
    BLACK: '#422007',
}
const toWhite = (c) => {
    return c.toUpperCase();
}
const TYPES = {
    PIECE_TYPE_TOUK: "b", // Boat
    PIECE_TYPE_SES: "h", // Horse
    PIECE_TYPE_KOL: "g", // General
    PIECE_TYPE_SDECH: "k", // King
    PIECE_TYPE_NEANG: "q", // Queen
    PIECE_TYPE_TREY: "f", // Fish
    PIECE_TYPE_BORK: "t", // Transform fish
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
const PIECES_SVG = {
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_TOUK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_SES}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_KOL}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_SDECH}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_NEANG}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_TREY}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_WHITE}${TYPES.PIECE_TYPE_BORK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.WHITE}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_TOUK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_SES}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_KOL}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_SDECH}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_NEANG}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_TREY}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
    [`${COLORS.PIECE_COLOR_BLACK}${TYPES.PIECE_TYPE_BORK}`]: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1024 1000">
    ${SVG_FILTER}
    <path fill="${WOOD_COLORS.BLACK}" filter="url(#${filterId})" 
 d="M507 417c145 0 265 39 283 89c1 2 2 5 2 8v1v3v4v172v3v2v2c0 2 0 4 -1 6h-1c-15 51 -135 92 -283 92c-146 0 -266 -39 -283 -90c-1 -2 -2 -5 -2 -8v-3v-1v-1v-176v-2v-1v-3c0 -3 1 -6 2 -8c17 -50 138 -89 283 -89zM507 443c-127 0 -231 31 -240 70v1v10
 c9 39 114 70 240 70s229 -30 239 -69v-11l1 -1c-9 -39 -114 -70 -240 -70zM504 473h1h2c99 0 180 20 180 45s-81 46 -180 46s-180 -21 -180 -46s79 -45 177 -45zM267 573v117c13 8 28 15 45 22c51 19 120 31 195 31s144 -12 195 -31c17 -6 31 -14 44 -22v-116
 c-51 28 -138 46 -239 46s-189 -19 -240 -47z" />
 </svg>
 `,
};

class Piece {
    type = TYPES.PIECE_TYPE_TREY;
    color = COLORS.PIECE_COLOR_WHITE;
    get pCode() {
        if (this.color == COLORS.PIECE_COLOR_WHITE) {
            return this.type.toUpperCase();
        }
        return this.type;
    }
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
}
class SquarePiece {
    x = 0;
    y = 0;
    get h() {
        if (this.isGraveyard) {
            return `${this.x}x`;
        }
        return HORIZONTAL_CODE_LETTERS[this.x];
    }
    get v() {
        return this.y + 1;
    }
    get index() {
        return this.y * COLUMN_NUMBER + this.x;
    }
    get indexCode() {
        return `${this.h}${this.v}`;
    }
    isGraveyard = false;
    container = document.createElement('td');
    piece = null;
    constructor(x, y, container, piece, isGraveyard) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.setPiece(piece);
        this.isGraveyard = isGraveyard;
    }
    removePiece() {
        this.setPiece(null);
    }
    setPiece(piece) {
        this.piece = piece;
        this.drawPiece();
    }
    drawPiece() {
        this.container.classList.remove('piece');
        if (this.piece) {
            this.container.classList.add('piece');
            this.container.classList.add(`type-${this.piece.type}`);
            this.container.classList.add(`color-${this.piece.color}`);
        }
    }
}
class Graveyard {
    squares = [];
    push(squarePiece) {
        this.squares.push(squarePiece);
    }
    get(index) {
        return this.squares[index];
    }
}

class KhmerChessBoard {
    options = {
        width: 500,
        container: null
    };
    squares = [];
    squaresIndex = {};
    graveyard = new Graveyard();
    khmerChess = null;
    constructor(options = {}) {
        if (!options.khmerChess) {
            throw new Error('Khmer chess engin is required check https://github.com/K4us/khmer-chess.js#readme');
        }
        this.khmerChess = options.khmerChess;
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.options.container = options.container;

        const minWidth = (COLUMN_NUMBER - 1) * BORDER_WIDTH + COLUMN_NUMBER * MIN_SQUARE_WIDTH;
        if (options.width < minWidth) {
            throw new Error(`Board width must more than ${minWidth}`);
        }
        if (options.width) {
            this.options.width = options.width;
        }

        this.addCss();
        this.drawBoard();
        this.renderKhmerChess();
    }
    addCss() {
        const squareWidth = this._squareWidth();
        const pieceFontSize = this.options.width / 12;

        let css = `
          table.${TABLE_CLASS}  {
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            width: ${this.options.width}px;
            height: ${this.options.width}px;
            text-align: center;
            border: 0px;
            padding: 0px;
            margin: auto;
            background-color: white;
          }
          table.${TABLE_CLASS} tr {
            width: ${this.options.width}px;
            height: ${squareWidth}px;
          }
          table.${TABLE_CLASS} td {
            user-select: none;
            background-color: #f4d1a6;
            border: 1px solid white;
            padding: 0px;
            margin: 0px;
            max-width: ${squareWidth}px;
            max-height: ${squareWidth}px;
          }
          table.${TABLE_CLASS} td, table.${TABLE_CLASS} td::before {
            font-size: ${pieceFontSize}px;
          }
          table.${TABLE_CLASS} td.piece::before {
            width: ${squareWidth}px;
            height: ${squareWidth}px;
            background-size: ${squareWidth}px ${squareWidth}px;
            display: block;
            content: ' ';
          }
        `;
        Object.values(COLORS).forEach((color) => {
            Object.values(TYPES).forEach((type) => {
                css += `
                table.${TABLE_CLASS} td.piece.type-${type}.color-${color}::before {
                    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(PIECES_SVG[color + type])}');
                }
                  `;
            });
        });

        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    drawBoard() {
        const squareWidth = this._squareWidth();

        const createTable = (parent = this.options.container) => {
            const table = document.createElement('table');
            table.classList.add(TABLE_CLASS);
            parent.appendChild(table);
            return table;
        }
        const createTbody = (parent) => {
            const tbody = document.createElement('tbody');
            parent.appendChild(tbody);
            return tbody;
        }
        const createTr = (parent) => {
            const tr = document.createElement('tr');
            parent.appendChild(tr);
            return tr;
        }
        const createTd = (parent) => {
            const td = document.createElement('td');
            parent.appendChild(td);
            return td;
        }
        const createDiv = (parent) => {
            const div = document.createElement('div');
            div.style.width = squareWidth;
            div.style.height = squareWidth;
            div.style.fontSize = this.options.width / 12;
            div.innerText = 't';
            parent.appendChild(div);
            return
        }

        const table = createTable();
        const tbody = createTbody(table);

        for (let i = 0; i < COLUMN_NUMBER; i++) {
            const tr = createTr(tbody);
            for (let j = 0; j < COLUMN_NUMBER; j++) {
                const td = createTd(tr);
                td.style.cursor = 'pointer';
                const piece = new Piece(TYPES.PIECE_TYPE_TREY, COLORS.PIECE_COLOR_WHITE);
                const squarePiece = new SquarePiece(j, COLUMN_NUMBER - i - 1, td, piece);
                this.squaresIndex[squarePiece.indexCode] = squarePiece;
            }
        }
        Object.keys(this.squaresIndex).forEach((key) => {
            this.squares[this.squaresIndex[key].index] = this.squaresIndex[key];
        });

        const graveyardContainerHeight = squareWidth + 10 * BORDER_WIDTH;
        table.style.height += graveyardContainerHeight;
        const trGraveyardContainer = createTr(tbody);
        trGraveyardContainer.style.height = graveyardContainerHeight;
        const tdGraveyardContainer = createTd(trGraveyardContainer);
        tdGraveyardContainer.style.width = this.options.width;
        tdGraveyardContainer.style.height = graveyardContainerHeight;
        tdGraveyardContainer.style.overflowX = 'scroll';
        tdGraveyardContainer.style.overflowY = 'hidden';
        tdGraveyardContainer.colSpan = 8;
        tdGraveyardContainer.style.padding = 8 * BORDER_WIDTH * this.options.width / 600;
        tdGraveyardContainer.style.boxShadow = `inset 0 0 ${this.options.width / 60}px #000000`;
        const tableGraveyard = createTable(tdGraveyardContainer);
        const graveyardWidth = BORDER_WIDTH * (TD_GRAVEYARD_NUMBER - 1) + squareWidth * TD_GRAVEYARD_NUMBER;
        tableGraveyard.style.width = graveyardWidth;
        tableGraveyard.style.height = squareWidth;
        const tbodyGraveyard = createTbody(tableGraveyard);
        const trGraveyard = createTr(tbodyGraveyard);
        trGraveyard.style.width = graveyardWidth;

        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const tdGraveyard = createTd(trGraveyard);
            const squarePiece = new SquarePiece(i, 0, tdGraveyard, null, true);
            this.graveyard.push(squarePiece);
        }

        this._addNote();
    };
    _addNote() {
        const squareWidth = this._squareWidth();
        const fSize = 15 * this.options.width / 600;

        const addBackground = (target, tObjects = []) => {
            let bgImg = `url("data:image/svg+xml;utf8,`;
            bgImg += `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${squareWidth}px' width='${squareWidth}px'>`;

            tObjects.forEach((obj) => {
                bgImg += `<text x='${obj.x}' y='${obj.y}' `;
                bgImg += `fill='white' font-size='${fSize}'>${obj.t}</text>`;
            })

            bgImg += `</svg>")`;
            target.style.backgroundImage = bgImg;
            target.style.backgroundRepeat = 'no-repeat';
        }

        const square = this.squaresIndex['a1'];
        addBackground(square.container, [
            {
                x: squareWidth / 2 - squareWidth / 10,
                y: squareWidth,
                t: 'a'
            }, {
                x: 0,
                y: squareWidth / 2 + squareWidth / 10,
                t: '1'
            }
        ]);
        square.container.style.backgroundRepeat = 'no-repeat';
        for (let i = 1; i < COLUMN_NUMBER; i++) {
            const c = HORIZONTAL_CODE_LETTERS[i];
            const square = this.squaresIndex[`${c}1`];
            addBackground(square.container, [{
                x: squareWidth / 2 - squareWidth / 10,
                y: squareWidth,
                t: c
            }]);
        }
        for (let i = 1; i < COLUMN_NUMBER; i++) {
            const square = this.squaresIndex[`a${i + 1}`];
            addBackground(square.container, [{
                x: 0,
                y: squareWidth / 2 + squareWidth / 10,
                t: i + 1
            }]);
        }

        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const square = this.graveyard.get(i);
            addBackground(square.container, [{
                x: squareWidth / 2 - squareWidth / 10,
                y: squareWidth,
                t: i + 1
            }]);
        }
    }
    _squareWidth() {
        const squareWidth = (this.options.width - (COLUMN_NUMBER - 1) * BORDER_WIDTH) / COLUMN_NUMBER;
        return squareWidth;
    }
    renderKhmerChess() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const square = this.graveyard.get(i);
            square.removePiece();
        }
        this.khmerChess.renInstance.graveyard.pieces.forEach((p, i) => {
            const square = this.graveyard.get(i);
            square.setPiece(new Piece(p.type, p.color));
        });
        this.khmerChess.board().forEach((arr, i) => {
            arr.forEach((p, j) => {
                const square = this.squares[i * COLUMN_NUMBER + j];
                square.removePiece();
                if (p) {
                    square.setPiece(new Piece(p.type, p.color));
                }
            });
        });
    }
}