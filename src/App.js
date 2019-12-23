import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import {auth} from "./actions"
import NotFound from "./components/NotFound";
// import Login from './components/login'
import Register from "./components/Register";
import PonyNote from './components/PonyNote'
import ponyApp from "./reducers"
import './App.css';
import Login2 from "./components/Login2"

import { createStore, applyMiddleware } from "redux"
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";







let store = createStore(ponyApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login2" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={PonyNote} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login2" component={Login2} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>


      // <Provider store={store}>
      //   <BrowserRouter>
      //     <Switch>
      //       <Route exact path="/login" component={Login} />
      //       <Route exact path="/login2" component={Login2}></Route>
      //       <Route exact path="/" component={PonyNote} />

      //       <Route component={NotFound} />
      //     </Switch>
      //   </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;