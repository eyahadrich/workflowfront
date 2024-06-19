import React, {Component} from 'react';
import EmployeeGrid from './EmployeeGrid';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
import EmployeeAside from "./EmployeeAside";

/**
 * EmployeePage
 */
export class EmployeePage extends Component {
    render() {
        return (
            <div>
                <EmployeeGrid/>
                <EmployeeAside/>
                <ModalConfirmation reducer = "BudgetAsideReducer"/>
                <Impression/>
            </div>
        );
    }
}

export default EmployeePage;