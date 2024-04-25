import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = ({ setIsAuthenticated }) => {
    const unauthMenu = ['Home', 'About', 'Login']
    const authMenu = ['Home', 'Detect', 'About']

    let menu = unauthMenu
    let isAuthenticated = false

    setIsAuthenticated(auth => {
        menu = auth ? authMenu : unauthMenu
        isAuthenticated = auth
        return auth
    })

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
                        setIsAuthenticated(auth => {
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