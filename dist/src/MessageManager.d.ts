import KhmerChessBoard from './KhmerChessBoard';
export default class MessageManager {
    khmerChessBoard: KhmerChessBoard;
    domContainer: HTMLDivElement;
    domMessage: HTMLDivElement;
    containerClassName: string;
    messageClassName: string;
    logEnabled: boolean;
    constructor(khmerChessBoard: KhmerChessBoard);
    destroy(): void;
    enableLog(): void;
    disableLog(): void;
    log(message?: any, ...optionalParams: any[]): void;
    showMessage(message: string): void;
    hide(): void;
    draw(): void;
    css(): string;
}
