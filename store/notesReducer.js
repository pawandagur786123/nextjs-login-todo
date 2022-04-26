const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      const id = btoa(Math.random() * 200 + Math.random() * 200);
      return [
        ...state,
        {
          id,
          ...action.note
        }
      ];

    case "UPDATE_NOTE":
      return state.map((data)=> data.id === action?.note?.id ? {...data, ...action.note} : data)
    case "REMOVE_NOTE":
      return state.filter((note) => note.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
