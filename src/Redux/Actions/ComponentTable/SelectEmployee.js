import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import {GET_ALL_EMPLOYEE} from "../../Constants/ComponentTable/SelectEmployee";

export const getAllEmployees = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}`).then(res => {
            dispatch({
                type: GET_ALL_EMPLOYEE,
                payload: res.data
            })
        })
    }
};