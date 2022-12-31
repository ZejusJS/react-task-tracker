import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import axios from "axios";
const BASE_URL = 'http://localhost:4000'

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
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer.data)
    }

    getTasks()
  }, [ /* DEPENDECIES */])

  const fetchTasks = async () => {
    return await axios({
      method: 'get',
      url: BASE_URL + '/get-all-tasks',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
  }

  const deleteTask = async function (id) {
    console.log(id)
    await axios({
      method: 'delete',
      url: BASE_URL + '/delete-task' + `/${id}`
    })

    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer.data)
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task._id === id
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
