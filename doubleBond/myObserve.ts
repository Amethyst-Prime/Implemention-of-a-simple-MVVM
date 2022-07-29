import {Subject} from "./doubleBond";
import{currentObs} from "./doubleBond"

export function observe(data: object) {

    if(!data || typeof data !== 'object') return;

    for(var key in data) {

        let val:any = data[key as keyof typeof data];
        let subj = new Subject();

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,

            get:function() {
                if(currentObs) {
                    console.log('currentObs exist : ' + currentObs.key);
                    currentObs.subscribeTo(subj);
                }
                return val;
            },

            set: function(newVal) {
                console.log('set : ' + newVal);
                val = newVal;
                subj.notify();
            }
        });

        if(typeof val ==='object') {
            observe(val);
        }
    }
}