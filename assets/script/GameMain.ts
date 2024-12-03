import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Label, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {

  @property(Node)
  player: Node = null!;

  lv: Vec2 = new Vec2(0, 0);
  sp: Vec3 = new Vec3(0, 0, 0);

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        console.log('Press a key left');
        this.sp.x = -1;
        break;
      case KeyCode.ARROW_RIGHT:
        this.sp.x = 1;
        console.log('Press a key right');
        break;
      case KeyCode.ARROW_UP:
        console.log('Press a key up');
        break;
    }
  }

  update(dt: number): void {
    if (this.sp.x) {
      this.lv = this.player.getComponent(RigidBody2D)?.linearVelocity!
    }
  }
}


