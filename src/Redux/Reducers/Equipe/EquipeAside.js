import {
    CLOSE_ASIDE_EQUIPE, CLOSE_MODAL_CONFIRMATION_EQUIPE, RESET_ASIDE_EQUIPE,
    SHOW_ASIDE_ADD_MODE_EQUIPE, SHOW_ASIDE_CONSULT_MODE_EQUIPE,
    SHOW_ASIDE_DELETE_MODE_EQUIPE,
    SHOW_ASIDE_EDIT_MODE_EQUIPE, SHOW_MODAL_CONFIRMATION_EQUIPE
} from "../../Constants/Equipe/EquipeAside";


const initialState = {
    isOpen: false,
    modeAside: '',
    selectedEquipe: null,


};

const EquipeAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_EQUIPE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedEquipe: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_EQUIPE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedEquipe: action.payload.selectedEquipe,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_EQUIPE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedEquipe: action.payload.selectedEquipe,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_EQUIPE:
            return {
                ...state,
                isOpen: false,
                selectedEquipe: null,
            };
        case RESET_ASIDE_EQUIPE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedEquipe: null,
            };


        case SHOW_ASIDE_CONSULT_MODE_EQUIPE:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedEquipe: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_EQUIPE:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_EQUIPE:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        default:
            return state;
    }
};

export default EquipeAsideReducer;