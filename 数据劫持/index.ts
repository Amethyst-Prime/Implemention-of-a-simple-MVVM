interface studentInfo {
    name: string
    age: number
    major:string
    sex:string
    id:number
}

let studentA:studentInfo = {
    name: 'ZhangSan',
    age: 22,
    major:'',
    sex: 'male',
    id: 123456789,
}

function observe(data: object) {
    if(!data|| typeof data !== 'object') return ;
    for(let key in data) {
        //循环遍历对象的所有属性
        let val:any = data[key as keyof object];
        Object.defineProperty(data, key,{
            enumerable: true,
            configurable: true,
            get:function() {
                //读取时调用
                console.log('get fun '+val);
                return val;
            },
            set:function(newVal:any) {
                //写入时调用
                console.log('new value: '+newVal);
                val = newVal;
            }
        });
        if(typeof val === 'object') {
            observe(val);
        }
    }
}

observe(studentA);


studentA.name
studentA.name = 'LiSi';
studentA.name
studentA.major
studentA.major='SE'
studentA.major

