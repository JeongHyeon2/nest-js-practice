
type MyType = {
    name: string,
    age : number
}

const myPrint = (MyType: MyType) => {
    console.log(`이름은 ${MyType.name} 나이는 ${MyType.age}`)
}

const myTypeTest: MyType = {
    age: 22, name:"정현"
}
myPrint(myTypeTest)



let a: unknown[];
a = [1, "3", true];
console.log(a);
