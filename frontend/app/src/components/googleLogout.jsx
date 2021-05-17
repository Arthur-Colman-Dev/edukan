import React from 'react';
import { useGoogleLogout } from 'react-google-login';

import googleIcon from '../assets/google.png'


const clientId =
  '244033098309-57t637lqes8nh18eh9ljprkv29ovonpb.apps.googleusercontent.com';

const GoogleLogout = (props) => {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src={googleIcon} alt="google login" className="icon" />
      <span className="buttonText">Fazer logout</span>
    </button>
  );
}

export default GoogleLogout;