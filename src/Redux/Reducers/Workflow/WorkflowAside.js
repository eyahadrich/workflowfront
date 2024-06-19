import {
    CLOSE_ASIDE_WORKFLOW, CLOSE_MODAL_CONFIRMATION_WORKFLOW, RESET_ASIDE_WORKFLOW,
    SHOW_ASIDE_ADD_MODE_WORKFLOW, SHOW_ASIDE_CONSULT_MODE_WORKFLOW,
    SHOW_ASIDE_DELETE_MODE_WORKFLOW,
    SHOW_ASIDE_EDIT_MODE_WORKFLOW, SHOW_MODAL_CONFIRMATION_WORKFLOW
} from "../../Constants/Workflow/WorkflowAside";


const initialState = {
    isOpen: false,
    modeAside: '',
    selectedWorkflow: null,


};

const WorkflowAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_WORKFLOW:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedWorkflow: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_WORKFLOW:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedWorkflow: action.payload.selectedWorkflow,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_WORKFLOW:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedWorkflow: action.payload.selectedWorkflow,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_WORKFLOW:
            return {
                ...state,
                isOpen: false,
                selectedWorkflow: null,
            };
        case RESET_ASIDE_WORKFLOW:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedWorkflow: null,
            };


        case SHOW_ASIDE_CONSULT_MODE_WORKFLOW:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedWorkflow: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_WORKFLOW:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_WORKFLOW:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        default:
            return state;
    }
};

export default WorkflowAsideReducer;