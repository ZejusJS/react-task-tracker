import PropTypes from 'prop-types'
import Button from './Button'

const name = 'Brad'

const Header = ({ onAdd, showAddTask }) => {
  return (
    <header className="header">
      <h1>Task Tracker</h1>
      <Button showAdd={onAdd} showAddTask={showAddTask} text={showAddTask ? 'Close' : 'Add'} />
    </header>
  )
}

// default value, když title prop není k dispozici
Header.defaultProps = {
  title: "Task Tracker"
}

// jako Joi middleware...
Header.propTypes = {
  title: PropTypes.string,
}

export default Header