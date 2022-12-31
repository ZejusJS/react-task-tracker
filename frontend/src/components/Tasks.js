import Task from './Task'

const Tasks = ({ tasks, onDelete, onReminder }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task._id} task={task} onReminder={onReminder} onDelete={onDelete}/>
            ))
            }
        </>
    )
}

export default Tasks