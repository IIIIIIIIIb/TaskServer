class TaskPanel implements Observer{Button

    private id : String;

    constructor(id : String){
        this.id = id;
    }

    public getId() : String{
        return this.id;
    }

    
    onChange(task : Task){
        if(task.getStatus() == TaskStatus.ACCEPTABLE){
            new Main().showPanel(task, "taskpanel not accept");
        }
        if(task.getStatus() == TaskStatus.DURING){
            new Main().showPanel(task, "taskpanel accept");
        }
        if(task.getStatus() == TaskStatus.SUBMITTED){
            new Main().showPanel(task, "taskpanel submit");
        }
        if(task.getStatus() == TaskStatus.ACCEPTABLE && Main.click){
            new Main().showPanel(task, "accept");
        }else if(task.getStatus() == TaskStatus.DURING ){
            new Main().showPanel(task, "finish")
        }
        Main.click = false;
    }
}