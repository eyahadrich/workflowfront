import axios from 'axios';
import {CLEAR_TICKET_DATA, GET_DEMAND_BY_ID, GET_TICKET_DATA} from "../../Constants/ListDemands/ListDemands";





export const getDemandById = (idDemande) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/demandes/${idDemande}`)
                .then(res => {
                    dispatch({
                        type: GET_DEMAND_BY_ID,
                        payload: res.data

                    });
                    resolve(res.data);
                });
        });
    }
};
export const getTicketData = (idDemande) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/ticketdatas/demand/${idDemande}`)
                .then(res => {
                    dispatch({
                        type: GET_TICKET_DATA,
                        payload: res.data
                    });
                    resolve(res.data);
                })
                .catch(error => {
                    console.error('Error fetching ticket data:', error);
                    reject(error);
                });
        });
    };
};
export const clearTicketData = () =>({
    type: CLEAR_TICKET_DATA,
});








