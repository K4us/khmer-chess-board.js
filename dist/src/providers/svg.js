"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.genBackgroundNote = exports.svgCSS = exports.PIECES_SVG = exports.WOOD_COLORS = void 0;
var khmer_chess_1 = require("khmer-chess");
var types_1 = require("k4us-share/types");
exports.WOOD_COLORS = {
    WHITE: '#ffffff',
    BLACK: '#422007',
};
var filterId = 'drop-shadow';
var SVG_FILTER = "<defs>\n<filter id=\"" + filterId + "\" height=\"130%\">\n  <feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"5\"/>\n  <feOffset dx=\"5\" dy=\"5\" result=\"offsetblur\"/>\n  <feMerge>\n    <feMergeNode/>\n    <feMergeNode in=\"SourceGraphic\"/>\n  </feMerge>\n</filter>\n</defs>";
types_1.boatSVG.init();
types_1.horseSVG.init();
types_1.generalSVG.init();
types_1.kingSVG.init();
types_1.queenSVG.init();
types_1.fishSVG.init();
types_1.transformFishSVG.init();
exports.PIECES_SVG = (_a = {},
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_BOAT] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.boatSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_HORSE] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.horseSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_GENERAL] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.generalSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_KING] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.kingSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_QUEEN] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.queenSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_FISH] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.fishSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_WHITE + khmer_chess_1.PIECE_TYPE_TRANSFORM_FISH] = "\n    " + SVG_FILTER + "\n     <path fill=\"" + exports.WOOD_COLORS.WHITE + "\" filter=\"url(#" + filterId + ")\"\n     d=\"" + types_1.transformFishSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_BOAT] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.boatSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_HORSE] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.horseSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_GENERAL] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.generalSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_KING] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.kingSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_QUEEN] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.queenSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_FISH] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.fishSVG.pathData[0] + "\" />\n ",
    _a["" + khmer_chess_1.PIECE_COLOR_BLACK + khmer_chess_1.PIECE_TYPE_TRANSFORM_FISH] = "\n    " + SVG_FILTER + "\n    <path fill=\"" + exports.WOOD_COLORS.BLACK + "\" filter=\"url(#" + filterId + ")\"\n    d=\"" + types_1.transformFishSVG.pathData[0] + "\" />\n ",
    _a);
exports.svgCSS = {
    attacked: function (color) { return "path {\n      stroke: red;\n      stroke-width: 1px;\n      stroke-linejoin: round;\n      animation-name: attacking;\n      animation-duration: 1s;\n      animation-iteration-count: infinite;\n   }\n   @keyframes attacking {\n      0% {\n         stroke-width: 20px;\n      }\n      50% {\n         stroke-width: 1px;\n      }\n      100% {\n         stroke-width: 20px;\n      }\n   }"; },
    notAttacked: function (color) { return "path {\n   }"; },
    turn: function (color) { return "path {\n      stroke: #3d8a365f;\n      stroke-width: 10px;\n      stroke-linejoin: round;\n   }\n   "; },
    selected: function (color) { return 'background: radial-gradient(#ff00f577, #3d8a3677) !important;'; },
    moved: function (color) { return 'background: radial-gradient(#c0aeee99, #94e9d788) !important;'; },
    canMove: function (color) { return 'background: radial-gradient(#ff00f500, #3d8a3677) !important;'; },
};
function genBackgroundNote(tObjects, cellWidth, fSize) {
    var text = tObjects.map(function (obj) {
        return "<text x='" + obj.x + "' y='" + obj.y + "' fill='grey' font-size='" + fSize + "'>" + obj.t + "</text>";
    }).join('');
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='" + cellWidth + "px' width='" + cellWidth + "px'>\n      " + text + "\n   </svg>";
    return "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg) + "\")";
}
exports.genBackgroundNote = genBackgroundNote;
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
//# sourceMappingURL=svg.js.map