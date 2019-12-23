export const fetchNotes = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `JWT ${token}`;
    }

    return fetch("http://localhost:8080/api/notes/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'FETCH_NOTES', notes: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const addNote = text => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `JWT ${token}`;
    }

    let body = JSON.stringify({text, });
    return fetch("http://localhost:8080/api/notes/", {headers, method: "POST", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201) {
          return dispatch({type: 'ADD_NOTE', note: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const updateNote = (index, text) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `JWT ${token}`;
    }

    let body = JSON.stringify({text, });
    let noteId = getState().notes[index].id;

    return fetch(`http://localhost:8080/api/notes/${noteId}/`, {headers, method: "PUT", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'UPDATE_NOTE', note: res.data, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const deleteNote = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `JWT ${token}`;
    }

    let noteId = getState().notes[index].id;

    return fetch(`http://localhost:8080/api/notes/${noteId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          return dispatch({type: 'DELETE_NOTE', index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}





































// export const addNote = text => {
//     return dispatch => {
//       let headers = {"Content-Type": "application/json"};
//       let body = JSON.stringify({text, });
//       return fetch("http://localhost:8080/api/notes/", {headers, method: "POST", body})
//         .then(res => res.json())
//         .then(note => {
//           return dispatch({
//             type: 'ADD_NOTE',
//             note
//           })
//         })
//     }
//   }
  
//   export const updateNote = (index, text) => {
//     return (dispatch, getState) => {
  
//       let headers = {"Content-Type": "application/json"};
//       let body = JSON.stringify({text, });
//       let noteId = getState().notes[index].id;
  
//       return fetch(`http://localhost:8080/api/notes/${noteId}/`, {headers, method: "PUT", body})
//         .then(res => res.json())
//         .then(note => {
//           return dispatch({
//             type: 'UPDATE_NOTE',
//             note,
//             index
//           })
//         })
//     }
//   }
  
//   export const deleteNote = index => {
//     return (dispatch, getState) => {
  
//       let headers = {"Content-Type": "application/json"};
//       let noteId = getState().notes[index].id;
  
//       return fetch(`http://localhost:8080/api/notes/${noteId}/`, {headers, method: "DELETE"})
//         .then(res => {
//           if (res.ok) {
//             return dispatch({
//               type: 'DELETE_NOTE',
//               index
//             })
//           }
//         })
//     }
//   }

//   export const fetchNotes = () => {
//     return dispatch => {
//       let headers = {"Content-Type": "application/json"};
//       return fetch("http://localhost:8080/api/notes/", {headers, })
//         .then(res => res.json())
//         .then(notes => {
//           return dispatch({
//             type: 'FETCH_NOTES',
//             notes
//           })
//         })
//     }
//   }