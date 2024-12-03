import { _decorator, Component, EventTouch, Node, NodeEventType, UITransform, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {

    public static ins:Joystick = null!;

    //摇杆背景
    @property(Node)
    node_joyStickBg:Node = null!;

    //摇杆中心点
    @property(Node)
    node_dot:Node = null!;

    UITf_joyStickBg:UITransform = null!;

    //摇杆最大半径
    maxLength:number = 0;

    //方向
    private _dir: Vec3 = new Vec3(Vec3.ZERO);
    public get dir(): Vec3 {
        return this._dir;
    }
    public set dir(value: Vec3) {
        this._dir = value;
    }
    //角度
    roleAngle:number = 0;

    start() {
        if(!Joystick.ins){
            Joystick.ins = this;
        }

        this.init();
    }

    init():void{
        this.UITf_joyStickBg = this.node_joyStickBg.getComponent(UITransform)!;
        this.maxLength = this.UITf_joyStickBg.width / 2;

        this.node_joyStickBg.on(NodeEventType.TOUCH_START,this.onTouchMove,this);
        this.node_joyStickBg.on(NodeEventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node_joyStickBg.on(NodeEventType.TOUCH_END,this.onTouchEnd,this);
        this.node_joyStickBg.on(NodeEventType.TOUCH_CANCEL,this.onTouchEnd,this);
    }

    /** 触摸移动
     * @param event 触摸事件
    */
    private onTouchMove(event:EventTouch):void{
        let worldPos = event.getUILocation();
        let localPos = this.UITf_joyStickBg.convertToNodeSpaceAR(v3(worldPos.x,worldPos.y,0));

        //计算向量的方向
        let length = localPos.length();
        if(length >0){
            //计算方式
            // this.dir.x = localPos.x / length;
            // this.dir.y = localPos.y / length;
            this.dir = localPos.clone().normalize();
        }

        if(length > this.maxLength){
            localPos.x = this.maxLength * this.dir.x;
            localPos.y = this.maxLength * this.dir.y;
        }
        this.node_dot.setPosition(localPos);
    }

    private onTouchEnd(event:EventTouch):void{
        this.dir = v3(0,0,0);
        this.node_dot.setPosition(Vec3.ZERO);
    }

    update(deltaTime: number) {
        
    }
}


