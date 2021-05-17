// import React from 'react';
// import { useGoogleLogout } from 'react-google-login';

// const clientId =
//   '244033098309-57t637lqes8nh18eh9ljprkv29ovonpb.apps.googleusercontent.com';

// const GoogleLogout = (props) => {
//   const onLogoutSuccess = (res) => {
//     console.log('Logged out Success');
//   };

//   const onFailure = () => {
//     console.log('Handle failure cases');
//   };

//   const { signOut } = useGoogleLogout({
//     clientId,
//     onLogoutSuccess,
//     onFailure,
//   });

//   return (
//     <button onClick={signOut} className="button">
//       <img src="icons/google.svg" alt="google login" className="icon"></img>

//       <span className="buttonText">Fazer logout</span>
//     </button>
//   );
// }

// export default GoogleLogout;