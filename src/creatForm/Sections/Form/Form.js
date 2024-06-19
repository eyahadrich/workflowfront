import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Form.css"; // Import the CSS file

import {List1,List2} from "../../components";

import PropTypes from "prop-types";




const Formulaire = ({
                        data,
                        interfaceName,
                        isInputError,
                        handleDragEnd,
                        handleDeleteItem,
                        handleUpdateItem,
                        handleInputChange,
                        handleWorkflowChange,
                        selectedWorkflow,
                        workflowOptions,

                    }) => {




    return (
        <>
            {interfaceName !== "edit" ? (
            <div className={`input-wrapper `}>
                <section className="flex-row-space flex-3">
                    <label className="control-label flex-6">{"Nom Interface"}</label>
                    <div className={`control-input input flex-9 ${isInputError ? 'input-error' : ''}`}>
                        <input
                            type="text"
                            className={`form-control-csys input-xs  `}
                            value={interfaceName}
                            onChange={handleInputChange}
                            placeholder="Enter interface name"
                        />

                    </div>
                </section>
                <section className="flex-row-space flex-3">
                    <label className="control-label flex-6">{"Workflow"}</label>
                    <div className={`control-input input flex-9`}>
                        <select
                            value={selectedWorkflow}
                            onChange={handleWorkflowChange}
                            className={`form-control-csys input-xs`}
                        >
                            <option value="">Select Workflow</option>
                            {workflowOptions.map(option => (
                                <option key={option.idWorkflow} value={option.idWorkflow}>
                                    {option.nomWorkflow}
                                </option>
                            ))}
                        </select>
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
    interfaceName: PropTypes.string.isRequired,
    isInputError: PropTypes.bool.isRequired,
    setInterfaceName: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleDeleteAllItems: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    workflowOptions: PropTypes.array.isRequired,
    selectedWorkflow: PropTypes.string.isRequired,
    handleWorkflowChange: PropTypes.func.isRequired
};


export default Formulaire;
