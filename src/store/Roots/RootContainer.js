import React, { Component } from 'react';
import NotFound from "../../components/menssage/NotFound";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Register from "../../components/Autentication/Register";
import PonyNote from '../../components/PonyNote'
import Home from '../../components/Home'
import Login from "../../components/Autentication/Login"
import { connect } from "react-redux";
import { auth } from "../actions"
import Navbar from "../../components/UI/Navbar"
import CreateEmpresa from "../../components/Empresa/create-empresa.component";
import CreateEmpresa2 from "../../components/Empresa/create-empresa2.component"
import EditEmpresa from "../../components/Empresa/edit-empresa.component";
import EmpresaList from "../../components/Empresa/empresa-list.component";


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

  RenderNavBar() {
    if (this.props.auth.isAuthenticated) {
      return Navbar
    }
  }


  render() {
    let { PrivateRoute } = this;
    return (
      <BrowserRouter>
       <PrivateRoute component={Navbar}/>
        {/* <Navbar isAuthenticated={this.props.auth.isAuthenticated} username='teste' >  </Navbar> */}
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/ponynote" component={PonyNote} />
          <PrivateRoute exact path="/create-empresa" component={CreateEmpresa} />
          <PrivateRoute exact path="/create-empresa2" component={CreateEmpresa2} />
          <PrivateRoute exact path="/edit-empresa/:id" component={EditEmpresa} />
          <PrivateRoute exact path="/empresa-list" component={EmpresaList} />


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

export default connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);