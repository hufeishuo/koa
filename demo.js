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

