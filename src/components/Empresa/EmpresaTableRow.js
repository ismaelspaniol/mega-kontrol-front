import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export default class EmpresaTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteEmpresa = this.deleteEmpresa.bind(this);
    }

  async  deleteEmpresa() {
  
     await axios.delete('http://127.0.0.1:8080/api/empresas/' + this.props.obj.id + '/')
            .then((res) => {
                console.log('Empresa successfully deleted!');
                this.props.getEmpresas();
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.razao_social}</td>
                <td>{this.props.obj.numero_inscricao}</td>
                <td>{this.props.obj.data_criacao}</td>
                <td>
                    <Link className="btn btn-primary" to={"/edit-empresa/" + this.props.obj.id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteEmpresa} variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}