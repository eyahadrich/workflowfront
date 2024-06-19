import {
    CLOSE_ASIDE_MYDEMAND, CLOSE_MODAL_CONFIRMATION_MYDEMAND, RESET_ASIDE_MYDEMAND,
    SHOW_ASIDE_ADD_MODE_MYDEMAND,
    SHOW_ASIDE_CONSULT_MODE_MYDEMAND,
    SHOW_ASIDE_DELETE_MODE_MYDEMAND, SHOW_ASIDE_EDIT_MODE_MYDEMAND, SHOW_MODAL_CONFIRMATION_MYDEMAND
} from "../../Constants/MyDemand/MyDemandAside";


export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_MYDEMAND,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedMyDemand) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_MYDEMAND,
            payload: selectedMyDemand
        });
    }
}

export const handleOpenDeleteMode = (selectedMyDemand, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_MYDEMAND,
            payload: { selectedMyDemand: selectedMyDemand, successCallback: successCallback }
        });
    }
}


export const handleOpenEditMode = (selectedMyDemand, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_MYDEMAND,
            payload: {selectedMyDemand: selectedMyDemand, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_MYDEMAND
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_MYDEMAND
        });
    }
}





export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_MYDEMAND,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_MYDEMAND,
            payload: successCallback
        });
    }
}

