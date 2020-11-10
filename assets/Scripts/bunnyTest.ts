import engine from "engine";
import { UISprite } from "engine/engine";

@engine.decorators.serialize("bunnyTest")
export default class bunnyTest extends engine.Script {
  public count = 0;  // 数量
  public isAdding = false; // 是否增加
  public amount = 0;

  public bunnyType = 0;
  public gravity = 0;

  public minX = 0;
  public minY = 0;
  public maxX = 0;
  public maxY = 0;

  public addTouch = null;
  public resetTouch = null;
  public bunnys = [];
  public bunnyFrames = [];

  public bunnyRoot : engine.Entity = null;

  @engine.decorators.property({
    type : 'UISprite' 
  })
  public texture : engine.UISprite = null;

  @engine.decorators.property({
    type : 'UILabel'
  })
  public countLabel : engine.UILabel = null;

  @engine.decorators.property({
    type : 'UILabel'
  })
  public resetLabel : engine.UILabel = null;

  public onAwake() {
    this.countLabel.text = this.count + "";

    this.bunnyRoot = this.entity.transform2D.findChildByName("bunnyRoot").entity;
    this.addTouch = this.countLabel.entity.getComponent(engine.TouchInputComponent);
    this.resetTouch = this.resetLabel.entity.getComponent(engine.TouchInputComponent);

    this.reset();

    // 触摸开始
    this.addTouch.onTouchStart.add(function (comp, event) {
      console.log(comp,"TOUCH_START", event);
      this.isAdding = true;
    }.bind(this));

    // 触摸结束
    this.addTouch.onTouchEnd.add(function (comp, event) {
        console.log(comp, "TOUCH_END", event);
        this.bunnyType++;
        this.bunnyType %= 5;
        // this.currentFrame = this.bunnyFrames[bunnyType];
        this.isAdding = false;
    }.bind(this));

    // 触摸取消
    this.addTouch.onTouchCancel.add(function (comp, event) {
      console.log(comp, "TOUCH_CANCEL", event);
        this.bunnyType++;
        this.bunnyType %= 5;
        // this.currentFrame = this.bunnyFrames[bunnyType];
        this.isAdding = false;
    }.bind(this));

    // 重置
    this.resetTouch.onTouchEnd.add(function (comp, event) {
        this.reset();
    }.bind(this));

  }

  public reset () {
    this.bunnys = [];
    // this.bunnyFrames = [];

    let childNum = this.bunnyRoot.transform2D.childrenCount;
    for (let i = 0; i < childNum; i++){
      let child = <engine.Transform2D>this.bunnyRoot.transform2D.children.pop();
      this.bunnyRoot.transform2D.removeChild(child);
    }

    this.bunnyType = 0;
    this.gravity = 0.5;

    const winSize = this.entity.game.sceneRoot.transform2D.size;
    // console.log("aaaaaaa -> ", winSize);
    this.maxX = winSize.x / 2;
    this.maxY = winSize.y / 2;
    this.minX = -this.maxX;
    this.minY = -this.maxY;

    this.isAdding = false;
    this.count = 0;
    this.amount = 100;

    this.countLabel.text = this.count + "";
  }

  public onUpdate(dt){
      if(this.isAdding){
        for (let i = 0; i < this.amount; i++) {
          const bunny = this.entity.game.createEntity2D('bunny');
          bunny.transform2D.size.x = 26;
          bunny.transform2D.size.y = 37;

          bunny["speedX"] = Math.random() * 10;
          bunny["speedY"] = (Math.random() * 10) - 5;
          bunny.transform2D.position.x = this.minX + 10;
          bunny.transform2D.position.y = this.maxY * 0.7;
          bunny.transform2D.anchorY = 1;
          
          const canvasSp = <engine.UISprite>bunny.addComponent(engine.UISprite);
          this.bunnyRoot.transform2D.addChild(bunny.transform2D);

          const spriteFrame = this.texture.spriteFrame;
          canvasSp.spriteFrame = spriteFrame;

          this.bunnys.push(bunny);
          this.count++;
        }
        this.countLabel.text = this.count + "";
      }
      
      for (let i = 0; i < this.bunnys.length; i++) {
          let bunny = this.bunnys[i];

          let x = bunny.transform2D.position.x + bunny["speedX"];
          let y = bunny.transform2D.position.y - bunny["speedY"];
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
          else if (y > this.maxY){
            bunny["speedY"] = 0;
            y = this.maxY;
          }
          bunny.transform2D.position.x = x;
          bunny.transform2D.position.y = y;
      }
  }
}