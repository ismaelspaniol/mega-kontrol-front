export const fetchEmpresas = () => {
    return (dispatch, getState) => {
      let headers = { "Content-Type": "application/json" };
      let { token } = getState().auth;
  
      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }
  
      return fetch("http://localhost:8080/api/empresas/", { headers, })
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return { status: res.status, data };
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            return dispatch({ type: 'FETCH_EMPRESAS', empresas: res.data });
          } else if (res.status === 401 || res.status === 403) {
            console.log('erro3');
            dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
            throw res.data;
          }
        })
    }
  }
  
  export const addEmpresa = text => {
    return (dispatch, getState) => {
      let headers = { "Content-Type": "application/json" };
      let { token } = getState().auth;
  
      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }
  
      let body = JSON.stringify({ text, });
      return fetch("http://localhost:8080/api/empresas/", { headers, method: "POST", body })
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return { status: res.status, data };
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 201) {
            return dispatch({ type: 'ADD_EMPRESA', empresa: res.data });
          } else if (res.status === 401 || res.status === 403) {
            console.log('erro2');
            dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
            throw res.data;
          }
        })
    }
  }
  
  export const updateEmpresa = (index, text) => {
    return (dispatch, getState) => {
  
      let headers = { "Content-Type": "application/json" };
      let { token } = getState().auth;
  
      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }
  
      let body = JSON.stringify({ text, });
      let empresaId = getState().empresas[index].id;
  
      return fetch(`http://localhost:8080/api/empresas/${empresaId}/`, { headers, method: "PUT", body })
        .then(res => {
          console.log("teste45 status" + res.status);
          if (res.status < 500) {
            return res.json().then(data => {
              return { status: res.status, data };
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          console.log("res: " + res.status);
          if (res.status === 200) {
            return dispatch({ type: 'UPDATE_EMPRESA', empresa: res.data, index });
          } else if (res.status > 300) {
            console.log('erro1');
            dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
  
            throw res.data;
  
          }
        })
    }
  }
  
  export const deleteEmpresa = index => {
    return (dispatch, getState) => {
  
      let headers = { "Content-Type": "application/json" };
      let { token } = getState().auth;
  
      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }
  
      let empresaId = getState().empresas[index].id;
  
      return fetch(`http://localhost:8080/api/empresas/${empresaId}/`, { headers, method: "DELETE" })
        .then(res => {
          if (res.status === 204) {
            return { status: res.status, data: {} };
          } else if (res.status < 500) {
            return res.json().then(data => {
              return { status: res.status, data };
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 204) {
            return dispatch({ type: 'DELETE_EMPRESA', index });
          } else if (res.status === 401 || res.status === 403) {
            console.log('erro4');
            dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
            throw res.data;
          }
        })
    }
  }
  