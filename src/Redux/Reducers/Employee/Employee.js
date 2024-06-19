import {
    GET_EMPLOYEE_BY_ID,
    ADD_NEW_EMPLOYEE,
    DELETE_EMPLOYEE,
    EDIT_EMPLOYEE,
} from '../../Constants/Employee/Employee';
import {GET_ALL_EMPLOYEE} from "../../Constants/ComponentTable/SelectEmployee";

const initialState = {
    allEmployee: [],
    selectedEmployee: null,
    btnConsultInstance: null,
    btnEditInstance: null,
    btnDeleteInstance: null,
    btnEditionInstance: null,

};

const EmployeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEE:
            return {
                ...state,
                allEmployee: action.payload
            };
        case GET_EMPLOYEE_BY_ID:
            return {
                ...state,
                selectedEmployee: action.payload
            };
        case ADD_NEW_EMPLOYEE:
            return {
                ...state,
                allEmployee: [...state.allEmployee, action.payload],

            };
        case EDIT_EMPLOYEE:
            return {
                ...state,
                allEmployee: state.allEmployee.map(employee =>
                    employee.idEmploye === action.payload.idEmploye ? action.payload : employee
                )
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
                allEmployee: state.allEmployee.filter(employee => employee.idEmploye !== action.payload)
            };

        default:
            return state;
    }
}
export default EmployeesReducer;
