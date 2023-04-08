import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../img/logo.png";
import '../css/Navbar.css'
import { LoginContext } from '../App';

const Navbar = ({ login }) => {

    const navigate = useNavigate()

    const { setModalOpen } = useContext(LoginContext)

    const loginStatus = () => {

        const token = localStorage.getItem("jwt")
        if (login || token) {
            return [

                <>
                    <Link to="/profile">
                        <li>Profile</li>
                    </Link>

                    <Link to="/createPost">
                        Create Post
                    </Link>

                    <Link style={{ marginLeft: "20px" }} to="/followingpost">
                        My Following
                    </Link>

                    <Link to={""}>
                        <button
                            onClick={e => setModalOpen(true)}
                            className='primaryBtn'>Log Out
                        </button>
                    </Link>

                </>
            ]
        } else {
            return [
                <>
                    <Link to="/signup">  <li>SignUp</li></Link>
                    <Link to="/signin">  <li>SignIn</li></Link>
                </>
            ]
        }

    }

    return <div className="navbar">

        <img src={logo} alt="" onClick={e => navigate("/")} />
        <ul className="nav-menu">

            {loginStatus()}

        </ul>

    </div>
}

export default Navbar