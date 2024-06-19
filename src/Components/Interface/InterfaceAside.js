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
    deleteInterface,
    editeInterface,
    getInterfaceById
} from "../../Redux/Actions/Interface/Interface";
import {
    clearForm,
    handleClose,
    handleCloseModalConfirmation,
    handleOpenModalConfirmation
} from "../../Redux/Actions/Interface/InterfaceAside";
import FormAdd from "../../creatForm/Pages/FormAdd/FormAdd";
import Data from "../../creatForm/Data";
import axios from "axios";
import {getAllInterfaces} from "../../Redux/Actions/ComponentTable/SelectInterface";
import {getAllTicketsByInterfaceId} from "../../Redux/Actions/Ticket/Ticket";
import "/src/assests/css/DemandPage.css"




const InterfaceSchema = Yup.object().shape({
    idInterface: Yup.number()
    ,
    nomInterface: Yup.string()
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
    idWorkflow: Yup.number()
    ,

});

const InterfaceAside = () => {
    let initialValues;
    const dispatch = useDispatch()
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.InterfaceAsideReducer.isOpen);
    const modeAside = useSelector(state => state.InterfaceAsideReducer.modeAside);
    const selectedInterface = useSelector(state => state.InterfaceAsideReducer.selectedInterface);
    const tickets = useSelector(state => state.TicketsReducer.allTickets);
    const InterfaceAsideReducer = useSelector(state => state.InterfaceAsideReducer);
    const [data, setData] = useState(Data);
    const [inputTypes, setInputTypes] = useState([]);
    const [interfaceName, setInterfaceName] = useState("");
    const [isInputError, setIsInputError] = useState(false);
    const [workflowOptions, setWorkflowOptions] = useState([]);
    const [selectedWorkflow, setSelectedWorkflow] = useState('');
    useEffect(() => {
        // Fetch workflow options
        axios
            .get('http://localhost:9011/workflow-core/api/workflows')
            .then((response) => {
                setWorkflowOptions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching workflow options:', error);
            });
    }, []);
    const handleWorkflowChange = (e) => {
        setSelectedWorkflow(e.target.value);
        console.log(selectedWorkflow);
    };
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                if (selectedInterface && selectedInterface.idInterface) {
                    const response = await axios.get(`http://localhost:9011/workflow-core/api/tickets/inter/${selectedInterface.idInterface}`);
                    // Sort the tickets by ordreTicket before setting the state
                    const sortedTickets = response.data.sort((a, b) => a.ordreTicket - b.ordreTicket);

                    // Transform tickets into desired format
                    const formattedTickets = sortedTickets.map(ticket => ({
                        id:String(ticket.idTicket),
                        label: ticket.nomTicket,
                        type: ticket.typeTicket,
                        placeholder: ticket.placeholder,
                        maxlength: ticket.maxLength,
                        minlength: ticket.minLength,
                        pattern: ticket.regleTicket
                    }));
                    setData({
                        ...data,
                        list2: formattedTickets,
                    })

                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets().then(() =>{} );
    }, [selectedInterface]);
    useEffect(() => {
        if(selectedInterface) {
            dispatch(getAllTicketsByInterfaceId(selectedInterface.idInterface));
        }
    }, [dispatch,selectedInterface]);

    const oldTickets = data.list2.filter(item => !isNaN(parseInt(item.id)));
    const newTickets = data.list2.filter(item => isNaN(parseInt(item.id)));
    console.log("old",oldTickets)
    console.log("new",newTickets)


    useEffect(() => {
        // Fetch input types from the database
        axios.get("http://localhost:9011/workflow-core/api/typetickets")
            .then(response => {
                setInputTypes(response.data);
            })
            .catch(error => {
                console.error("Error fetching input types:", error);
            })
    }, []);

    const getTypeIdFromDatabase = (type) => {
        const foundType = inputTypes.find(inputType => inputType.typeTicket === type);
        return foundType ? foundType.idTypeTicket : null;
    };

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
        setInterfaceName("");
    };
    // Function to update an item in list2
    const handleUpdateItem = (updatedItem) => {
        const updatedList2 = data.list2.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        setData({ ...data, list2: updatedList2 });
    };


    const handleFormSubmit = async () => {
        try {
            if (data.list2.length === 0) {
                //alert("Please add items to the list.");
                notify("Please add items to the list.", 'error', notifyOptions.displayTime);
                return;
            }

            if (!interfaceName) {
                setIsInputError(true);
                return;
            } else {
                setIsInputError(false);
            }
            const nomInterfaceResponse = await axios.get(`http://localhost:9011/workflow-core/api/employes/exists/nomInterface/${interfaceName}`);


            if (nomInterfaceResponse.data) {
                notify('Nom Interface is already used. Please change it.', 'error', notifyOptions.displayTime);
                return;
            }


            // Add the interface to the database
            const interfaceResponse = await axios.post('http://localhost:9011/workflow-core/api/interfaces', {
                nomInterface: interfaceName,
                idWorkflow:selectedWorkflow,
                nomWorkflow: "string",
            });

            const { idInterface,nomInterface } = interfaceResponse.data;


            // Extract all items from list2 and add them to submittedItems state
            const allItems = data.list2.map((item, index) => ({
                nomTicket: item.label,
                ordreTicket: index+1 ,
                placeholder: item.placeholder,
                minLength: item.minlength,
                maxLength: item.maxlength,
                regleTicket: item.pattern,
                idInterface: idInterface,
                nomInterface: nomInterface,
                idTypeTicket:  isNaN(item.type) ? getTypeIdFromDatabase(item.type) : item.type,
                typeTicket: "string",


            }));
            const responses = await Promise.all(allItems.map(item => axios.post('http://localhost:9011/workflow-core/api/tickets', item)));

            console.log('All items submitted successfully:', responses);
            // Clear the input and close the modal
            handleDeleteAllItems();
            setInterfaceName("");
            dispatch(getAllInterfaces())
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
        setInterfaceName(e.target.value);
    };



    if (modeAside !== "") {
        initialValues = {
            idInterface: selectedInterface ? selectedInterface.idInterface :'',
            nomInterface: selectedInterface ? selectedInterface.nomInterface : '',
            dateCreation: selectedInterface ? selectedInterface.dateCreation : '',
            dateModification: selectedInterface ? selectedInterface.dateModification : '',
            idWorkflow: selectedInterface ? selectedInterface.idWorkflow : '',


        };
    }

    const handleEditForm = async () => {
        try {

            const allItems = oldTickets.map((item, index) => ({
                idTicket: parseInt(item.id),
                nomTicket: item.label,
                ordreTicket: index + 1,
                placeholder: item.placeholder,
                minLength: item.minlength,
                idInterface: selectedInterface.idInterface,
                maxLength: item.maxlength,
                nomInterface: selectedInterface.nomInterface,
                idTypeTicket:  isNaN(item.type) ? getTypeIdFromDatabase(item.type) : item.type,
                regleTicket: item.pattern,
                typeTicket:item.typeTicket,

            }));

            // Send requests to update each ticket
            const responses = await Promise.all(allItems.map(item => axios.put(`http://localhost:9011/workflow-core/api/tickets/${item.idTicket}`, item)));
            console.log('All items updated successfully:', responses);

            if (newTickets.length > 0) {
                const newItemsData = newTickets.map((item, index) => ({
                    nomTicket: item.label,
                    ordreTicket: allItems.length + index + 1, // Incrementing ordreTicket for new items
                    placeholder: item.placeholder,
                    minLength: item.minlength,
                    maxLength: item.maxlength,
                    regleTicket: item.pattern,
                    idInterface: selectedInterface.idInterface,
                    nomInterface: selectedInterface.nomInterface,
                    idTypeTicket: isNaN(item.type) ? getTypeIdFromDatabase(item.type) : item.type,
                    typeTicket: item.typeTicket,
                }));

                const addResponses = await Promise.all(newItemsData.map(item => axios.post('http://localhost:9011/workflow-core/api/tickets', item)));
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
                                <label className="control-label flex-6">{"Id Interface"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="idInterface" disabled
                                               className={'form-control-csys input-xs' + (errors.idInterface && touched.idInterface ? ' erreur-validation' : '')}/>
                                    <ErrorMessage name="idInterface"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                            <section className="flex-row-start flex-3">
                                <label className="control-label flex-6">{"Workflow"}</label>
                                <div className="control-input input flex-9">
                                    <select
                                        name="idWorkflow"
                                        defaultValue={selectedInterface.idWorkflow} // Set the selected value here
                                        onChange={handleWorkflowChange}
                                        className={'form-control-csys input-xs'}
                                        disabled
                                    >
                                        <option value="">Select Workflow</option>
                                        {workflowOptions.map(workflow => (
                                            <option key={workflow.idWorkflow}
                                                    value={workflow.idWorkflow}>{workflow.nomWorkflow}</option>
                                        ))}
                                    </select>
                                </div>
                            </section>


                        </div>

                        <div className="flex-row-start">

                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-6">{"Nom Interface"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="nomInterface"
                                               className={'form-control-csys input-xs' + (errors.nomInterface && touched.nomInterface ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="nomInterface"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>


                        </div>
                        <div className="flex-row-start">
                            {modeAside === "CONSULT" || modeAside === "DELETE" || modeAside === "EDIT" ?
                                <section className="flex-row-space flex-3">
                                    <label className="control-label flex-6">{"Date de Creation"}</label>
                                    <div className="control-input input flex-9">
                                        <input
                                            type="text"
                                            name="dateCreation"
                                            value={renderDateFormat(values.dateCreation)} // Make sure to provide the value
                                            disabled // Ensure the input is disabled
                                            className={'form-control-csys input-xs' + (errors.dateCreation && touched.dateCreation ? ' erreur-validation' : '')}
                                        />
                                        <ErrorMessage name="dateCreation"
                                                      render={msg => <div>{msg}</div>}/>
                                    </div>

                                </section>
                                : null}
                            {modeAside === "CONSULT" || modeAside === "DELETE" ?

                                <section className="flex-row-space flex-3">
                                    <label className="control-label flex-9">{"Date de Modification"}</label>
                                    <div className="control-input input flex-9">
                                        <input
                                            type="text"
                                            name="dateModification"
                                            value={renderDateFormat(values.dateModification)} // Make sure to provide the value
                                            disabled // Ensure the input is disabled
                                            className={'form-control-csys input-xs' + (errors.dateModification && touched.dateModification ? ' erreur-validation' : '')}
                                        />
                                        <ErrorMessage name="dateModification"
                                                      render={msg => <div>{msg}</div>}/>
                                    </div>
                                </section>
                                : null}
                        </div>
                            {modeAside === "CONSULT" || modeAside === "DELETE" ?


                                <>
                                    <h3 className="header-csys">{"Demande Formulaire"}</h3>
                                    {tickets.map((ticket) => (

                                        <section key={ticket.idTicket} className="flex-row-space flex-3">
                                            <label className="control-label flex-6">{ticket.nomTicket}:</label>
                                            <div className="control-input input flex-12">
                                                <input
                                                    id={`ticket-${ticket.idTicket}`}
                                                    className={"form-control-csys input-xs"}
                                                    placeholder={ticket.placeholder}
                                                    disabled={true}
                                                />
                                            </div>
                                        </section>

                                    ))}


                                </>

                                : null}


                    </fieldset>


                </div>
            </div>
                : <FormAdd
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

            }
                {modeAside === "EDIT" ?
                    <FormAdd
                        data={data}
                        inputTypes={inputTypes}
                        interfaceName={"edit"}
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

                    />:null}

                    </>


                    )
                    };
    const deleteInterface2 = async (interfaceId) => {
        try {
            await dispatch(deleteInterface(interfaceId));
            // If the deletion is successful, close the aside
            InterfaceAsideReducer.successCallback();
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
            const nomInterfaceResponse = await axios.get(`http://localhost:9011/workflow-core/api/employes/exists/nomInterface/${values.nomInterface}`);


            if (nomInterfaceResponse.data&&selectedInterface.nomInterface!==values.nomInterface) {
                notify('Nom Interface is already used. Please change it.', 'error', notifyOptions.displayTime);
                return;
            }else{

            data = {
                idInterface: selectedInterface.idInterface,
                nomInterface: values.nomInterface,
                dateCreation: selectedInterface.dateCreation,
                idWorkflow:selectedInterface.idWorkflow,
                nomWorkflow: "string",


            };

            dispatch(editeInterface(data))
                .then(() => {
                    InterfaceAsideReducer.successCallback();
                    dispatch(getAllInterfaces())
                    dispatch(handleClose())
                    dispatch(clearForm())
                });
                await handleEditForm() .then(() => {
                    InterfaceAsideReducer.successCallback();
                    dispatch(getAllInterfaces())
                    dispatch(handleClose())
                    dispatch(clearForm())
                });

        }




        }else if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getInterfaceById(selectedInterface.idInterface))
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
                deleteInterface2(selectedInterface.idInterface).then(() => {})

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
            let checkInput=interfaceName===""&&data.list2.length===0;
        if (!checkInput && modeAside !== 'CONSULT' && modeAside !== 'DELETE') {
            showModalAlert('closeAside')
        } }else
            dispatch(handleClose());
            setInterfaceName("");
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
export default InterfaceAside
