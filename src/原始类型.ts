/* 
  原始类型数据
*/
const a : number = 100
const b : string = ''
const c : boolean = false
const d : null = null
const e : undefined = undefined
// void 类型表示返回值的函数 void 只能为undefined 和null，严格模式下只能undefined
const f = () : void => { console.log() }
const h :void = undefined

// 要使用symbol 需要在配置文件配置 es2015以上的版本
const s : symbol = Symbol()


// object 指除了原始类型外的其他类型 如 function | array | object
// 对象一般用接口形式
const obj : object = {} || [] || function() {}

// 数组类型
const arr1: Array<number> = [1,2,3]

function sum (...args: number[]) {
  return args.reduce((prev, current) => prev+current , 0)
}
sum(1,2)
// 元组类型 即明确元素数量，以及每个元素类型的数组
const tuple:[number, string] = [1, '2']

// 枚举类型
enum Status {
  up = 0,
  down = 1
}
let status: Status = Status.up
status = Status.down

// 如果没有具体值，则从0开始累加，即up = 0, down =1, 
enum enumState {
  up,
  down
}
// 如果字符串枚举则必须要具体值
enum stringStatus {
  up = 'up',
  down = 'down'
}

// 函数类型
// b? 是可选参数
function fun1 (a:number, b?: string) :string {
  return b? a+b : ''
}
// never类型


export {}
