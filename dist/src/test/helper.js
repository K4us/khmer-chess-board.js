"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.init = exports.attacking = exports.capturing = void 0;
exports.capturing = {
    renStr: "BHGKQ2B/4GH2/TFFF1FFF/4F3/5f2/6f1/2qg2b1/bhgk2h1 w ---- -- -.- ffffff",
    fromIndex: 28,
    toIndex: 37,
};
exports.attacking = {
    renStr: "BHGKQ2B/4G3/TFFFFFFF/6h1/2H5/5ff1/2qg2b1/bhgk4 w ---- -- -.- ffffff",
    fromIndex: 34,
    toIndex: 44,
};
var init = function (kcb) {
    var container = document.createElement("div");
    document.body.appendChild(container);
    kcb.setOptions({
        width: 600,
        container: container
    });
    kcb.pieceShadowManager.enableQuickMove();
    kcb.start();
    kcb.messageManager.disableLog();
};
exports.init = init;
var reset = function (kcb) {
    kcb.pieceShadowManager.enableQuickMove();
    kcb.setFullScreen(false);
    kcb.reset();
    kcb.start();
};
exports.reset = reset;
//# sourceMappingURL=helper.js.map