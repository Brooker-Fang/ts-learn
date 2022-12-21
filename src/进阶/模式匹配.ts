// 怎么获取Promise里的类型
type p = Promise<"hello">
type getPromiseType<T> = T extends Promise<infer R> ? R : never 

// 数组类型想提取第一个元素的类型
type getArrFirstType<T extends unknown[]> = T extends [infer R, ...unknown[]] ? R : never
type first = getArrFirstType<[1,"2", true]>
type firstType = getArrFirstType<[number,string, boolean]>

// 获取数组最后一个元素类型
type getArrLastType<T extends unknown[]> = T extends [...unknown[], infer R] ? R : never
type last = getArrLastType<[1,"2", true]>
type lastType = getArrLastType<[number,string, boolean]>

// 获取数组除最后一个的类型
type getPopType<T extends unknown[]> = 
  T extends [] ? [] // 排除空数组[]
  : T extends [...infer R, unknown] 
  ? R : unknown

// 判断字符串是否以某个前缀开头
type StartWithType<Str extends string, Prefix extends string> = 
  Str extends `${Prefix}${string}` ? true : false

type test = StartWithType<"hello", "h">
type test2 = StartWithType<"hello", "l">

// Replace 替换字符串
type ReplaceType<Str extends string, from extends string, to extends string> = 
  Str extends `${infer Prefix}${from}${infer Suffix}` ? `${Prefix}${to}${Suffix}` : Str
type ReplaceTypeTest = ReplaceType<"hello", "h", "w">

// Trim 去掉空白字符
type TrimType<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer R}${' ' | '\n' | '\t'}` ? R : never
type TrimTypeTest = TrimType<" 123 ">
type TrimAllType<Str extends string> = Str extends ` ${infer Prefix} ${infer Suffix} ` ? `${Prefix}${Suffix}` : never
type TrimAllTypeTest = TrimAllType<" 1 23 ">

// 获取函数参数类型
type getParams<T extends Function> = T extends (...args: infer R) => unknown ? R : never
type getParamsTest= getParams<(a: string, b: number) => void>

// 获取函数参数返回值
type getReturnType<T extends Function> = T extends (...args: infer R) => infer Return ? Return:never
type getReturnTypeTest1= getReturnType<(a: string, b: number) => void>
type getReturnTypeTest2= getReturnType<(a: string, b: number) => number>

// GetThisParameterType
type GetThisParameterType<T extends Function> = T extends (this: infer R, ...args: unknown[]) => unknown ? R : never
class Person {
  name: string
  constructor(value: string) {
    this.name= value
  }
  // this 为了防止call、apply调用时改变this时，编译器不报错的问题
  hello(this: Person) {
    return this.name
  }
  helloNoThis () {
    return this.name
  }
}
const p = new Person("brk")
// p.hello.call({name: "test"}) // Error
p.helloNoThis.call({name: "test"})

type GetThisParameterTypeText = GetThisParameterType<typeof p.hello>

// 获取构造器类型
type getConstructType<Ctor extends new (...arg: any) => unknown> = Ctor extends new (...arg: any) => infer InstanceType ? InstanceType : never
interface PersonTest {
  name: string
}
interface ConstructorTest {
  new (name: string): PersonTest
}
type getConstructTypeTest = getConstructType<ConstructorTest> 

// 获取构造器参数类型
type getConstructParamsType<Ctor extends new (...arg: any) => unknown> = Ctor extends new (...args: infer R) => any ? R : never
type getConstructParamsTypeTest = getConstructParamsType<ConstructorTest>

// 获取ref
type getRefProps<Props> = 
  "ref" extends keyof Props 
  ? Props extends {ref: infer R} 
    ? R 
    : never 
  : never
type getRefPropsTest = getRefProps<{ref: number}>

/* 
  当对索引类型做模式匹配的时候，如果有readonly等修饰符，通过模式匹配提取类型时也要加修饰符
*/
const arrCons = [1,2,3] as const
type reverseArr<Arr> = Arr extends readonly [infer A, infer B, infer C] ?  [C,B, A] : []
type reverseArrTest = reverseArr<typeof arrCons>

// parseQueryString
type paresParam<T extends string> = T extends `${infer L}=${infer R}` ? {[key in L]: R} : {}
type paresParamTest = paresParam<"a=1">

// 合并值逻辑是：如果类型相同就返回一个，否则构造一个数组类型来合并
type mergeValue<Left, Right> = Left extends Right ? Left : Right extends unknown[] ? [Left, ...Right] : [Left, Right]
type mergeParams<Left extends Record<string, any>, Right extends Record<string, any>> = {
  [key in keyof Left | keyof Right] : 
    key extends keyof Left 
      ? key extends keyof Right 
        ? mergeValue<Left[key], Right[key]>
        : Left[key]
      : key extends keyof Right 
      ? Right[key]
      :never
}

type parseQueryString<T extends string> = T extends `${infer Left}&${infer Right}` ? mergeParams<paresParam<Left>, parseQueryString<Right>> : paresParam<T>
type parseQueryStringTest = parseQueryString<"a=1&b=2&c=3">
export {}