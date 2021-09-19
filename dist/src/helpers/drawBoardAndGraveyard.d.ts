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
    domRootBoard: HTMLTableElement;
    domGraveyard: HTMLTableElement;
    playerContainer: HTMLTableCellElement;
    tdShadow: HTMLTableCellElement;
};
export {};
