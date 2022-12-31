/* 
  ts4.7引人新语法：infer extends，infer做模式匹配时，加上extends来约束推导的类型
*/
// 这里如果不用infer extends的话，推导出的Last是unknown类型，加上extends就可以约束推导的类型为string，方便做后续的操作
type getLast<Arr extends string[]> = Arr extends [...infer R, infer Last extends string] ? `${Last}` : never

// infer extends 在4.8时做了优化，如果约束的类型是基础类型，做类型转换
type NumInfer<Str> = Str extends `${infer Num extends number}` ? Num : Str // 如果能转换则转换为number字面量类型，否则为原类型
type test = NumInfer<"123">
type test2 = NumInfer<"abc">

// 可以用来提取枚举的值的类型
enum Code  {
  a = "111",
  b = "222",
  c = "abc"
}
type codeValue = `${Code}` // "111" | "222" | "abc"
type enumStrToNumber<Str> = Str extends `${infer Num extends number}` ? Num : Str
type numberCode = enumStrToNumber<`${Code}`> // "abc" | 111 | 222

// 也可以对boolean 、null其他类型做转换
type StrToBoolean<Str> = Str extends `${infer Str extends boolean}` ? Str : Str
type StrToBooleanTest = StrToBoolean<"true">
type StrToBooleanTest2 = StrToBoolean<"2">
