import { _decorator, Component, Node, Prefab, instantiate, tween, UIOpacity, v3, Size, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HorizontalStaircaseTransition')
export class HorizontalStaircaseTransition extends Component {
    @property(Prefab)
    blockPrefab: Prefab = null!; // 小方块的预制件

    @property(Node)
    container: Node = null!; // 方块容器节点

    @property
    blockSize: number = 50; // 每个小方块的大小

    private screenSize: Size = new Size(); // 屏幕大小

    start() {
        if (!this.blockPrefab || !this.container) {
            console.error("请绑定小方块预制件和容器节点！");
            return;
        }

        this.screenSize.width = view.getVisibleSize().width;
        this.screenSize.height = view.getVisibleSize().height;

        this.createBlocks();
        this.startFillingAnimation();
    }

    /**
     * 动态生成小方块
     */
    createBlocks() {
        const cols = Math.ceil(this.screenSize.width / this.blockSize);
        const rows = Math.ceil(this.screenSize.height / this.blockSize);

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const block = instantiate(this.blockPrefab);
                this.container!.addChild(block);
                block.setPosition(
                    col * this.blockSize - this.screenSize.width / 2 + this.blockSize / 2,
                    this.screenSize.height / 2 - row * this.blockSize - this.blockSize / 2,
                    0
                );

                // 添加 UIOpacity 组件并设置初始透明度
                const uiOpacity = block.addComponent(UIOpacity);
                uiOpacity.opacity = 0; // 初始透明度为 0
            }
        }
    }

    /**
     * 开始水平阶梯式铺满动画
     */
    startFillingAnimation() {
        const blocks = this.container!.children;
        const rows = Math.ceil(this.screenSize.height / this.blockSize);
        const cols = Math.ceil(this.screenSize.width / this.blockSize);

        for (let col = 0; col < cols; col++) {
            const delay = col * 0.1; // 每列延迟时间
            for (let row = 0; row < rows; row++) {
                const blockIndex = col * rows + row; // 当前小方块的索引
                const block = blocks[blockIndex];
                const uiOpacity = block.getComponent(UIOpacity);

                if (uiOpacity) {
                    tween(uiOpacity)
                        .delay(delay + row * 0.05) // 列与行的延迟叠加
                        .to(0.2, { opacity: 255 }) // 透明度变化动画
                        .start();
                }
            }
        }

        // 全部铺满后触发移除动画
        this.scheduleOnce(() => {
            this.startClearingAnimation();
        }, cols * 0.1 + rows * 0.05); // 根据动画时长调整
    }

    /**
     * 开始水平阶梯式移除动画
     */
    startClearingAnimation() {
        const blocks = this.container!.children;
        const rows = Math.ceil(this.screenSize.height / this.blockSize);
        const cols = Math.ceil(this.screenSize.width / this.blockSize);

        for (let col = cols - 1; col >= 0; col--) {
            const delay = (cols - 1 - col) * 0.1; // 每列延迟时间，从右到左
            for (let row = 0; row < rows; row++) {
                const blockIndex = col * rows + row; // 当前小方块的索引
                const block = blocks[blockIndex];
                const uiOpacity = block.getComponent(UIOpacity);

                if (uiOpacity) {
                    tween(uiOpacity)
                        .delay(delay + row * 0.05) // 列与行的延迟叠加
                        .to(0.2, { opacity: 0 }) // 透明度变化动画
                        .call(() => {
                            block.active = false; // 动画完成后隐藏小方块
                        })
                        .start();
                }
            }
        }

        // 全部移除后回调逻辑
        this.scheduleOnce(() => {
            this.onTransitionComplete();
        }, cols * 0.1 + rows * 0.05); // 根据动画时长调整
    }

    /**
     * 过场动画完成
     */
    onTransitionComplete() {
        console.log("过场动画完成，执行后续逻辑...");
        // 可以在此切换场景或触发其他逻辑
    }
}
