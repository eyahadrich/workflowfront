import axios from 'axios';
 import {
    ADD_NEW_EQUIPE,
    DELETE_EQUIPE,
    EDIT_EQUIPE, FETCH_EMPLOYEES_AND_ROLES_FAILURE,
    FETCH_EMPLOYEES_AND_ROLES_REQUEST, FETCH_EMPLOYEES_AND_ROLES_SUCCESS,
    GET_EQUIPE_BY_ID,
     GET_ALL_EMPLOYE,
     GET_ALL_ROLE
} from "../../Constants/Equipe/Equipe";


export const getEquipeById = (idEquipe) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:9011/workflow-core/api/equipes/${idEquipe}`)
                .then(res => {
                    dispatch({
                        type: GET_EQUIPE_BY_ID,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};


export const addNewEquipe = (equipeData, rows) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            // Step 1: Add the new equipe
            axios.post(`http://localhost:9011/workflow-core/api/equipes`, equipeData)
                .then(res => {
                    const newEquipe = res.data;
                    dispatch({
                        type: ADD_NEW_EQUIPE,
                        payload: newEquipe
                    });

                    // Step 2: Prepare the rows with the new equipe ID
                     rows.map(row => (
                    axios.post(`http://localhost:9011/workflow-core/api/role-equipes`,{
                        idEmploye: parseInt(row.employe, 10),
                        idEquipe: newEquipe.idEquipe,
                        roleEquipe: parseInt(row.role,10)

                    })
                        .then(rowsRes => {
                            resolve({
                                equipe: newEquipe,
                                rows: rowsRes.data
                            });
                        })


                    ));

                    // Step 3: Add the rows

                }).catch(error => {
                reject(error);
            });
        });
    }
};

export const editeEquipe = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:9011/workflow-core/api/equipes/${data.idEquipe}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_EQUIPE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};

export const deleteEquipe = (idEquipe) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:9011/workflow-core/api/equipes/${idEquipe}`)
                .then(res => {
                    dispatch({
                        type: DELETE_EQUIPE,
                        payload: idEquipe
                    });
                    resolve(true);
                }).catch(function (error) {
                reject(error);
            });
        });
    }
};
export const getEmployes = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/employes`).then(res => {
            dispatch({
                type: GET_ALL_EMPLOYE,
                payload: res.data
            })
        })
    }
}
export const getRoles = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/roles`).then(res => {
            dispatch({
                type: GET_ALL_ROLE,
                payload: res.data
            })
        })
    }
}
export const fetchEmployeesAndRoles = (selectedEquipe) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_EMPLOYEES_AND_ROLES_REQUEST });

        try {
            const employees = [];
            const roles = [];
            for (const member of selectedEquipe.roleEquipeList) {
                const employeeInfo = await axios.get(`http://localhost:9011/workflow-core/api/employes/${member.idEmploye}`);
                employees.push(employeeInfo.data);

                const roleInfo = await axios.get(`http://localhost:9011/workflow-core/api/roles/${member.roleEquipe}`);
                roles.push(roleInfo.data);
            }
            dispatch({
                type: FETCH_EMPLOYEES_AND_ROLES_SUCCESS,
                payload: { employees, roles }
            });
        } catch (error) {
            dispatch({
                type: FETCH_EMPLOYEES_AND_ROLES_FAILURE,
                payload: error.message // You can customize the payload as needed
            });
        }
    };
};

