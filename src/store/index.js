import { createStore } from "redux";

const storeReducer = (state = {}, action) => {
  switch (action.type) {
    case "set_mandatory_user_data":
      return {
        ...state,
        ...{ userDetails: action.userDetails },
      };
    case "set_present_financial_situation":
      console.log("storing present financial situation");
      console.log(state);
      return {
        ...state,
        ...{ presentFinancialSituation: action.presentFinancialSituation },
      };
    default:
      console.log("Returning default state");
      return state;
  }
};

const store = createStore(storeReducer);
export default store;
