const express = require('express')
const app = express()
const fs = require('fs');
const tasks = require('./routes/tasks')
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const port = 3000;

const fontEndPath = __dirname + '/client/dist';
app.use(express.static(fontEndPath))

const cors = require("cors");

app.use(cors())
app.use(express.json())


app.use('/api/v1/tasks', tasks)
app.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});
app.use(notFound)
app.use(errorHandlerMiddleware)

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



