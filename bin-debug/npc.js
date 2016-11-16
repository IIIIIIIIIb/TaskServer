var NPC = (function () {
    function NPC(id) {
        this.id = id;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.setEmoji = function (emoji) {
        this.emoji = emoji;
    };
    //根据变化的任务的相应状态改变相应NPC头顶的符号
    p.onChange = function (task) {
        //任务刚创建时
        if (task.getStatus() == TaskStatus.ACCEPTABLE) {
            if (this.id == task.getFromNpcId()) {
                this.emoji = "yellow !";
            }
        }
        else if (task.getStatus() == TaskStatus.DURING) {
            if (this.id == task.getFromNpcId()) {
                this.emoji = "";
            }
            if (this.id == task.getToNpcId()) {
                this.emoji = "yellow ?";
            }
        }
        else if (task.getStatus() == TaskStatus.SUBMITTED) {
            this.emoji = "";
        }
        new Main().showEmoji(this.emoji);
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=npc.js.map