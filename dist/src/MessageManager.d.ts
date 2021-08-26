import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class MessageManager {
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    containerClassName: string;
    messageClassName: string;
    domContainer: HTMLDivElement;
    domMessage: HTMLDivElement;
    setProps(khmerChessBoard: KhmerChessBoard): void;
    showMessage(message: string): void;
    hide(): void;
    draw(): void;
    css(): string;
}
