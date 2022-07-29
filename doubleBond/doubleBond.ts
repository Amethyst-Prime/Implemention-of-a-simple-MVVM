import {MVVM} from "./myMVVM"
export let currentObs:any = null;
let id:number = 0;

export class Subject {
    id:number;
    observers:Observer[];
    constructor() {
        this.id = id++;
        this.observers = [];
    }

    addObserver(observer:Observer):void {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
}

export class Observer{
    subjects: any;
    vm: MVVM;
    key: string;
    callback: Function;
    val: string;
    constructor(vm:MVVM, key:string, callback:Function) {
        this.subjects = {};
        this.vm = vm;
        this.key = key;
        this.callback = callback;
        this.val = this.getVal();
    }
    update() {
        var oldVal = this.val;
        var newVal = this.getVal();
        if(oldVal !== newVal) {
            this.val = newVal;
            this.callback.bind(this.vm)(newVal, oldVal);
        }
    }

    getVal() {
        console.log('getValue fun in class observer');
        currentObs = this;
        let val = this.vm.data[this.key as keyof object];
        currentObs = null;
        return val;
    }

    subscribeTo(subj:Subject) {
        //订阅到观测主体
        let id=subj.id;
        if(!this.subjects[id]) {
            subj.addObserver(this);
            this.subjects[id] = subj;
            console.log('property '+this.key + ' subscribe to ' + 'subject '+subj.id);
        }
    }

}

let testMvvm = new MVVM({
    node:"#app",
    data: {
        name: 'Reese',
        age: 20,
        sex: '',
        major: '',
        id: 1234567,
    },
    methods: {
        hello: function() {
            alert('welcome!');
        }
    }
});
