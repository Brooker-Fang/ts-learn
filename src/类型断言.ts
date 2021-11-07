export {}

const num = [1,2,3,4]

const res = num.find(v => v>0)
// 断言res 肯定为number类型
// 方式一
const sum = res as number + 2

// 方式二
const sum2 = <number>res + 2 // jsx下不能使用