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

    // 获取相邻颜色相同的螺丝圈
    getAdjacentScrews(screwData: ScrewData): ScrewData[] {
        const adjacentScrews: ScrewData[] = [];
        let index = this.screws.indexOf(screwData);

        if (index !== -1) {
            // 向上查找颜色相同的螺丝圈
            let i = index + 1;
            while (i < this.screws.length && this.screws[i].color === screwData.color && this.screws[i].isHidden) {
                adjacentScrews.push(this.screws[i]);
                i++;
            }

            // 向下查找颜色相同的螺丝圈
            let j = index - 1;
            while (j >= 0 && this.screws[j].color === screwData.color && this.screws[j].isHidden) {
                adjacentScrews.unshift(this.screws[j]); // 在前面添加
                j--;
            }
        }
        return adjacentScrews;
    }

    // 隐藏螺丝圈
    hideScrew(screwData: ScrewData) {
        screwData.isHidden = true;
    }

    // 揭示螺丝圈
    revealScrew(screwData: ScrewData) {
        screwData.isHidden = false;
    }

    // 移除顶部螺丝圈
    removeTopScrew(): ScrewData | null | undefined {
        return this.screws.length > 0 ? this.screws.pop() : null;
    }
}