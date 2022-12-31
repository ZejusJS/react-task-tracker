import PropTypes from 'prop-types'

const Button = ({ color, text, showAdd, showAddTask }) => {
    return (
        <button onClick={showAdd} style={{ backgroundColor: color }} className={showAddTask ? 'btn btn-close' : 'btn btn-open'}>
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    showAdd: PropTypes.func
}

export default Button