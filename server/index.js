const express = require('express')
const sequelize = require('./db')
const path = require('path')
const cors = require("cors");
const cookieParser = require('cookie-parser')

const loggerMiddlewares = require('./middlewares/loggerMiddlewares.js')
const config = require('./config.js')

const usersRouter = require('./routes/usersRoute.js')
const personagesRouter = require('./routes/personagesRoute.js')
const itemTypesRouter = require('./routes/itemTypesRoute.js')
const itemsRouter = require('./routes/itemsRoute.js')
const locationsRouter = require('./routes/locationsRoute.js')
const messagesRouter = require('./routes/messagesRoute.js')
const authRouter = require('./routes/authRoute.js')

const PORT = process.env.PORT ?? 5500
const app = express()
const _dirname = path.resolve()

const corsOptions ={
  origin: config.WEB_URL, 
  credentials:true,      
  optionSuccessStatus:200,
}

app.use(express.json())
app.use(express.static(path.resolve(_dirname, 'static')))
app.use(cors(corsOptions))
app.use(cookieParser('SECRET_KEY'));

app.use(loggerMiddlewares.requestTime)
app.use(loggerMiddlewares.logger)

app.use('/', usersRouter, personagesRouter, itemTypesRouter, itemsRouter, locationsRouter, messagesRouter)
app.use('/auth', authRouter)

const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    //await sequelize.sync({force: true})
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
  }
  catch(e){
    console.log(e)
  }
}

start()

app.all('*', function (req, res, next) {
    res.header ("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header ("Access-Control-Allow-Credentials", true);
    next();
});
  