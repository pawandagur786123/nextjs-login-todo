const username = "admin"
const password = "admin@123"

export const login = data => {
  if(data.username === username && data.password === password){
    return {
      type: "AUTH_LOGIN",
      data
    };
  }else{
    return {
      type: "LOGIN_FAILED",
      data
    };
  }
};

export const logout = () => {
    return {
      type: "LOGOUT"
    }
};

export const addNote = note => {
    return {
      type: "ADD_NOTE",
      note
    };
  };
  
  export const removeNote = id => {
    return {
      type: "REMOVE_NOTE",
      id
    };
  };

  export const editNote = (id = null) => {
    return {
      type: "EDIT_NOTE",
      id
    }
  }


export const updateNote = note => {
    return {
      type: "UPDATE_NOTE",
      note
    };
};
  