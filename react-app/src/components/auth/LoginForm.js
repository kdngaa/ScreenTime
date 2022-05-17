import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
  }




  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <body className="uploadBody">
      <section className="containerLogin">
        <form onSubmit={onLogin} className="uploadVideoForm">
          <div class="brand-logo"></div>
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="uploadInput">
            {/* <label htmlFor='email'>Email</label> */}
            <div className="miniDiv">
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className="postInput"
              />
            </div>



            {/* <label htmlFor='password'>Password</label> */}
            <div className="miniDiv">
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className="postInput"
              />
            </div>
          </div>

          <div className='authBody'>
            <div class="frame">
              <p className='btn'>
                <button type='submit' className='button'>Login</button>
              </p>
              <p className='btn'>
                <button className="button" onClick={demoUser}>Demo</button>
              </p>
            </div>
          </div>

        </form>
      </section>
    </body>
  );
};

export default LoginForm;
