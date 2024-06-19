import {
    CLOSE_ASIDE_INTERFACE, CLOSE_MODAL_CONFIRMATION_INTERFACE, RESET_ASIDE_INTERFACE,
    SHOW_ASIDE_ADD_MODE_INTERFACE, SHOW_ASIDE_CONSULT_MODE_INTERFACE,
    SHOW_ASIDE_DELETE_MODE_INTERFACE, SHOW_ASIDE_EDIT_MODE_INTERFACE, SHOW_MODAL_CONFIRMATION_INTERFACE
} from "../../Constants/Interface/InterfaceAside";


const initialState = {
    isOpen: false,
    modeAside: '',
    selectedInterface: null,


};

const InterfaceAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_INTERFACE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedInterface: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_INTERFACE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedInterface: action.payload.selectedInterface,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_INTERFACE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedInterface: action.payload.selectedInterface,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_INTERFACE:
            return {
                ...state,
                isOpen: false,
                selectedInterface: null,
            };
        case RESET_ASIDE_INTERFACE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedInterface: null,
            };


        case SHOW_ASIDE_CONSULT_MODE_INTERFACE:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedInterface: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_INTERFACE:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_INTERFACE:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        default:
            return state;
    }
};

export default InterfaceAsideReducer;