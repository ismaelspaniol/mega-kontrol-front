import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import EmpresaTableRow from './EmpresaTableRow';


export default class EmpresaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empresas: []
    };
  }

  getEmpresas() {
    axios.get('http://127.0.0.1:8080/api/empresas/')
      .then(res => {
        console.log(res.data)
        console.log('empresa-list')
        this.setState({
          empresas: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleToUpdate = (someArg) => {
    alert('We pass argument from Child to Parent: ' + someArg);
}

  componentDidMount() {
    this.getEmpresas();
  }


  DataTable() {
    return this.state.empresas.map((res, i) => {
      var getEmpresas  =   this.getEmpresas;
      return <EmpresaTableRow obj={res} key={i} getEmpresas={getEmpresas.bind(this)}/>;
    });
  }


  render() {
   
    let content = <p>Carregando...</p>

    if (this.state.empresas.length !== 0) {
      content = (
        <div className="container" style={{ paddingTop: '25px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>razao social</th>
                <th>numero_inscricao</th>
                <th>Data Criacao</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.DataTable()}
            </tbody>
          </Table>
        </div>

      )
    }
    return (
      <div className="container" style={{ paddingTop: '25px' }}>
        <h1>Listagem de Empresas</h1>
        {content}
      </div>
    );


  }
}