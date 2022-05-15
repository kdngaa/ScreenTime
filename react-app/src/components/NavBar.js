
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <div className='NavBar'>
      <div className='logo'>
        <a href="/">
          <img src="ST2.png" style={{ width: '230px', height: '60px' }} />
        </a>
      </div>
      <nav >
        <div className='authButtons'>
          <p className='authButton'>
            <NavLink to='/' exact={true} activeClassName='active' className='authBtn'>
              Home
            </NavLink>
          </p>
          {!user && (
            <>
              <p className='authButton'>
                <NavLink to='/login' exact={true} activeClassName='active' className='authBtn'>
                  Login
                </NavLink>
              </p>

              <p className='authButton'>
                <NavLink to='/sign-up' exact={true} activeClassName='active' className='authBtn'>
                  Sign Up
                </NavLink>
              </p>
            </>
          )}
          {user && (
            <>
              <p className='authButton'>
                <NavLink to='/videos' exact={true} activeClassName='active' className='authBtn'>
                  Videos
                </NavLink>
              </p>
              <p className='authButton'>
                <NavLink to='/videos/new' exact={true} activeClassName='active' className='authBtn'>
                  Upload
                </NavLink>
              </p>
            </>
          )}
          {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
          <p className='logOutBtn'>
            <LogoutButton />
          </p>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
