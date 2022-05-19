import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
// import User from '/.components'
import { authenticate } from './store/session';
import Videos from './components/Videos'
import SingleVideo from './components/SingleVideo';
import Upload from './components/UploadVideoForm';
import SplashPage from './components/Splash';
import Footer from './components/Footer';
import Other from './components/404'
import {UserProfile} from './components/UserProfile'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home/:id' exact={true}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/new' exact={true} >
          <Upload />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/:id(\d+)' exact={true}>
          <SingleVideo />
        </ProtectedRoute>
        <ProtectedRoute path='/videos' exact={true}>
          <Videos />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <SplashPage />
        </ProtectedRoute>
        <Route>
          <Other />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
