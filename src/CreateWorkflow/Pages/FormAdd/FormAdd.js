import React from 'react';
import "./FormAdd.css";
import { Formulaire } from "../../Sections";
import { Card, CardHeader, Row } from "reactstrap";
import PropTypes from "prop-types";
const FormAdd = ({
                     data,
                     setWorkflowName,
                     workflowName,
                     isInputError,
                     handleDragEnd,
                     handleDeleteItem,
                     handleDeleteAllItems,
                     handleUpdateItem,
                     handleFormSubmit,
                     handleInputChange,

                 }) => {
    return (
        <>
            <div className="flex-row-around">
                <div className="flex-12">
                    <fieldset>
                        <h3 className="header-csys">{"Creation Workflow"}</h3>
                        <Card className="shadow">
                            <CardHeader className="border-0 w1">
                                <Row className="align-items-center">
                                    <div className="col">

                                    </div>
                                </Row>
                            </CardHeader>
                            <Formulaire
                                data={data}
                                workflowName={workflowName}
                                isInputError={isInputError}
                                setWorkflowName={setWorkflowName}
                                handleDragEnd={handleDragEnd}
                                handleDeleteItem={handleDeleteItem}
                                handleDeleteAllItems={handleDeleteAllItems}
                                handleUpdateItem={handleUpdateItem}
                                handleFormSubmit={handleFormSubmit}
                                handleInputChange={handleInputChange}

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

export default FormAdd;
