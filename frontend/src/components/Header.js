import React from "react"
import { NavLink } from "react-router-dom"

export default function Header() {
    return(
        <header>
        <nav>
            <div >
                <h2>ROVISRA</h2>
                <div >
                <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/managecourse">Courses</NavLink></li>
                </ul>
                </div>
                <div className="container">
                <ul>
                    <li><NavLink to="login">Login</NavLink></li>
                    <li><NavLink to="register">Register</NavLink></li>
                    <li><NavLink to="editorprofile">Profile</NavLink></li>
                </ul>
                </div>
            </div>
        </nav>
      </header>
        
    )
}