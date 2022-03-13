import { createStore } from "redux";

const storeReducer = (state = { userSelectedEvents: [] }, action) => {
  switch (action.type) {
    case "set_mandatory_user_data":
      return {
        ...state,
        ...{ userDetails: action.userDetails },
      };
    case "set_present_financial_situation":
      console.log("storing present financial situation");
      console.log(state);
      console.log("action", action);
      return {
        ...state,
        ...{ presentFinancialSituation: action.presentFinancialSituation },
      };
    case "add_event":
      const presentEvents = state.userSelectedEvents;
      return {
        ...state,
        ...{ userSelectedEvents: presentEvents.concat(action.finEvent) },
      };
    case "remove_event":
      const existingEvents = state.userSelectedEvents;
      const updatedEvents = existingEvents.filter(
        (finEvent) => finEvent.id !== action.event_id
      );
      return {
        ...state,
        ...{ userSelectedEvents: updatedEvents },
      };
    default:
      console.log("Returning default state");
      return state;
  }
};

const store = createStore(storeReducer);
export default store;
