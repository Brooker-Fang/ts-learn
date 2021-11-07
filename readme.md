## 初始化ts配置文件
yarn tsc --init

## 通过tsconfig.json配置文件 编译整个项目中的src下的文件
yarn tsc
yarn tsc --local zh-CN 用中文提示错误消息

## ts编译作用域问题
需要将文件使用export，让文件变成一个模块作用域，就不会影响到其他文件