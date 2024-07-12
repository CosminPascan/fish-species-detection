import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../style/Navbar.css'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const unauthMenu = ['Login', 'Register']
    const authMenu = ['Habitats', 'Detect']

    let menu = isAuthenticated ? authMenu : unauthMenu

    return (
        <nav className='navbar'>
            <Link to={`/${menu[0].toLowerCase()}`}>
                <img src={logo} width={50} height={50} />
            </Link>
            <ul>
                {menu.map((choice, index) => (
                    <li key={index}>
                        <Link to={`/${choice.toLowerCase()}`}>{choice}</Link>
                    </li>
                ))}
                
                {isAuthenticated && 
                    <li>
                        <button className='logout-btn' onClick={() => {
                            localStorage.clear()
                            setIsAuthenticated(() => false)
                        }}>
                            Logout
                        </button>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Navbar