var TaskPanel = (function () {
    function TaskPanel(id) {
        this.id = id;
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.onChange = function (task) {
        if (task.getStatus() == TaskStatus.ACCEPTABLE) {
            new Main().showPanel(task, "taskpanel not accept");
        }
        if (task.getStatus() == TaskStatus.DURING) {
            new Main().showPanel(task, "taskpanel accept");
        }
        if (task.getStatus() == TaskStatus.SUBMITTED) {
            new Main().showPanel(task, "taskpanel submit");
        }
        if (task.getStatus() == TaskStatus.ACCEPTABLE && Main.click) {
            new Main().showPanel(task, "accept");
        }
        else if (task.getStatus() == TaskStatus.DURING) {
            new Main().showPanel(task, "finish");
        }
        Main.click = false;
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map