export default class MoveData {
    index: number;
    renData: string;
    dom: HTMLElement;
    constructor({ index, containerDom, renData, title, str, onClick }: {
        index: number;
        containerDom: HTMLElement;
        renData: string;
        title: string;
        str: string;
        onClick: Function;
    });
    get isCurrent(): boolean;
    current(b: boolean): void;
    destroy(): void;
}
