import {
    CHECK_EMPLOYEE_EXISTENCE_FAILURE,
    CHECK_EMPLOYEE_EXISTENCE_REQUEST,
    CHECK_EMPLOYEE_EXISTENCE_SUCCESS
} from "../../Constants/Employee/CheckLogin";

const initialState = {
    loading: false,
    exists: true,
    error: ''
};

const loginExistenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_EMPLOYEE_EXISTENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CHECK_EMPLOYEE_EXISTENCE_SUCCESS:
            return {
                ...state,
                loading: false,
                exists: action.payload,
                error: ''
            };
        case CHECK_EMPLOYEE_EXISTENCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default loginExistenceReducer;