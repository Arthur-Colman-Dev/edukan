import React from 'react';
import { useGoogleApi } from 'react-gapi';
import { useDispatch, useSelector } from 'react-redux';

import googleIcon from '../assets/google.png'

import {
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
} from 'actionTypes';

const GoogleLogin = (props) => {
  const dispatch = useDispatch();

  const scopePrefix = 'https://www.googleapis.com/auth/classroom.';
  const scopes = ['courses.readonly','course-work.readonly','student-submissions.me.readonly'];
  const gapi = useGoogleApi({
    scopes: scopes.map((scope) => `${scopePrefix}${scope}`),
  });

  const auth = gapi && gapi.auth2.getAuthInstance();

  const login = async () => {
    auth.signIn();
    await new Promise((resolve) => { 
      auth.isSignedIn.listen((signedIn) => {
        if (signedIn) {
          const currentUser = auth.currentUser.get();
          const user = {
            id: currentUser.getBasicProfile().getId(),
            access_token: currentUser.getAuthResponse(true).access_token, 
          }
          dispatch({ type: LOGIN_SUCCEEDED, user });
          resolve();
        }
      });
    });
  }

  const logout = async () => {
    auth.signOut();
    await new Promise((resolve) => { 
      auth.isSignedIn.listen((signedIn) => {
        if (!signedIn) {
          dispatch({ type: LOGOUT_SUCCEEDED });
          resolve();
        }
      });
    });
  }

  return (
    !auth 
    ? <span>Carregando...</span>
    : auth.isSignedIn.get()
      ? (
        <> 
          <span>{`${auth.currentUser.get().getBasicProfile().getName()}`}</span>
          <button onClick={logout} className="button">
            <img src="icons/google.svg" alt="google login" className="icon"></img>
            <span className="buttonText">Logout</span>
          </button>
        </>
      )
      : ( 
        <button onClick={login} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Login via Google</span>
        </button>
      )
  );
}

export default GoogleLogin;