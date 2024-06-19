import axios from 'axios';
import {GET_ALL_WORKFLOW} from "../../Constants/ComponentTable/SelectWorkflow";

export const getAllWorkflows = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/workflows`).then(res => {
            dispatch({
                type: GET_ALL_WORKFLOW,
                payload: res.data
            })
        })
    }
};