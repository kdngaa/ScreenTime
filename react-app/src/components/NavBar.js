
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  // const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='NavBar'>
      <div className='logo'>
        <a href="/videos">
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
