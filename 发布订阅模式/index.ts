class Subject {
    observers:Observer[]
    constructor(){
        this.observers = [];
    }

    addObserver(observer:Observer) {
        //添加观察者，即订阅者
        this.observers.push(observer);
    }

    notify(msg:string){
        //发布消息
        for(let observer in this.observers){
            this.observers[observer].update(msg)
        }
    }
};

class Observer {
    name:string
    constructor(name: string) {
        this.name = name;
    }
    update(msg: string){
        //将数据变化体现在View中
        console.log(this.name + ' updated:' + msg);
    }
    subscribe(subject:Subject) {
        //订阅发布者
        subject.addObserver(this);
    }
}

var Reese = new Observer('Reese');
var Tom = new Observer('Tom');
var sub = new Subject();
Reese.subscribe(sub);
Tom.subscribe(sub);
sub.notify('new message');
