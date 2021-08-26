import BoardManager from '../BoardManager';
import GraveyardManager from '../GraveyardManager';
import OptionsManager from '../OptionsManager';
declare type Type = {
    uniqueClassName: string;
    options: OptionsManager;
    container: HTMLElement;
    boardManager: BoardManager;
    graveyardManager: GraveyardManager;
};
export default function drawBoardAndGraveyard({ uniqueClassName, options, container, boardManager, graveyardManager }: Type): {
    domBoard: HTMLTableElement;
    domGraveyard: HTMLTableElement;
    playerContainer: HTMLTableDataCellElement;
    tdShadow: HTMLTableDataCellElement;
};
export {};
