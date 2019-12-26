import React, { Component } from 'react';
import './App.css';
import { Provider } from "react-redux";
import RootContainerComponent from './store/Roots/RootContainer'
import  store  from "./store/store"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainerComponent />
      </Provider>
    );
  }
}

export default App;