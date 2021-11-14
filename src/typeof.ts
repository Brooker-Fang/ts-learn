// typeof 是读取将后面传入的参数 类型
interface Person {
  name: string,
  age: number
}
let p: Person = {
  name: '1',
  age: 2
}
console.log(typeof p)