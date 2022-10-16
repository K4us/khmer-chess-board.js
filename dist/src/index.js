"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhmerChess = exports.PlayManager = exports.MessageManager = exports.GraveyardManager = exports.PieceShadowManager = exports.CellManager = exports.SoundManager = exports.OptionsManager = exports.BoardManager = exports.MoveData = exports.PlayManagerEventController = exports.BoardStatusEventController = exports.BoardManagerEventController = exports.BoardStatusEvent = exports.KhmerChessBoardComp = exports.KhmerChessBoard = void 0;
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
var KhmerChessBoard_1 = require("./KhmerChessBoard");
Object.defineProperty(exports, "KhmerChessBoard", { enumerable: true, get: function () { return __importDefault(KhmerChessBoard_1).default; } });
var KhmerChessBoardComp_1 = require("./KhmerChessBoardComp");
Object.defineProperty(exports, "KhmerChessBoardComp", { enumerable: true, get: function () { return __importDefault(KhmerChessBoardComp_1).default; } });
var BoardStatusEvent_1 = require("./event/BoardStatusEvent");
Object.defineProperty(exports, "BoardStatusEvent", { enumerable: true, get: function () { return BoardStatusEvent_1.BoardStatusEvent; } });
var BoardManagerEventController_1 = require("./event/BoardManagerEventController");
Object.defineProperty(exports, "BoardManagerEventController", { enumerable: true, get: function () { return __importDefault(BoardManagerEventController_1).default; } });
var BoardStatusEventController_1 = require("./event/BoardStatusEventController");
Object.defineProperty(exports, "BoardStatusEventController", { enumerable: true, get: function () { return __importDefault(BoardStatusEventController_1).default; } });
var PlayManagerEventController_1 = require("./event/PlayManagerEventController");
Object.defineProperty(exports, "PlayManagerEventController", { enumerable: true, get: function () { return __importDefault(PlayManagerEventController_1).default; } });
var MoveData_1 = require("./MoveData");
Object.defineProperty(exports, "MoveData", { enumerable: true, get: function () { return __importDefault(MoveData_1).default; } });
var BoardManager_1 = require("./BoardManager");
Object.defineProperty(exports, "BoardManager", { enumerable: true, get: function () { return __importDefault(BoardManager_1).default; } });
var OptionsManager_1 = require("./OptionsManager");
Object.defineProperty(exports, "OptionsManager", { enumerable: true, get: function () { return __importDefault(OptionsManager_1).default; } });
var SoundManager_1 = require("./SoundManager");
Object.defineProperty(exports, "SoundManager", { enumerable: true, get: function () { return __importDefault(SoundManager_1).default; } });
var CellManager_1 = require("./CellManager");
Object.defineProperty(exports, "CellManager", { enumerable: true, get: function () { return __importDefault(CellManager_1).default; } });
var PieceShadowManager_1 = require("./PieceShadowManager");
Object.defineProperty(exports, "PieceShadowManager", { enumerable: true, get: function () { return __importDefault(PieceShadowManager_1).default; } });
var GraveyardManager_1 = require("./GraveyardManager");
Object.defineProperty(exports, "GraveyardManager", { enumerable: true, get: function () { return __importDefault(GraveyardManager_1).default; } });
var MessageManager_1 = require("./MessageManager");
Object.defineProperty(exports, "MessageManager", { enumerable: true, get: function () { return __importDefault(MessageManager_1).default; } });
var PlayManager_1 = require("./PlayManager");
Object.defineProperty(exports, "PlayManager", { enumerable: true, get: function () { return __importDefault(PlayManager_1).default; } });
__exportStar(require("khmer-chess"), exports);
var khmer_chess_1 = require("khmer-chess");
Object.defineProperty(exports, "KhmerChess", { enumerable: true, get: function () { return khmer_chess_1.KhmerChess; } });
var KhmerChessBoard_2 = __importDefault(require("./KhmerChessBoard"));
var khmer_chess_2 = require("khmer-chess");
console.log(khmer_chess_2.KhmerChess.title, khmer_chess_2.KhmerChess.version);
console.log(KhmerChessBoard_2.default.title, KhmerChessBoard_2.default.version);
//# sourceMappingURL=index.js.map