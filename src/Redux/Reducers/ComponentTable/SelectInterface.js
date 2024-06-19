import {GET_ALL_INTERFACE} from "../../Constants/ComponentTable/SelectInterface";


const InterfaceReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_INTERFACE:
            return {
                ...state,
                interfaces: action.payload
            };
        default:
            return state;
    }
};
export default InterfaceReducer;