class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public static click : boolean;
    public static BitmapSize = 200;

    public static getInstance(){

        return this;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public static npc1talk = new egret.TextField();
    public static npc2talk = new egret.TextField();
    
    public static content1 = new egret.TextField();
    public static content2 = new egret.TextField();
    public static content3 = new egret.TextField();
    public static content4 = new egret.TextField();
    public static button = new egret.TextField();

    public static taskPanelContent1 = new egret.TextField();
    public static taskPanelContent2 = new egret.TextField();
    public static taskPanelContent3 = new egret.TextField();
    public static taskPanelContent4 = new egret.TextField();

    public static n0Emoji = new egret.TextField();
    public static n1Emoji = new egret.TextField();

    public showPanel(task : Task, tag : String){
        if(tag == "taskpanel not accept" || tag == "taskpanel submit"){
            Main.taskPanelContent1.text = "";
            Main.taskPanelContent2.text = "";
            Main.taskPanelContent3.text = "";
            Main.taskPanelContent4.text = "";
        }else if(tag == "taskpanel accept"){
            Main.taskPanelContent1.text = "任务名称: " + task.getName();
            Main.taskPanelContent1.x = 100;
            Main.taskPanelContent1.y = 380;
            Main.taskPanelContent1.size = 30;
            Main.taskPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.taskPanelContent2.x = 100;
            Main.taskPanelContent2.y = 430;
            Main.taskPanelContent2.size = 30;
            Main.taskPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.taskPanelContent3.x = 100;
            Main.taskPanelContent3.y = 480;
            Main.taskPanelContent3.size = 30;
            Main.taskPanelContent4.text = "任务状态：任务已接受 ";           
            Main.taskPanelContent4.x = 100;
            Main.taskPanelContent4.y = 530;
            Main.taskPanelContent4.size = 30;
        }
        if(tag == "accept"){
            Main.content1.text = task.getName();
            Main.content1.x = 250;
            Main.content1.y = 380;
            Main.button.x = 300;
            Main.button.y = 580;
            Main.button.text = "确定";
            Main.button.fontFamily = "Microsoft YaHei";
            Main.button.textColor = 0xFFFF00;
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
                TaskService.getInstance().accept(task.getId());
                Main.button.text = "";
                Main.content1.text = "";
                Main.content2.text = "";
                Main.content3.text = "";
                Main.content4.text = "";
            },this);
        }else if(tag == "finish"){
            Main.button.text = "完成";
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
                TaskService.getInstance().finish(task.getId());
                Main.button.text = "";
                Main.content1.text = "";
                Main.content2.text = "";
                Main.content3.text = "";
                Main.content4.text = "";
            },this);
        }
    }

    public showEmoji(emoji : String){
        if(emoji == "yellow !"){
            Main.n0Emoji.text = "！";
            Main.n0Emoji.x = 60;
            Main.n0Emoji.y = 150;
            Main.n0Emoji.size = 50;
            Main.n0Emoji.textColor = 0xFFFF00;
        }else if(emoji == "yellow ?"){
            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "？";
            Main.n1Emoji.x = 60;
            Main.n1Emoji.y = 880;
            Main.n1Emoji.size = 50;
            Main.n1Emoji.textColor = 0xFFFF00;
        }else if(emoji == ""){
            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "";
        }
    }

    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);

        this.touchEnabled = true;
        var NPC0 = new NPC("ALy");
        var NPC1 = new NPC("Bob");
        var taskPanel = new TaskPanel("dialogpanel");
        var taskAllTimePanel = new TaskPanel("taskpanel");
        var taskService = TaskService.getInstance();
        var task = new Task("0", "逃离这里", TaskStatus.ACCEPTABLE, "ALy", "Bob");

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 280);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var npc1 = this.createBitmapByName("npc1_png");
        npc1.y = 50;
        npc1.x = 200;
        npc1.width = Main.BitmapSize;
        npc1.height = Main.BitmapSize;
        npc1.touchEnabled = true;
        npc1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            Main.click = true;
            TaskService.getInstance().notify(task);
        }, this);
        this.addChild(npc1);

        var topMask2 = new egret.Shape();
        topMask2.graphics.beginFill(0x000000, 0.5);
        topMask2.graphics.drawRect(0, 0, stageW, 280);
        topMask2.graphics.endFill();
        topMask2.y = 800;
        this.addChild(topMask2);

        var npc2 = this.createBitmapByName("npc2_png");
        npc2.x = 200;
        npc2.y = 838;
        npc2.width = Main.BitmapSize;
        npc2.height = Main.BitmapSize;
        npc2.touchEnabled = true;
        npc2.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            Main.click = true;
            TaskService.getInstance().notify(task);
        }, this);
        this.addChild(npc2);
        this.addChild(Main.n0Emoji);
        this.addChild(Main.n1Emoji);
        this.addChild(Main.content1);
        this.addChild(Main.content2);
        this.addChild(Main.content3);
        this.addChild(Main.content4);
        this.addChild(Main.button);
        this.addChild(Main.taskPanelContent1);
        this.addChild(Main.taskPanelContent2);
        this.addChild(Main.taskPanelContent3);
        this.addChild(Main.taskPanelContent4);
        taskService.addObserver(NPC0);
        taskService.addObserver(NPC1);
        taskService.addObserver(taskPanel);
        taskService.addObserver(taskAllTimePanel);
        taskService.addTask(task);
        taskService.getTaskByCustomRule(function(taskList : Task[]) : Task{
            for(var i = 0; i < taskList.length; i++){
                if(taskList[i].getStatus() == TaskStatus.ACCEPTABLE){
                    taskService.notify(taskList[i]);
                    return taskList[i];
                }
            }
        });
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }


        private  touchNPC1(evt:egret.TouchEvent) {

            console.log("click");

        }
}


