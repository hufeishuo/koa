Koa 实例上有哪些方法？？

![koa app](./imgs/Koa-app.png)


## Koa程序流程

**requirements**
1. node.js http模块的中`createServer`及`listen`方法的使用；




1. http.createServer创建一个http服务进程，这个方法接收一个函数作为有http请求时回调；
2. app.callback 组合middleware并返回了一个函数，这个函数处理http 请求；
3. 当有http请求时，调用createContext方法创建上下文ctx;
4. 将创建的上下文交给组合后的middleware处理；


## Koa洋葱模型解释


理解了compose方法就理解了洋葱模型


### Koa洋葱模型解决的问题

1. callback 导致的回调地域，便于已同步的方式写异步程序；
2. 为程序扩展提供了便捷的接口；



## delegate Node原生 request/response

