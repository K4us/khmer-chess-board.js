import KhmerChessBoard from './KhmerChessBoard';

describe('Greeter', () => {
    it('should greet', () => {
        spyOn(console, 'log');
        new KhmerChessBoard();
        expect(console.log).toHaveBeenCalled();
    });
});
