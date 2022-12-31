import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import axios from "axios";

const baseUrl = "http://localhost:4000"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const addTask = function (task) {
    console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios({
        method: 'get',
        url: baseUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          username: 'Joe Mama'
        },
      })
        .then(res => console.log(res))
    }

    fetchTasks()
  }, [ /* DEPENDECIES */ ])

  const deleteTask = function (id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id
      ?
      { ...task, reminder: !task.reminder }
      :
      task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      {
        showAddTask &&
        <AddTask onAdd={addTask} />
      }
      {
        tasks.length > 0
          ?
          <Tasks tasks={tasks} onReminder={toggleReminder} onDelete={deleteTask} />
          :
          "No tasks here mate"
      }
    </div>
  );
}

export default App;
