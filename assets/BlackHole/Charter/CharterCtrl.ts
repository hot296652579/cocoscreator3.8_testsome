import { _decorator, animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharterCtrl')
export class CharterCtrl extends Component {

    controller: animation.AnimationController = null!;

    start() {
        this.controller = this.node.getComponent(animation.AnimationController)!;
        this.controller.setValue('attackTrigger', true);
    }

    update(deltaTime: number) {

    }
}


