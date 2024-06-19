import React, {Component} from 'react';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
import ListDemandsAside from "./ListDemandsAside";
import ListDemandsGrid from "./ListDemansGridChef";


/**
 * EmployeePage
 */
export class ListDemandsPage extends Component {
    render() {
        return (
            <div>
                <ListDemandsGrid/>
                <ListDemandsAside/>
                <ModalConfirmation reducer = "ListDemandAsideReducer"/>
                <Impression/>
            </div>
        );
    }
}

export default ListDemandsPage;