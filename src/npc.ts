class NPC implements Observer{

    private id : String;
    
    private emoji : String;

    constructor(id : String){
        this.id = id;
    }

    public getId() : String{
        return this.id;
    }

    public setEmoji(emoji : String){
        this.emoji = emoji;
    }


    //根据变化的任务的相应状态改变相应NPC头顶的符号
    onChange(task : Task){

        //任务刚创建时
        if(task.getStatus() == TaskStatus.ACCEPTABLE){
            if(this.id == task.getFromNpcId()){
                this.emoji = "yellow !";
            }
        }else if(task.getStatus() == TaskStatus.DURING){
            if(this.id == task.getFromNpcId()){
                this.emoji = "";
            }
            if(this.id == task.getToNpcId()){
                this.emoji = "yellow ?";
            }
        }else if(task.getStatus() == TaskStatus.SUBMITTED){
            this.emoji = "";
        }
        new Main().showEmoji(this.emoji);
    }
}