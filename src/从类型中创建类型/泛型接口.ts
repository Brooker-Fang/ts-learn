function log<Type>(arg: Type): Type {
  return arg
}
// 方式一
// interface logFn {
//   <Type>(arg: Type) : Type
// }
// let fn: logFn = log

// 方式二
// interface logFn<Type> {
//   (arg: Type) : Type
// }

// let fn: logFn<string> = log

export {}