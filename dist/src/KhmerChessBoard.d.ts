import GraveyardManager from './GraveyardManager';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import OptionsManager from './OptionsManager';
import { KhmerChess, Move } from 'khmer-chess';
import MessageManager from './MessageManager';
import PlayerManager from './PlayerManager';
import PieceShadowManager from './PieceShadowManager';
export default class KhmerChessBoard {
    static title: string;
    static version: string;
    containerDom: HTMLElement;
    domBoard: HTMLElement;
    options: OptionsManager;
    playerManager: PlayerManager;
    graveyardManager: GraveyardManager;
    boardManager: BoardManager;
    khmerChess: KhmerChess;
    soundManager: SoundManager;
    messageManager: MessageManager;
    pieceShadowManager: PieceShadowManager;
    setOptions(options: {
        container: HTMLElement;
        width: number;
    }): void;
    move(fromIndex: number, toIndex: number): void;
    setFullScreen(isFullScreen: boolean): void;
    render(): void;
    setLocale(locale: string): void;
    setCellNote(): void;
    addAllDomCss(): void;
    loadRen(renStr: string): void;
    applyPieces(): void;
    removeAllDomElements(): void;
    removeAllDomCss(): void;
    destroy(): void;
    applyMove(move: Move): void;
    start(): void;
}
