import { _decorator, Component, Node, tween, UITransform, v3, v4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LuomuMain')
export class LuomuMain extends Component {

    @property(Node)
    nut0: Node = null!;
    @property(Node)
    nut1: Node = null!;

    @property(Node)
    suspendNode: Node = null!;

    @property(Node)
    targetNut: Node = null!;

    start() {
        this.suspend();
    }

    suspend(): void {
        const nut1Pos = this.nut1.getPosition();
        tween(this.nut1)
            .to(0.5, { position: v3(nut1Pos.x, nut1Pos.y + 4, nut1Pos.z) })
            .call(() => {
                this.moveToTagetNut();
            })
            .start()
    }

    moveToTagetNut(): void {
        const suspendWorldPos = this.suspendNode.getWorldPosition();
        const targetNutWorldPos = this.targetNut.getWorldPosition();

        tween(this.nut1)
            .to(0.5, { worldPosition: v3(suspendWorldPos.x, suspendWorldPos.y, suspendWorldPos.z) })
            .delay(0.5)
            .to(0.5, { worldPosition: v3(targetNutWorldPos.x, targetNutWorldPos.y, targetNutWorldPos.z) })
            .to(0.5, { eulerAngles: v3(0, 180, 0) })
            .union()
            .start()
    }

    update(deltaTime: number) {

    }
}


