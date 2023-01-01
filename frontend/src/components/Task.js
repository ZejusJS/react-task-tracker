import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onReminder }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onReminder(task)}>
            <h3>{task.text} <FaTimes
                className='FaTimes'
                onClick={() => onDelete(task._id)} />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task