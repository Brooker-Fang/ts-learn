// 给联合类型取个别名
type typeOtherName = string | number
let a : typeOtherName = 1
a = '2'

// 类型别名在很多情况下可以和接口互换


// 和接口interface区别：
// interface不能做到类似 联合类型，如
type typeOtherName2 = string | number

// interface 不能实现 Utility Types，如

function b(name: string ,num: number):void {
  console.log('b')
}
function c(...[name, num]: Parameters<typeof b>) {

}
// 当类型重复时，interface会合并类型，而type则不能同名
interface Person {
  name: string
}
interface Person {
  age: number
}
const obj: Person = {
  name: "fhh",
  age: 18
}

type Person2 = {
  name: string
}
// 报错
// type Person2 = {
//   age: number
// }
export {}