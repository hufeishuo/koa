const Koa = require('./')
const Router = require('koa-router')

const router = new Router()

router.get('/abc', (ctx, next)=>{
    console.log( 'get /abc')
    ctx.body = " get /abc"
    next()
}).get('/', (ctx, next)=>{
    console.log( 'get / ')
    next()
})

const app = new Koa()

app.use( router.routes())



console.log( app.toJSON() )

app.use((ctx, next)=>{
    ctx.res.end( 'hello world\ngoogd')
})

console.log( Reflect.ownKeys( app) )


// app.listen实际上可以看做语法糖
// 
app.listen( 8999 )
app.on('error', (evt)=>{

console.log( evt )
})

// 手动创建一个http 服务
const http = require('http')

http.createServer((req, res)=>{

}).listen( 8998 )


// ** 手写 compose

function f1(ctx, next){
    console.log( 'before next 1', ctx.count++)
    next()
    console.log( 'after next 1')
}
function f2(ctx, next){
    console.log( 'before next 2', ctx.count++)
    next()
    console.log( 'after next 2')
}
function f3(ctx, next){
    console.log( 'before next 3', ctx.count++)
    next()
    console.log( 'after next 3')
}


// 递归版（洋葱模型）
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

// 顺序执行~~
function compose1(...fn){
    if( fn.length === 0 ) return function(){}
    if( fn.length === 1 ) return function(ctx){ fn[0]( ctx, function(){})}

    return fn.reduce( (a,b)=>(...args)=>a(ctx, b(...args)))
}

var f = compose(f1, f2, f3);
compose(f2)({count:6})
compose()()


f({count:1})


compose1(function(ctx, next){
    console.log(1, next)
}, function(ctx, next){
    console.log(2, next)
})()