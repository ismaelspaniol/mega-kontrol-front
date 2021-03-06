import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateEmpresa extends Component {

    constructor(props) {
        super(props)
        this.onChangeEmpresaRazaoSocial = this.onChangeEmpresaRazaoSocial.bind(this);
        this.onChangeEmpresaNumeroInscricao = this.onChangeEmpresaNumeroInscricao.bind(this);
        this.onChangeEmpresaDataCricao = this.onChangeEmpresaDataCricao.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            razao_social: '',
            numero_inscricao: '',
            data_criacao: ''
        }
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

    onSubmit(e) {
        e.preventDefault()

        console.log('Empresa criada com sucesso');
        console.log(`Razao social: ${this.state.razao_social}`)
        console.log(`Numero inscricao: ${this.state.numero_inscricao}`)
        console.log(`Data criacao: ${this.state.data_criacao}`)

        const empresaObject = {
            razao_social: this.state.razao_social,
            numero_inscricao: this.state.numero_inscricao,
            data_criacao: this.state.data_criacao
        };
        console.log(empresaObject);
        axios.post('http://127.0.0.1:8080/api/empresas/', empresaObject)
            .then(res => console.log(res.data));

        this.setState({ razao_social: '', numero_inscricao: '', data_criacao: '' })
    }


    render() {
        return (
            <div className="container">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="razao-social">
                        <Form.Label>Razao Social</Form.Label>
                        <Form.Control type="text" value={this.state.razao_social}
                            onChange={this.onChangeEmpresaRazaoSocial}
                        />

                    </Form.Group>

                    <Form.Group controlId="numero_inscricao">
                        <Form.Label>Numero Inscricao</Form.Label>
                        <Form.Control type="number" value={this.state.numero_inscricao}
                            onChange={this.onChangeEmpresaNumeroInscricao}
                        />
                    </Form.Group>

                    <Form.Group controlId="data_criacao">
                        <Form.Label>Data Cricao</Form.Label>
                        <Form.Control type="date" value={this.state.data_criacao}
                            onChange={this.onChangeEmpresaDataCricao}
                        />
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Create Empresa
                    </Button>

                </Form>
            </div>);
    }
}