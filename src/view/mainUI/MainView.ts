const playerCallList = [];
const errorList = [];

const infoDiv = document.createElement("div");
document.body.appendChild(infoDiv);
infoDiv.outerHTML = `<div style="position: absolute; top: 0; left: 50%; z-index: 99999">
<button onclick="copyLog();">复制LOG</button>
</div>`;

function copyLog() {
    const str = JSON.stringify({
        errorList,
        playerCallList,
        curBookData: UserInfo.curBokData
    });
    const input = document.createElement("input");
    input.value = str;
    document.body.appendChild(input);
    input.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    input.className = "input";
    input.style.display = "none";
    GameCommon.getInstance().showCommomTips("复制成功，可以直接粘贴到聊天栏发送给开发人员");
}

class MainView extends eui.Component {
    private gameWorld: GameWorld;
    private labname: eui.Label;
    private sex: eui.Label;
    private user: eui.Label;
    private mainGroup: eui.Group;
    private btnclean: eui.Button;
    private btnSetting: eui.Button;
    private btnZhangjie: eui.Button;
    private btnShouCang: eui.Button;
    private btnChengjiu: eui.Button;
    private btnHuodong: eui.Button;
    private btnShangCheng: eui.Button;
    private btnContinueGame: eui.Button;
    private btnDisableCheck: eui.Button;
    private btnEnableCheck: eui.Button;
    private myTitle: eui.Button;
    private cleanLab: eui.Label;
    private desc: eui.Label;
    private wallet: eui.Label;
    private closeWeb: eui.Label;
    private icon: eui.Image;
    private bg: eui.Image;
    private bg_grp: eui.Group;
    private rightGruop: eui.Group;
    private rightDownGroup: eui.Group;
    private zjLab: eui.Group;
    private scLab: eui.Group;
    private shopLab: eui.Group;
    private cjLab: eui.Group;
    private play_Btn: eui.Button;
    private play_zi: eui.Button;
    private btnDuQu: eui.Button;
    private xindong: eui.Button;
    private btnXinkaishi: eui.Button;
    private curDuDang: boolean = false;

    constructor(gameWorld: GameWorld) {
        super();
        this.gameWorld = gameWorld;
        this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private static onShowShowCang() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "ShouCangListPanel");
    }

    private static disableCheck() {
        GameDefine.ENABLE_CHECK_CHAPTER_LOCK = false;
    }

    private static enableCheck() {
        GameDefine.ENABLE_CHECK_CHAPTER_LOCK = true;
    }

    //添加到舞台
    private onAddToStage(): void {
        this.skinName = skins.GameMainSkin;
    }

    private onLoadComplete(): void {
        widPlayer = null;
        GameDispatcher.getInstance().addEventListener(GameEvent.UPDATA_REFRESH, this.onGetDataRefresh, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.UPDATE_RESIZE, this.updateResize, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.STARTCHAPTER, this.onClose, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.GAME_WIN, this.onGameWin, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.GAME_GO_MAINVIEW, this.onShowMian, this);
        //GameDispatcher.getInstance().addEventListener(GameEvent.GAME_USER_REFRESH, this.onRefreshUser, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.AUTO_UPDATA, this.onRefreshUpdata, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.PLAY_VIDEO3, this.onClose, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.CLOSE_VIDEO3, this.onShowView, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.MAIN_IMG_REFRESH, this.onRefreshImg, this);
        GameDispatcher.getInstance().addEventListener(GameEvent.HIDE_MAIN_GROUP, this.onHideMainGroup, this);
        this.updateResize();
        this.btnContinueGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
        this.play_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventPlay, this);
        this.btnDuQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuDang, this);
        this.btnChengjiu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowChengJiu, this);
        this.btnShouCang.addEventListener(egret.TouchEvent.TOUCH_TAP, MainView.onShowShowCang, this);
        this.xindong.addEventListener(egret.TouchEvent.TOUCH_TAP, MainView.onShowShowCang, this);
        this.btnHuodong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowActivity, this);
        this.cleanLab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCleanCache, this);
        this.wallet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowWallet, this);
        this.btnXinkaishi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXinkaishi, this);
        //
        this.closeWeb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseWebView, this);
        this.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowbtnSetting, this);
        this.btnShangCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowShop, this);
        this.btnDisableCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, MainView.disableCheck, this);
        this.btnEnableCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, MainView.enableCheck, this);
        // GameCommon.getInstance().getWenTi();
        // this.onGetDataRefresh();
        // LocalStorageManager.getInstance().onInit();
        ShopManager.getInstance().initShopInfos();
        GameCommon.getInstance().getBookHistory(FILE_TYPE.GOODS_FILE);
        GameCommon.getInstance().getUserInfo();
        VideoManager.getInstance().updateVideoData("");
        this.play_Btn.visible = true;
        this.play_zi.visible = true;
        this.mainGroup.visible = false;
        UserInfo.guideDic[0] = 0;
        UserInfo.guideDic[1] = 1;
        UserInfo.guideDic[2] = 2;
        UserInfo.guideDic[3] = 3;
        UserInfo.guideDic[4] = 4;
        UserInfo.guideDic[5] = 5;
        UserInfo.guideDic[6] = 6;
        UserInfo.guideDic[7] = 7;
        UserInfo.guideDic[8] = 8;
        SoundManager.getInstance().initMusic([]);
        if (!UserInfo.curBokData) {
            GameCommon.getInstance().getBookHistory(FILE_TYPE.AUTO_FILE);
        } else if (UserInfo.guideDic[4] || UserInfo.guideDic[8] || UserInfo.achievementDics[17]) {
            GameDefine.ISFILE_STATE = false;
            this.onRefreshUpdata({data: 1});
        }
        let player = new window["Txiplayer"]({
            container: "#videoDivMin",
            width: "100%",
        });
        playerCallList.push({
            key: "constructor",
            args: [{
                container: "#videoDivMin",
                width: "100%",
            }],
            time: new Date().getTime()
        });
        const methodList = [
            "play",
            "clear",
            "pause",
            "resume",
            "seek",
            "setNextVideoNode",
            "preloadVideoNode",
            "getDuration",
            "getPlayTime",
            "setPlaybackRate",
            "on",
        ];
        const logArgsMethodList = [
            "play",
            "clear",
            "pause",
            "resume",
            "seek",
            "setNextVideoNode",
            "preloadVideoNode",
            "setPlaybackRate",
            "on",
        ];
        const logResultMethodList = [];
        widPlayer = {};
        methodList.forEach(key => {
            widPlayer[key] = (...args) => {
                if (key === "on") {
                    const [event, handler] = args;
                    player[key].bind(player)(event, (...args) => {
                        console.log("video player event", event, ...args);
                        handler(...args);
                    });
                    playerCallList.push({
                        key,
                        args,
                        time: new Date().getTime()
                    });
                } else {
                    if (logArgsMethodList.indexOf(key) !== -1) {
                        console.trace(`widPlayer.${key} args`, ...args);
                        playerCallList.push({
                            key,
                            args,
                            time: new Date().getTime()
                        });
                    }
                    const result = player[key].bind(player)(...args);
                    if (logResultMethodList.indexOf(key) !== -1) {
                        console.trace(`widPlayer.${key} result`, result);
                    }
                    return result;
                }
            };
        });
        let ps = document.getElementsByTagName("video");
        for (let i: number = 0; i < ps.length; i++) {
            if (size.fillType == FILL_TYPE_COVER) {
                ps[i].style["object-fit"] = "cover";
            } else {
                ps[i].style["object-fit"] = "contain";
            }
        }
    }

    // private loadpanel:LoadingPanel;
    private onRefreshImg() {
        if (UserInfo.main_Img && UserInfo.main_Img.length) {
            this.bg.source = UserInfo.main_Img;
            let scaleX = size.width / 1600;
            let scaleY = size.height / 900;
            let scale = scaleX > scaleY ? scaleX : scaleY;
            this.bg.scaleX = scale;
            this.bg.scaleY = scale;
        } else {
            this.bg.source = "main_bj1_jpg";
        }
        // this.desc.text = "UserInfo.main_Img" + UserInfo.main_Img;
        if (UserInfo.curBokData) {
            this.desc.text += UserInfo.curBokData.main_Img + "---" + UserInfo.main_Img;
            UserInfo.curBokData.main_Img = UserInfo.main_Img;
        }
    }

    //序章小三角
    private onGetDataRefresh(data) {
        // if(data||data==0)
        // {
        //     // VideoManager.getInstance().log("我日"+UserInfo.curBokData.wentiId.length+"~~~"+UserInfo.curBokData.wentiId[UserInfo.curBokData.wentiId.length - 1]);
        //     if(data.data=="cuowu")
        //     {
        if (!UserInfo.curchapter) {
            this.gameWorld.createGameScene();
            SoundManager.getInstance().initMusic(SoundManager.musicList);
            this.mainGroup.visible = false;
        }
    }

    private updateResize() {
        this.width = size.width;
        this.height = size.height;
        // this.x = (size.width - this.width) / 2;
        // this.y = (size.height - this.height) / 2;
        this.bg_grp.scaleX = Math.max(GameDefine.SCALENUMX, GameDefine.SCALENUMY);
        this.bg_grp.scaleY = Math.max(GameDefine.SCALENUMX, GameDefine.SCALENUMY);
        // this.mainGroup.scaleX = GameDefine.SCALENUMX;
        // this.mainGroup.scaleY = GameDefine.SCALENUMY;
    }

    private onDuDang() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        if (DEBUG) {
            if (typeof GameDefine.TEST_ACTION_SCENE_WENTI_ID === "number") {
                const actionIndex = 0;
                const wentiModel = JsonModelManager.instance.getModelwenti()[GameDefine.TEST_ACTION_SCENE_WENTI_ID.toString()];
                const hudongModel = JsonModelManager.instance.getModelhudong()[wentiModel.type];
                const paramList = hudongModel.pos.split(",");
                const actionSceneClass = ActionManager.getActionSceneClassByActionType(parseInt(hudongModel.tp));
                const actionScene = new actionSceneClass(wentiModel, paramList, actionIndex, true);
                this.addChild(actionScene);
                return;
            }
        }
        this.checkGuide8();
        if (GameDefine.IS_DUDANG) {
            this.curDuDang = true;
        }
        GameDefine.IS_DUDANG = false;
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "JuQingPanel");
    }

    private onShowWallet() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        this.checkGuide8();
        GameCommon.getInstance().openButton("story://wallet");
    }

    private onCloseWebView() {
        this.checkGuide8();
        GameCommon.getInstance().onCloseWebView();
    }

    private onCleanCache() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        for (var i: number = 1; i < FILE_TYPE.SIZE; i++) {
            GameCommon.getInstance().deleteBookHistory(i);
        }
        ShopManager.getInstance().takeOffAllBookValue();
        GameCommon.getInstance().addLikeTips("清档成功");
        this.checkGuide8();
    }

    private onShowActivity() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        this.checkGuide8();
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "ActivityPanel");
    }

    private onShowChengJiu() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        // GameCommon.getInstance().addAlert("zanweikaifang");
        this.cjLab.visible = false;
        this.checkGuide8();
        //GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "ChengJiuPanel");
        //GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "TicketPanel");
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), {
            windowName: "TicketPanel",
            data: "mainview"
        });

    }

    private onXinkaishi(): void {
        SoundManager.getInstance().playSound("ope_click.mp3");
        if (DEBUG) {
            if (typeof GameDefine.START_CHAPTER === "number") {
                this.gameWorld.createGameScene(GameDefine.START_CHAPTER);
                return;
            }
        }
        GameCommon.getInstance().showConfirmTips("重新开始会清空自动存档，是否重新开始？", () => {
            this.gameWorld.createGameScene();
        });
    }

    private onShowShop() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        this.checkGuide8();
        // GameCommon.getInstance().addAlert("zanweikaifang");
        this.shopLab.visible = false;
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "ShopPanel");
    }

    private onShowbtnSetting() {
        SoundManager.getInstance().playSound("ope_click.mp3");
        this.checkGuide8();
        // GameCommon.getInstance().addAlert("zanweikaifang");
        //GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "PlayerSettingPanel");
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.SHOW_VIEW), "AboutPanel");
    }

    private onShowMian() {
        GameDefine.CUR_IS_MAINVIEW = true;
        this.mainGroup.visible = true;
        this.btnChengjiu.touchEnabled = true;
        this.btnShouCang.touchEnabled = true;
        this.btnSetting.touchEnabled = true;
        // this.desc.text = JSON.stringify(UserInfo.guideDic);
        // if (!UserInfo.guideDic[5])//先检测成就引导是否OK
        // {
        //     this.cjLab.visible = true;
        //     this.rightGruop.touchEnabled = false;
        //     this.rightDownGroup.touchEnabled = false;
        //     this.btnZhangjie.touchEnabled = false;
        //     this.btnShangCheng.touchEnabled = false;
        //     this.btnShouCang.touchEnabled = false;
        //     this.btnSetting.touchEnabled = false;
        //     this.play_Btn.touchEnabled = false;
        //     GuideManager.getInstance().onShowImg(this["leftBtnGroup"], this.btnChengjiu, "chengjiuBtn");
        // }
        // else if (!UserInfo.guideDic[6])//检测商城消费
        // {
        //     this.play_Btn.touchEnabled = false;
        //     this.shopLab.visible = true;
        //     this.rightGruop.touchEnabled = false;
        //     this.rightDownGroup.touchEnabled = false;
        //     this.btnZhangjie.touchEnabled = false;
        //     this.btnChengjiu.touchEnabled = false;
        //     this.btnShouCang.touchEnabled = false;
        //     this.btnSetting.touchEnabled = false;
        //     this.btnShangCheng.touchEnabled = true;
        //     GuideManager.getInstance().onShowImg(this["leftBtnGroup"], this.btnShangCheng, "shangchengBtn");
        // }
        // else if (!UserInfo.guideDic[7]) {
        //     this.rightGruop.touchEnabled = false;
        //     this.rightDownGroup.touchEnabled = false;
        //     this.btnZhangjie.touchEnabled = false;
        //     this.btnChengjiu.touchEnabled = false;
        //     this.btnShouCang.touchEnabled = true;
        //     this.btnSetting.touchEnabled = false;
        //     this.btnShangCheng.touchEnabled = false;
        //     this.play_Btn.touchEnabled = false;
        //     this.scLab.visible = true;
        //     GuideManager.getInstance().onShowImg(this["leftBtnGroup"], this.btnShouCang, "shoucangBtn");
        // } else if (!UserInfo.guideDic[8]) {
        //     this.zjLab.visible = true;
        //     this.rightGruop.touchEnabled = true;
        //     this.rightDownGroup.touchEnabled = true;
        //     this.btnZhangjie.touchEnabled = true;
        //     this.btnChengjiu.touchEnabled = true;
        //     this.btnShouCang.touchEnabled = true;
        //     this.btnSetting.touchEnabled = true;
        //     this.btnShangCheng.touchEnabled = true;
        //     this.play_Btn.touchEnabled = true;
        //     // GuideManager.getInstance().onShowImg(this["leftBtnGroup"], this.btnZhangjie, "zhangjieBtn");
        // }
        // else {
        //     this.rightGruop.touchEnabled = true;
        //     this.rightDownGroup.touchEnabled = true;
        //     this.btnZhangjie.touchEnabled = true;
        //     this.btnChengjiu.touchEnabled = true;
        //     this.btnShouCang.touchEnabled = true;
        //     this.btnSetting.touchEnabled = true;
        //     this.btnShangCheng.touchEnabled = true;
        //     this.play_Btn.touchEnabled = true;
        // }
    }

    private onGameWin() {
        GameCommon.getInstance().getBookHistoryList();
        this.mainGroup.visible = true;
    }

    private onEventPlay() {
        //SoundManager.getInstance().playSound("ope_click.mp3")
        this.play_Btn.visible = false;
        this.play_zi.visible = false;

        if (!UserInfo.curBokData) {
            UserInfo.allVideos = {};
            UserInfo.ansWerData = new AnswerData;
            UserInfo.curBokData = new BookData();
            GameCommon.getInstance().setBookData(FILE_TYPE.AUTO_FILE);
            this.onGetDataRefresh(null);
        } else {
            if (this.curDuDang) {
                this.curDuDang = false;
                GameDefine.IS_DUDANG = true;
            }
            this.gameWorld.createGameScene();
        }

        this.checkGuide8();
    }

    private onBtnContinue() {
        //let videoIdx = VideoManager.getInstance().getVideoID()
        // if(!videoIdx){
        //     GameCommon.getInstance().showCommomTips("当前有错误（BUG）,请从存档中进入")
        //     console.error("存档错误")
        //     return;
        // }
        //SoundManager.getInstance().playSound("ope_click.mp3")
        if (!GameCommon.getInstance().checkChapterLocked())
            return;
        if (this.curDuDang) {
            this.curDuDang = false;
            GameDefine.IS_DUDANG = true;
        }
        GameDefine.ISFILE_STATE = true;
        // GameDefine.IS_SWITCH_VIDEO = true;
        // GameCommon.getInstance().getBookHistory(FILE_TYPE.AUTO_FILE);
        GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.AUTO_UPDATA));
        // this.mainGroup.visible = false;
        this.checkGuide8();
    }

    private checkGuide8() {
        // if(UserInfo.guideDic[7]&&!UserInfo.guideDic[8])
        // {
        //     UserInfo.guideDic[8] = 8;
        //     this.zjLab.visible = false;
        //     GameCommon.getInstance().setBookData(FILE_TYPE.AUTO_FILE);
        // }
    }

    private onRefreshUpdata(data) {
        if (data.data != 1) {
            return;
        }
        if (GameDefine.IS_SWITCH_VIDEO) {
            return;
        }
        this.onRefreshImg();
        this.mainGroup.visible = false;
        if (!GameDefine.ISFILE_STATE) {
            if (UserInfo.achievementDics[17]) {
                this.mainGroup.visible = true;
                this.play_Btn.visible = false;
                this.play_zi.visible = false;
                // VideoManager.getInstance().log("17"+"已完成");
                this.onShowMian();
            } else {
                TipsBtn.Is_Guide_Bool = true;
                this.mainGroup.visible = false;
                this.play_Btn.visible = true;
                this.play_zi.visible = true;
            }
            return;
        }
        // window["video1"].style.display = "block";
        // window["video2"].style.display = "block";
        // window["video3"].style.display = "block";
        GameDefine.ISFILE_STATE = false;
    }

    private onClose() {
        this.mainGroup.visible = false;
    }

    private onHideMainGroup() {
        this.mainGroup.visible = false;
    }

    private onShowView() {
        this.mainGroup.visible = true;
    }
}
