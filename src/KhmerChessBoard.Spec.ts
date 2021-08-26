import KhmerChessBoard from "./KhmerChessBoard";

describe("KhmerChessBoard", function () {
    let kcb: KhmerChessBoard = null;

    beforeAll(() => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        kcb = new KhmerChessBoard();
        kcb.setOptions({
            width: 600,
            container
        });
    });

    it('should be function', () => {
        expect(typeof KhmerChessBoard).toEqual('function');
    });

    it('should has class', () => {
        expect(typeof kcb.options.uniqueClassName).toEqual('string');
    });

    it('should ', () => {
        const cell = kcb.boardManager.get(0);
        expect(cell.isSelected).toEqual(false);
    });
});