import { _decorator, Component, Node, tween, v3, Vec3 } from 'cc';
import { NutData } from './NutData';
import { Ring } from './Ring';
import { ScrewColor } from './ScrewColor';

const { ccclass, property } = _decorator;

/** 螺母组件*/
@ccclass('NutComponent')
export class NutComponent extends Component {
    @property(Node)
    ringsNode: Node = null!; // 螺母中的 Rings 节点

    @property(Node)
    suspensionNode: Node = null!; // 螺母中的 Suspension 节点

    public data: NutData = new NutData();

    @property(Node)
    ringsUnknowNode: Node = null!; // 螺母中的 RingsUnknow 节点，用于存放未知螺丝圈

    // 获取顶部螺丝圈节点
    getTopRingNode(): Node | null {
        const rings = this.ringsNode.children;
        return rings.length > 0 ? rings[rings.length - 1] : null;
    }

    // 揭示相邻颜色相同的螺丝圈
    revealAdjacentScrews(color: ScrewColor) {
        const rings = this.ringsNode.children;
        for (const ring of rings) {
            const ringComponent = ring.getComponent(Ring);
            if (ringComponent && ringComponent.color === color) {
                console.log(`揭示的颜色:${color}`)
                // 揭示颜色相同的螺丝圈
                ring.active = true;
            }
        }
    }

    // 添加螺丝圈到螺母动画
    addRingNode(ringNode: Node) {
        ringNode.setParent(this.ringsNode);
        const newY = (this.ringsNode.children.length - 1) * 1.5; //Y坐标间隔1.5
        ringNode.setPosition(new Vec3(0, newY, 0));
        tween(ringNode)
            .to(0.3, { eulerAngles: new Vec3(0, 180, 0) })
            .start();
    }

    // 获取悬浮位置
    getSuspensionPosition() {
        return this.suspensionNode.worldPosition;
    }
}
