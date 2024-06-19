import {
    CLOSE_ASIDE_EMPLOYEE,
    RESET_ASIDE_EMPLOYEE,
    SHOW_ASIDE_ADD_MODE_EMPLOYEE,
    SHOW_ASIDE_DELETE_MODE_EMPLOYEE,
    SHOW_ASIDE_EDIT_MODE_EMPLOYEE,
    GET_ALL_TYPE_EMPLOYEE,
    SHOW_ASIDE_CONSULT_MODE_EMPLOYEE,
    SHOW_MODAL_CONFIRMATION_EMPLOYEE,
    CLOSE_MODAL_CONFIRMATION_EMPLOYEE,
} from "../../Constants/Employee/EmployeeAside";

const initialState = {
    isOpen: false,
    modeAside: '',
    allTypeEmployee: '',
    selectedEmployee: null,


};

const BudgetAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_EMPLOYEE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedEmployee: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_EMPLOYEE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedEmployee: action.payload.selectedEmployee,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_EMPLOYEE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedEmployee: action.payload.selectedEmployee,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_EMPLOYEE:
            return {
                ...state,
                isOpen: false,
                selectedEmployee: null,
            };
        case RESET_ASIDE_EMPLOYEE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedEmployee: null,
            };
        case GET_ALL_TYPE_EMPLOYEE:
            return {
                ...state,
                allTypeEmployee: action.payload
            };

            case SHOW_ASIDE_CONSULT_MODE_EMPLOYEE:
                return {
                    ...state,
                    modeAside: 'CONSULT',
                    isOpen: true,
                    selectedEmployee: action.payload
                };
                case SHOW_MODAL_CONFIRMATION_EMPLOYEE:
                return {
                    ...state,
                    isConfirmationOpen: true,
                    messageToShow: action.messageToShow,
                    actionBtnModalConfirmation: action.actionBtnModalConfirmation
                };
            case CLOSE_MODAL_CONFIRMATION_EMPLOYEE:
                return {
                    ...state,
                    isConfirmationOpen: false,
                };

        default:
            return state;
    }
};

export default BudgetAsideReducer;