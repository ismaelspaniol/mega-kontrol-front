import React, { Component } from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class Home extends Component {
    render() {
        return (
            <Container className="p-3">
                <Jumbotron  >
                    <div>
                        OLa  seja   bem vindo
                    </div>
                </Jumbotron>
            </Container>
        )
    }
}
 
export default Home;