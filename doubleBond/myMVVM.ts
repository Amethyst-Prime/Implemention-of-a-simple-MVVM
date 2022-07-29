import {Compile} from "./myCompiler";
import{observe} from "./myObserve";
export class MVVM {
    data: any;
    node:any
    methods:any
    constructor(opts:any) {
        this.data = opts.data;
        this.init(opts);
        observe(this.data);
        new Compile(this);
    }
    init(opts:any) {
        this.node = document.querySelector(opts.node);
        //this.node= opts.node
        this.data = opts.data || {};
        this.methods = opts.methods || {} ;

        for(let key in this.methods) {
            this.methods[key] = this.methods[key].bind(this);
        }

        for(let key in this.data) {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,

                get: ()=> {
                    return this.data[key as keyof object];
                },

                set: (newVal:any)=> {
                    this.data[key as keyof object] = newVal;
                }
            });
        }
    }
}