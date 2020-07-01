const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      return [action.payload, ...state];
    }
    case "UPDATE_TRANSACTION": {
      const elementsIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      let newState = [...state];

      newState[elementsIndex] = {
        id: action.payload.id,
        amount: action.payload.amount,
        desc: action.payload.desc,
      };
      console.log(newState[elementsIndex]);

      return newState;
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
