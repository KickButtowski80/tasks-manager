const express = require('express')
const app = express()
const fs = require('fs');
const tasks = require('./routes/tasks')
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const port = 3000;
// const serveStatic = require('serve-static');
// app.use(express.static('client/public'))
// app.use(serveStatic(__dirname + "./public"));
const cors = require("cors");

// app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));


app.use(cors())
app.use(express.json())


app.use('/api/v1/tasks', tasks)
app.use(notFound)

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await connectDB(process.env.MONGO_URI)
        console.log('DB is connected...')
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()



