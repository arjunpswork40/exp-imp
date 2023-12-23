import React, { useState, useEffect } from 'react'
import css from './Header.module.css'
import Logo from '../../assets/logo.png'
// import {CgShoppingBag} from 'react-icons/cg'
import { GoThreeBars } from 'react-icons/go'

const Header = () => {
  const [ShowMenu, setShowMenu] = useState(false)
  const [menuStyle, setMenuStyle] = useState('closedMenuMobile') // Initial style

  const [scrolled, setScrolled] = useState(false)
  const toggleMenu = () => {
    setShowMenu((ShowMenu) => !ShowMenu)
    // Conditionally set the class for styling
    if (ShowMenu) {
      setMenuStyle('closedMenuMobile')
    } else {
      setMenuStyle('openMenuMobile')
    }
  }

  useEffect(() => {
    // Check screen width and set initial ShowMenu state
    const handleWindowResize = () => {
      if (window.innerWidth <= 640) {
        setShowMenu(false) // Mobile screen
      } else {
        setShowMenu(true) // Larger screens (monitors)
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleWindowResize)

    // Call the handler once to set the initial state
    handleWindowResize()

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    // Add an event listener to detect scroll
    window.addEventListener('scroll', handleScroll)
    return () => {
      // Clean up the event listener
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  return (
    <div className={`${css.container} ${scrolled ? css.scrolled : ''}`}>
      <div className={css.logo}>
        <a href="/" className={css.logoNav}>
          <img src={Logo} alt="" />
          <span className={` ${scrolled ? css.scrolled : ''}`}>amazon</span>
        </a>
      </div>
      <div className={` ${css.right} ${menuStyle}`}>
        <div className={css.bars} onClick={toggleMenu}>
          <GoThreeBars />
        </div>
        <ul className={css.menu} style={{ display: ShowMenu ? 'inherit' : 'none' }}>
          <li>
            <a href="/import-export-products">Import/Export</a>
          </li>
          <li>Factory Sale</li>
          <li>AboutUs</li>
          <li>Register</li>
          <li>
            <a href="/authenticate" className="btn btn-secondary">
              Login
            </a>
          </li>
          <li>ENG</li>
        </ul>
        {/* <input type="text" className={css.search} placeholder='Search' /> */}
        {/* <CgShoppingBag className={css.cart}/> */}
      </div>
    </div>
  )
}

export default Header
