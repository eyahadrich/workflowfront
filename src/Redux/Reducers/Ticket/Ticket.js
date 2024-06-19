import {CLEAR_TICKET_DATA, GET_TICKETS_BY_INTERFACE_ID} from "../../Constants/Ticket/Ticket";


const initialState = {
    allTickets: [],



};

const TicketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKETS_BY_INTERFACE_ID:
            return {
                ...state,
                allTickets: action.payload
            };



        default:
            return state;
    }
}
export default TicketsReducer;
