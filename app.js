require ('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan')
const cLog = require('./utils/Custom-Logging')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressValidator = require('express-validator')


const app = new express();

//routes
const authRoute = require('./routes/authroute')
const transactionRoute = require('./routes/transactionroute')

//additional needs for routes
const {getUserByUsernameParam} = require('./controllers/usercontroller')

//middleware
app.use(morgan(':method :remote-addr :url :status :response-time ms :res[content-length]'));
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
  origin : true,
  credentials : true
}))
app.options('*', cors())

//middleware routes
app.use("/auth", authRoute)
app.use("/user/:username/transaction", transactionRoute)

app.get("/", (req,res) => res.send("Home page"))

app.param("username", getUserByUsernameParam)






//connect to database and start server
console.log("\n")
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser : true
}).then(() => cLog.info('Database connected '))
mongoose.connection.on('error', err => cLog.error("Error connecting to database: " + err ))


const port = process.env.port || 5000;
app.listen(port, () => cLog.info(`Server started on port ${port}`))
