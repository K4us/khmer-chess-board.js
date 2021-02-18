import BoardManager from './BoardManager';
import GraveyardManager from './GraveyardManager';
import Options from './Options';
declare type Type = {
    uniqueClassName: string;
    options: Options;
    container: HTMLElement;
    boardManager: BoardManager;
    graveyardManager: GraveyardManager;
};
export default function drawBoardAndGraveyard({ uniqueClassName, options, container, boardManager, graveyardManager }: Type): void;
export {};
