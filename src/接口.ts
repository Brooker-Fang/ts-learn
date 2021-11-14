
interface Props {
  name: string
  pwd: string
  email?: string // 可选成员，即string | undefined
  readonly age: number // 只读成员
}

function print ({name, pwd} : Props) {
  console.log(name, pwd)
}

// 动态成员对象
interface dynamicObj {
  [key: string] : string
}
const cache: dynamicObj = {}
cache.name = 'fhh'
