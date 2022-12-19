// 构建数组
type buildArr<Len extends number, Type = any, Result extends unknown[] = []> = 
  Result["length"] extends Len ? Result : buildArr<Len, Type, [Type, ...Result]>

// Add
type Add<Num1 extends number, Num2 extends number> =
  [...buildArr<Num1>, ...buildArr<Num2>]["length"]
type AddTest = Add<4,5>

// Subtract 减法
type Subtract<Num1 extends number, Num2 extends number> = [...buildArr<Num1>] extends [...buildArr<Num2>, ...infer R] ? R["length"] : never
type SubtractTest = Subtract<6,3>

// Multiply 乘法，即对第一参数做多次加法
type Multiply<Num1 extends number, Num2 extends number, Result extends unknown[] = []> =
  Num2 extends 0 ? Result["length"] : Multiply<Num1, Subtract<Num2,1>, [...buildArr<Num1>,...Result]>
type MultiplyTest = Multiply<2,222>

// Divide 除法
type Divide<Num1 extends number, Num2 extends number, Result extends unknown[] = []> = 
  Num1 extends 0 ? Result["length"] : Divide<Subtract<Num1,Num2>,Num2, [...Result, 1]>
type DivideTest = Divide<6,2>

// 计算字符串长度
type getStrLen<Str extends string, Res extends unknown[] = []> =
  Str extends `${infer First}${infer Rest}` ? getStrLen<Rest, [First, ...Res]> : Res["length"]
type getStrLenTest = getStrLen<"ydrajshdakdhj">

// 比较俩个数值的大小, Num1是否大于Num2
type GreaterThan<Num1 extends number, Num2 extends number, Res extends unknown[] = []> = 
  Num1 extends Num2 
  ? false
  : Res["length"] extends Num2 
    ? true
    : Res["length"] extends Num1 
      ? false 
      : GreaterThan<Num1, Num2, [any, ...Res]>
type GreaterThanTest = GreaterThan<3,2>

// Fibonacci数列, Fibonacci 数列是 1、1、2、3、5、8、13、21、34、…… 这样的数列，有当前的数是前两个数的和的规律。 
// 计算第几位的值是多少
// type FibonacciLoop<pre extends unknown[], cur extends unknown, indexArr extends unknown[]= [], Num extends number = 1> =

// type getFibonacci<Num extends number>