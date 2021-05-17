import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';

import googleIcon from '../assets/google.png'

// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '244033098309-57t637lqes8nh18eh9ljprkv29ovonpb.apps.googleusercontent.com';

const GoogleLogin = (props) => {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    dispatch({type: 'LOGIN_SUCCEEDED', res});
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const { 
    signIn, 
  } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src={googleIcon} alt="google login" className="icon" />
      <span className="buttonText">Login via Google</span>
    </button>
  );
}

export default GoogleLogin;