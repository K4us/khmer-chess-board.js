import GraveyardManager from './GraveyardManager';
import khmerChess from 'khmer-chess';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import Options from './Options';
export default class KhmerChessBoard {
    static title: any;
    static version: any;
    options: Options;
    container: HTMLDivElement;
    graveyardManager: GraveyardManager;
    boardManager: BoardManager;
    soundManager: SoundManager;
    khmerChess: khmerChess.KhmerChess;
    setOptions(options: {
        container: HTMLDivElement;
        width: number;
    }): void;
    setFullScreen(isFullScreen: boolean): void;
    render(): void;
    addAllDomCss(): void;
    loadRen(renStr: string): void;
    applyPieces(): void;
    removeAllDomElements(): void;
    removeAllDomCss(): void;
    destroy(): void;
}
