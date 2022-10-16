"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var appendCss_1 = __importDefault(require("./appendCss"));
var svg_1 = require("../providers/svg");
var constance_1 = require("../providers/constance");
function addCssNote(_a) {
    var uniqueClassName = _a.uniqueClassName, options = _a.options, isEnglish = _a.isEnglish;
    var tranIndex = function (i) {
        return isEnglish ? "" + i : khmer_chess_1.KhmerChess.toKhmerNum(i);
    };
    var horizontalLetters = isEnglish ? khmer_chess_1.HORIZONTAL_NOTE_LETTERS_ENGLISH : khmer_chess_1.HORIZONTAL_NOTE_LETTERS;
    var width = options.width, cellWidth = options.cellWidth;
    var selector = constance_1.CSS_TABLE_SELECTOR + "." + uniqueClassName;
    var css = '';
    var fSize = 15 * width / 600;
    for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
        var bgImg_1 = (0, svg_1.genBackgroundNote)([{
                x: cellWidth / 2 - cellWidth / 10,
                y: cellWidth,
                t: tranIndex(i),
            }], cellWidth, fSize);
        css += "\n        " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.GRAVEYARD_NOTE_PREFIX_CLASS + "-" + (i + 1) + constance_1.CSS_PSEUDO_NOTE + " {\n            background-image: " + bgImg_1 + ";\n        }\n        ";
    }
    var hx = cellWidth / 2 - cellWidth / 10;
    var vy = cellWidth / 2 + cellWidth / 10;
    var bgImg = function (i) { return (0, svg_1.genBackgroundNote)([{
            x: hx,
            y: cellWidth,
            t: horizontalLetters[i],
        }], cellWidth, fSize); };
    for (var i = 0; i < khmer_chess_1.ROW_NUMBER; i++) {
        css += "\n        " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-" + (i + 1) + constance_1.CSS_PSEUDO_NOTE + " {\n            background-image: " + bgImg(i) + ";\n        }\n        " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.FLIPPED_CLASS + "." + constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-" + (i + 1) + constance_1.CSS_PSEUDO_NOTE + " {\n            background-image: " + bgImg(khmer_chess_1.ROW_NUMBER - i - 1) + ";\n        }\n        ";
    }
    bgImg = function (i) { return (0, svg_1.genBackgroundNote)([{
            x: 0,
            y: vy,
            t: tranIndex(i),
        }], cellWidth, fSize); };
    for (var j = 0; j < khmer_chess_1.ROW_NUMBER; j++) {
        css += "\n            " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-" + (j + 1) + constance_1.CSS_PSEUDO_NOTE + " {\n                background-image: " + bgImg(j) + ";\n            }\n            " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + ".flipped." + constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-" + (j + 1) + constance_1.CSS_PSEUDO_NOTE + " {\n                background-image: " + bgImg(khmer_chess_1.ROW_NUMBER - j - 1) + ";\n            }\n            ";
    }
    bgImg = function (i) { return (0, svg_1.genBackgroundNote)([
        {
            x: hx,
            y: cellWidth,
            t: horizontalLetters[i],
        }, {
            x: 0,
            y: vy,
            t: tranIndex(i),
        },
    ], cellWidth, fSize); };
    css += "\n    " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-1." + constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-1" + constance_1.CSS_PSEUDO_NOTE + " {\n        background-image: " + bgImg(0) + ";\n    }\n    " + selector + " td" + (isEnglish ? '.' + options.enClass : '') + "." + constance_1.FLIPPED_CLASS + "." + constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-1." + constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-1" + constance_1.CSS_PSEUDO_NOTE + " {\n        background-image: " + bgImg(7) + ";\n    }\n    ";
    (0, appendCss_1.default)(uniqueClassName, css);
}
exports.default = addCssNote;
//# sourceMappingURL=addCssNote.js.map