import {GET_ALL_DEMAND} from "../../Constants/ComponentTable/SelectListDemands";
import {CLEAR_TICKET_DATA, GET_DEMAND_BY_ID, GET_TICKET_DATA} from "../../Constants/ListDemands/ListDemands";




const initialState = {
    allDemand: [],
    ticketData:[],


};

const DemandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DEMAND:
            return {
                ...state,
                allDemand: action.payload
            };
        case GET_DEMAND_BY_ID:
            return {
                ...state,
                selectedDemand: action.payload
            };
        case GET_TICKET_DATA:
            return {
                ...state,
                ticketData: action.payload,
            };
        case CLEAR_TICKET_DATA:
            return {
                ...state,
                ticketData: [],
            };




        default:
            return state;
    }
}
export default DemandsReducer;
