var Task = (function () {
    function Task(id, name, status, fromNpcId, toNpcId) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.getName = function () {
        return this.name;
    };
    p.getStatus = function () {
        return this.status;
    };
    p.getFromNpcId = function () {
        return this.fromNpcId;
    };
    p.getToNpcId = function () {
        return this.toNpcId;
    };
    p.setStatus = function (taskStatus) {
        this.status = taskStatus;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map