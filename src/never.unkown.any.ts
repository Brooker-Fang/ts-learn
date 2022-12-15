/* 
  unknown vs never vs any
  unknown 是一切类型的的超级类型，是所有类型的集合，
          unknown相对于any更安全，因为对未知的unknown值做任何事都是不合法的
          你可以把任何值赋给 unknown 类型的变量，但你必须进行类型检查或类型断言才能对变量进行操作；
          unknown 类型的变量只能赋值给 any 类型和 unknown 类型本身
  never 是任何值都不能冠以never类型，即使any也不能赋值给never，
        never类型即表示那些用不存在的值的类型
        never 类型不携带任何的类型信息，因此会在联合类型中被直接移除
  any：相当于忽略类型检测
*/

/* 
  never 类型的作用：
    使用never避免出现新增了联合类型时，却没有对应的实现的情况，目的就是为了写出绝对安全的代码
*/
interface Circle {
  kind: "circle"
  radius: number
}
interface Square {
  kind: "square"
  sideLength: number
}
interface Triangle {
  kind: "triangle"
  sideLength: number
}
type Shape = Circle | Square | Triangle
function getArea(shape: Shape) {
  switch(shape.kind) {
    case "circle":
      return shape.radius
    case "square":
      return shape.sideLength
    case "triangle":
      return shape.sideLength
    default: 
    // 如果Shape新增了一个类型，如Triangle,但却没有相应的实现，这边就会编译报错
    // 即防止了新增了一种类型却没有对应实现的情况
      const neverAppear:never = shape
      return neverAppear
  }
}

/* 
  unknown 类型的变量只能赋值给 any 类型和 unknown 类型本身
*/
let value: unknown
let value1:unknown = value
let value2:any = value
// error:
// let value3: number = value 
// let value=4: boolean = value 
export {}