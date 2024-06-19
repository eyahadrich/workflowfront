import axios from 'axios';
import {
    CHECK_EMPLOYEE_EXISTENCE_FAILURE,
    CHECK_EMPLOYEE_EXISTENCE_REQUEST,
    CHECK_EMPLOYEE_EXISTENCE_SUCCESS
} from "../../Constants/Employee/CheckLogin";

export const checkLoginExistence = (login) => {

    return async (dispatch) => {
        dispatch({ type: CHECK_EMPLOYEE_EXISTENCE_REQUEST });

        try {
            const response = await axios.get(`http://localhost:9011/workflow-core/api/employes/exists/login/${login}`);
            dispatch({
                type: CHECK_EMPLOYEE_EXISTENCE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: CHECK_EMPLOYEE_EXISTENCE_FAILURE,
                payload: error.message
            });
        }
    };
};