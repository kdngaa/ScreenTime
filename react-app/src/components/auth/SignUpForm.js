import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [frontErrors, setFrontErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const validateErrors = []
    if (!username) validateErrors.push("Username is required.")
    if (!email) validateErrors.push("Email is required.")
    if (!password) validateErrors.push("Password is required.")
    if (!repeatPassword) validateErrors.push("Confirmation Password is required.")
    if (password !== repeatPassword) validateErrors.push("Passwords must match.")
    if (validateErrors.length > 0) {
      setFrontErrors(validateErrors)
      return
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
      return setErrors(['Passwords don\'t match. Please try again'])
    }

    setFrontErrors([])
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="uploadBody">
        <h1 className='morphHeader'>SIGNUP</h1>
      <div className="containerLogin">
        <form onSubmit={onSignUp} className="signUpForm">
        {/* <div class="brand-logo"></div> */}
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
            {frontErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="uploadInput">

            <div className="miniDiv">
              {/* <label>User Name</label> */}
              <input
                type='text'
                placeholder='Username'
                name='username'
                onChange={updateUsername}
                value={username}
                className="postInput"
              ></input>
            </div>

            <div className="miniDiv">
              {/* <label>Email</label> */}
              <input
                type='text'
                placeholder='Email'
                name='email'
                onChange={updateEmail}
                value={email}
                className="postInput"
              ></input>
            </div>

            <div className="miniDiv">
              {/* <label>Password</label> */}
              <input
                type='password'
                placeholder='Password'
                name='password'
                onChange={updatePassword}
                value={password}
                className="postInput"
              ></input>
            </div>

            <div className="miniDiv">
              {/* <label>Repeat Password</label> */}
              <input
                type='password'
                placeholder='Confirm Password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                // required={true}
                className="postInput"
              ></input>
            </div>
          </div>
          <div className='authBody'>
            <div class="frame">
              <p className='btn'>
                <button type='submit' className="button">SIGN UP</button>
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
