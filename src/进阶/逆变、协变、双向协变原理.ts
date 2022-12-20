
/* 
  TODO: 理解 UnionToIntersection
  ts 函数参数是有逆变性质的，如果参数可能是多个类型，参数类型会变成它们的交叉类型
*/
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never
type UnionToIntersectionTest = UnionToIntersection<{a: 1} | {b: "c"}>
// (x: {a: 1}) => unknown extends (x: infer R) => unknown ? R : never | (x: {b: "c"}) => unknown extends (x: infer R) => unknown ? R : never
