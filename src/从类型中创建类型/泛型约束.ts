function getByProperty<Type, Key extends keyof Type >(obj: Type, key: Key) {
  return obj[key]
}

export default {}