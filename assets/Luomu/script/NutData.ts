import { ScrewData } from "./ScrewData";

/** 螺母数据 */
export class NutData {
    public screws: ScrewData[] = []; // 当前螺母的螺丝圈数据
    public maxScrews: number = 6; // 螺母最大容量 默认6个
    public group: boolean = false; // 是否已经归类完成

    constructor() { }

    // 检查螺母是否为空
    isEmpty(): boolean {
        return this.screws.length === 0;
    }

    // 检查螺母是否已满
    isFull(): boolean {
        return this.screws.length >= this.maxScrews;
    }

    // 获取顶部螺丝圈
    getTopScrew(): ScrewData | null {
        return this.screws.length > 0 ? this.screws[this.screws.length - 1] : null;
    }

    // 添加螺丝圈
    addScrew(screwData: ScrewData) {
        if (this.screws.length < this.maxScrews) {
            this.screws.push(screwData);
        }
        // console.log('当前螺母最新螺丝数据:', this.screws);
    }

    // 移除顶部螺丝圈
    removeTopScrew(): ScrewData | null | undefined {
        return this.screws.length > 0 ? this.screws.pop() : null;
    }
}