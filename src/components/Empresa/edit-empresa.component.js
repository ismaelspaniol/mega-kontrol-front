import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditEmpresa extends Component {

  constructor(props) {
    super(props)

    this.onChangeEmpresaRazaoSocial = this.onChangeEmpresaRazaoSocial.bind(this);
    this.onChangeEmpresaNumeroInscricao = this.onChangeEmpresaNumeroInscricao.bind(this);
    this.onChangeEmpresaDataCricao = this.onChangeEmpresaDataCricao.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
        razao_social: '',
        numero_inscricao: '',
        data_criacao: ''
    }
  }

  componentDidMount() {

    axios.get('http://127.0.0.1:8080/api/empresas/' + this.props.match.params.id+'/')
      .then(res => {
        this.setState({
            razao_social: res.data.razao_social,
            numero_inscricao: res.data.numero_inscricao,
            data_criacao: res.data.data_criacao
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeEmpresaRazaoSocial(e) {
    this.setState({ razao_social: e.target.value })
  }

  onChangeEmpresaNumeroInscricao(e) {
    this.setState({ numero_inscricao: e.target.value })
  }

  onChangeEmpresaDataCricao(e) {
    this.setState({ data_criacao: e.target.value })
  }

 async  onSubmit(e) {
    e.preventDefault()

    const empresaObject = {
        razao_social: this.state.razao_social,
        numero_inscricao: this.state.numero_inscricao,
        data_criacao: this.state.data_criacao
    };

    await axios.put('http://127.0.0.1:8080/api/empresas/' + this.props.match.params.id+'/', empresaObject)
      .then((res) => {
        console.log(res.data)
        console.log('Empresa successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/empresa-list')
  }


  render() {
    return (<div className="container">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="razao_social">
          <Form.Label>razao_social</Form.Label>
          <Form.Control type="text" value={this.state.razao_social} onChange={this.onChangeEmpresaRazaoSocial} />
        </Form.Group>

        <Form.Group controlId="numero_inscricao">
          <Form.Label>numero_inscricao</Form.Label>
          <Form.Control type="text" value={this.state.numero_inscricao} onChange={this.onChangeEmpresaNumeroInscricao} />
        </Form.Group>

        <Form.Group controlId="data_criacao">
          <Form.Label>data_criacao</Form.Label>
          <Form.Control type="date" value={this.state.data_criacao} onChange={this.onChangeEmpresaDataCricao} />
        </Form.Group>
        <Link className="btn btn-primary" size="lg" to={"/empresa-list"}>
                        List Empresas
        </Link>
        <Button variant="danger" size="lg" block="block" type="submit">
          Update Empresa
        </Button>
      </Form>
    </div>);
  }
}