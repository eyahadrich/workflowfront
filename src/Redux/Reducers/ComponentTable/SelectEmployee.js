import { GET_ALL_EMPLOYEE} from "../../Constants/ComponentTable/SelectEmployee"
const BudgetReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEE:
            return {
                ...state,
                budgets: action.payload
            };
        default:
            return state;
    }
};
export default BudgetReducer;
