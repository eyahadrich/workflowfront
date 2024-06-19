import {GET_ALL_Equipe} from "../../Constants/ComponentTable/SelectEquipe";

const EquipeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_Equipe:
            return {
                ...state,
                equipes: action.payload
            };
        default:
            return state;
    }
};
export default EquipeReducer;