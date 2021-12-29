// utility type 用法：用泛型给它传入一个其他类型，然后utility type对这个类型做某种操作，如

// 1、Parameters，读取传入的函数的 参数，并返回数组 tuple
function b(name: string ,num: number):void {
  console.log('b')
}
// typeof 
function c(...[name, num]: Parameters<typeof b>) {

}
// 2、对原有类型进行编辑，如 用Partial，将原来的type的所有属性变为可选属性
interface Person {
  name: string,
  age: number
}
// 可以没有age属性
let p: Partial<Person> = {
  name: '1'
}
// Partial源码
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// 3、Omit<type, stringName>：删除某类型的 某个属性
let p2: Omit<Person, 'name'> = {
  age: 10
}
// Omit源码
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 4、Pick，在对象里挑出键值的类型，成为新的类型，可以传入多个键值
type PersonOnlyName = Pick<Person, "name"> // 
let p3: PersonOnlyName = {
  name: '1'
}
type AllPerson = Pick<Person, "name" | "age">
let p4: AllPerson = {
  name: '1',
  age: 18
}
// 5 Exclude，排除类型
type Age = Exclude<string | number | object, string>
let p5: Age = 1
// p5 = "" 报错


// 6 Record<K,T> 将的所有属性值都映射到另一个类型上并创造一个新的类型.即将K的所有属性类型转为 T
type Page = "brooke" | "jax" | "other";
interface PersonInfo {
  name: string;
  age: number
}
const newPageInfoType : Record<Page, PersonInfo> = {
  brooke: { name: "hh", age: 18 },
  jax: { name: "contact", age: 20 },
  other: { name: "home", age: 25 },
};
type keys = 'A' | 'B' | 'C'
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3
}
// 表示具有任何字符串属性的所有对象，因此您可以将任何字符串属性附加到该对象
const res: Record<string, string> = {
  1: '2'
}
// Record<string, any> 和 Record<{}> 区别
export {}