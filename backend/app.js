if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Joi = require('joi');
const session = require('express-session');
const methodOverride = require('method-override');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const cors = require('cors')

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true) // pro získání reálné IP adresy z req.ip
app.engine('ejs', ejsMate);
app.use(methodOverride('mo'));
app.use(express.static(path.join(__dirname, 'public')));

const dbUrl = 'mongodb://localhost:27017/react-task-tracker'  // process.env.DB_URL
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});
mongoose.set('strictQuery', true);


const catchAsync = require('./utils/catchAsync')

const Task = require('./models/task')

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/get-all-tasks', catchAsync(async function (req, res, next) {
    const tasks = await Task.find()
    res.cookie('xddddd', '1235')
    res.send(tasks)
}))

app.delete('/delete-task/:taskId', catchAsync(async function (req, res, next) {
    const taskId = req.params.taskId
    await Task.findByIdAndDelete(taskId)
    res.status(200).send('OK')
}))

app.post('/post-task', catchAsync(async function (req, res, next) {
    const task = new Task(req.body)
    console.log(task)
    await task.save()
    res.status(200).send('OK')
}))


app.use(async (err, req, res, next) => {
    try {
        const { status = 500 } = err;
        if (!err.message) err.message = 'Internal Server Error';
        console.log(err);

        res.status(status).send('ERRRRROOOOOOORRRR!!!... ' + err);
    } catch (e) {
        console.log('FATAL ERROR!!!!!!!!!!!!!', e)
        res.status(500).send('ERRRRROOOOOOORRRR!!!... ' + e);
    }
});

app.listen(port, function () {
    console.log('LISTENING ON PORT', port)
})