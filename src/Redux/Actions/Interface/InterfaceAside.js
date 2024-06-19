import {
    CLOSE_ASIDE_INTERFACE,
    CLOSE_MODAL_CONFIRMATION_INTERFACE,
    RESET_ASIDE_INTERFACE,
    SHOW_ASIDE_ADD_MODE_INTERFACE, SHOW_ASIDE_CONSULT_MODE_INTERFACE,
    SHOW_ASIDE_DELETE_MODE_INTERFACE,
    SHOW_ASIDE_EDIT_MODE_INTERFACE,
    SHOW_MODAL_CONFIRMATION_INTERFACE
} from "../../Constants/Interface/InterfaceAside";

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_INTERFACE,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedInterface) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_INTERFACE,
            payload: selectedInterface
        });
    }
}

export const handleOpenDeleteMode = (selectedInterface, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_INTERFACE,
            payload: { selectedInterface: selectedInterface, successCallback: successCallback }
        });
    }
}


export const handleOpenEditMode = (selectedInterface, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_INTERFACE,
            payload: {selectedInterface: selectedInterface, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_INTERFACE
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_INTERFACE
        });
    }
}





export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_INTERFACE,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_INTERFACE,
            payload: successCallback
        });
    }
}

