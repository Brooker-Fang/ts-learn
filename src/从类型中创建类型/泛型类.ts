class NumberClass<NumType> {
  value: NumType
  constructor(value: NumType) {
    this.value = value
  }
  add: ((a: NumType, b: NumType) => NumType) | undefined 
}

let newNum = new NumberClass<number>(1)
newNum.value = 2
newNum.add = (a: number, b: number) => {
  return a + b
}

// 工厂函数
class Person {
  person: boolean = true
}

class Man extends Person {
  isMan: boolean = true
}
class Woman extends Person {
  isWoman: boolean = true
}

function createInstanceof<Type>(ctor: new () => Type):Type {
  return new ctor()
}

console.info(createInstanceof(Man).isMan)
console.info(createInstanceof(Woman).isWoman)