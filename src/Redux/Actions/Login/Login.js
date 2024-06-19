import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import {LOGIN, LOGOUT, SET_EMPLOYEE_DATA} from "../../Constants/Login/Login";


export const signIn = (username, password) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlC}/workflow-core/auth/authenticate`, {
                username: encodeURIComponent(username),
                password: encodeURIComponent(password)
            })
                .then(res => {
                    // Dispatch login action
                    dispatch({
                        type: LOGIN,
                        payload: username
                    });

                    // Fetch employee data
                    axios.get(`http://localhost:9011/workflow-core/api/login/${username}`)
                        .then(employeeRes => {
                            // Dispatch employee data action
                            dispatch({
                                type: SET_EMPLOYEE_DATA,
                                payload: employeeRes.data
                            });
                            resolve(employeeRes.data); // Resolve with employee data
                        })
                        .catch(error => {
                            reject(error); // Reject if fetching employee data fails
                        });
                }).catch(function (error) {
                reject(error); // Reject if authentication fails
            });
        });
    };
};
export const logOut = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlC}/${Ressources.Employee}/logout`)
                .then(res => {
                    dispatch({
                        type: LOGOUT,
                        payload: ""
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
}




