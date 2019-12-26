import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { auth } from "../../store/actions";
import { connect } from 'react-redux';

class NavBar extends Component {
    render() {
        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">MegaKontrol</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/ponynote">PonyNote</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <div style={{ textAlign: "right" }}>
                            {this.props.user.username} (<a href="/#" onClick={this.props.logout}>logout</a>)
                        </div>
                       
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);