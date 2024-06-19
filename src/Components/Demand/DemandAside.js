import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'status-indicator/styles.css';
import {
    clearForm,
    handleClose,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,

} from "../../Redux/Actions/MyDemand/MyDemandAside";

import Helper from '../../Helper/Helper';
import notify from "devextreme/ui/notify";
import { notifyOptions } from '../../Helper/Config';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteMyDemand, getMyDemandById} from "../../Redux/Actions/MyDemand/MyDemand";
import PropTypes from "prop-types";
import {getMyDemandByIdInterface} from "../../Redux/Actions/ComponentTable/SelectMyDemand";
import { getAllTicketsByInterfaceId} from "../../Redux/Actions/Ticket/Ticket";
import {getEtapesByWorkflow} from "../../Redux/Actions/Interface/Interface";
import axios from "axios";
import {clearTicketData, getTicketData} from "../../Redux/Actions/ListDemands/ListDemands";


const EmployeeSchema = Yup.object().shape({
    idDemande: Yup.number()
    ,
    nomInterface: Yup.string()
        .nullable()
        .trim(' '),
    status: Yup.string()
        .nullable()
        .trim(' '),
    dateCreationDemande: Yup.object()
        .nullable(),



});

const DemandAside = ({id,type}) => {
    let initialValues;
    const dispatch = useDispatch()
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.MyDemandAsideReducer.isOpen);
    const modeAside = useSelector(state => state.MyDemandAsideReducer.modeAside);
    const selectedMyDemand = useSelector(state => state.MyDemandAsideReducer.selectedMyDemand);
    const employeeData = useSelector(state => state.LoginReducer.employeeData);
    const MyDemandAsideReducer = useSelector(state => state.MyDemandAsideReducer);
    const tickets = useSelector(state => state.TicketsReducer.allTickets);
    const [inputValues, setInputValues] = useState({});
    const etapes = useSelector(state => state.InterfacesReducer.etapes);
    const ticketData = useSelector(state => state.DemandsReducer.ticketData);
    useEffect(() => {
        if (selectedMyDemand && selectedMyDemand.idDemande) {
            dispatch(getTicketData(selectedMyDemand.idDemande)).then(()=> {});
        }
    }, [dispatch, selectedMyDemand]);






    const handleInputChange = (ticketId, value) => {
        setInputValues(prevState => ({
            ...prevState,
            [ticketId]: value
        }));

    };


    useEffect(() => {
        dispatch(getAllTicketsByInterfaceId(id));
        dispatch(getEtapesByWorkflow(id)).then(() =>{} )
    }, [dispatch, id]);
    const handleEdit = async () => {
        try {
            for (const ticket of ticketData) {
                await axios.put(`http://localhost:9011/workflow-core/api/ticketdatas/${ticket.idTicketData}`, {
                    valeurTicket: inputValues[ticket.idTicket] ? inputValues[ticket.idTicket] : ticket.valeurTicket,
                    idDemande: selectedMyDemand.idDemande,
                    idTicket: ticket.idTicket
                });
            }

            console.log("Ticket data updated successfully for all tickets associated with the demand");

            // Fetch the updated demand data
            await dispatch(getMyDemandById(selectedMyDemand.idDemande));
            // Fetch the updated tickets data
            await dispatch(getTicketData(selectedMyDemand.idDemande));

            notify('Demande envoyée avec succès', 'success', notifyOptions.displayTime);
        } catch (error) {
            console.error('Error updating:', error);
            notify('Error occurred during update', 'error', notifyOptions.displayTime);
        }
    };


    const handleValidate = async () => {
        let hasEmptyField = false;
        for (const ticket of tickets) {
            if (!inputValues[ticket.idTicket] || inputValues[ticket.idTicket].trim() === '') {
                hasEmptyField = true;
                break;
            }
        }
        if (hasEmptyField) {
            console.error('All fields are required');
            notify('All fields are required', 'error', notifyOptions.displayTime);
            return;
        }


        try {
            const demandeResponse = await axios.post('http://localhost:9011/workflow-core/api/demandes', {
                dateCreationDemande: new Date().getTime(), // Current timestamp
                status: "En Attente de validation",
                idEmploye: employeeData.idEmploye,
                nomEmplye: "string",
                idInterface: id,
                nomInterface: "string"
            });
            const demandeId = demandeResponse.data.idDemande;
            for (const ticket of tickets) {
                await axios.post('http://localhost:9011/workflow-core/api/ticketdatas', {
                    valeurTicket: inputValues[ticket.idTicket],
                    idDemande: demandeId,
                    idTicket: ticket.idTicket
                });
            }
            const etapesToProcess =etapes.filter(etape => etape.roleEtape === "Validation");
            for (const etape of etapesToProcess) {
                await axios.post('http://localhost:9011/workflow-core/api/validations', {
                    idDemande: demandeId,
                    idEtape: etape.idEtape,
                    idEmploye: employeeData.idEmploye
                });
            }


            console.log("Ticket data added successfully for all tickets associated with the demand");
            dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))

            notify('Demande envoyée avec succès', 'success', notifyOptions.displayTime);
        } catch (error) {
            console.error('Error validating:', error);
            notify('Error occurred during validation', 'error', notifyOptions.displayTime);
        }
    };

    if (modeAside !== "") {
        initialValues = {
            idDemande: selectedMyDemand ? selectedMyDemand.idDemande :'',
            nomInterface: selectedMyDemand ? selectedMyDemand.nomInterface : '',
            status: selectedMyDemand ? selectedMyDemand.status : '',
            dateCreationDemande: selectedMyDemand ? selectedMyDemand.dateCreationDemande : '',
        };
    }


    const OpenAside = (errors, touched, setFieldValue, values, modeAside) => {
        let disabled = false;
        let classDisabledDes = "";
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
        const renderDateFormat = (date) => {
            const formattedDate = Helper.formatDate(date, 'dd-MM-yyyy');
            const formattedTime = Helper.formatHeur(date, 'hh-mm');
            return `${formattedDate} ${formattedTime}`;
        };
        return (
            <div className="flex-row-around">
                <div className="flex-12">
                    <fieldset>
                        {modeAside !== "ADD" ?
                            <>
                                <h3 className="header-csys">{"Demande Détails"}</h3>
                                <div className="flex-row-start">
                                    <section className="flex-row-start flex-3">
                                        <label className="control-label flex-4">{"Id Demande"}</label>
                                        <div className="control-input input flex-9">
                                            <FastField type="text" name="idDemande" disabled
                                                       className={'form-control-csys input-xs' + (errors.idDemande && touched.idDemande ? ' erreur-validation' : '')}/>
                                            <ErrorMessage name="idDemande"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </section>

                                </div>

                                <div className="flex-row-start">

                                    <section className="flex-row-space flex-3">
                                        <label className="control-label flex-4">{"Type demande"}</label>
                                        <div className="control-input input flex-9">
                                            <FastField type="text" name="nomInterface"
                                                       className={'form-control-csys input-xs' + (errors.nomInterface && touched.nomInterface ? ' erreur-validation' : '')}
                                                       disabled/>
                                            <ErrorMessage name="nomInterface"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </section>
                                    <section className="flex-row-space flex-3">
                                        <label className="control-label flex-3">{"Status"}</label>
                                        <div className="control-input input flex-9">
                                            <FastField type="text" name="status"
                                                       className={'form-control-csys input-xs' + (errors.status && touched.status ? ' erreur-validation' : '')}
                                                       disabled/>
                                            <ErrorMessage name="status"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </section>
                                </div>
                                <section className="flex-row-space flex-3">
                                    <label className="control-label flex-4">{"Date de Creation"}</label>
                                    <div className="control-input input flex-9">
                                        <input
                                            type="text"
                                            name="dateCreationDemande"
                                            value={renderDateFormat(values.dateCreationDemande)}
                                            disabled
                                            className={'form-control-csys input-xs' + (errors.dateCreationDemande && touched.dateCreationDemande ? ' erreur-validation' : '')}
                                        />
                                        <ErrorMessage name="dateCreationDemande"
                                                      render={msg => <div>{msg}</div>}/>
                                    </div>

                                </section>
                            </>
                            : null}
                        {modeAside === "ADD" ?
                            <>
                                <h3 className="header-csys">{type}</h3>


                                <div className="main-container">


                                    <div>

                                        {tickets.map((ticket) => (
                                            <div key={ticket.idTicket} className="form-container">
                                                <label htmlFor={`ticket-${ticket.idTicket}`}>{ticket.nomTicket}:</label><br/>
                                                <input
                                                    id={`ticket-${ticket.idTicket}`}
                                                    className={"form-input mb-4"}
                                                    type={ticket.typeTicket}
                                                    minLength={ticket.minLength}
                                                    maxLength={ticket.maxLength}
                                                    pattern={ticket.regleTicket}
                                                    placeholder={ticket.placeholder}
                                                    onChange={(e) => handleInputChange(ticket.idTicket, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </>
                            : null}

                    </fieldset>
                    {modeAside==="CONSULT"||modeAside==="DELETE"?
                    <div className="flex-12">
                        <fieldset>
                            <h3 className="header-csys">{"Ticket Data"}</h3>
                            {ticketData.map((ticket, index) => (
                                <div key={index} className="flex-row-space flex-3">
                                    <label className="control-label flex-6">{ticket.nomTicket}</label>
                                    <div className="control-input input flex-9">
                                        <FastField
                                            type="text"
                                            name={`ticketValues[${index}]`}
                                            className={'form-control-csys input-xs' + (errors.nomTicket && touched.nomTicket ? ' erreur-validation' : '')}
                                            value={ticket.valeurTicket}
                                            disabled={classDisabledDes}
                                        />
                                        <ErrorMessage name={`ticketValues[${index}]`} render={msg => <div>{msg}</div>}/>
                                    </div>
                                </div>
                            ))}
                        </fieldset>
                    </div>:null}
                    {modeAside==="EDIT"?
                        <div className="flex-12">
                            <fieldset>
                                <h3 className="header-csys">{"Ticket Data"}</h3>
                                {ticketData.map((ticket, index) => (
                                    <div key={index} className="flex-row-space flex-3">
                                        <label className="control-label flex-6">{ticket.nomTicket}</label>
                                        <div className="control-input input flex-9">
                                            <FastField
                                                type="text"
                                                name={`ticketValues[${index}]`}
                                                className={'form-control-csys input-xs' + (errors.nomTicket && touched.nomTicket ? ' erreur-validation' : '')}
                                                defaultValue={ticket.valeurTicket }
                                                onChange={(e) => handleInputChange(ticket.idTicket, e.target.value)}
                                            />
                                            <ErrorMessage name={`ticketValues[${index}]`} render={msg => <div>{msg}</div>}/>
                                        </div>
                                    </div>
                                ))}
                            </fieldset>
                        </div>:null}
                </div>
            </div>
        )
    };
    const submitAdd = async (values, modeAside) => {
        let verif = true;
        let data = {};
        if (modeAside === 'ADD') {
            if (verif) {


                handleValidate()
                    .then(() => {
                        MyDemandAsideReducer.successCallback();
                        dispatch(handleClose());
                        dispatch(clearForm());
                    });


            } else {
                notify(notifyOptions, 'error', notifyOptions.displayTime);
            }
        } else if (modeAside === 'EDIT') {

                handleEdit()
                .then(() => {
                    MyDemandAsideReducer.successCallback();
                    dispatch(clearTicketData());
                    dispatch(handleClose())
                    dispatch(clearForm())
                });

        } else if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getMyDemandById(selectedMyDemand.idDemande))
                .then(() => {
                    dispatch(clearTicketData());
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
                    dispatch(deleteMyDemand(selectedMyDemand.idDemande))
                        .then(() => {
                            MyDemandAsideReducer.successCallback();
                            dispatch(clearTicketData());
                            dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))
                            dispatch(handleClose());
                            dispatch(clearForm());
                        });
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
    const closeAside = (values, modeAside) => {
        let checkModification = Helper.isEqual(values, initialValues);
        if (!checkModification && modeAside !== 'CONSULT' && modeAside !== 'DELETE') {
            showModalAlert('closeAside')
        } else{
            dispatch(clearTicketData());
            dispatch(handleClose());
        }

    };
    return (
        <div>
            {isOpen && (<aside className={"openned"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={EmployeeSchema}
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
                                                {(modeAside === 'ADD' || modeAside === 'DELETE' || modeAside === 'EDIT') && (
                                                    <button className="btn btn-default btn-valide"
                                                            id="btnValiderBudget" type="button" onClick={handleSubmit}
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
DemandAside.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};
export default DemandAside
