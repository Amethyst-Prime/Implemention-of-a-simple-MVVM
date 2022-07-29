import {MVVM} from "./myMVVM";

describe("测试单向绑定插值语法", function () {
    test("测试1",function () {
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "app")
        testNode.textContent = "{{name}}";
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                name: 'Reese',
                age: 20,
                sex: 'male',
                major: '',
                id: 123456789,
            },
            methods: {
                hello: function() {
                    alert('welcome!');
                }
            }
        });
        expect(testNode.textContent).toBe("Reese")
    });
    test("测试2",function () {
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "test")
        testNode.textContent = "{{name}}'s age is {{age}}";
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                name: 'Reese',
                age: 20,
                sex: 'male',
                major: 'SE',
                id: 123456789,
            },
            methods: {
                hello: function() {
                    alert('welcome!');
                }
            }
        });
        expect(testNode.textContent).toBe("Reese's age is 20")
    })
    test("测试3",function () {
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "test")
        testNode.textContent = "{{name}}'s age is {{age}}";
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                name: 'Reese',
                age: 20,
                sex: 'male',
                major: '',
                id: 123456789,
            },
            methods: {
                hello: function() {
                    alert('welcome!');
                }
            }
        });
        testMvvm.data.name='Jack'
        expect(testNode.textContent).toBe("Jack's age is 20")
    })
    test("测试4",function(){
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "test")
        testNode.textContent = "{{name}}'s age is {{age}}";

        let subNode=document.createElement("span")
        subNode.textContent="{{sex}}";

        testNode.appendChild(subNode)
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                sex:'',
            },
            methods: {}
        });
        testMvvm.data.name='Jack'
        testMvvm.data.sex='male'
        expect(subNode.textContent).toBe("male")
    })
})

describe("测试v-model双向绑定",function (){
    test("测试1",function (){
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "app");

        let inputBox=document.createElement('input')
        inputBox.setAttribute('v-model','name')
        inputBox.setAttribute('type','text')
        inputBox.setAttribute('v-on:click','hello')
        testNode.appendChild(inputBox)

        let subNode=document.createElement('h1')
        subNode.textContent="{{name}}"
        testNode.appendChild(subNode)
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                name: 'Reese',
                age: 20,
                sex: 'male',
                major: '',
                id: 123456789,
            },
            methods: {
                hello: function() {
                    alert('welcome!');
                }
            }
        });
        inputBox.value='Tom'
        inputBox.dispatchEvent(new Event('oninput'))
        expect(testMvvm.data.name).toBe("Tom")
    })
    test("测试2",function (){
        let testNode=document.createElement("div");
        testNode.setAttribute("id", "app");

        let inputBox=document.createElement('input')
        inputBox.setAttribute('v-model','age')
        inputBox.setAttribute('type','text')
        testNode.appendChild(inputBox)

        let subNode=document.createElement('span')
        subNode.textContent="{{name}}"
        testNode.appendChild(subNode)
        let testMvvm = new MVVM({
            node:testNode,
            data: {
                name: 'Reese',
                age: 20,
                sex: 'male',
                major: '',
                id: 123456789,
            },
            methods: {
                hello: function() {
                    alert('welcome!');
                }
            }
        });
        inputBox.value='21'
        inputBox.dispatchEvent(new Event('oninput'))
        console.log(window.alert)
        expect(testMvvm.data.age).toBe('21')
    })
})