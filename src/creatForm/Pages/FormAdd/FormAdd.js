import React from 'react';
import "./FormAdd.css";
import { Formulaire } from "../../Sections";
import { Card, CardHeader, Row } from "reactstrap";
import PropTypes from "prop-types";
const FormAdd = ({
                     data,
                     inputTypes,
                     interfaceName,
                     isInputError,
                     setInterfaceName,
                     handleDragEnd,
                     handleDeleteItem,
                     handleDeleteAllItems,
                     handleUpdateItem,
                     handleFormSubmit,
                     handleInputChange,
                     handleWorkflowChange,
                     selectedWorkflow,
                     workflowOptions,
                 }) => {
    return (
        <>
            <div className="flex-row-around">
                <div className="flex-12">
                    <fieldset>
                        <h3 className="header-csys">{"Creation Interface"}</h3>
                        <Card className="shadow">
                            <CardHeader className="border-0 w1">
                                <Row className="align-items-center">
                                    <div className="col">

                                    </div>
                                </Row>
                            </CardHeader>
                            <Formulaire
                                data={data}
                                inputTypes={inputTypes}
                                interfaceName={interfaceName}
                                isInputError={isInputError}
                                setInterfaceName={setInterfaceName}
                                handleDragEnd={handleDragEnd}
                                handleDeleteItem={handleDeleteItem}
                                handleDeleteAllItems={handleDeleteAllItems}
                                handleUpdateItem={handleUpdateItem}
                                handleFormSubmit={handleFormSubmit}
                                handleInputChange={handleInputChange}
                                handleWorkflowChange={handleWorkflowChange}
                                selectedWorkflow={selectedWorkflow}
                                workflowOptions={workflowOptions}
                            />
                        </Card>
                        </fieldset>
                </div>
            </div>

        </>
    );
};
FormAdd.propTypes = {
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

export default FormAdd;
