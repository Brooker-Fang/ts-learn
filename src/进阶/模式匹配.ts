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
export {}