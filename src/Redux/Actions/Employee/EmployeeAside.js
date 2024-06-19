import {
    CLOSE_ASIDE_EMPLOYEE,
    RESET_ASIDE_EMPLOYEE,
    SHOW_ASIDE_ADD_MODE_EMPLOYEE,
    SHOW_ASIDE_EDIT_MODE_EMPLOYEE,
    SHOW_ASIDE_DELETE_MODE_EMPLOYEE,
    GET_ALL_TYPE_EMPLOYEE,
    SHOW_ASIDE_CONSULT_MODE_EMPLOYEE,
    SHOW_MODAL_CONFIRMATION_EMPLOYEE,
    CLOSE_MODAL_CONFIRMATION_EMPLOYEE
} from "../../Constants/Employee/EmployeeAside";
import axios from "axios";
import Ressources from '../../../Helper/Ressources';

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_EMPLOYEE,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedEmployee) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_EMPLOYEE,
            payload: selectedEmployee
        });
    }
}

export const handleOpenDeleteMode = (selectedEmployee, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_EMPLOYEE,
            payload: { selectedEmployee: selectedEmployee, successCallback: successCallback }
        });
    }
}


export const handleOpenEditMode = (selectedEmployee, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_EMPLOYEE,
            payload: {selectedEmployee: selectedEmployee, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_EMPLOYEE
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_EMPLOYEE
        });
    }
}

export const getAllTypeEmployee = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.employeeTypes}`).then(res => {
            dispatch({
                type: GET_ALL_TYPE_EMPLOYEE,
                payload: res.data
            })
        })
    }
}



export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_EMPLOYEE,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_EMPLOYEE,
            payload: successCallback
        });
    }
}

