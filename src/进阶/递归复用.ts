/* 
  遇到数量不确定的问题，就要想到递归
*/
// Promise 的 递归复用
type getPromiseType<T extends Promise<any>> = 
  T extends Promise<infer R> 
  ? R extends Promise<any> 
    ? getPromiseType<R> 
    : R
  : never
type test = Promise<Promise<Promise<Promise<Record<string, any>>>>>
type getPromiseTypeTest = getPromiseType<test>

// 数组的递归
type ReserveArr<T extends unknown[]> = 
  T extends [infer R, ...infer Rest] 
  ? [...ReserveArr<Rest>, R]
  : T
type ReserveArrTest = ReserveArr<[1,2,3,4]>

// 数组查找
type includeType<Arr extends unknown[], Find> = 
  Arr extends [infer First, ...infer Rest] 
  ? First extends Find 
    ? true 
    : includeType<[...Rest], Find>
  : false
type includeTypeTest = includeType<[1,2,3,4], 1|5>

// 数组删除
type RemoveType<T extends unknown[], Remove> = 
  T extends [infer First, ...infer Rest] 
  ? First extends Remove 
    ? RemoveType<[...Rest], Remove>
    : [First, ...RemoveType<[...Rest], Remove>]
  : []
type RemoveTypeTest = RemoveType<[1,2,3,2,5], 2>

// 构造固定数量的数组
type buildArr<Len extends number, Type, Result extends unknown[] = []> = 
  Result["length"] extends Len 
  ? Result 
  : buildArr<Len, Type, [...Result, Type]>
type buildArrTest = buildArr<3, string>

/* 
  字符串的递归
*/
// 替换字符串
type ReplaceAllType<Str extends string, form extends string, to extends string> = 
  Str extends `${infer Prefix}${form}${infer Suffix}` ? ReplaceAllType<`${Prefix}${to}${Suffix}`, form, to> : Str
  type ReplaceAllType2<Str extends string, form extends string, to extends string> = 
  Str extends `${infer Prefix}${form}${infer Suffix}` ? `${Prefix}${to}${ReplaceAllType<Suffix, form, to>}` : Str
type ReplaceAllTypeTest = ReplaceAllType<"12343", "3", "666">
type ReplaceAllTypeTest2 = ReplaceAllType2<"12343", "3", "666">
// TODO: 实现 "12343", "3" | "4", "666"
type ReplaceAllType3<Str extends string, form extends string, to extends string> = 
  Str extends `${infer Prefix}${infer Form extends form}${infer Suffix}` ? ReplaceAllType<`${Prefix}${to}${Suffix}`, form, to> : Str
type ReplaceAllTypeTest3 = ReplaceAllType3<"12343", "3" | "4", "666">

// 把字符串字面量类型的每个字符提取为 联合类型, 即 brk => "b" | "r" | "k"
type StrToUnion<Str extends string> = Str extends `${infer Left}${infer Right}` ? Left | StrToUnion<Right> : never
type StrToUnionTest = StrToUnion<"brk">

// 字符串反转
type ReserveStr<Str extends string> = Str extends `${infer Left}${infer Right}` ? `${ReserveStr<Right>}${Left}` : ""
type ReserveStrTest = ReserveStr<"brk">

/* 
  对象的递归
*/
// 深度递归
type DeepReadOnly<obj extends Record<string, any>> = {
  readonly [key in keyof obj]: 
    obj[key] extends Record<string, any> 
    ? obj[key] extends Function 
        ? obj[key] 
        : DeepReadOnly<obj[key]> 
    : obj[key]
}
type obj = {
  a: {
      b: {
          c: {
              f: () => 'dong',
              d: {
                  e: {
                      guang: string
                  }
              }
              e: null
          }
      }
  }
}
type DeepReadOnlyTest = DeepReadOnly<obj>
type DeepReadOnlyTesta = DeepReadOnly<obj>["a"]
type DeepReadOnlyTestab = DeepReadOnly<obj>["a"]["b"]
type DeepReadOnlyTestabc = DeepReadOnly<obj>["a"]["b"]["c"]
export {}