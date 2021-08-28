import KhmerChessBoard from "../KhmerChessBoard";

export const capturing = {
    renStr: "BHGKQ2B/4GH2/TFFF1FFF/4F3/5f2/6f1/2qg2b1/bhgk2h1 w ---- -- -.- ffffff",
    fromIndex: 28,
    toIndex: 37,
};

export const attacking = {
    renStr: "BHGKQ2B/4G3/TFFFFFFF/6h1/2H5/5ff1/2qg2b1/bhgk4 w ---- -- -.- ffffff",
    fromIndex: 34,
    toIndex: 44,
};

export const init = (kcb: KhmerChessBoard) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    kcb.setOptions({
        width: 600,
        container
    });
    kcb.pieceShadowManager.enableQuickMove();
    kcb.start();
    kcb.messageManager.disableLog();
};

export const reset = (kcb: KhmerChessBoard) => {
    kcb.pieceShadowManager.enableQuickMove();
    kcb.setFullScreen(false);
    kcb.reset();
    kcb.start();
};