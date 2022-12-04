// ! 非空断言操作符, 即断言不可能为 null 和 undefined


// ?. 运算符
/* 
  支持几种形式：
    obj?.key
    obj?.[key]
    arr?.[index]
    func?.[args]
*/
// 如 && 可以改为 ?.
const a = {
  b: ''
}
let b:string = a?.b // 想当于 a && a.b

// in 操作符：用于确定对象是否具有某个属性
type Fish = {swim: () => void}
type Bird = {fly: () => void}
function move(animal: Fish | Bird) {
  if("swim" in animal) {
    animal.swim()
  }
}

// instanceof 
function logTime(x: Date | string) {
  if(x instanceof Date) {
    console.info(x.toDateString())
    return
  }
  console.info(x)
}