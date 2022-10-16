import React from 'react';
import KhmerChessBoard from './KhmerChessBoard';
export declare type Options = {
    isSoundEnabled?: boolean;
    isQuickMove?: boolean;
    isLogging?: boolean;
};
export declare type Props = Options & {
    width: number;
    load: (_: KhmerChessBoard) => void;
};
export default class KhmerChessBoardComp extends React.Component<Props> {
    static version: string;
    myRef: React.RefObject<HTMLDivElement>;
    khmerChessBoard: KhmerChessBoard | null;
    constructor(props: any);
    setBoardOptions(options: Options): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
