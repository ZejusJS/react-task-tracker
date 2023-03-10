import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()

    return (
        <footer>
            {
                location.pathname !== '/about' &&
                <Link to="/about">About</Link>
            }
        </footer >
    )
}

export default Footer