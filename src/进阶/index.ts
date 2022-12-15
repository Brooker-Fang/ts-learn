/* 
  参考网站：
    https://www.teqng.com/2021/07/25/typescript-%E7%9A%84%E5%8F%A6%E4%B8%80%E9%9D%A2%EF%BC%9A%E7%B1%BB%E5%9E%8B%E7%BC%96%E7%A8%8B/
    https://wangtunan.github.io/blog/typescript/challenge.html#tupletounion-%E5%85%83%E7%BB%84%E8%BD%AC%E8%81%94%E5%90%88%E7%B1%BB%E5%9E%8B
*/
/* 
  extends 条件类型的分发特性：
   对于属于裸类型参数的检查类型，条件类型会在做条件判断的时期自动分发到联合类型上
   裸类型：即没有经过数组、元组、promise包裹的类型
*/
/* 
  如果检测类型是单个类型
*/
type StringOrNumberType<T> = T extends string | number ? T : never

type StringType = StringOrNumberType<string> // string
type NumberType =  StringOrNumberType<number> // number

/* 
  如果检测类型是 联合类型
*/
type GetType = StringOrNumberType<string|boolean|number> // string | number
/* 
  在实例化时，即条件判断时，会自动分发为联合类型，即
    ( A | B | C ) extends T ? X : Y
  相当于：
    (A extends T ? X : Y) | (B extends T ? X : Y) | (B extends T ? X : Y)
  即
*/
type GetTypeAnalyze = (string extends string | number ? string : never) 
  | (boolean extends string | number ? boolean : never) 
  | (number extends string | number ? number : never) 
// 所以结果为 string | never | number, 即 string | number
// 再来个栗子
type StringOrNumberArrayType<T> =  T extends string | number ? T[] : never
type GetArrType = StringOrNumberArrayType<string|boolean|number> // string[] | number[]
/* 
  条件判断
*/
type GetArrTypeAnalyze = (string extends string | number ? string[] : never) 
  | (boolean extends string | number ? boolean[] : never) 
  | (number extends string | number ? number[] : never) 

/* 
  当检测类型不是裸类型时，则没有这个分发特性
*/

type WrapType<T> = [T] extends [string | number] ? T[] : never
type GetWrapType = WrapType<string | number> // (string | number)[]
// 相当于 
type GetWrapTypeAnalyze = [string | number] extends [string | number] ? (string | number)[] : never

/* 
  根据分发特性实现Exclude<T, U>, 
    即 把U的所有类型 从T类型中剔除掉
*/
type MYExclude<T,U> = T extends U ? never : T

type ExcludeBoolean = MYExclude<boolean | number | string, boolean>


/* 
  infer
*/
export {}