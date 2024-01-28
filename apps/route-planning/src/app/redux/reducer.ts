import { flight, flightsState } from "./flightsState"


export default function appReducer(state = flightsState, action: { type: string; flight: flight; }){
    
    switch (action.type) {
      case "ADD_FLIGHT":
        return {
       ...state,
          flights: [...state.flights, action.flight]
        };
      default:
        return state
    }
  }