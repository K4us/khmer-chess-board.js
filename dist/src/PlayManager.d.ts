import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import PlayManagerEventController from './event/PlayManagerEventController';
declare class MoveData {
    renData: string;
    dom: HTMLElement;
    constructor({ containerDom, renData, title, str, onClick }: {
        containerDom: HTMLElement;
        renData: string;
        title: string;
        str: string;
        onClick: Function;
    });
    get isCurrent(): boolean;
    current(b: boolean): void;
}
export default class PlayManager {
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    containerClassName: string;
    containerDom: HTMLElement;
    renDataList: MoveData[];
    playEventController: PlayManagerEventController<MoveData>;
    backBtnDom: HTMLElement;
    playBtnDom: HTMLElement;
    pauseBtnDom: HTMLElement;
    nextBtnDom: HTMLElement;
    constructor();
    setProps(khmerChessBoard: KhmerChessBoard): void;
    add(str: string, title: string): void;
    rendCurrent(): void;
    draw(playerContainer: HTMLElement): void;
    btnListen(): void;
    css(): string;
    undo(): void;
    stop(): void;
}
export {};
