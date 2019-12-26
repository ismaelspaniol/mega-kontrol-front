import React, { Component } from 'react';
import NotFound from "../../components/menssage/NotFound";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Register from "../../components/Autentication/Register";
import PonyNote from '../../components/PonyNote'
import Login from "../../components/Autentication/Login"
import { connect } from "react-redux";
import { auth } from "../actions"
import Navbar from "../../components/UI/Navbar"

  class RootContainerComponent extends Component {

    componentDidMount() {
      this.props.loadUser();
    }
  
    PrivateRoute = ({ component: ChildComponent, ...rest }) => {
      return <Route {...rest} render={props => {
        if (this.props.auth.isLoading) {
          return <em>Loading...</em>;
        } else if (!this.props.auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <ChildComponent {...props} />
        }
      }} />
    }

    RenderNavBar(){
        if  (this.props.auth.isAuthenticated){
            return Navbar
        }
    }

  
    render() {
      let { PrivateRoute } = this;
      return (
        <BrowserRouter>
        
           <Navbar isAuthenticated={this.props.auth.isAuthenticated}></Navbar>
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

  export default  connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);