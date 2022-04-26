const initialState = {
    id:null
  };
  
  const reducer = (state = initialState, action) => {
    console.log("action", action)
    switch (action.type) {
      case "EDIT_NOTE":
        return {
          ...state,
          id: action.id
        };
      
      default:
        return state;
    }
  };

  export default reducer;