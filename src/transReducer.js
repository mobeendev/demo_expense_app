const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      return [action.payload, ...state];
    }
    case "REMOVE_TRANSACTION": {
      let newState = state.filter(
        (item) => item.id !== action.payload.deleteId
      );

      return newState;
    }
    default:
      return state;
  }
};

export default TransactionReducer;
