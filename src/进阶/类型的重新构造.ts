/* 
  数组的重新构造
*/
type Push<Arr extends unknown[], Type> = [...Arr, Type]
type PushTest= Push<[number, boolean, string], number>

/* 
  合并
*/
type type1 = [1,2]
type type2 = ["1", "2"]

// 合并为 [[1,"1"], [2,"2"]]
type Zip<First extends unknown[], Two extends unknown[]> =
  First extends [infer A, infer B] ? 
    Two extends [infer C, infer D] ? 
     [[A,C],[B,D]] : []
     : []

type ZipTest = Zip<type1, type2>

// 递归多个
type ZipRecursion<First extends unknown[], Two extends unknown[]> =
  First extends [infer A, ...infer B] ? 
    Two extends [infer C, ...infer D] ? 
     [[A,C],...ZipRecursion<B,D>] : []
     : []
type ZipRecursionTest = ZipRecursion<[1,2,3,4,5], ["1", "2", "3", "4", "5"]>

/* 
  字符串类型的重新构造
*/

// 首字母转大写
type CapitalizeStrType<Str extends string> = Str extends `${infer R}${infer Suffix}` ? `${Uppercase<R>}${Suffix}` : never
type CapitalizeStrTypeTest = CapitalizeStrType<"brk">

// 实现 aaa_bbb_ccc => aBbbCcc
type CamelCaseType<Str extends string> = 
  Str extends `${infer First}_${infer Right}${infer Rest}` 
  ? `${First}${Uppercase<Right>}${CamelCaseType<Rest>}` 
  : Str
type CamelCaseTypeTest= CamelCaseType<"aaa_bbb_ccc">

// 删除字符串的字串
type DeleteStrTyp<Str extends string, del extends string> = 
  Str extends `${infer Prefix}${del}${infer Suffix}` ? DeleteStrTyp<`${Prefix}${Suffix}`, del> : Str
type DeleteStrTypTest = DeleteStrTyp<"1,2,3,4", ",">

/* 
  函数类型的重新构造
*/
// 添加一个参数类型
type appendFunctionType<T extends Function, Type> = 
  T extends (...args: infer R) => unknown 
  ? (...args: [...R, Type]) => unknown : never
type appendFunctionTypeTest = appendFunctionType<(a:string, b: number) => void, boolean>

// 索引类型的重新构造
type obj = {
  name: string
  age: number
} 
type Mapping<T extends Object> = {
  [key in keyof T]: T[key]
}
type Mapping2<T extends Object> = {
  [key in keyof T]: [T[key], T[key],T[key]]
}
type Mapping2Test = Mapping2<{a:1, b:2}>

// 对key做重映射
type UppercaseKey<T extends Object> = {
  [key in keyof T as Uppercase<key & string>] : T[key]
}
type UppercaseKeyTest = UppercaseKey<{a:1, b:2,}>

// Record
type MyRecord<K extends string | number | symbol, T> = {
  [key in keyof K] : T
}
type OptimizationUppercaseKey<Obj extends MyRecord<string, any>> = {
  [key in keyof Obj as Uppercase<key & string>]: Obj[key]
}
// toRecordReadOnly
type toRecordReadOnly<K extends string | number | symbol, T> =  {
  readonly [key in keyof K]: T
}
// toPartial
type toPartial<T extends Object> = {
  [key in keyof T]?: T[key]
}

// 去掉readonly 和 可选
type toMutable<T extends Object> = {
  -readonly[key in keyof T]: T[key]
}
type toRequired<T extends Object> = {
  [key in keyof T]-?: T[key]
}

// 过滤类型
type FiltersType<T extends Record<string, any>, Filters> = {
  [key in keyof T as T[key] extends Filters ? never:key]: T[key]
}
type FiltersTypeTest = FiltersType<{a:string,b:number,c:boolean}, string | number>
