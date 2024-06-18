import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../style/Navbar.css'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const unauthMenu = ['Home', 'Login']
    const authMenu = ['Home', 'Habitats', 'Detect']

    let menu = isAuthenticated ? authMenu : unauthMenu

    return (
        <nav className='navbar'>
            <Link to={`/${menu[0].toLowerCase()}`}>
                <img src={logo} width={50} height={50}></img>
            </Link>
            <ul>
                {menu.map((choice, index) => (
                    <li key={index}>
                        <Link to={`/${choice.toLowerCase()}`}>{choice}</Link>
                    </li>
                ))}
                <li>
                    {isAuthenticated && <button className='logout-btn' onClick={() => {
                        setIsAuthenticated(() => {
                            localStorage.clear()
                            return false
                        })
                    }}>Logout</button>}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar