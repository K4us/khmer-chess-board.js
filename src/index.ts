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
export { default as KhmerChessBoard } from './KhmerChessBoard';
export { default as KhmerChessBoardComp } from './KhmerChessBoardComp';
export { BoardStatusEvent } from './event/BoardStatusEvent';
export { default as BoardManagerEventController } from './event/BoardManagerEventController';
export { default as BoardStatusEventController } from './event/BoardStatusEventController';
export { default as PlayManagerEventController } from './event/PlayManagerEventController';
export { default as MoveData } from './MoveData';
export { default as BoardManager } from './BoardManager';
export { default as OptionsManager } from './OptionsManager';
export { default as SoundManager } from './SoundManager';
export { default as CellManager } from './CellManager';
export { default as PieceShadowManager } from './PieceShadowManager';
export { default as GraveyardManager } from './GraveyardManager';
export { default as MessageManager } from './MessageManager';
export { default as PlayManager } from './PlayManager';

export * from 'khmer-chess';
export { KhmerChess } from 'khmer-chess';

import KhmerChessBoard from './KhmerChessBoard';
import { KhmerChess } from 'khmer-chess';

console.log(KhmerChess.title, KhmerChess.version);
console.log(KhmerChessBoard.title, KhmerChessBoard.version);
