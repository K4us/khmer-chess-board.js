import React from 'react';
import KhmerChessBoard from './KhmerChessBoard';

export type Options = {
    isSoundEnabled?: boolean;
    isQuickMove?: boolean;
    isLogging?: boolean;
};
export type Props = Options & {
    width: number;
    load: (_: KhmerChessBoard) => void,
};

export default class KhmerChessBoardComp extends React.Component<Props> {
    static version = KhmerChessBoard.version;
    myRef: React.RefObject<HTMLDivElement>;
    khmerChessBoard: KhmerChessBoard | null = null;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    setBoardOptions(options: Options) {
        if (this.khmerChessBoard === null) {
            return;
        }
        const khmerChessBoard = this.khmerChessBoard;
        khmerChessBoard.pieceShadowManager.quickMove(!!options.isQuickMove);
        if (options.isSoundEnabled) {
            khmerChessBoard.soundManager.enable();
        }
        if (options.isLogging) {
            khmerChessBoard.boardManager.addBoardStatusEventListener((boardStatusEvent) => {
                console.log(boardStatusEvent.message);
            });
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setBoardOptions(nextProps);
    }

    componentDidMount() {
        const { props } = this;
        const container = this.myRef.current;
        const khmerChessBoard = new KhmerChessBoard();
        this.khmerChessBoard = khmerChessBoard;
        khmerChessBoard.setOptions({
            width: props.width,
            container,
        });
        this.setBoardOptions(props);
        props.load(khmerChessBoard);
    }

    componentWillUnmount() {
        this.khmerChessBoard?.destroy();
        this.khmerChessBoard = null;
    }

    render() {
        return <div className='kcb-container' ref={this.myRef} />;
    }
}
