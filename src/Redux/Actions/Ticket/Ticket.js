import axios from 'axios';
import { GET_TICKETS_BY_INTERFACE_ID} from "../../Constants/Ticket/Ticket";


export const getAllTicketsByInterfaceId = (id) => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/tickets/inter/${id}`).then(res => {
            dispatch({
                type: GET_TICKETS_BY_INTERFACE_ID,
                payload: res.data.sort((a, b) => a.ordreTicket - b.ordreTicket)
            })
        })
    }
};
