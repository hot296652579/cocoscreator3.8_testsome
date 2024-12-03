import { ScrewColor } from "./ScrewColor";

/** 螺丝圈数据 */
export class ScrewData {
    color: ScrewColor; // 螺丝圈颜色
    isHidden: boolean; // 是否隐藏

    constructor(color: ScrewColor, isHidden: boolean = false) {
        this.color = color;
        this.isHidden = isHidden;
    }
}