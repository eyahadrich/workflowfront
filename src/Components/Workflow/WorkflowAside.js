import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'status-indicator/styles.css';
import Helper from '../../Helper/Helper';
import notify from "devextreme/ui/notify";
import { notifyOptions } from '../../Helper/Config';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
    clearForm,
    handleClose,
    handleCloseModalConfirmation,
    handleOpenModalConfirmation
} from "../../Redux/Actions/Workflow/WorkflowAside";
import FormAdd from "../../CreateWorkflow/Pages/FormAdd/FormAdd";
import Data from "../../CreateWorkflow/Data";
import axios from "axios";
import {deleteWorkflow, editeWorkflow, getWorkflowById} from "../../Redux/Actions/Workflow/Workflow";
import {getAllWorkflows} from "../../Redux/Actions/ComponentTable/SelectWorkflow";




const InterfaceSchema = Yup.object().shape({
    idWorkflow: Yup.number()
    ,
    nomWorkflow: Yup.string()
        .required(' ')
        .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿéè\s]*$/, 'Invalid characters') // Allow French characters, alphabets, and spaces
        .max(200, 'Too large')
        .trim(' '),
    dateCreation: Yup.string()
        .nullable()
    ,
    dateModification: Yup.string()
        .nullable()
    ,

});

const WorkflowAside = () => {
    let initialValues;
    const dispatch = useDispatch()
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.WorkflowAsideReducer.isOpen);
    const modeAside = useSelector(state => state.WorkflowAsideReducer.modeAside);
    const selectedWorkflow = useSelector(state => state.WorkflowAsideReducer.selectedWorkflow);
    const WorkflowAsideReducer = useSelector(state => state.WorkflowAsideReducer);
    const [data, setData] = useState(Data);
    const [workflowName, setWorkflowName] = useState("");
    const [isInputError, setIsInputError] = useState(false);



    useEffect(() => {
        const fetchEtapes = async () => {
            try {
                if (selectedWorkflow && selectedWorkflow.idWorkflow) {
                    const response = await axios.get(`http://localhost:9011/workflow-core/api/etapes/workflow/${selectedWorkflow.idWorkflow}`);
                    const sortedEtapes = response.data.sort((a, b) => a.ordre - b.ordre);
                    const formattedEtapes = sortedEtapes.map(etape => ({
                        id:String(etape.idEtape),
                        label: etape.nomEtape,
                        roleEtape: etape.role,
                        ordre: etape.ordre,


                    }));
                    setData({
                        ...data,
                        list2: formattedEtapes,
                    })

                }
            } catch (error) {
                console.error('Error fetching etapes:', error);
            }
        };

        fetchEtapes().then(() =>{} );
    }, [selectedWorkflow]);

    const oldTickets = data.list2.filter(item => !isNaN(parseInt(item.id)));
    const newTickets = data.list2.filter(item => isNaN(parseInt(item.id)));
    console.log("old",oldTickets)
    console.log("new",newTickets)




    const handleDragEnd = (result) => {
        const { source, destination, draggableId, reason } = result;

        if (!destination || reason === "CANCEL") {
            return;
        }

        if (source.droppableId === "list1" && destination.droppableId === "list2") {
            // Adding a new item
            const newId = `item-${Date.now()}-${Math.random().toString(36).substring(7)}`;
            const itemToAdd = {
                ...data[source.droppableId].find((item) => item.id === draggableId),
                id: newId,
                input: true,
            };
            const updatedList2 = [...data.list2];
            updatedList2.splice(destination.index, 0, itemToAdd);

            setData({
                ...data,
                list2: updatedList2,
            });
        } else if (source.droppableId === "list2" && destination.droppableId === "list2") {
            // Reordering within list2
            const updatedList2 = [...data.list2];
            const [removed] = updatedList2.splice(source.index, 1);
            updatedList2.splice(destination.index, 0, removed);

            setData({
                ...data,
                list2: updatedList2,
            });
        }
    };



    const handleDeleteItem = (itemId) => {
        if (modeAside === 'EDIT' && oldTickets.some(item => item.id === itemId)) {
            notify("Existing tickets cannot be deleted in edit mode.", 'error', notifyOptions.displayTime);
            return; // Prevent further execution of deletion
        }
        const itemToDeleteIndex = data.list2.findIndex((item) => item.id === itemId);
        if (itemToDeleteIndex !== -1) {
            const updatedList2 = [...data.list2];
            updatedList2.splice(itemToDeleteIndex, 1);
            setData({
                ...data,
                list2: updatedList2,
            });
        }
    };

    const handleDeleteAllItems = () => {
        setData({
            ...data,
            list2: [],
        });
        setWorkflowName("");
    };
    // Function to update an item in list2
    const handleUpdateItem = (updatedItem) => {
        const updatedList2 = data.list2.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        setData({ ...data, list2: updatedList2 });
    };

console.log(data.list2)
    const handleFormSubmit = async () => {
        try {
            if (data.list2.length === 0) {
                //alert("Please add items to the list.");
                notify("Please add items to the list.", 'error', notifyOptions.displayTime);
                return;
            }

            if (!workflowName) {
                setIsInputError(true);
                return;
            } else {
                setIsInputError(false);
            }
            const nomWorkflowResponse = await axios.get(`http://localhost:9011/workflow-core/api/workflows/exists/nomWorkflow/${nomWorkflow}`);


            if (nomWorkflowResponse.data) {
                notify('Nom Interface is already used. Please change it.', 'error', notifyOptions.displayTime);
                return;
            }


            // Add the interface to the database
            const workflowResponse = await axios.post('http://localhost:9011/workflow-core/api/workflows', {
                nomWorkflow: workflowName,

            });

            const { idWorkflow,nomWorkflow } = workflowResponse.data;


            // Extract all items from list2 and add them to submittedItems state
            const allItems = data.list2.map((item, index) => ({
                nomEtape: item.label,
                ordre: index+1 ,
                roleEtape: item.role,
                idWorkflow: idWorkflow,
                nomWorkflow: nomWorkflow,



            }));

            const responses = await Promise.all(allItems.map(item => axios.post('http://localhost:9011/workflow-core/api/etapes', item)));

            console.log('All items submitted successfully:', responses);
            handleDeleteAllItems();
            setWorkflowName("");
            dispatch(getAllWorkflows())
            dispatch(handleClose());
            dispatch(clearForm());
        } catch (error) {
            console.error('Error submitting items:', error.message);
        }
    };
    const handleInputChange = (e) => {
        // Reset the input error state when the input value changes
        setIsInputError(false);
        // Update the interface name state
        setWorkflowName(e.target.value);
    };



    if (modeAside !== "") {
        initialValues = {
            idWorkflow: selectedWorkflow ? selectedWorkflow.idWorkflow :'',
            nomWorkflow: selectedWorkflow ? selectedWorkflow.nomWorkflow : '',
            dateCreation: selectedWorkflow ? selectedWorkflow.dateCreation : '',
            dateModification: selectedWorkflow ? selectedWorkflow.dateModification : '',



        };
    }

    const handleEditForm = async () => {
        try {

            const allItems = oldTickets.map((item, index) => ({
                idEtape: parseInt(item.id),
                nomEtape: item.label,
                roleEtape:item.role,
                ordre: index + 1,
                idWorkflow: selectedWorkflow.idWorkflow,
                nomWorkflow: selectedWorkflow.nomWorkflow,


            }));

            // Send requests to update each ticket
            const responses = await Promise.all(allItems.map(item => axios.put(`http://localhost:9011/workflow-core/api/etapes/${item.idEtape}`, item)));
            console.log('All items updated successfully:', responses);

            if (newTickets.length > 0) {
                const newItemsData = newTickets.map((item, index) => ({
                    nomEtape: item.label,
                    roleEtape:item.role,
                    ordre: allItems.length + index + 1,
                    idWorkflow: selectedWorkflow.idWorkflow,
                    nomWorkflow: selectedWorkflow.nomWorkflow,
                }));

                const addResponses = await Promise.all(newItemsData.map(item => axios.post('http://localhost:9011/workflow-core/api/etapes', item)));
                console.log('New items added successfully:', addResponses);
            }


            // Notify the user about the successful update
            notify('Interface updated successfully.', 'success', notifyOptions.displayTime);
        } catch (error) {
            console.error('Error updating items:', error.message);

            // Notify the user about any errors
            notify('Failed to update interface. Please try again.', 'error', notifyOptions.displayTime);
        }
    };



    const OpenAside = (errors, touched, setFieldValue, values, modeAside) => {
        let disabled = false;
        let classDisabledDes = "";
        // eslint-disable-next-line no-unused-vars
        let classDisabled = "";
        // let classVisibility = "display-none";
        if (modeAside === 'EDIT' || modeAside === 'DELETE' || modeAside === 'CONSULT') {
            disabled = true;
            classDisabled = "disabled"
            // classVisibility = "display-block";
        }

        if (modeAside === 'DELETE' || modeAside === 'CONSULT') {
            disabled = true;
            classDisabledDes = "disabled"

        }
        return (
            <>
                {modeAside!=="ADD"?
                    <div className="flex-row-around">
                        <div className="flex-12">
                            <fieldset>
                                <h3 className="header-csys">{"Interface Détails"}</h3>
                                <div className="flex-row-start">
                                    <section className="flex-row-start flex-3">
                                        <label className="control-label flex-6">{"Id Workflow"}</label>
                                        <div className="control-input input flex-9">
                                            <FastField type="text" name="idWorkflow" disabled
                                                       className={'form-control-csys input-xs' + (errors.idWorkflow && touched.idWorkflow ? ' erreur-validation' : '')}/>
                                            <ErrorMessage name="idWorkflow"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </section>


                                </div>

                                <div className="flex-row-start">

                                    <section className="flex-row-space flex-3">
                                        <label className="control-label flex-6">{"Nom Workflow"}</label>
                                        <div className="control-input input flex-9">
                                            <FastField type="text" name="nomWorkflow"
                                                       className={'form-control-csys input-xs' + (errors.nomWorkflow && touched.nomWorkflow ? ' erreur-validation' : '')}
                                                       disabled={classDisabledDes}/>
                                            <ErrorMessage name="nomWorkflow"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </section>

                                    {modeAside === "CONSULT" || modeAside === "DELETE" || modeAside === "EDIT" ?
                                        <section className="flex-row-space flex-3">
                                            {/*<label className="control-label flex-6">{"Date de Creation"}</label>*/}
                                            {/*<div className="control-input input flex-9">*/}
                                            {/*    <input*/}
                                            {/*        type="text"*/}
                                            {/*        name="dateCreation"*/}
                                            {/*        value={renderDateFormat(values.dateCreation)} // Make sure to provide the value*/}
                                            {/*        disabled // Ensure the input is disabled*/}
                                            {/*        className={'form-control-csys input-xs' + (errors.dateCreation && touched.dateCreation ? ' erreur-validation' : '')}*/}
                                            {/*    />*/}
                                            {/*    <ErrorMessage name="dateCreation"*/}
                                            {/*                  render={msg => <div>{msg}</div>}/>*/}
                                            {/*</div>*/}

                                        </section>
                                        : null}
                                    {modeAside === "CONSULT" || modeAside === "DELETE" ?
                                        <section className="flex-row-space flex-3">
                                            {/*<label className="control-label flex-6">{"Date de Modification"}</label>*/}
                                            {/*<div className="control-input input flex-9">*/}
                                            {/*    <input*/}
                                            {/*        type="text"*/}
                                            {/*        name="dateModification"*/}
                                            {/*        value={renderDateFormat(values.dateModification)} // Make sure to provide the value*/}
                                            {/*        disabled // Ensure the input is disabled*/}
                                            {/*        className={'form-control-csys input-xs' + (errors.dateModification && touched.dateModification ? ' erreur-validation' : '')}*/}
                                            {/*    />*/}
                                            {/*    <ErrorMessage name="dateModification"*/}
                                            {/*                  render={msg => <div>{msg}</div>}/>*/}
                                            {/*</div>*/}

                                        </section>
                                        : null}

                                </div>


                            </fieldset>


                        </div>
                    </div>
                    : <FormAdd
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

                }
                {modeAside==="EDIT"?
                    <FormAdd
                        data={data}
                        workflowName={"edit"}
                        isInputError={isInputError}
                        setWorkflowName={setWorkflowName}
                        handleDragEnd={handleDragEnd}
                        handleDeleteItem={handleDeleteItem}
                        handleDeleteAllItems={handleDeleteAllItems}
                        handleUpdateItem={handleUpdateItem}
                        handleFormSubmit={handleFormSubmit}
                        handleInputChange={handleInputChange}


                    />:null}

            </>


        )
    };
    const deleteWorkflow2 = async (interfaceId) => {
        try {
            await dispatch(deleteWorkflow(interfaceId));
            // If the deletion is successful, close the aside
            WorkflowAsideReducer.successCallback();
            dispatch(handleClose());
            dispatch(clearForm());
        } catch (error) {
            notify("Deletion cannot be performed due to associated records.", 'error', notifyOptions.displayTime);
        }
    };


    const submitAdd = async (values, modeAside) => {
        let verif = true;
        let data = {};
        if (modeAside === 'ADD') {
            if (verif) {
                await handleFormSubmit();

            } else {
                notify(notifyOptions, 'error', notifyOptions.displayTime);
            }
        } else if (modeAside === 'EDIT') {
            const nomWorkflowResponse = await axios.get(`http://localhost:9011/workflow-core/api/workflows/exists/nomWorkflow/${values.nomWorkflow}`);


            if (nomWorkflowResponse.data&&selectedWorkflow.nomWorkflow!==values.nomWorkflow) {
                notify('Nom Workflow is already used. Please change it.', 'error', notifyOptions.displayTime);
                return;
            }else{

                data = {
                    idWorkflow: selectedWorkflow.idWorkflow,
                    nomWorkflow: values.nomWorkflow,
                    dateCreation: selectedWorkflow.dateCreation,
                };
                console.log(data)
                dispatch(editeWorkflow(data))
                    .then(() => {
                        WorkflowAsideReducer.successCallback();
                        dispatch(getAllWorkflows())
                        dispatch(handleClose())
                        dispatch(clearForm())
                    });
                await handleEditForm() .then(() => {
                    WorkflowAsideReducer.successCallback();
                    dispatch(getAllWorkflows())
                    dispatch(handleClose())
                    dispatch(clearForm())
                });

            }




        }else if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getWorkflowById(selectedWorkflow.idWorkflow))
                .then(() => {
                    dispatch(handleClose())
                    dispatch(clearForm())
                });
        }

    };
    const showModalAlert = (actionToDoOnClick) => {
        let messageToShow = actionToDoOnClick === 'delete' ?
            messages.WantToDeleteAnyway
            : `${messages.confirmDialogTextPartOne} ${messages.confirmDialogTextPartTwo}`;
        const handleBtnConfirmerModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
            if (actionToDoOnClick === 'delete') {
                deleteWorkflow2(selectedWorkflow.idWorkflow).then(() => {})

            } else {
                dispatch(handleClose());
                dispatch(clearForm());
            }

        }
        const handleBtnCancelModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
        }
        dispatch(handleOpenModalConfirmation(messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation));
    };

    const handleSubmit = (values, modeAside) => {
        submitAdd(values, modeAside)
    };


    const closeAside = ( modeAside) => {

        if(modeAside==="EDIT"||modeAside==="ADD"){
            let checkInput=workflowName===""&&data.list2.length===0;
            if (!checkInput && modeAside !== 'CONSULT' && modeAside !== 'DELETE') {
                showModalAlert('closeAside')
            } }else
            dispatch(handleClose());
        setWorkflowName("");
        setIsInputError(false);
    };
    const renderDateFormat = (date) => {
        const formattedDate = Helper.formatDate(date, 'dd-MM-yyyy');
        const formattedTime = Helper.formatHeur(date, 'hh-mm');
        return `${formattedDate} ${formattedTime}`;
    };
    return (
        <div>
            {isOpen && (<aside className={"openned"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={InterfaceSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        handleSubmit(values, modeAside);
                    }}
                    render={({ errors, touched, isSubmitting, setFieldValue, values, handleSubmit }) => (
                        <Form>
                            <div className="aside-dialog" style={(modeAside === 'ADD' ? { width: '60%' } : { width: '60%' })}>
                                <div className="header-aside">
                                    <div className="right">
                                        <div>
                                            {(modeAside === 'ADD' && <h3 id="titleAside">{messages.asideAdd}</h3>)}
                                            {(modeAside === 'DELETE' && <h3 id="titleAside">{messages.asideDelete}</h3>)}
                                            {(modeAside === 'EDIT' && <h3 id="titleAside">{messages.asideEdit}</h3>)}
                                            {(modeAside === 'CONSULT' && <h3 id="titleAside">{messages.asideConsult}</h3>)}
                                        </div>
                                        <div>
                                            <div className="action-icons">
                                                {(modeAside === 'DELETE'||modeAside === 'EDIT' ) && (
                                                    <button className="btn btn-default btn-valide"
                                                            id="btnValiderBudget" type="button" onClick={handleSubmit}
                                                            disabled={isSubmitting}>
                                                        <i className="fas fa-check" />
                                                    </button>
                                                )}
                                                {(modeAside === 'ADD' ) && (
                                                    <button className="btn btn-default btn-valide"
                                                            id="btnValiderBudget" type="button" onClick={handleFormSubmit}
                                                            disabled={isSubmitting}>
                                                        <i className="fas fa-check" />
                                                    </button>
                                                )}

                                                <a className="btn btn-default btn-cancel close-asidebar"
                                                   onClick={() => {
                                                       closeAside(values, modeAside)
                                                   }}>
                                                    <i className="fas fa-times" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="body-aside">
                                    {
                                        OpenAside(errors, touched, setFieldValue, values, modeAside)
                                    }
                                </div>
                            </div>
                        </Form>
                    )}
                />
            </aside>)}
        </div>
    );
}
export default WorkflowAside
