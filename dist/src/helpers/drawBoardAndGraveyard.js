"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var CellManager_1 = __importDefault(require("../CellManager"));
var constance_1 = require("../providers/constance");
function drawBoardAndGraveyard(_a) {
    var uniqueClassName = _a.uniqueClassName, options = _a.options, container = _a.container, boardManager = _a.boardManager, graveyardManager = _a.graveyardManager;
    var width = options.width, cellWidth = options.cellWidth, graveyardContainerHeight = options.graveyardContainerHeight, graveyardWidth = options.graveyardWidth;
    var createTable = function (parent) {
        if (parent === void 0) { parent = container; }
        var table = document.createElement('table');
        parent.appendChild(table);
        return table;
    };
    var createTbody = function (parent) {
        var tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        return tbody;
    };
    var createTr = function (parent) {
        var tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
    };
    var createTd = function (parent) {
        var td = document.createElement('td');
        parent.appendChild(td);
        return td;
    };
    var table = createTable();
    table.classList.add(constance_1.TABLE_CLASS);
    table.classList.add(uniqueClassName);
    var tbody = createTbody(table);
    for (var i = 0; i < khmer_chess_1.ROW_NUMBER; i++) {
        var tr_1 = createTr(tbody);
        tr_1.classList.add(constance_1.TR_PIECE_CLASS_NAME);
        for (var j = 0; j < khmer_chess_1.ROW_NUMBER; j++) {
            var td = createTd(tr_1);
            var cell = new CellManager_1.default(boardManager.khmerChessBoard, new khmer_chess_1.Point(j, khmer_chess_1.ROW_NUMBER - i - 1), td, null);
            var index = khmer_chess_1.Point.xyToIndex(j, khmer_chess_1.ROW_NUMBER - i - 1);
            boardManager.set(index, cell);
        }
    }
    var tr = createTr(tbody);
    tr.classList.add(constance_1.TR_PIECE_SHADOW_CLASS_NAME);
    var tdShadow = createTd(tr);
    var trPlayerContainer = createTr(tbody);
    trPlayerContainer.classList.add('tr-player');
    var tdPlayerContainer = createTd(trPlayerContainer);
    tdPlayerContainer.classList.add('player');
    tdPlayerContainer.colSpan = 8;
    var trGraveyardContainer = createTr(tbody);
    trGraveyardContainer.classList.add(constance_1.TR_GRAVEYARD_CLASS_NAME);
    trGraveyardContainer.style.height = "" + graveyardContainerHeight;
    var tdGraveyardContainer = createTd(trGraveyardContainer);
    tdGraveyardContainer.classList.add('graveyard');
    tdGraveyardContainer.colSpan = 8;
    var div = document.createElement('div');
    div.style.overflowX = 'scroll';
    div.style.overflowY = 'hidden';
    tdGraveyardContainer.appendChild(div);
    var tableGraveyard = createTable(div);
    tableGraveyard.classList.add(constance_1.GRAVEYARD_CLASS_NAME);
    tableGraveyard.style.width = "" + graveyardWidth;
    tableGraveyard.style.height = "" + cellWidth;
    tableGraveyard.style.boxShadow = "inset 0 0 " + width / 60 + "px #000000";
    var tbodyGraveyard = createTbody(tableGraveyard);
    var trGraveyard = createTr(tbodyGraveyard);
    trGraveyard.classList.add(constance_1.TR_PIECE_CLASS_NAME);
    trGraveyard.style.width = "" + graveyardWidth;
    for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
        var tdGraveyard = createTd(trGraveyard);
        var cell = new CellManager_1.default(graveyardManager.khmerChessBoard, new khmer_chess_1.Point(i, 0), tdGraveyard, null, true);
        graveyardManager.push(cell);
    }
    return {
        domRootBoard: table,
        domGraveyard: tableGraveyard,
        playerContainer: tdPlayerContainer,
        tdShadow: tdShadow,
    };
}
exports.default = drawBoardAndGraveyard;
//# sourceMappingURL=drawBoardAndGraveyard.js.map