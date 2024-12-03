import { _decorator, animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationStateMachine')
export class AnimationStateMachine extends Component {

    start() {
        // this.animationController = this.node.getComponent(animation.AnimationController)!;
        // this.animationController.setValue('onAttack', true);
    }

    update(deltaTime: number) {

    }
}


