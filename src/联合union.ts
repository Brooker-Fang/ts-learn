// 使用typeof 做类型收缩
function consoleId(id: number | string | string[]) {
  if(typeof id === "string") {
     console.info(id.toLocaleUpperCase()) 
     return
  }
  if(Array.isArray(id)) {
    console.info(id.join(","))
    return
  }
  console.info(id)
}