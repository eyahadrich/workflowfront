
import {LOGIN, LOGOUT, SET_EMPLOYEE_DATA} from "../../Constants/Login/Login";

const initialState = {
    userAuthentification: null,
    employeeData:null
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userAuthentification: action.payload
            };
            case LOGOUT:
            return {
                ...state,
                userAuthentification: action.payload
            };
        case SET_EMPLOYEE_DATA:
            return {
                ...state,
                employeeData: action.payload
            };

        default:
            return state;
    }
}
export default LoginReducer;
