/* 
  作用：
    1、可以作为泛型的约束类型
    2、可以作为 条件类型关键字
*/
// 作为泛型的约束类型
interface IWithLength {
  length: number
}
// 约束传入的泛型T  必须有length的属性，即IWithLength的子集
function getLength<T extends IWithLength>(arg: T) {
  return arg.length
}

const arr = getLength([1,2,3])
const str = getLength('123')
const obj = getLength({length:2})

// 作为 条件类型关键字
type NonType<T> = T extends null | undefined ? never : T

let nonNumber: NonType<number> // number类型
let nev: NonType<null> // never类型