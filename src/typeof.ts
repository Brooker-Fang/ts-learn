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

// ReturnType<T> 读取函数的返回值类型

type Fn = (x: unknown) => boolean
type FnReturnType = ReturnType<Fn> // boolean

function f() {
  return {
    age: 18,
    name: "fhh"
  }
}

type fReturn = ReturnType<typeof f>  
/* 
  fReturn : {
    age: number;
    name: string;
  }
*/

const arr = [
  {name: "bro", age: 18},
  {name: 111, age: "18"}
]

type arrType = typeof arr[number]
export default {}