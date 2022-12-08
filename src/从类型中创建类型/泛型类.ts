class NumberClass<NumType> {
  value: NumType
  constructor(value: NumType) {
    this.value = value
  }
  add: (a:NumType,b:NumType) => NumType
}