// keyof Type，为后面的Type的所有的key值的集合
interface Person {
  name: string,
  age: number
  sex: string
}
type otherType = keyof Person // "name" | "age" | "sex"
let d: otherType = "name"

type otherAnimalType = keyof {[x: string]: Person } // string | number

function getByProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
export {}