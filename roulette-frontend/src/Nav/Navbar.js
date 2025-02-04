import './Navbar.css';
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    return(
        <nav className="NavStyle">
            <NavLink to="/">Home</NavLink>
        </nav>
    );
}

export default Navbar;
