interface IdTpe {
  id: number
}
interface NameType {
  name: string
}

// 重载
function create(id: number): IdTpe
function create(name: string): NameType
function create(nameOrId: number | string) : IdTpe|NameType
function create(nameOrId: number | string) : IdTpe|NameType {
  throw ""
}

type NameOrId<Type extends number | string> = Type extends number ? IdTpe: NameType

function createLabel<T extends number | string>(nameOrId: T):NameOrId<T>{
  throw ""
}
// type a = IdTpe
let a = createLabel(123)
// type a = NameType
let v = createLabel("123")

type Exclude<T, U> = T extends U ? never : T
type ExcludeNumber= Exclude<number|string, number> // string
// 即结果为 string extends number ? never : string | number extends number ? never : number
// 所以结果为 string 

type toArray<Type> = Type extends any ? Type[] : never
type NumberString = toArray<number | string> // string[] | number[]

export {}