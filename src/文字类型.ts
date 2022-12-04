
function place(align:"left" | "right") {

}
place("right")

function request(url: string, method: "get" | "post" | "put") {

}
const req = {
  url: "https://baidu.com",
  method: "get"
}
request(req.url, req.method as "get")

const req2 = {
  url: "https://baidu.com",
  method: "get"
} as const
// as const 可以固定类型，
request(req2.url, req2.method)