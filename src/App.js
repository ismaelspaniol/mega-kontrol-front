import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { auth } from "./store/actions"
import NotFound from "./components/menssage/NotFound";
// import Login from './components/login'
import Register from "./components/Autentication/Register";
import PonyNote from './components/PonyNote'
import './App.css';
import Login from "./components/Autentication/Login"
import { Provider, connect } from "react-redux";

import  store  from "./store/store"

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
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
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
    );
  }
}

export default App;