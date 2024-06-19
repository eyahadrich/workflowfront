import React, {Component} from 'react';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
import WorkflowGrid from "./WorkflowGrid";
import WorkflowAside from "./WorkflowAside";



export class WorkflowPage extends Component {
    render() {
        return (
            <div>
                <WorkflowGrid/>
                <WorkflowAside/>
                <ModalConfirmation reducer = "WorkflowAsideReducer"/>
                <Impression/>
            </div>
        );
    }
}

export default WorkflowPage;