/* 
  可以使用类型别名或接口来表示一个可被调用的类型
*/
interface TestFunction {
  name: string
  (someArg: string) : string
}

function doSomeThing(fn: TestFunction) {
  console.info(fn.name + fn("111"))
}

function fn(a:string) {
  return a
}
fn.name = "fhh"
console.info(doSomeThing(fn))

/* 
  构造签名
*/
class Ctor {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
type TestControl = {
  new (name: string): Ctor
}

function fn2(ctor: TestControl) {
  return new ctor("fhh")
}

const per = fn2(Ctor)
console.info(per.name)


interface DateConstructor {
  new (s: string): Date
  (n: number):number
}
function fn3(date: DateConstructor) {
  let d = new date("2022-12-4")
  let n = date(100)
}
export {}