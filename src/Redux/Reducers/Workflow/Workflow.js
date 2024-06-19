
import {GET_ALL_WORKFLOW} from "../../Constants/ComponentTable/SelectWorkflow";
import {ADD_NEW_WORKFLOW, DELETE_WORKFLOW, EDIT_WORKFLOW, GET_WORKFLOW_BY_ID} from "../../Constants/Workflow/Workflow";


const initialState = {
    allWorkflow: [],
    response:null


};

const WorkflowsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_WORKFLOW:
            return {
                ...state,
                allWorkflow: action.payload
            };


        case GET_WORKFLOW_BY_ID:
            return {
                ...state,
                selectedWorkflow: action.payload
            };
        case ADD_NEW_WORKFLOW:
            console.log('Current State:', state);
            console.log('Payload received:', action.payload);
            return {
                response: action.payload,
                ...state,
                allWorkflow: [...state.allWorkflow, action.payload],

            };
        case EDIT_WORKFLOW:
            return {
                ...state,
                allWorkflow: state.allWorkflow.map(workflow =>
                    workflow.idWorkflow === action.payload.idWorkflow ? action.payload : workflow
                )
            };
        case DELETE_WORKFLOW:
            return {
                ...state,
                allWorkflow: state.allWorkflow.filter(workflow => workflow.idWorkflow !== action.payload)
            };


        default:
            return state;
    }
}
export default WorkflowsReducer;
