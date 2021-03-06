
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'
import Search from './Search';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <div className='NavBar'>
      <div className='logo'>
        <a href="/">
          <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652687471/ST2_ht1l9v.png" style={{ width: '230px', height: '60px' }} />
        </a>
      </div>
      <nav >
        <div className='authButtons'>
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
              <Search />

              <p className='authButton'>
                <NavLink to='/' exact={true} activeClassName='active' className='authBtn'>
                  Home
                </NavLink>
              </p>


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

              <p className='authButton'>
                <NavLink to={`/home/${user?.id}`} exact={true} activeClassName='active' className='authBtn'>
                  My Profile
                </NavLink>
              </p>

              <p className='logOutBtn'>
                <LogoutButton />
              </p>

            </>
          )}
          {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
