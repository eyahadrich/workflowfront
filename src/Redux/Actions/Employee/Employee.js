import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import { ADD_NEW_EMPLOYEE,DELETE_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEE_BY_ID } from "../../Constants/Employee/Employee";

//  export const getAllBudgets = (dataGrid) => {
//     return dispatch => {
//         dataGrid.instance.beginCustomLoading();
//         axios.get(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}`).then(res => {
//             dispatch({
//                 type: GET_ALL_BUDGET,
//                 payload: res.data
//             });
//             dataGrid.instance.endCustomLoading();
//         })
//     }
// };

export const getEmployeeById = (idEmploye) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}/${idEmploye}`)
                .then(res => {
                    dispatch({
                        type: GET_EMPLOYEE_BY_ID,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};

export const addNewEmployee = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}`, data)
                .then(res => {
                    dispatch({
                        type: ADD_NEW_EMPLOYEE,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

export const editeEmployee = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}/${data.idEmploye}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_EMPLOYEE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

export const deleteEmployee = (idEmploye) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}/${idEmploye}`)
                .then(res => {
                    dispatch({
                        type: DELETE_EMPLOYEE,
                        payload: idEmploye
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

