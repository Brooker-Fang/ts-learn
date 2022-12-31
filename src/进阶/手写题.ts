/* 
  https://juejin.cn/post/7009046640308781063
  https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%B8%80%E4%BA%9B%E7%94%A8%E4%BE%8B 
*/

// 实现 aaa-bbb-ccc => aaaBbbCcc
type KebabCaseToCamelCase<T extends string> = 
  T extends `${infer Left}-$${infer Rest}` 
  ? `${Left}${KebabCaseToCamelCase<Capitalize<Rest>>}`
  : T

type KebabCaseToCamelCaseTest = KebabCaseToCamelCase<"aaa-bbb-ccc">

// 实现 aaaBbbCcc => aaa-bbb-ccc
type CamelCaseToKebab<T extends string> = 
  T extends `${infer First}${infer Rest}`
  ? First extends Lowercase<First>
    ? `${First}${CamelCaseToKebab<Rest>}`
    : `-${Lowercase<First>}${CamelCaseToKebab<Rest>}`
  : T
type CamelCaseToKebabTest = CamelCaseToKebab<"aaaBbbCcc">

/* 
  Chunk: 实现对数组做固定长度的分组，并返回分组的数组 
  如 [1,2,3,4,5] => [[1,2],[3,4],[5]]
*/
type Chunk<Arr extends unknown[], Len extends number, Current extends unknown[] = [],Result extends unknown[] = []> = 
  Arr extends [infer First, ...infer Rest] 
  ? Current["length"] extends Len 
    ? Chunk<Rest, Len,  [First], [...Result, Current]> 
    : Chunk<Rest, Len,  [...Current, First], Result>
  : [...Result, Current]
type ChunkTest = Chunk<[1,2,3,4,5,6,7], 2>

/* 
  根据数组类型，如["a", "b", "c"] 以及值的类型，构造为 
  {
    a: {
        b: {
            c: 'xxx'
        }
    }
  }
*/
type TupleToNestedObject<Arr extends unknown[], T> = 
  Arr extends [infer First, ...infer Rest] 
  ? 
    {
      [Key in First  as Key extends  keyof any ? Key : never]: Rest extends unknown[] ? TupleToNestedObject<Rest, T> : T
    } 
  : T
// keyof any 表示可用作对象索引的任何值的类型。即 string | number | symbol
type TupleToNestedObjectTest = TupleToNestedObject<["a","b",number,"c"], string>

type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]:Obj[Key]
}

// PartialObjectPropByKeys 实现把一个索引类型的某些key转为可选的,其余key不变
type PartialObjectPropByKeys<Obj extends Record<string, any>, T extends keyof Obj> = Copy<Partial<Pick<Obj, T>> & Omit<Obj, T>>
// 因为 ts 的类型只有在用到的的时候才会去计算，所以用Copy去做一层映射

type PartialObjectPropByKeysTest = PartialObjectPropByKeys<{name: string, age: number, sex: string}, "name" | "sex">


/* 
  UnionToTuple联合类型转元组类型:
    利用ReturnType返回的是重载函数的最后一个重载的返回值类型的特性 
*/
export {}