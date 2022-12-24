// ParametersType
type ParametersType<T extends Function> = T extends (...args: infer R) => unknown ? R : never 
type ParametersTypeTest = ParametersType<() => void>
// ReturnType
type myReturnType<T extends (...arg: any) => any> = T extends (...arg: any) => infer R ? R : never

// ConstructorParameters
type myConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer R) => unknown ? R : never 

// InstanceType
type myInstanceType<T extends abstract new(...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : never

// ThisParameterType
type myThisParameterType<T> = T extends (this: infer R, ...args: any) => any ? R : unknown

type Person = {
  name: string
}
function hello(this: Person, name: string) {
  return this
}
type myThisParameterTypeTest = myThisParameterType<typeof hello>

// OmitThisParameter: 去除掉this参数
type myOmitThisParameter<T> = unknown extends myThisParameterType<T> // myThisParameterType<T> 如果返回unknown, 说明参数中没有this参数
  ? T : T extends (this: infer R, ...args: infer Rest) => unknown? (...args: Rest) => unknown : T
type  OmitThisParameterTest = myOmitThisParameter<typeof hello>

// Partial
type myPartial<T extends Record<string, any>> = {
  [key in keyof T]?: T[key] 
}

// Required
type myRequired<T> = {
  [key in keyof T]-?: T[key] 
}

// Readonly
type myReadonly<T> = {
  readonly [key in keyof T]: T[key]
}

// Pick
type myPick<Obj extends Record<string, any>, T extends keyof Obj> = {
  [key in T]: Obj[key]
}

type myPickTest = myPick<{name: number, age: string, sex: string}, "name" | "sex">

// Record
type myRecord<L extends string | number | symbol, T> = {
  [key in keyof L]: T
}

// Omit
type myOmit<Obj extends Record<string, any>, T extends keyof Obj> = {
  [key in keyof Obj as key extends T ? never : key]: Obj[key]
}
type myOmit2<Obj extends Record<string, any>, T extends keyof Obj> = Pick<Obj, myExclude<keyof Obj, T>>

type myOmitTest = myOmit<{name: number, age: string, sex: string}, "name" | "sex">
type myOmitTest2 = myOmit2<{name: number, age: string, sex: string}, "name" | "sex">

// Exclude
type myExclude<T, U> = T extends U ? never : T
type myExcludeTest = myExclude<"a" | "b" | "c", "a">

// Extract 保留
type myExtract<T, U> = T extends U ? T : never
type myExtractTest = myExtract<"a" | "b" | "c", "a">

// Awaited 判断Promise类型
type myAwaited<T> = 
  T extends undefined | null 
    ? T
    : T extends object & {then(onfulfilled: infer F): any}
      ? F extends ((value: infer value, ...args: any) => any)
        ? myAwaited<value>
        : F
      : T
/* 
  Promise.all、race 
  all 是等所有promise执行完一起返回，race是有一个执行完就返回
  约束为 unknown[] | [] 就是 as const 的意思
*/
type myPromiseClass = {
  all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [val in keyof T]: Awaited<T[val]>}>
  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
}
// 约束为 unknown[] | [] 就是 as const 的意思
declare function test<T extends readonly unknown[]>(value: T): T
const res = test([1,2,3]) // number[]

declare function test2<T extends readonly unknown[] | []>(value: T): T
const res2 = test2([1,2,3]) // [number, number, number]

// 判断是不是非空类型
type NonNullable<T> = T extends null | undefined ? never : T
export {}