/* 
  any: any与任何类型交叉的结果都是any
*/
type IsAny<T> = 1 extends "1" & T ? true : false

/* 
  isEqual
*/
type isEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type isEqualTest = isEqual<"1", "1">
type isEqualTest1 = isEqual<"1", 1>
type isEqualTest2 = isEqual<"1", any>

type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? false : true;
/* 
  根据extends 条件分布的特性判断是否是联合类型
*/
type isUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : false
type isUnionTest = isUnion<"1"> // ("1" extend "1"  ? ["1"] extends ["1"] ? false : true) 
type isUnionTest2 = isUnion<"1" | "2">
// ("1" extend "1" | "2" ? ["1" | "2"] extends ["1"] ? false : true) | !"2" extend "1" | "2" ? ["1" | "2"] extends ["1" | "2"])


/* 
  never在条件类型中比较特殊，如果条件类型左边类型参数是never，会直接返回never
*/
type testNever<T> = T extends number ? 1 : 2
type testNeverTest = testNever<never>

type IsNever<T> = [T] extends [never] ? true : false
type IsNeverTest = IsNever<never>

/* 
  元组类型的length是数字字面量，而数组的length是number
*/
type IsTuple<T> = T extends [...infer R] ? NotEqual<R['length'], number> extends number ? false : true : false
type IsTupleTest1 = IsTuple<"1">
type IsTupleTest2 = IsTuple<[1,2,"3"]>
type IsTupleTest3 = IsTuple<number[]>

/* 
  如果允许父类型赋值给子类型，叫逆变
  如果允许子类型赋值给父类型，叫协变.
  两个类型的交叉类型 为 两个类型联合类型的子类型
  ts 函数参数是有逆变性质的，如果参数可能是多个类型，参数类型会变成它们的交叉类型
*/
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never
type UnionToIntersectionTest = UnionToIntersection<{a: 1} | {b: "c"}>
// (x: {a: 1}) => unknown extends (x: infer R) => unknown ? R : never | (x: {b: "c"}) => unknown extends (x: infer R) => unknown ? R : never

/* 
  提取索引类型中的可选索引：
    根据索引类型的特性，可选索引的值为undefined 和 值类型的联合类型
  Pick是取出索引类型的某个key 构造新的索引类型，当key属性是可选时，Pick新构造的类型就是{}
*/
type getOptions<T extends Record<string, any>> = {
  [key in keyof T as {} extends Pick<T, key> ? key : never] : T[key]
}

type getOptionsTest = getOptions<{
  name: string,
  age?: number
}>

/* 
  索引类型可能有索引，也可能有索引类型,如
    type Obj = {
      [key: string]: any
      name: string
      log(): void
    }
    [key: string]: any 就是可索引签名，代表可以添加任意个string类型的索引。
    可索引签名，因为没有名字的特性，而不能构造成字符串字面量类型，所以可以根据这个特性过滤
*/

type removeIndexSignature<T extends Record<string, any>> = {
  [key in keyof T as key extends `${infer R}` ? R : never]: T[key]
}
type removeIndexSignatureTest = removeIndexSignature<{
  [key: string]: any
  name: string
  log(): void
}>

/* 
  如何过滤出class的public属性: keyof 会过滤出只有public的属性
*/
class Person{
  public name: string
  private age: number
  protected sex: string
  constructor() {
    this.name = "brk"
    this.age = 18
    this.sex = "man"
  }
}
type classFilterPublicProps<T extends Record<string, any>> = {
  [key in keyof T]: T[key]
}
type classFilterPublicPropsTest = classFilterPublicProps<Person>

/* 
  as const: ts默认推导出来的类型不是字面量类型, 加上as const推导出来的是带有readonly修饰的字面量类型
*/
const obj = {
  name: "brk",
  age: 18
}
type Obj = typeof obj
const obj2 = {
  name: "brk",
  age: 18
} as const
type ObjConst = typeof obj2 

/* 
  当对索引类型做模式匹配的时候，如果有readonly等修饰符，通过模式匹配提取类型时也要加修饰符
*/
const arrCons = [1,2,3] as const
type reverseArr<Arr> = Arr extends readonly [infer A, infer B, infer C] ?  [C,B, A] : []
type reverseArrTest = reverseArr<typeof arrCons>

/* 
  总结：
    any 和 任何类型交叉结果都是any，如1 & any，可以通过这个类型去判断是不是any
    联合类型作为类型参数在条件判断左侧时，会对联合类型的每个类型做分发判断
    never类型作为类型参数出现在条件判断左侧时，会直接返回never
    any类型作为类型参数出现在条件判断的左侧时，会返回trueType 和 falseType的联合类型
    元组类型也是数组类型，但元组的length是数字字面量，数组的length是number类型
    函数参数处会发生逆变，可以用来实现联合类型转交叉类型
    可选索引可能没有，那Pick出来的就可能是{}，可以通过这性质来过滤可选索引
    索引类型的所有为字符串字面量类型，而可索引签名不是，可以通过这个特性来过滤可所有签名
    keyof 只能拿到class的public属性的索引
    ts默认推导出来的不是字面量类型，加上as const可以推导出带有readonly修饰符的字面量类型，
    当带有readonly修饰符时，做模式匹配的时候也要加上readonly
*/
export {}