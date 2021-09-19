export default class OptionsManager {
    _width: number;
    isFullScreen: boolean;
    uniqueClassName: string;
    isEnglish: boolean;
    constructor();
    get width(): number;
    get enClass(): string;
    getScaleFit(btr: ClientRect): number;
    set width(width: number);
    get cellWidth(): number;
    get graveyardContainerHeight(): number;
    get minWidth(): number;
    get graveyardWidth(): number;
    get graveyardContainerPadding(): number;
    get borderWidth(): number;
}
