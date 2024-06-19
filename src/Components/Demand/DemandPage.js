import React, {Component} from 'react';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
import DemandGrid from "./DemandGrid";
import DemandAside from "./DemandAside";
import PropTypes from "prop-types";

export class DemandPage extends Component {

    render() {
        const { id ,type} = this.props;
        return (
            <div>
                <DemandGrid id={id} type={type}/>
                <DemandAside id={id} type={type}/>
                <ModalConfirmation reducer = "MyDemandAsideReducer"/>
                <Impression/>
            </div>
        );
    }
}
DemandPage.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};

export default DemandPage;