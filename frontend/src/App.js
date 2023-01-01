import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import axios from "axios";
const BASE_URL = 'http://localhost:4000'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const addTask = async function (task) {
    await axios({
      method: 'post',
      url: BASE_URL + '/post-task',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        text: task.text,
        day: task.day,

      }
    })
  }

  const fetchTasks = async () => {
    return await axios({
      method: 'get',
      url: BASE_URL + '/get-all-tasks'
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

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer.data)
    }

    getTasks()
  }, [ /* DEPENDECIES */])

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
