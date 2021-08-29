import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class MessageManager {
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    containerClassName: string;
    messageClassName: string;
    domContainer: HTMLDivElement;
    domMessage: HTMLDivElement;
    logEnabled: boolean;
    enableLog(): void;
    disableLog(): void;
    log(message?: any, ...optionalParams: any[]): void;
    setProps(khmerChessBoard: KhmerChessBoard): void;
    showMessage(message: string): void;
    hide(): void;
    draw(): void;
    css(): string;
}
