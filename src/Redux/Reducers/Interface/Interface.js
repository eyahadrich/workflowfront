import {GET_ALL_INTERFACE} from "../../Constants/ComponentTable/SelectInterface";
import {
    ADD_NEW_INTERFACE,
    DELETE_INTERFACE,
    EDIT_INTERFACE,
    GET_ETAPES_BY_WORKFLOW,
    GET_INTERFACE_BY_ID
} from "../../Constants/Interface/Interface";


const initialState = {
    allInterface: [],
    etapes: [],
    response:null


};

const InterfacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INTERFACE:
            return {
                ...state,
                allInterface: action.payload
            };
        case GET_ETAPES_BY_WORKFLOW:
            return {
                ...state,
                etapes: action.payload
            };


        case GET_INTERFACE_BY_ID:
            return {
                ...state,
                selectedInterface: action.payload
            };
        case ADD_NEW_INTERFACE:
            console.log('Current State:', state);
            console.log('Payload received:', action.payload);
            return {
                response: action.payload,
                ...state,
                allInterface: [...state.allInterface, action.payload],

            };
        case EDIT_INTERFACE:
            return {
                ...state,
                allInterface: state.allInterface.map(inter =>
                    inter.idInterface === action.payload.idInterface ? action.payload : inter
                )
            };
        case DELETE_INTERFACE:
            return {
                ...state,
                allInterface: state.allInterface.filter(inter => inter.idInterface !== action.payload)
            };


        default:
            return state;
    }
}
export default InterfacesReducer;
