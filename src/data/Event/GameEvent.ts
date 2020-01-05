class GameEvent {
    public static GAME_JSON_PARSE_OK: string = 'game.json.parse.complete';
    public static ONSHOW_VIDEO: string = 'show.video';
    public static REDUCE_VIDEO_SPEED: string = 'reduce.video.speed';
    public static ADD_VIDEO_SPEED: string = 'add.video.speed';
    public static PLAY_PAUSE: string = 'play.pause';
    public static GAME_OVER: string = 'game.over';
    public static READ_ARCHIVES: string = 'read.archives';
    public static UPDATA_REFRESH: string = 'updata.refresh';
    public static UPDATA_VIP: string = 'updata.vip';
    public static AUTO_UPDATA: string = 'auto.updata';//自动存档
    public static GAME_WIN: string = 'game.win';
    public static CLOSE_VIDEODATA: string = 'close.videodata';
    public static UPDATE_RESIZE: string = "update_resize";
    public static CHENGJIU_COMPLETE: string = 'chengjiu.complete';
    public static SHOW_VIEW: string = 'show.view';
    public static SHOW_VIEW_WITH_PARAM: string = 'show.view.with.param';
    public static CLOSE_VIEW: string = 'close.view';
    public static GAME_CONTINUE: string = 'game.continue';
    public static GAME_STATE_CHANGE: string = 'game.statechange';
    public static BUY_REFRESH: string = 'buy.refresh';
    public static STARTCHAPTER: string = 'start.chapter';
    public static XINKAISHI: string = 'xinkaishi';
    public static SHOUCANG_IMG_TOUCH: string = 'shoucang.img.touch';
    public static GUIDE_STOP_GAME: string = 'guide.stop.game';
    public static IOS_GAME_PLAY: string = 'ios.game.play';
    public static VIDEO_FULL_END: string = 'video.full.end';//全景视频结束
    public static GAME_LOADING: number = 10000;//游戏加载中
    public static GAME_COMPLETE: number = 10001;//游戏加载完成
    public static UNLOCK_SHOUCANG: string = 'unlock.shoucang';//解锁收藏
    public static GAME_GO_MAINVIEW: string = 'game.go.mainview';//返回游戏主界面
    public static CHENGJIU_REFRESH: string = 'chengjiu.refresh';//切换视频品质
    public static PLAY_VIDEO3: string = 'play.video3';//播放视频3
    public static CLOSE_VIDEO3: string = 'close.video3';//关闭视频3
    public static PLAY_MP3: string = 'play.mp3';//播放音乐
    public static GUIDE_COMPLETE: string = 'guide.complete';//引导完成
    public static GUIDE_SEE_VIDEO: string = 'guide.see.video';//查看视频
    public static CLOSE_GUIDE_SHOUCANG: string = 'close.guide.shoucang';//关闭收藏
    public static MAIN_IMG_REFRESH: string = 'main.img.refresh';//主界面bj替换
    public static INIT_DESC: string = 'init.desc';
    public static HIDE_MAIN_GROUP: string = 'hide.main.group';
    public static REFRESH_JUQING: string = 'refresh.juqing';
    public static BUY_HAOGAN: string = 'buy.haogan';
    public static VIDEO_PLAY_END: string = 'game.videoplayend';
    public static TASK_STATE_CHANGED: string = 'task.statechanged';
    public static SUIPIAN_CHANGE: string = 'suipian.change';
    public static SHOUCANG_NEWPOINT: string = 'shoucang.newpoint';
    public static BEGAN_READING_CHAPTER: string = '1';
    public static ENDED_READING_CHAPTER: string = '2';
    public static ACHIEVED_ENDING: string = '3';
    public static COMPLETED_TASK: string = '4';
    public static RECEIVED_TASK_REWARD: string = '5';
    public static SHARE_ACTIVATION_CODE: string = '6';
    public static SHARE_COLLECTION_IMAGE: string = '7';
}
