import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../components/NavBar.css"








const NavBar = () => {
    const [Menu, seTMenu] = useState(false)
    const [Screen, seTScreen] = useState(window.innerWidth)

    const toggleNav = () => {
        seTMenu(!Menu)
    }

    useEffect(() => {

        const changeWidth = () => {
            seTScreen(window.innerWidth);
        }
    
        window.addEventListener('resize', changeWidth)
    
      }, [])
    
    
  return (
    <nav className='navbar'>
        {(Menu || Screen > 500 ) && (
            <ul className= "list">
                <Link to="/home" className='items'>
                    <li>Home</li>
                </Link>
                <Link to="/about" className='items'>
                    <li>About</li>
                </Link>
                <Link to="/todo" className='items'>
                    <li>Todo</li>
                </Link>
            </ul>
        )}
            <button onClick={toggleNav} className="btn">
                <h5>Menu</h5>
            </button>
    </nav>
  )
}


export default NavBar;