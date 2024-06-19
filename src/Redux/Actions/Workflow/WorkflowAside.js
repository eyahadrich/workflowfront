import {
    CLOSE_ASIDE_WORKFLOW, CLOSE_MODAL_CONFIRMATION_WORKFLOW, RESET_ASIDE_WORKFLOW,
    SHOW_ASIDE_ADD_MODE_WORKFLOW,
    SHOW_ASIDE_CONSULT_MODE_WORKFLOW,
    SHOW_ASIDE_DELETE_MODE_WORKFLOW, SHOW_ASIDE_EDIT_MODE_WORKFLOW, SHOW_MODAL_CONFIRMATION_WORKFLOW
} from "../../Constants/Workflow/WorkflowAside";



export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_WORKFLOW,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedWorkflow) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_WORKFLOW,
            payload: selectedWorkflow
        });
    }
}

export const handleOpenDeleteMode = (selectedWorkflow, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_WORKFLOW,
            payload: { selectedWorkflow: selectedWorkflow, successCallback: successCallback }
        });
    }
}


export const handleOpenEditMode = (selectedWorkflow, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_WORKFLOW,
            payload: {selectedWorkflow: selectedWorkflow, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_WORKFLOW
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_WORKFLOW
        });
    }
}





export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_WORKFLOW,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_WORKFLOW,
            payload: successCallback
        });
    }
}

