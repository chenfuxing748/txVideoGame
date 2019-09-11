// TypeScript file
class ShouCangMusicPanel extends eui.Component {
    private mainGroup: eui.Group;
    private bgBtn: eui.Group;
    private goodsLayer: eui.Group;
    private addBtn: eui.Button;
    private reduceBtn: eui.Button;
    private play_pauseBtn: eui.Button;
    private scroll: eui.Scroller;
    private labScroll: eui.Scroller;
    private lyricsLab: eui.Label;
    private musicLab: eui.Group;
    constructor() {
        super();
        this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    //添加到舞台
    private onAddToStage(): void {
        this.onSkinName();
    }
    protected onRegist(): void {
        GameDispatcher.getInstance().addEventListener(GameEvent.UPDATE_RESIZE, this.updateResize, this);

        this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }
    protected onRemove(): void {
        GameDispatcher.getInstance().removeEventListener(GameEvent.UPDATE_RESIZE, this.updateResize, this);
        // GameDispatcher.getInstance().removeEventListener(GameEvent.PLAY_MP3, this.onPlayMp3, this);
        this.bgBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }
    private onClose() {
        this.onRemove();

        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.CLOSE_VIEW), 'ShouCangMusicPanel')
    }
    private updateResize() {
        this.width = size.width;
        this.height = size.height;
    }
    private showGoods() {
        this.goodsLayer.removeChildren();
        var cfgs = ChengJiuManager.getInstance().shoucangCfgs;
        for (var k in cfgs) {
            if (ShopManager.getInstance().onCheckShoucangOpen(cfgs[k].id)) {
                if (cfgs[k].mulu2 == SHOUCANG_SUB_TYPE.SHOUCANG_MUSIC) {
                    var cg: ShouCangMusicItem = new ShouCangMusicItem();
                    this.goodsLayer.addChild(cg);
                    cg.data = cfgs[k];
                }
            }
        }
        this.scroll.viewport.scrollV = 0;
    }
    private onLoadComplete(): void {
        this.touchEnabled = false;
        this.onInit();
        this.onRegist();
        this.updateResize();
    }
    //供子类覆盖
    protected onInit(): void {
        this.showGoods();
    }
    protected onSkinName(): void {
        this.skinName = skins.ShouCangMusicSkin;
    }
}
class ShouCangMusicItem extends eui.Component {
    public title: eui.Label;
    // private weijiesuo: eui.Group;
    private num: eui.Label;
    private info;
    private icon: eui.Image;
    private musicNum: eui.Label;
    private musicName:eui.Label;
    public constructor() {
        super();
        this.skinName = skins.ShouCangMusicItemSkin;
        this.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayVideo, this);
    }
    public set data(info) {
        this.info = info;
        this.musicName.text = info.name;
        if (info.minipic)
            this.icon.source = info.minipic+'_png';
        var awardStrAry: string[] = [];
        if (info.src.indexOf(",") >= 0) {
            awardStrAry = info.src.split(",");
        }
        else {
            awardStrAry.push(info.src);
        }
        this.musicNum.text = awardStrAry.length + '首';
        // if (UserInfo.allCollectionDatas[info.id]) {
        //     this.weijiesuo.visible = false;
        // }
        // else {
        //     this.weijiesuo.visible = true;
        // }
    }
    private onPlayVideo() {
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), { windowName: 'Mp3Panel', data: this.info })
    }
}