const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const authRoutes=require('./routes/authRoutes');
const todosRoutes=require('./routes/todoRoutes');
const errorController=require('./controller/error');
const client=require('./util/redis');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');

const session = require('express-session')
let redisStorage= require('connect-redis').default;

const cors=require('cors');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    store: new redisStorage({ client: client }),
    secret: 'secret$%^134',
    resave: true,
    saveUninitialized: false,
}));


app.use('/auth', authRoutes);
app.use(authMiddleware);

app.use('/todos', todosRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.use((req,res,next)=>{
res.setHeader('Acess-Control-Allow-Origin','*');
res.setHeader('Acess-Control-Allow-Methods','GET,POST,PATCH,DELETE');
res.setHeader('Acess-Control-Allow-Headers','Content-Type,Authorization');
next();
})

const port = process.env.port || 3000;

app.listen(port, ()=>console.log(`Listening on port no ${port}`));
