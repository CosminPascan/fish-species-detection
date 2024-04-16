import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
    const menu = ['Home', 'Login', 'Detect', 'About']
    
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
            </ul>
        </nav>
    )
}

export default Navbar