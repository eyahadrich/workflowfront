import {
    CLOSE_ASIDE_MYDEMAND, CLOSE_MODAL_CONFIRMATION_MYDEMAND, RESET_ASIDE_MYDEMAND,
    SHOW_ASIDE_ADD_MODE_MYDEMAND, SHOW_ASIDE_CONSULT_MODE_MYDEMAND,
    SHOW_ASIDE_DELETE_MODE_MYDEMAND,
    SHOW_ASIDE_EDIT_MODE_MYDEMAND, SHOW_MODAL_CONFIRMATION_MYDEMAND
} from "../../Constants/MyDemand/MyDemandAside";


const initialState = {
    isOpen: false,
    modeAside: '',
    selectedMyDemand: null,


};

const MyDemandAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_MYDEMAND:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedMyDemand: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_MYDEMAND:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedMyDemand: action.payload.selectedMyDemand,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_MYDEMAND:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedMyDemand: action.payload.selectedMyDemand,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_MYDEMAND:
            return {
                ...state,
                isOpen: false,
                selectedMyDemand: null,
            };
        case RESET_ASIDE_MYDEMAND:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedMyDemand: null,
            };

        case SHOW_ASIDE_CONSULT_MODE_MYDEMAND:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedMyDemand: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_MYDEMAND:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_MYDEMAND:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        default:
            return state;
    }
};

export default MyDemandAsideReducer;