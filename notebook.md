直入正题：Koa 实例上有哪些方法？？

![koa app](./imgs/Koa-app.png)

## Koa程序流程

**requirements**
1. node.js http模块的中`createServer`及`listen`方法的使用；

Koa做的事情：创建一个http服务，监听系统分发到该服务上客户端请求并响应该请求。具体流程如下：

1. `http.createServer`创建一个http服务进程，这个方法接收一个函数作为有http请求时回调；
2. `app.callback` 组合middleware并返回了一个函数`fn`，这个函数`fn`处理http 请求；
3. 当有http请求时，在函数`fn`中调用`createContext`方法创建上下文`ctx`；
4. 将创建的上下文`ctx`交给compose后的middleware处理；

Koa提供的只有这个么一个架子，在web服务中经常用到的router，bodyparser，cookie等都交给了自定义的middleware处理。

这个处理流程的模型就是Koa种总提到的洋葱模型。


## Koa洋葱模型解释
理解了compose方法就理解了洋葱模型。我们说过，compose方法的作用就是将若干个函数合并成一个函数。简易版实现如下：
``` js
function compose(...fn){
    if( fn.length === 0 ) return function(){}
    function dispatch(i){
        var next = i+1 < fn.length ? dispatch(i+1) : function(){}
        return function(ctx){
            fn[i]( ctx, function(){
                next(ctx)
            })
        }
    }
    return dispatch( 0 )
}
```



而Koa使用的是支持异步的koa-compose

```js
function compose(...fn){
    if( fn.length === 0 ) return Promise.resolve();
    function dispatch(i){
        var next = i+1 < fn.length ? dispatch(i+1) : function(){}
        return new Promise(function(resolve, reject){

            function(ctx){
                fn[i]( ctx, function(){
                next(ctx)
                })
            }
        })
    }
    return dispatch( 0 )
}
```


### Koa洋葱模型解决的问题

1. callback 导致的回调地域，便于以同步的方式写异步程序；
2. 中间件机制为程序扩展提供了便捷的接口；

洋葱模型的本质是**将多个处理函数组合成一个函数**供业务调用。
``` js
app.use( (ctx, next)=>{
    console.log( `start time :${Date.now()}` )
    next()
    console.log( `end time: ${Date.now()}`)
})
app.use( (ctx, next)=>{
    console.log('balabala')
})
```
在源码中app.use方法的实现可以简化为：
```js
function use(fn){
    this.middleware.push(fn);
}
```




## generator 如何转为 async


## delegate Node原生 request/response

