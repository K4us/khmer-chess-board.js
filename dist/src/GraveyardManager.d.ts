import { KhmerChess } from 'khmer-chess';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
import OptionsManager from './OptionsManager';
export default class GraveyardManager {
    _cells: CellManager[];
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    options: OptionsManager;
    domGraveyard: HTMLElement;
    setProps(khmerChessBoard: KhmerChessBoard): void;
    setDom(domGraveyard: HTMLElement): void;
    push(cell: CellManager): void;
    get(index: number): CellManager;
    setCellNote(): void;
    clearCellNote(): void;
    removePiecesFromCells(): void;
    applyPiecesFromKhmerChess(): void;
    renderKhmerChessPieces(): void;
}
