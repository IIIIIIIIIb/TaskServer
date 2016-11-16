class Task{


    private id : String;

    private name : string;

    private desc : String;

    private status : TaskStatus;

    private fromNpcId : String;

    private toNpcId : String;


    constructor(id : String, name : string, status : TaskStatus, fromNpcId : String, toNpcId : String){

        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;

    }


    public getId() : String{

        return this.id;
    }

    public getName() : string{

        return this.name;
    }

    public getStatus() : TaskStatus{

        return this.status;
    }

    public getFromNpcId() : String{

        return this.fromNpcId;
    }

    public getToNpcId() : String{

        return this.toNpcId;
    }

    public setStatus(taskStatus : TaskStatus) : void{

        this.status = taskStatus;
    }


}    