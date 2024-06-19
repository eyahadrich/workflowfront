import {GET_ALL_Equipe} from "../../Constants/ComponentTable/SelectEquipe";
import {
    ADD_NEW_EQUIPE,
    DELETE_EQUIPE,
    EDIT_EQUIPE, FETCH_EMPLOYEES_AND_ROLES_FAILURE,
    FETCH_EMPLOYEES_AND_ROLES_REQUEST, FETCH_EMPLOYEES_AND_ROLES_SUCCESS, GET_ALL_EMPLOYE, GET_ALL_ROLE,
    GET_EQUIPE_BY_ID
} from "../../Constants/Equipe/Equipe";


const initialState = {
    allEquipe: [],
    employees: [],
    roles: [],
    allEmploye: [],
    allRole: [],
    loading: false,
    error: null


};

const EquipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_Equipe:
            return {
                ...state,
                allEquipe: action.payload
            };
        case GET_EQUIPE_BY_ID:
            return {
                ...state,
                selectedEquipe: action.payload
            };
        case ADD_NEW_EQUIPE:
            return {
                ...state,
                allEquipe: [...state.allEquipe, action.payload],

            };
        case EDIT_EQUIPE:
            return {
                ...state,
                allEquipe: state.allEquipe.map(equipe =>
                    equipe.idEquipe === action.payload.idEquipe ? action.payload : equipe
                )
            };
        case DELETE_EQUIPE:
            return {
                ...state,
                allEquipe: state.allEquipe.filter(equipe => equipe.idEquipe !== action.payload)
            };
        case FETCH_EMPLOYEES_AND_ROLES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_EMPLOYEES_AND_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: action.payload.employees,
                roles: action.payload.roles
            };
        case FETCH_EMPLOYEES_AND_ROLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_ALL_EMPLOYE:
            return {
                ...state,
                loading: false,
                allEmploye: action.payload
            };
        case GET_ALL_ROLE:
            return {
                ...state,
                loading: false,
                allRole: action.payload
            };

        default:
            return state;
    }
}
export default EquipesReducer;
