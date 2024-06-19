import {GET_ALL_DEMAND} from "../../Constants/ComponentTable/SelectListDemands";


const DemandReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_DEMAND:
            return {
                ...state,
                demands: action.payload
            };
        default:
            return state;
    }
};
export default DemandReducer;