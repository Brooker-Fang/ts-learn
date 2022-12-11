type Person = {
  age: number
  name: string
}
type Age = Person["age"]

const arr = [
  {name: "bro", age: 18},
  {name: 111, age: "18"}
]

type arrType = typeof arr[number]
export {}