"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var svg_1 = require("../providers/svg");
var constance_1 = require("../providers/constance");
var appendCss_1 = __importDefault(require("./appendCss"));
function addCss(_a) {
    var uniqueClassName = _a.uniqueClassName, options = _a.options;
    var width = options.width, cellWidth = options.cellWidth;
    var pieceFontSize = width / 12;
    var selector = constance_1.CSS_TABLE_SELECTOR + "." + uniqueClassName;
    var css = '';
    css += "\n        " + selector + " {\n            table-layout: fixed;\n            border-collapse: collapse;\n            border-spacing: 0px;\n            width: " + width + "px;\n            text-align: center;\n            border: 0px;\n            padding: 0px;\n            margin: auto;\n            background-color: #f4d1a6;\n        }\n        " + selector + "." + constance_1.POPUP_CLASS_NAME + " {\n            position: fixed;\n            box-shadow: 10px 10px 80px #000000, -10px -10px 80px #000000;\n        }\n        " + selector + " table." + constance_1.GRAVEYARD_CLASS_NAME + " {\n            table-layout: fixed;\n            border-collapse: collapse;\n            border-spacing: 0px;\n            text-align: center;\n            border: 0px;\n            padding: 0px;\n            margin: auto;\n            background-color: #ffc57d;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " {\n            width: " + width + "px;\n            height: " + cellWidth + "px;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_SHADOW_CLASS_NAME + " {\n            width: " + width + "px;\n            height: 0;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td {\n            user-select: none;\n            border: 1px solid #9e9e9e87;\n            padding: 0px;\n            margin: 0px;\n            max-width: " + cellWidth + "px;\n            max-height: " + cellWidth + "px;\n            background-repeat: no-repeat;\n            cursor: pointer;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_SHADOW_CLASS_NAME + " div {\n            width: " + cellWidth + "px;\n            height: " + cellWidth + "px;\n            position: absolute;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td,\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td::before,\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td::after {\n            font-size: " + pieceFontSize + "px;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td::after {\n            opacity: 0.4;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td::before {\n            float: left;\n        }\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td:not(.graveyard)::before,\n        " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td:not(.graveyard)::after {\n            width: " + cellWidth + "px;\n            height: " + cellWidth + "px;\n            background-size: " + cellWidth + "px " + cellWidth + "px;\n            display: block;\n            content: ' ';\n        }\n    ";
    // moved cells
    css += "\n    " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.MOVED_CLASS_NAME + constance_1.CSS_PSEUDO_HIGHLIGHT + " {\n        " + svg_1.svgCSS.moved() + "\n    }";
    // selected pice
    css += "\n    " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.SELECTED_CLASS_NAME + constance_1.CSS_PSEUDO_HIGHLIGHT + " {\n        " + svg_1.svgCSS.selected() + "\n    }";
    // can move
    css += "\n    " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.CAN_MOVE_CLASS_NAME + constance_1.CSS_PSEUDO_HIGHLIGHT + " {\n        " + svg_1.svgCSS.canMove() + "\n    }";
    // Turn
    khmer_chess_1.Piece.colorChars.forEach(function (color) {
        khmer_chess_1.Piece.pieceChars.forEach(function (type) {
            var attackedSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" viewBox=\"-10 0 1024 1000\">\n                <style>" + svg_1.svgCSS.turn() + "</style>\n                " + svg_1.PIECES_SVG[color + type] + "\n            </svg>";
            css += "\n                " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.PIECE_CLASS_NAME + "." + constance_1.TURN_CLASS_NAME + ".type-" + type + ".color-" + color + constance_1.CSS_PSEUDO_PIECE + " {\n                    background-image: url('data:image/svg+xml;utf8," + encodeURIComponent(attackedSVG) + "');\n                }\n                ";
        });
    });
    // Attacked
    khmer_chess_1.Piece.colorChars.forEach(function (color) {
        khmer_chess_1.Piece.pieceChars.forEach(function (type) {
            var attackedSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" viewBox=\"-10 0 1024 1000\">\n                <style>" + svg_1.svgCSS.attacked() + "</style>\n                " + svg_1.PIECES_SVG[color + type] + "\n            </svg>";
            var notAttackedSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" viewBox=\"-10 0 1024 1000\">\n                <style>" + svg_1.svgCSS.notAttacked() + "</style>\n                " + svg_1.PIECES_SVG[color + type] + "\n            </svg>";
            css += "\n                " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.PIECE_CLASS_NAME + "." + constance_1.ATTACKED_CLASS_NAME + ".type-" + type + ".color-" + color + constance_1.CSS_PSEUDO_PIECE + " {\n                    background-image: url('data:image/svg+xml;utf8," + encodeURIComponent(attackedSVG) + "');\n                }\n                " + selector + " ." + constance_1.TR_PIECE_CLASS_NAME + " td." + constance_1.PIECE_CLASS_NAME + ".type-" + type + ".color-" + color + constance_1.CSS_PSEUDO_PIECE + "\n                , " + selector + " ." + constance_1.TR_PIECE_SHADOW_CLASS_NAME + " div.type-" + type + ".color-" + color + "{\n                    background-image: url('data:image/svg+xml;utf8," + encodeURIComponent(notAttackedSVG) + "');\n                }\n                ";
        });
    });
    (0, appendCss_1.default)(uniqueClassName, css);
}
exports.default = addCss;
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
//# sourceMappingURL=addCss.js.map