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

    const loginStatusMObile = () => {

        const token = localStorage.getItem("jwt")
        if (login || token) {

            return [

                <>

                    <Link to="/">
                        <li>
                            <span class="material-symbols-outlined">
                                home
                            </span>
                        </li>
                    </Link>

                    <Link to="/profile">
                        <li>
                            <span class="material-symbols-outlined">
                                account_circle
                            </span>
                        </li>
                    </Link>

                    <Link to="/createPost">
                        <li>
                            <span class="material-symbols-outlined">
                                add_box
                            </span>
                        </li>
                    </Link>

                    <Link style={{ marginLeft: "20px" }} to="/followingpost">
                        <li>
                            <span class="material-symbols-outlined">
                                explore
                            </span>
                        </li>
                    </Link>

                    <Link to={""}>
                        <li onClick={e => setModalOpen(true)} >
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                        </li>
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

        <img
            id='insta-logo'
            src={logo}
            alt=""
            onClick={e => navigate("/")}
        />

        <ul className="nav-menu"> {loginStatus()}</ul>

        <ul className="nav-mobile"> {loginStatusMObile()}</ul>



    </div>
}

export default Navbar