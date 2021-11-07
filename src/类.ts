export {}
interface PersonData {
  name: string
  age: number
}
interface Print {
  print(str: string) : void
}
interface Run {
  run() : void
}
// implements 实现定义的接口
class Person implements Print, Run{
  name: string
  private age: number // 私有属性，不能通过实例属性访问
  protected readonly type: string // 只允许在子类中访问的成员
  constructor({name, age}:PersonData) {
    this.name = name
    this.age = age
    this.type = 'person'
  }
  print (str: string): void {
    console.log(str)
  }
  run () :void {

  }
  static create({name, age}:PersonData) {
    return new Person({name, age})
  }
}
class Man extends Person {
  constructor({name, age}:PersonData) {
    super({name, age})
    console.log(this.type)
  }
}

// 抽象类  只能被继承，不能使用new 实例化
abstract class Animal implements Run{
  run () :void {

  }
  // 抽象方法，不能有实现体，继承的子类必须实现此抽象方法
  abstract eat (food: string): void 
}