/* 
  void: 不返回任何值的函数的类型
  object：指任何不是基元的值，即不为 string、number、bigint、boolean、symbol、null、undefined
          也不同于{} 和大写的Object
  Function：全局性的Function类型，描述了如bind、call、apply和其他存在于js中所有函数值的属性。
            Function类型的值总是可以被调用，这些调用返回any
            避免使用，可以用() => void 替代
*/

type voidFunction = () => void
// 一个具有void返回类型的上下文函数类型(type voidFunction = () => void), 在实现时，可以返回任何值，但是它会被忽略
const fn:voidFunction = () => {
  return true
}
// error
// const v1:boolean = fn()
// right
const v2:void = fn()
// 当一个函数定义返回为void类型时，该函数不能返回任何东西
const fn1 = ():void => {
  // return 1
}