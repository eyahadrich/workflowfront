
import {GET_ALL_MYDEMAND, GET_ALL_MYDEMAND_BY_ID_INTERFACE} from "../../Constants/ComponentTable/SelectMyDemand";
import {
    DELETE_MYDEMAND,
    EDIT_MYDEMAND,
    GET_MYDEMAND_BY_ID,
    GET_VALIDATION_BY_DEMAND
} from "../../Constants/MyDemand/MyDemand";


const initialState = {
    allMyDemand: [],
    allMyDemandByInterface: [],
    validations: [],
    selectedMyDemand: null,
    btnConsultInstance: null,
    btnEditInstance: null,
    btnDeleteInstance: null,
    btnEditionInstance: null,

};

const MyDemandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MYDEMAND:
            return {
                ...state,
                allMyDemand: action.payload
            };
        case GET_ALL_MYDEMAND_BY_ID_INTERFACE:
            return {
                ...state,
                allMyDemandByInterface: action.payload
            };
        case GET_MYDEMAND_BY_ID:
            return {
                ...state,
                selectedMyDemand: action.payload
            };
        case GET_VALIDATION_BY_DEMAND:
            return {
                ...state,
                validations: action.payload
            };

        case EDIT_MYDEMAND:
            return {
                ...state,
                allMyDemand: state.allMyDemand.map(mydemand =>
                    mydemand.idDemande === action.payload.idDemande ? action.payload : mydemand
                )
            };
        case DELETE_MYDEMAND:
            return {
                ...state,
                allMyDemand: state.allMyDemand.filter(mydemand => mydemand.idDemande !== action.payload)
            };

        default:
            return state;
    }
}
export default MyDemandsReducer;
