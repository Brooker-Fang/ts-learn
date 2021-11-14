// keyof Type，为后面的Type的所有的key值的集合
interface Person {
  name: string,
  age: number
}
type otherType = keyof Person // "name" | "age" | "sex"
let d: otherType = "name"

type otherAnimalType = keyof {[x: string]: Person } // string | number

export {}