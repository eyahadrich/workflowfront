import {
    CLOSE_ASIDE_DEMAND, CLOSE_MODAL_CONFIRMATION_DEMAND, RESET_ASIDE_DEMAND,
    SHOW_ASIDE_CONSULT_MODE_DEMAND, SHOW_ASIDE_DELETE_MODE_DEMAND, SHOW_MODAL_CONFIRMATION_DEMAND
} from "../../Constants/ListDemands/ListDemandsAside";





export const handleOpenConsultMode = (selectedDemand) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_DEMAND,
            payload: selectedDemand
        });
    }
}


export const handleOpenDeleteMode = (selectedDemand, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_DEMAND,
            payload: { selectedDemand: selectedDemand, successCallback: successCallback }
        });
    }
}



export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_DEMAND
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_DEMAND
        });
    }
}





export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_DEMAND,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_DEMAND,
            payload: successCallback
        });
    }
}

