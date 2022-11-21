const authReducer = (
  state = {
    authData: null,
    authError: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, authData: action.data };

    case "LOGIN":
      return { ...state, authData: action.data };

    case "STARTLOADING":
      return { ...state, loading: true };

    case "ENDLOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default authReducer;
