import { _decorator, Component, Node, tween, PhysicsSystem, geometry, CameraComponent, input, Input, EventTouch, Vec3 } from 'cc';
import { NutComponent } from './NutComponent';
import { ScrewData } from './ScrewData';
import { ScrewColor } from './ScrewColor';
import { Ring } from './Ring';

const { ccclass, property } = _decorator;

@ccclass('NutManager')
export class NutManager extends Component {
    @property({ type: CameraComponent })
    camera: CameraComponent = null!;

    @property([Node])
    nutNodes: Node[] = []; // 螺母节点数组

    private suspendedRing: Node | null = null;
    private currentRing: Node | null = null; // 当前悬浮的螺丝圈
    private currentNut: Node | null = null; // 当前选择的螺母

    start() {
        this.initNuts(); // 初始化数据
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    // 初始化螺母和螺丝圈的数据
    initNuts() {
        for (const nutNode of this.nutNodes) {
            const nutComponent = nutNode.getComponent(NutComponent)!;
            // 获取螺母中的 Rings 节点，并初始化其数据
            const rings = nutComponent.ringsNode.children;
            for (const ring of rings) {
                const ringComponent = ring.getComponent(Ring)!;
                const isHidden = ring.active;
                const screwData = new ScrewData(ringComponent.color, isHidden);
                nutComponent.data.addScrew(screwData);
            }
        }
    }

    onTouchStart(event: EventTouch) {
        const ray = new geometry.Ray();
        this.camera.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);

        if (PhysicsSystem.instance.raycast(ray)) {
            const results = PhysicsSystem.instance.raycastResults;
            if (results.length > 0) {
                const hitNode = results[0].collider.node;
                const nutComponent = hitNode.getComponent(NutComponent);
                if (nutComponent) {
                    this.onNutClicked(nutComponent.node);
                }
            }
        }
    }

    onNutClicked(nutNode: Node) {
        const nutComponent = nutNode.getComponent(NutComponent)!;

        if (this.currentRing) {
            // 已有悬浮螺丝圈
            if (this.currentNut === nutNode) {
                // 点击同一个螺母：归位
                this.moveRingToNut(this.currentRing, nutComponent, true);
                this.resetCurrentSelection();
            } else {
                // 点击不同螺母
                const topScrew = nutComponent.data.getTopScrew();
                const currentRingColor = this.currentRing.getComponent(Ring)!.color;
                if (!topScrew || topScrew.color === currentRingColor) {
                    // 颜色匹配：两步移动
                    this.moveRingToSuspension(this.currentRing, nutComponent, () => {
                        this.moveRingToNut(this.currentRing!, nutComponent, false);
                        this.resetCurrentSelection();
                    });
                }
            }
        } else {
            // 没有悬浮螺丝圈时：直接选中顶部螺丝圈并移动
            const topRing = nutComponent.getTopRingNode();
            if (topRing) {
                this.currentRing = topRing;
                this.currentNut = nutNode;
                this.moveRingToSuspension(topRing, nutComponent);
            }
        }
    }

    // 获取给定螺丝圈的索引
    ringIndexForScrew(screw: ScrewData): number {
        const nutComponent = this.currentNut?.getComponent(NutComponent);
        return nutComponent ? nutComponent.data.screws.indexOf(screw) : -1;
    }

    moveRingToSuspension(ringNode: Node, nutComponent: NutComponent, onComplete?: () => void) {
        const targetPos = nutComponent.getSuspensionPosition();
        tween(ringNode)
            .to(0.3, { worldPosition: targetPos })
            .call(() => {
                if (onComplete) onComplete();
            })
            .start();
    }

    /** 
     * 将当前选中的螺丝圈移动到螺丝上
     * @param ringNode 螺丝圈节点
     * @param nutComponent 螺丝组件
     * @param isReturning 是否归位操作
    */
    moveRingToNut(ringNode: Node, targetNutComponent: NutComponent, isReturning: boolean = false) {
        if (!isReturning && this.currentNut) {
            const currentNutComponent = this.currentNut.getComponent(NutComponent)!;
            // 移除当前螺母顶部的螺丝圈
            currentNutComponent.data.removeTopScrew();

            // 将新的螺丝圈数据添加到目标螺母的数据结构中
            const ringComponent = ringNode.getComponent(Ring)!;
            const screwData = new ScrewData(ringComponent.color);
            targetNutComponent.data.addScrew(screwData);
        }

        targetNutComponent.addRingNode(ringNode);
    }


    resetCurrentSelection() {
        this.currentRing = null;
        this.currentNut = null;
    }
}
