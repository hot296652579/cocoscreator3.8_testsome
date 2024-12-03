import { _decorator, BoxCollider, Component, game, ITriggerEvent, Node, SphereCollider, Vec3 } from 'cc';
import { Joystick } from './Joystick';
const { ccclass, property } = _decorator;

@ccclass('HolePlayer')
export class HolePlayer extends Component {

    holeTigger: SphereCollider = null!;

    speed: number = 5;

    start() {
        this.holeTigger = this.node.getChildByName('HoleTrigger')?.getComponent(SphereCollider)!;

        this.holeTigger.on('onTriggerEnter', this.onTriggerEnter, this);
        this.holeTigger.on('onTriggerExit', this.onTriggerExit, this);
    }

    onTriggerEnter(event: ITriggerEvent) {
        const coefficient: number = 12;
        const holeRadius = this.holeTigger.radius;
        const distance = this.getPlanceVec3(event).length();
        console.log(`distance:${distance} , holeRadius:${holeRadius}`);
        if (event.otherCollider.getGroup() == 1 << 6) {
            if (distance <= holeRadius * coefficient) {
                event.otherCollider.setGroup(1 << 5)
            }
        }
    }

    onTriggerStay(event: ITriggerEvent) {
        if (event.otherCollider.getGroup() == 1 << 5) {
            const otherPos = event.otherCollider.worldBounds.center;
            const heloToOtherDir = this.getPlanceVec3(event).normalize();
            heloToOtherDir.y = otherPos.y;
            const heloActtion = heloToOtherDir.clone().negative();
            event.otherCollider.attachedRigidBody?.applyImpulse(heloActtion.multiplyScalar(0.1), heloToOtherDir);
        }
    }

    onTriggerExit(event: ITriggerEvent) {
        if (event.otherCollider.getGroup() == 1 << 5) {
            event.otherCollider.setGroup(1 << 6)
        }
    }

    getPlanceVec3(event: ITriggerEvent) {
        const otherPos = event.otherCollider.worldBounds.center;
        const otherPlanceToY = new Vec3(otherPos.x, 0, otherPos.z);
        const distance = otherPlanceToY.clone().subtract3f(this.node.position.x, 0, this.node.position.z);
        return distance;
    }

    update(deltaTime: number) {
        this.MoveHandler();
    }

    MoveHandler(): void {
        const playerDir = Joystick.ins.dir;
        const playerX = playerDir.x * this.speed * game.deltaTime;
        const playerZ = playerDir.y * this.speed * game.deltaTime;

        this.node.setPosition(this.node.position.x + playerX, 0, this.node.position.z - playerZ);
    }
}


