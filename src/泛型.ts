export {}
// 泛型 即将不能确定的类型变为一个参数， 即类型变量， 这里T可以理解为 类型的变量，即可为 动态传入的类型，当T为string，则返回 string[]
// 可以指定默认类型，如 T = string
function createArr<T = string> (length: number, val: T) :T[] {
  return Array<T>(length).fill(val)
}
const strArr = createArr<string>(3, 'str') // ['str', 'str','str']
const numArr = createArr<number>(4, 100) // ['100', '100','100']

// 泛型对象类型
interface Person<Type> {
  obj: Type
}
const p1:Person<{name: string}> = {
  obj: {
    name: "fhh"
  }
}
const p2:Person<{age: number}> = {
  obj: {
    age: 18
  }
}

type OrNull<Type> = Type | null
type OneOrMany<Type> = Type | Type[]
type OneOrManyOrNull<Type> = OneOrMany<OrNull<Type>>
type OneOrManyOrNullString = OneOrManyOrNull<string>