import axios from 'axios';
import {
    DELETE_MYDEMAND,
    EDIT_MYDEMAND,
    GET_MYDEMAND_BY_ID,
    GET_VALIDATION_BY_DEMAND
} from "../../Constants/MyDemand/MyDemand";



export const getMyDemandById = (idDemande) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/demandes/${idDemande}`)
                .then(res => {
                    dispatch({
                        type: GET_MYDEMAND_BY_ID,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};


export const getValidationByDemand = (idDemande) => {
    return dispatch => {
        return new Promise((resolve) => {
            axios.get(`http://localhost:9011/workflow-core/api/validations/demande/${idDemande}`)
                .then(res => {
                    dispatch({
                        type: GET_VALIDATION_BY_DEMAND,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};


export const editeMyDemand = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:9011/workflow-core/api/demandes/${data.idDemande}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_MYDEMAND,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const deleteMyDemand = (idDemande) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:9011/workflow-core/api/demandes/${idDemande}`)
                .then(res => {
                    dispatch({
                        type: DELETE_MYDEMAND,
                        payload: idDemande
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

