import { ListenerType, EventHandler } from 'khmer-chess';
export default class PlayManagerEventController<T> extends EventHandler {
    static CLICK: string;
    static BLACK: string;
    static PLAY: string;
    static PAUSE: string;
    static NEXT: string;
    constructor();
    click(data: T): void;
    back(): void;
    play(): void;
    pause(): void;
    next(): void;
    addOnDataClickEventListener(listener: ListenerType<T>): void;
    removeOnDataClickEventListener(listener: ListenerType<T>): void;
    addOnBackEventListener(listener: ListenerType<T>): void;
    removeOnBackEventListener(listener: ListenerType<T>): void;
    addOnPlayEventListener(listener: ListenerType<T>): void;
    removeOnPlayEventListener(listener: ListenerType<T>): void;
    addOnPauseEventListener(listener: ListenerType<T>): void;
    removeOnPauseEventListener(listener: ListenerType<T>): void;
    addOnNextEventListener(listener: ListenerType<T>): void;
    removeOnNextEventListener(listener: ListenerType<T>): void;
}
