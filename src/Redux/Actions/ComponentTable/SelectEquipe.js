import axios from 'axios';
import {GET_ALL_Equipe} from "../../Constants/ComponentTable/SelectEquipe";


export const getAllEquipes = () => {
    return dispatch => {
        axios.get(`http://localhost:9011/workflow-core/api/equipes`).then(res => {
            dispatch({
                type: GET_ALL_Equipe,
                payload: res.data
            })
        })
    }
};