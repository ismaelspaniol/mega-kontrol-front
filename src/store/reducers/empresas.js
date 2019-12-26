const initialState = [];


export default function empresas(state = initialState, action) {
  let empresaList = state.slice();

  switch (action.type) {

    case 'ADD_EMPRESA':
      return [...state, action.empresa];

    case 'UPDATE_EMPRESA':
      console.log('UPDATE_EMPRESA reducers/empresas');
      let empresaToUpdate = empresaList[action.index]
      empresaToUpdate.text = action.empresa.text;
      empresaList.splice(action.index, 1, empresaToUpdate);
      return empresaList;

    case 'DELETE_EMPRESA':
        empresaList.splice(action.index, 1);
      return empresaList;

    case 'FETCH_EMPRESAS':
      return [...state, ...action.empresas];

    default:
      return state;
  }
}