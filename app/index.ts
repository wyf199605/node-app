import * as Koa from 'koa';

let app = new Koa();


const main: Koa.Middleware = (context: Koa.ParameterizedContext) => {
    context.response.body = 'hello world!'
};

app.use(main);

app.listen(3000);

console.log('the server is listen to 3000');

console.log(process.env.NODE_ENV);



