
import {GET_ALL_WORKFLOW} from "../../Constants/Workflow/Workflow";


const WorkflowReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_WORKFLOW:
            return {
                ...state,
                workflows: action.payload
            };
        default:
            return state;
    }
};
export default WorkflowReducer;