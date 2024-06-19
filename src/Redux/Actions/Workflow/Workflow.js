import axios from 'axios';
import {ADD_NEW_WORKFLOW, DELETE_WORKFLOW, EDIT_WORKFLOW, GET_WORKFLOW_BY_ID} from "../../Constants/Workflow/Workflow";



export const getWorkflowById = (idWorkflow) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/workflows/${idWorkflow}`)
                .then(res => {
                    dispatch({
                        type: GET_WORKFLOW_BY_ID,
                        payload: res.data

                    });
                    resolve(res.data);
                });
        });
    }
};

export const addNewWorkflow = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:9011/workflow-core/api/workflows`, data)
                .then(res => {
                    dispatch({
                        type: ADD_NEW_WORKFLOW,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const editeWorkflow = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:9011/workflow-core/api/workflows/${data.idWorkflow}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_WORKFLOW,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const deleteWorkflow = (idWorkflow) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:9011/workflow-core/api/workflows/${idWorkflow}`)
                .then(res => {
                    dispatch({
                        type: DELETE_WORKFLOW,
                        payload: idWorkflow
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

