import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/store'
import { GoogleApiProvider } from 'react-gapi';
import "./scss/style.scss";

import {
  Board
} from 'components';

const App = () => {
  return (
    <Provider store={store}>
      <GoogleApiProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <Board/>
      </GoogleApiProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));