var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CANSUBMIT"] = 3] = "CANSUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
})(ErrorCode || (ErrorCode = {}));
var TaskService = (function () {
    function TaskService() {
        this.taskList = [];
        this.observerList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    //获取TaskService的实例
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    //不公开数据，交给调用方处理
    p.getTaskByCustomRule = function (rule) {
        //拷贝数据
        var clone = this.taskList;
        //为传入函数增加了参数
        return rule(clone);
    };
    p.addTask = function (task) {
        this.taskList.push(task);
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    //完成任务时调用
    p.finish = function (id) {
        if (id == "") {
            return ErrorCode.MISSING_TASK;
        }
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getId() == id) {
                this.taskList[i].setStatus(TaskStatus.SUBMITTED);
                this.notify(this.taskList[i]);
                break;
            }
        }
        return ErrorCode.SUCCESS;
    };
    //接受任务时调用
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getId() == id && this.taskList[i].getStatus() == TaskStatus.ACCEPTABLE) {
                this.taskList[i].setStatus(TaskStatus.DURING);
                this.notify(this.taskList[i]);
                break;
            }
        }
    };
    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    p.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskServer.js.map