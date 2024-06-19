import React, {Component} from 'react';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
import InterfaceGrid from "./InterfaceGrid";
import InterfaceAside from "./InterfaceAside";

/**
 * EmployeePage
 */
export class InterfacePage extends Component {
    render() {
        return (
            <div>
                <InterfaceGrid/>
                <InterfaceAside/>
                <ModalConfirmation reducer = "InterfaceAsideReducer"/>
                <Impression/>
            </div>
        );
    }
}

export default InterfacePage;