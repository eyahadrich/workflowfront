import axios from 'axios';
import {GET_ALL_DEMAND} from "../../Constants/ComponentTable/SelectListDemands";



export const getAllDemands = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/demandes`).then(res => {
            dispatch({
                type: GET_ALL_DEMAND,
                payload: res.data
            })
        })
    }
};