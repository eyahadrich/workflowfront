import axios from 'axios';
import {GET_ALL_MYDEMAND, GET_ALL_MYDEMAND_BY_ID_INTERFACE} from "../../Constants/ComponentTable/SelectMyDemand";


export const getAllMyDemand = (idEmploye) => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/demandes/employe/${idEmploye}`).then(res => {
            dispatch({
                type: GET_ALL_MYDEMAND,
                payload: res.data
            })
        })
    }
};
export const getMyDemandByIdInterface = (idEmploye,idInterface) => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/demandes/employe/${idEmploye}/interface/${idInterface}`).then(res => {
            dispatch({
                type: GET_ALL_MYDEMAND_BY_ID_INTERFACE,
                payload: res.data
            })
        })
    }
};

