import { _decorator, animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterCrl')
export class CharacterCrl extends Component {
    animationCrl: animation.AnimationController = null!;
    start() {
        this.animationCrl = this.node.getComponent(animation.AnimationController)!;
        this.animationCrl.setValue('Jump', true);
    }

    update(deltaTime: number) {

    }
}


