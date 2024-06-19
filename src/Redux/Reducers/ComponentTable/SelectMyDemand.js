import {GET_ALL_MYDEMAND, GET_ALL_MYDEMAND_BY_ID_INTERFACE} from "../../Constants/ComponentTable/SelectMyDemand";

const MyDemandReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_MYDEMAND:

            return {
                ...state,
                mydemands: action.payload
            };
        case GET_ALL_MYDEMAND_BY_ID_INTERFACE:

            return {
                ...state,
                mydemands_byInterface: action.payload
            };
        default:
            return state;
    }
};
export default MyDemandReducer;