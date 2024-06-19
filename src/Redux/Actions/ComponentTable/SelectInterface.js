import axios from 'axios';
import {GET_ALL_INTERFACE} from "../../Constants/ComponentTable/SelectInterface";


export const getAllInterfaces = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/interfaces`).then(res => {
            dispatch({
                type: GET_ALL_INTERFACE,
                payload: res.data
            })
        })
    }
};