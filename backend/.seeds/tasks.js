const mongoose = require('mongoose');

const Task = require('../models/task')

const dbUrl = 'mongodb://localhost:27017/react-task-tracker'  // process.env.DB_URL
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});
mongoose.set('strictQuery', true);

const seedTasks = async function (num) {
    await Task.deleteMany()
    for (let i = 0; i < num; i++) {
        let reminder = i % 3 ? true : false
        const task = new Task({
            text: "Make Bob's mom",
            day: "Feb 5th at 2:30pm",
            reminder
        })
        await task.save()
    }
}

seedTasks(10)