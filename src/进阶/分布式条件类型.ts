/* 
  分布式条件类型：
    如果类型参数不是裸类型时，并且类型参数为联合类型时，并且在条件类型左边直接应用该类型参数的时候，ts会把每个类型单纯传入做类型运算，最后在合并成联合类型。
*/

type UnionStr = "a" | "b" |"c"
type UpperCaseString<T> = T extends string ? Uppercase<T> : T
type UpperCaseStringTest = UpperCaseString<UnionStr>
type formatStr = `${UnionStr}!`

// CamelCaseUnion "aaa_bbb_ccc" => "aaaBbbCcc"
type CamelCaseUnion<T extends string> = T extends `${infer Left}_${infer RightFirst}${infer Rest}` ? `${Left}${Uppercase<RightFirst>}${CamelCaseUnion<Rest>}` : T
type CamelCaseUnionTest = CamelCaseUnion<"aaa_bbb_ccc">
type CamelCaseUnionTest2 = CamelCaseUnion<"aaa_bbb_ccc" | "bbb_ddd_eee" | "aaa_ffff_ggg">

/* 
  根据extends 条件分布的特性判断是否是联合类型
*/
type isUnion<A, B = A> = 
  A extends A // 可以触发分布式条件
  ? [B] extends [A] 
    ? false
    : true
  : never
  type isUnionTest = isUnion<"1"> // ("1" extend "1"  ? ["1"] extends ["1"] ? false : true) 
  type isUnionTest2 = isUnion<"1" | "2">
  // ("1" extend "1" | "2" ? ["1" | "2"] extends ["1"] ? false : true) | !"2" extend "1" | "2" ? ["1" | "2"] extends ["1" | "2"])

// BEM: bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。
// 传入 block、element、modifier，返回构造出的 class 名,如 type bemResult = BEM<'block', ['div', 'span'], ['warning', 'success']>;
type BEMType<block extends string, ele extends string[], actions extends string[]> = `.${block}_${ele[number]}--${actions[number]}`
type BEMTypeTest = BEMType<'block', ['div', 'span'], ['warning', 'success']>
// Element 和 Modifiers 通过索引变成联合类型


export {}