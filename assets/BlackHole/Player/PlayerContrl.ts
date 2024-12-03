import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerContrl')
export class PlayerContrl extends Component {
    skeletaAnimation: SkeletalAnimation = null!;

    start() {
        this.skeletaAnimation = this.node.getComponent(SkeletalAnimation)!;
        // this.skeletaAnimation.play('root|Idle');
        this.skeletaAnimation.play('root|Attack.001');
    }

    update(deltaTime: number) {

    }

    onAttackFinish(): void {
        console.log('攻击完成+++++');
    }
}


