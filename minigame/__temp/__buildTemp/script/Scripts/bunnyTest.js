"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var bunnyTest = (function (_super) {
    tslib_1.__extends(bunnyTest, _super);
    function bunnyTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.isAdding = false;
        _this.amount = 0;
        _this.bunnyType = 0;
        _this.gravity = 0;
        _this.minX = 0;
        _this.minY = 0;
        _this.maxX = 0;
        _this.maxY = 0;
        _this.addTouch = null;
        _this.resetTouch = null;
        _this.bunnys = [];
        _this.bunnyFrames = [];
        _this.bunnyRoot = null;
        _this.texture = null;
        _this.countLabel = null;
        _this.resetLabel = null;
        return _this;
    }
    bunnyTest.prototype.onAwake = function () {
        this.countLabel.text = this.count + "";
        this.bunnyRoot = this.entity.transform2D.findChildByName("bunnyRoot").entity;
        this.addTouch = this.countLabel.entity.getComponent(engine_1.default.TouchInputComponent);
        this.resetTouch = this.resetLabel.entity.getComponent(engine_1.default.TouchInputComponent);
        this.reset();
        this.addTouch.onTouchStart.add(function (comp, event) {
            console.log(comp, "TOUCH_START", event);
            this.isAdding = true;
        }.bind(this));
        this.addTouch.onTouchEnd.add(function (comp, event) {
            console.log(comp, "TOUCH_END", event);
            this.bunnyType++;
            this.bunnyType %= 5;
            this.isAdding = false;
        }.bind(this));
        this.addTouch.onTouchCancel.add(function (comp, event) {
            console.log(comp, "TOUCH_CANCEL", event);
            this.bunnyType++;
            this.bunnyType %= 5;
            this.isAdding = false;
        }.bind(this));
        this.resetTouch.onTouchEnd.add(function (comp, event) {
            this.reset();
        }.bind(this));
    };
    bunnyTest.prototype.reset = function () {
        this.bunnys = [];
        var childNum = this.bunnyRoot.transform2D.childrenCount;
        for (var i = 0; i < childNum; i++) {
            var child = this.bunnyRoot.transform2D.children.pop();
            this.bunnyRoot.transform2D.removeChild(child);
        }
        this.bunnyType = 0;
        this.gravity = 0.5;
        var winSize = this.entity.game.sceneRoot.transform2D.size;
        this.maxX = winSize.x / 2;
        this.maxY = winSize.y / 2;
        this.minX = -this.maxX;
        this.minY = -this.maxY;
        this.isAdding = false;
        this.count = 0;
        this.amount = 100;
        this.countLabel.text = this.count + "";
    };
    bunnyTest.prototype.onUpdate = function (dt) {
        if (this.isAdding) {
            for (var i = 0; i < this.amount; i++) {
                var bunny = this.entity.game.createEntity2D('bunny');
                bunny.transform2D.size.x = 26;
                bunny.transform2D.size.y = 37;
                bunny["speedX"] = Math.random() * 10;
                bunny["speedY"] = (Math.random() * 10) - 5;
                bunny.transform2D.position.x = this.minX + 10;
                bunny.transform2D.position.y = this.maxY * 0.7;
                bunny.transform2D.anchorY = 1;
                var canvasSp = bunny.addComponent(engine_1.default.UISprite);
                this.bunnyRoot.transform2D.addChild(bunny.transform2D);
                var spriteFrame = this.texture.spriteFrame;
                canvasSp.spriteFrame = spriteFrame;
                this.bunnys.push(bunny);
                this.count++;
            }
            this.countLabel.text = this.count + "";
        }
        for (var i = 0; i < this.bunnys.length; i++) {
            var bunny = this.bunnys[i];
            var x = bunny.transform2D.position.x + bunny["speedX"];
            var y = bunny.transform2D.position.y - bunny["speedY"];
            bunny["speedY"] += this.gravity;
            if (x > this.maxX) {
                bunny["speedX"] *= -1;
                x = this.maxX;
            }
            else if (x < this.minX) {
                bunny["speedX"] *= -1;
                x = this.minX;
            }
            if (y < this.minY) {
                bunny["speedY"] *= -0.85;
                y = this.minY;
                if (Math.random() > 0.5) {
                    bunny["speedY"] -= Math.random() * 6;
                }
            }
            else if (y > this.maxY) {
                bunny["speedY"] = 0;
                y = this.maxY;
            }
            bunny.transform2D.position.x = x;
            bunny.transform2D.position.y = y;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: 'UISprite'
        })
    ], bunnyTest.prototype, "texture", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: 'UILabel'
        })
    ], bunnyTest.prototype, "countLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: 'UILabel'
        })
    ], bunnyTest.prototype, "resetLabel", void 0);
    bunnyTest = tslib_1.__decorate([
        engine_1.default.decorators.serialize("bunnyTest")
    ], bunnyTest);
    return bunnyTest;
}(engine_1.default.Script));
exports.default = bunnyTest;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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dCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xuaW1wb3J0IHsgVUlTcHJpdGUgfSBmcm9tIFwiZW5naW5lL2VuZ2luZVwiO1xuXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiYnVubnlUZXN0XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBidW5ueVRlc3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcbiAgcHVibGljIGNvdW50ID0gMDsgIC8vIOaVsOmHj1xuICBwdWJsaWMgaXNBZGRpbmcgPSBmYWxzZTsgLy8g5piv5ZCm5aKe5YqgXG4gIHB1YmxpYyBhbW91bnQgPSAwO1xuXG4gIHB1YmxpYyBidW5ueVR5cGUgPSAwO1xuICBwdWJsaWMgZ3Jhdml0eSA9IDA7XG5cbiAgcHVibGljIG1pblggPSAwO1xuICBwdWJsaWMgbWluWSA9IDA7XG4gIHB1YmxpYyBtYXhYID0gMDtcbiAgcHVibGljIG1heFkgPSAwO1xuXG4gIHB1YmxpYyBhZGRUb3VjaCA9IG51bGw7XG4gIHB1YmxpYyByZXNldFRvdWNoID0gbnVsbDtcbiAgcHVibGljIGJ1bm55cyA9IFtdO1xuICBwdWJsaWMgYnVubnlGcmFtZXMgPSBbXTtcblxuICBwdWJsaWMgYnVubnlSb290IDogZW5naW5lLkVudGl0eSA9IG51bGw7XG5cbiAgQGVuZ2luZS5kZWNvcmF0b3JzLnByb3BlcnR5KHtcbiAgICB0eXBlIDogJ1VJU3ByaXRlJyBcbiAgfSlcbiAgcHVibGljIHRleHR1cmUgOiBlbmdpbmUuVUlTcHJpdGUgPSBudWxsO1xuXG4gIEBlbmdpbmUuZGVjb3JhdG9ycy5wcm9wZXJ0eSh7XG4gICAgdHlwZSA6ICdVSUxhYmVsJ1xuICB9KVxuICBwdWJsaWMgY291bnRMYWJlbCA6IGVuZ2luZS5VSUxhYmVsID0gbnVsbDtcblxuICBAZW5naW5lLmRlY29yYXRvcnMucHJvcGVydHkoe1xuICAgIHR5cGUgOiAnVUlMYWJlbCdcbiAgfSlcbiAgcHVibGljIHJlc2V0TGFiZWwgOiBlbmdpbmUuVUlMYWJlbCA9IG51bGw7XG5cbiAgcHVibGljIG9uQXdha2UoKSB7XG4gICAgdGhpcy5jb3VudExhYmVsLnRleHQgPSB0aGlzLmNvdW50ICsgXCJcIjtcblxuICAgIHRoaXMuYnVubnlSb290ID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtMkQuZmluZENoaWxkQnlOYW1lKFwiYnVubnlSb290XCIpLmVudGl0eTtcbiAgICB0aGlzLmFkZFRvdWNoID0gdGhpcy5jb3VudExhYmVsLmVudGl0eS5nZXRDb21wb25lbnQoZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQpO1xuICAgIHRoaXMucmVzZXRUb3VjaCA9IHRoaXMucmVzZXRMYWJlbC5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50KTtcblxuICAgIHRoaXMucmVzZXQoKTtcblxuICAgIC8vIOinpuaRuOW8gOWni1xuICAgIHRoaXMuYWRkVG91Y2gub25Ub3VjaFN0YXJ0LmFkZChmdW5jdGlvbiAoY29tcCwgZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGNvbXAsXCJUT1VDSF9TVEFSVFwiLCBldmVudCk7XG4gICAgICB0aGlzLmlzQWRkaW5nID0gdHJ1ZTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgLy8g6Kem5pG457uT5p2fXG4gICAgdGhpcy5hZGRUb3VjaC5vblRvdWNoRW5kLmFkZChmdW5jdGlvbiAoY29tcCwgZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29tcCwgXCJUT1VDSF9FTkRcIiwgZXZlbnQpO1xuICAgICAgICB0aGlzLmJ1bm55VHlwZSsrO1xuICAgICAgICB0aGlzLmJ1bm55VHlwZSAlPSA1O1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRGcmFtZSA9IHRoaXMuYnVubnlGcmFtZXNbYnVubnlUeXBlXTtcbiAgICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAvLyDop6bmkbjlj5bmtohcbiAgICB0aGlzLmFkZFRvdWNoLm9uVG91Y2hDYW5jZWwuYWRkKGZ1bmN0aW9uIChjb21wLCBldmVudCkge1xuICAgICAgY29uc29sZS5sb2coY29tcCwgXCJUT1VDSF9DQU5DRUxcIiwgZXZlbnQpO1xuICAgICAgICB0aGlzLmJ1bm55VHlwZSsrO1xuICAgICAgICB0aGlzLmJ1bm55VHlwZSAlPSA1O1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRGcmFtZSA9IHRoaXMuYnVubnlGcmFtZXNbYnVubnlUeXBlXTtcbiAgICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAvLyDph43nva5cbiAgICB0aGlzLnJlc2V0VG91Y2gub25Ub3VjaEVuZC5hZGQoZnVuY3Rpb24gKGNvbXAsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gIH1cblxuICBwdWJsaWMgcmVzZXQgKCkge1xuICAgIHRoaXMuYnVubnlzID0gW107XG4gICAgLy8gdGhpcy5idW5ueUZyYW1lcyA9IFtdO1xuXG4gICAgbGV0IGNoaWxkTnVtID0gdGhpcy5idW5ueVJvb3QudHJhbnNmb3JtMkQuY2hpbGRyZW5Db3VudDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTnVtOyBpKyspe1xuICAgICAgbGV0IGNoaWxkID0gPGVuZ2luZS5UcmFuc2Zvcm0yRD50aGlzLmJ1bm55Um9vdC50cmFuc2Zvcm0yRC5jaGlsZHJlbi5wb3AoKTtcbiAgICAgIHRoaXMuYnVubnlSb290LnRyYW5zZm9ybTJELnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG5cbiAgICB0aGlzLmJ1bm55VHlwZSA9IDA7XG4gICAgdGhpcy5ncmF2aXR5ID0gMC41O1xuXG4gICAgY29uc3Qgd2luU2l6ZSA9IHRoaXMuZW50aXR5LmdhbWUuc2NlbmVSb290LnRyYW5zZm9ybTJELnNpemU7XG4gICAgLy8gY29uc29sZS5sb2coXCJhYWFhYWFhIC0+IFwiLCB3aW5TaXplKTtcbiAgICB0aGlzLm1heFggPSB3aW5TaXplLnggLyAyO1xuICAgIHRoaXMubWF4WSA9IHdpblNpemUueSAvIDI7XG4gICAgdGhpcy5taW5YID0gLXRoaXMubWF4WDtcbiAgICB0aGlzLm1pblkgPSAtdGhpcy5tYXhZO1xuXG4gICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuYW1vdW50ID0gMTAwO1xuXG4gICAgdGhpcy5jb3VudExhYmVsLnRleHQgPSB0aGlzLmNvdW50ICsgXCJcIjtcbiAgfVxuXG4gIHB1YmxpYyBvblVwZGF0ZShkdCl7XG4gICAgICBpZih0aGlzLmlzQWRkaW5nKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFtb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgYnVubnkgPSB0aGlzLmVudGl0eS5nYW1lLmNyZWF0ZUVudGl0eTJEKCdidW5ueScpO1xuICAgICAgICAgIGJ1bm55LnRyYW5zZm9ybTJELnNpemUueCA9IDI2O1xuICAgICAgICAgIGJ1bm55LnRyYW5zZm9ybTJELnNpemUueSA9IDM3O1xuXG4gICAgICAgICAgYnVubnlbXCJzcGVlZFhcIl0gPSBNYXRoLnJhbmRvbSgpICogMTA7XG4gICAgICAgICAgYnVubnlbXCJzcGVlZFlcIl0gPSAoTWF0aC5yYW5kb20oKSAqIDEwKSAtIDU7XG4gICAgICAgICAgYnVubnkudHJhbnNmb3JtMkQucG9zaXRpb24ueCA9IHRoaXMubWluWCArIDEwO1xuICAgICAgICAgIGJ1bm55LnRyYW5zZm9ybTJELnBvc2l0aW9uLnkgPSB0aGlzLm1heFkgKiAwLjc7XG4gICAgICAgICAgYnVubnkudHJhbnNmb3JtMkQuYW5jaG9yWSA9IDE7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgY2FudmFzU3AgPSA8ZW5naW5lLlVJU3ByaXRlPmJ1bm55LmFkZENvbXBvbmVudChlbmdpbmUuVUlTcHJpdGUpO1xuICAgICAgICAgIHRoaXMuYnVubnlSb290LnRyYW5zZm9ybTJELmFkZENoaWxkKGJ1bm55LnRyYW5zZm9ybTJEKTtcblxuICAgICAgICAgIGNvbnN0IHNwcml0ZUZyYW1lID0gdGhpcy50ZXh0dXJlLnNwcml0ZUZyYW1lO1xuICAgICAgICAgIGNhbnZhc1NwLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cbiAgICAgICAgICB0aGlzLmJ1bm55cy5wdXNoKGJ1bm55KTtcbiAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb3VudExhYmVsLnRleHQgPSB0aGlzLmNvdW50ICsgXCJcIjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1bm55cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBidW5ueSA9IHRoaXMuYnVubnlzW2ldO1xuXG4gICAgICAgICAgbGV0IHggPSBidW5ueS50cmFuc2Zvcm0yRC5wb3NpdGlvbi54ICsgYnVubnlbXCJzcGVlZFhcIl07XG4gICAgICAgICAgbGV0IHkgPSBidW5ueS50cmFuc2Zvcm0yRC5wb3NpdGlvbi55IC0gYnVubnlbXCJzcGVlZFlcIl07XG4gICAgICAgICAgYnVubnlbXCJzcGVlZFlcIl0gKz0gdGhpcy5ncmF2aXR5O1xuXG4gICAgICAgICAgaWYgKHggPiB0aGlzLm1heFgpIHtcbiAgICAgICAgICAgICAgYnVubnlbXCJzcGVlZFhcIl0gKj0gLTE7XG4gICAgICAgICAgICAgIHggPSB0aGlzLm1heFg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHggPCB0aGlzLm1pblgpIHtcbiAgICAgICAgICAgICAgYnVubnlbXCJzcGVlZFhcIl0gKj0gLTE7XG4gICAgICAgICAgICAgIHggPSB0aGlzLm1pblg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHkgPCB0aGlzLm1pblkpIHtcbiAgICAgICAgICAgICAgYnVubnlbXCJzcGVlZFlcIl0gKj0gLTAuODU7XG4gICAgICAgICAgICAgIHkgPSB0aGlzLm1pblk7XG4gICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgICAgICAgICAgYnVubnlbXCJzcGVlZFlcIl0gLT0gTWF0aC5yYW5kb20oKSAqIDY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoeSA+IHRoaXMubWF4WSl7XG4gICAgICAgICAgICBidW5ueVtcInNwZWVkWVwiXSA9IDA7XG4gICAgICAgICAgICB5ID0gdGhpcy5tYXhZO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidW5ueS50cmFuc2Zvcm0yRC5wb3NpdGlvbi54ID0geDtcbiAgICAgICAgICBidW5ueS50cmFuc2Zvcm0yRC5wb3NpdGlvbi55ID0geTtcbiAgICAgIH1cbiAgfVxufSJdfQ==
