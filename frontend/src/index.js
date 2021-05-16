import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/store'
import "./scss/style.scss";

import {
  Board
} from 'components'

const App = () => {
  return (
    <Provider store={store}>
      <Board/>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));