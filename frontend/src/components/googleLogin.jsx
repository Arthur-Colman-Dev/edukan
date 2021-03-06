import React from 'react';
import { useGoogleApi } from 'react-gapi';
import { useDispatch } from 'react-redux';
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

  const checkIfUserIsLoggedIn = (resolve) => {
    const auth = gapi && gapi.auth2.getAuthInstance();
    auth.isSignedIn.listen((signedIn) => {
      if (signedIn) {
        const currentUser = auth.currentUser.get();
        const user = {
          id: currentUser.getBasicProfile().getId(),
          accessToken: currentUser.getAuthResponse(true).access_token,
        }
        dispatch({ type: LOGIN_SUCCEEDED, user });
        if (resolve) {
          resolve();
        }
      }
    })
  }

  const login = async () => {
    const auth = gapi && gapi.auth2.getAuthInstance();
    auth.signIn();
    await new Promise((resolve) => {
      checkIfUserIsLoggedIn(resolve);
    });
  }

  const logout = async () => {
    const auth = gapi && gapi.auth2.getAuthInstance();
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

  const auth = gapi && gapi.auth2.getAuthInstance();

  return (
    !auth
      ? null
      : auth.isSignedIn.get()
        ? (
          <>
            <span className="student__name">{`${auth.currentUser.get().getBasicProfile().getName()}`}</span>
            <button onClick={logout} className="button button__logout">
              <img src={googleIcon} alt="google login" className="icon"></img>
              <span className="buttonText">Logout</span>
            </button>
          </>
        )
        : (
          <button onClick={login} className="button button__login">
            <img src={googleIcon} alt="google login" className="icon"></img>
            <span className="buttonText">Login via Google</span>
          </button>
        )
  );
}

export default GoogleLogin;