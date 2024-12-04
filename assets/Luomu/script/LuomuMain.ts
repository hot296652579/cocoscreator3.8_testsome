import { _decorator, Component, Node, tween, UITransform, v3, v4 } from 'cc';
import { NutManager } from './NutManager';
const { ccclass, property } = _decorator;

@ccclass('LuomuMain')
export class LuomuMain extends Component {

    @property(NutManager)
    nutManager: NutManager = null!;

    start() {

    }
}


