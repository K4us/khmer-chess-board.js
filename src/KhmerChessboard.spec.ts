import KhmerChessBoard from './KhmerChessboard';

describe('Greeter', () => {
    it('should greet', () => {
        spyOn(console, 'log');
        new KhmerChessBoard();
        expect(console.log).toHaveBeenCalled();
    });
});
