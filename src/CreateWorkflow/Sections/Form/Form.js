import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Form.css"; // Import the CSS file

import {List1,List2} from "../../components";

import PropTypes from "prop-types";




const Formulaire = ({
                        data,
                        workflowName,
                        isInputError,
                        handleDragEnd,
                        handleDeleteItem,
                        handleUpdateItem,
                        handleInputChange,

                    }) => {




    return (
        <>
            {workflowName !== "edit" ? (
                <div className={`input-wrapper `}>
                    <section className="flex-row-space flex-3">
                        <label className="control-label flex-6">{"Nom Workflow"}</label>
                        <div className={`control-input input flex-9 ${isInputError ? 'input-error' : ''}`}>
                            <input
                                type="text"
                                className={`form-control-csys input-xs  `}
                                value={workflowName}
                                onChange={handleInputChange}
                                placeholder="Enter workflow name"
                            />

                        </div>
                    </section>


                </div>):null}

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="layout__wrapper-form">

                    <List1 data={data}/>
                    <List2 data={data} handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem}/>


                </div>
            </DragDropContext>
        </>
    );
};
Formulaire.propTypes = {
    data: PropTypes.object.isRequired,
    inputTypes: PropTypes.array.isRequired,
    workflowName: PropTypes.string.isRequired,
    isInputError: PropTypes.bool.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleDeleteAllItems: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,

};


export default Formulaire;
