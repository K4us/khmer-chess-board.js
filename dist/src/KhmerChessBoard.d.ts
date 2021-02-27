import GraveyardManager from './GraveyardManager';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import OptionsManager from './OptionsManager';
import { KhmerChess, Move } from 'khmer-chess';
export default class KhmerChessBoard {
    static title: string;
    static version: string;
    container: HTMLDivElement;
    options: OptionsManager;
    graveyardManager: GraveyardManager;
    boardManager: BoardManager;
    khmerChess: KhmerChess;
    soundManager: SoundManager;
    setOptions(options: {
        container: HTMLDivElement;
        width: number;
    }): void;
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
}
