import {
    CLOSE_ASIDE_DEMAND, CLOSE_MODAL_CONFIRMATION_DEMAND, RESET_ASIDE_DEMAND,
    SHOW_ASIDE_CONSULT_MODE_DEMAND, SHOW_ASIDE_DELETE_MODE_DEMAND,
     SHOW_MODAL_CONFIRMATION_DEMAND
} from "../../Constants/ListDemands/ListDemandsAside";


const initialState = {
    isOpen: false,
    modeAside: '',
    selectedDemand: null,


};

const ListDemandAsideReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_ASIDE_DELETE_MODE_DEMAND:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedDemand: action.payload.selectedDemand,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_DEMAND:
            return {
                ...state,
                isOpen: false,
                selectedDemand: null,
            };
        case RESET_ASIDE_DEMAND:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedDemand: null,
            };

        case SHOW_ASIDE_CONSULT_MODE_DEMAND:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedDemand: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_DEMAND:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_DEMAND:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        default:
            return state;
    }
};

export default ListDemandAsideReducer;