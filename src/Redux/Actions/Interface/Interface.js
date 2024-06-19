import axios from 'axios';
import {
    ADD_NEW_INTERFACE,
    DELETE_INTERFACE,
    EDIT_INTERFACE, GET_ETAPES_BY_WORKFLOW,
    GET_INTERFACE_BY_ID
} from "../../Constants/Interface/Interface";



export const getInterfaceById = (idInterface) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/interfaces/${idInterface}`)
                .then(res => {
                    dispatch({
                        type: GET_INTERFACE_BY_ID,
                        payload: res.data

                    });
                    resolve(res.data);
                });
        });
    }
};
export const getEtapesByWorkflow = (idInterface) => {
    return async dispatch => {
        try {
            // Fetch interface data
            const interfaceResponse = await axios.get(`http://localhost:9011/workflow-core/api/interfaces/${idInterface}`);
            const interfaceData = interfaceResponse.data;

            // Fetch etapes based on the workflow ID from the interface data
            const etapesResponse = await axios.get(`http://localhost:9011/workflow-core/api/etapes/workflow/${interfaceData.idWorkflow}`);
            const etapesData = etapesResponse.data;

            // Dispatch action to store etapes data
            dispatch({
                type: GET_ETAPES_BY_WORKFLOW,
                payload: etapesData
            });

            // Return the etapes data
            return etapesData;
        } catch (error) {
            console.error('Error fetching etapes by workflow:', error);
            throw error;
        }
    };
};


export const addNewInterface = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:9011/workflow-core/api/interfaces`, data)
                .then(res => {
                    dispatch({
                        type: ADD_NEW_INTERFACE,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const editeInterface = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:9011/workflow-core/api/interfaces/${data.idInterface}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_INTERFACE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const deleteInterface = (idInterface) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:9011/workflow-core/api/interfaces/${idInterface}`)
                .then(res => {
                    dispatch({
                        type: DELETE_INTERFACE,
                        payload: idInterface
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

