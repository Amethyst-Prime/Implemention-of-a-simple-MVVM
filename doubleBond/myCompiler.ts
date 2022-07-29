import {MVVM} from "./myMVVM";
import {Observer} from "./doubleBond";
export class Compile {
    vm: MVVM;
    node:any;
    constructor(vm:MVVM) {
        this.vm = vm;
        this.node = vm.node;
        this.compile();
    }

    compile() {
        this.traverse(this.node);
    }

    traverse(node:any) {
        if(node.nodeType === 1) {
            this.compileNode(node);
            node.childNodes.forEach((childNode: any) => {
                this.traverse(childNode);
            });
        }else if(node.nodeType === 3) {
            this.renderText(node);
        }
    }

    // 处理指令
    compileNode(node:any) {
        let attrsArr = Array.from(node.attributes);
        attrsArr.forEach((attr:any) => {
            if(this.isModel(attr.name)) {
                this.bindModel(node, attr);
            }else if(this.isHandle(attr.name)) {
                this.bindHandle(node, attr);
            }
        });
    }

    bindModel(node:any, attr:any) {
        let key = attr.value;
        node.value = this.vm.data[key];
        console.log(node.value)
        new Observer(this.vm, key, function(newVal:any){
            node.value= newVal;
        });
        node.addEventListener('oninput',(e:any) => {
           this.vm.data[key] = e.target.value;

        })
        /*node.oninput = (e:any) => {
            console.log('inputProcess')
            this.vm.data[key] = e.target.value;
        };*/
    }

    bindHandle(node:any, attr:any) {
        let startIndex = attr.name.indexOf(':')+1;
        let endIndex = attr.name.length;
        let eventType = attr.name.substring(startIndex, attr.name.length);
        let method = attr.value;
        node.addEventListener(eventType, this.vm.methods[method]);
    }

    // 判断指令
    isModel(attrName:string) {
        return (attrName === 'v-model');
    }

    isHandle(attrName:string) {
        return (attrName.indexOf('v-on') > -1);
    }

    renderText(node:any) {
        let reg = /{{(.+?)}}/g;
        let match;
        while(match = reg.exec(node.nodeValue)) {
            let sample = match[0];
            let key = match[1].trim();
            node.nodeValue = node.nodeValue.replace(sample, this.vm.data[key]);
            new Observer(this.vm, key, function(newVal:any, oldVal:any) {
                node.nodeValue = node.nodeValue.replace(oldVal, newVal);
            });
        }
    }

}