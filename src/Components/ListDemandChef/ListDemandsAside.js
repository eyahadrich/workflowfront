import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {ErrorMessage, FastField, Form, Formik} from 'formik';
import * as Yup from 'yup';
import 'status-indicator/styles.css';


import Helper from '../../Helper/Helper';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    clearForm,
    handleClose,
    handleCloseModalConfirmation,
    handleOpenModalConfirmation
} from "../../Redux/Actions/ListDemands/ListDemandAside";
import {clearTicketData, getDemandById, getTicketData} from "../../Redux/Actions/ListDemands/ListDemands";
import axios from "axios";
import notify from "devextreme/ui/notify";
import {notifyOptions} from "../../Helper/Config";


const ListDemandsSchema = Yup.object().shape({
    idDemande: Yup.number()
    ,
    nomEmplye: Yup.string()
        ,
    prenomEmploye: Yup.string()
        ,

    dateCreationDemande: Yup.string()
        .nullable()
    ,
    nomTicket: Yup.string()
    ,
    valeurTicket: Yup.string()
    ,
    idWorkflow: Yup.number()
    ,

    status: Yup.string()
    ,

});



const ListDemandsAside = () => {
    let initialValues;
    const dispatch = useDispatch()
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.ListDemandAsideReducer.isOpen);
    const modeAside = useSelector(state => state.ListDemandAsideReducer.modeAside);
    const selectedDemand = useSelector(state => state.ListDemandAsideReducer.selectedDemand);
    const employeeData = useSelector(state => state.LoginReducer.employeeData);
    const ListDemandAsideReducer = useSelector(state => state.ListDemandAsideReducer);
    const [validationData, setValidationData] = useState(null);
    useEffect(() => {
        if (selectedDemand && selectedDemand.idDemande) {
            dispatch(getTicketData(selectedDemand.idDemande)).then(() => {});
        }
    }, [dispatch, selectedDemand]);

    const ticketData = useSelector(state => state.DemandsReducer.ticketData);
    const getValidationByDemand = async (idDemande) => {
        try {
            const res = await axios.get(`http://localhost:9011/workflow-core/api/validations/demande/${idDemande}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching validation:", error);
            throw error; // Propagate the error
        }
    };

    const updateValidation = async (idValidation, updatedData) => {
        try {
            const res = await axios.put(`http://localhost:9011/workflow-core/api/validations/${idValidation}`, updatedData);
            return res.data;
        } catch (error) {
            console.error("Error updating validation:", error);
            throw error; // Propagate the error
        }
    };
    const handleValidation = async (idDemande, response) => {
        try {
            // Fetch the validation data first
            const fetchedValidationData = await getValidationByDemand(idDemande);
            const chefValidation = fetchedValidationData.find(validation => validation.nomEtape === "Validation Chef");
            setValidationData(chefValidation);
            console.log(chefValidation)
                const validationId = chefValidation.idValidation;
                 await updateValidation(validationId, {
                    idValidation: validationId,
                    reponse: response,
                    idDemande: idDemande,
                    idEtape: chefValidation.idEtape,
                    idEmploye: employeeData.idEmploye
                });


        } catch (error) {
            console.error("Error handling validation:", error);
        }
    };




    if (modeAside !== "") {
        initialValues = {
            idDemande: selectedDemand ? selectedDemand.idDemande :'',
            nomEmplye: selectedDemand ? selectedDemand.nomEmplye :'',
            prenomEmploye: selectedDemand ? selectedDemand.prenomEmploye :'',
            dateCreationDemande: selectedDemand ? selectedDemand.dateCreationDemande :'',
            idWorkflow: selectedDemand ? selectedDemand.idWorkflow :'',
            status: selectedDemand ? selectedDemand.status :'',


        };
    }


    const OpenAside = (errors, touched, setFieldValue, values, modeAside) => {
        let disabled = false;
        let classDisabledDes = "";
        // eslint-disable-next-line no-unused-vars
        let classDisabled = "";
        // let classVisibility = "display-none";
        if ( modeAside === 'DELETE' || modeAside === 'CONSULT') {
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
                        <h3 className="header-csys">{"Demand Détails"}</h3>
                        <div className="flex-row-start">
                            <section className="flex-row-start flex-3">
                                <label className="control-label flex-6">{"Id Demand"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="idDemande" disabled
                                               className={'form-control-csys input-xs' + (errors.idDemande && touched.idDemande ? ' erreur-validation' : '')}/>
                                    <ErrorMessage name="idDemande"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-6">{"Date de Creation"}</label>
                                <div className="control-input input flex-9">
                                    <input
                                        type="text"
                                        name="dateCreation"
                                        value={renderDateFormat(values.dateCreationDemande)} // Make sure to provide the value
                                        disabled // Ensure the input is disabled
                                        className={'form-control-csys input-xs' + (errors.dateCreationDemande && touched.dateCreationDemande ? ' erreur-validation' : '')}
                                    />
                                    <ErrorMessage name="dateCreationDemande"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>

                            </section>

                        </div>
                        <div className="flex-row-start">

                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-6">{"Nom Employé"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="nomEmplye"
                                               className={'form-control-csys input-xs' + (errors.nomEmplye && touched.nomEmplye ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="nomEmplye"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>

                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-6">{"Prénom Employé"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="prenomEmploye"
                                               className={'form-control-csys input-xs' + (errors.prenomEmploye && touched.prenomEmploye ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="prenomEmploye"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                        </div>
                        <div className="flex-row-start">

                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-6">{"Status"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="status"
                                               className={'form-control-csys input-xs' + (errors.status && touched.status ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="status"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                        </div>

                    </fieldset>
                    <div className="flex-12">
                        <fieldset>
                            <h3 className="header-csys">{"Ticket Data"}</h3>
                            {/* Display ticket data */}
                            {ticketData.map((ticket, index) => (
                                <div key={index} className="flex-row-space flex-3">
                                    <label className="control-label flex-6">{ticket.nomTicket}</label>
                                    <div className="control-input input flex-9">
                                        <FastField
                                            type="text"
                                            name={`ticketValues[${index}]`} // Use index to differentiate fields
                                            className={'form-control-csys input-xs' + (errors.nomTicket && touched.nomTicket ? ' erreur-validation' : '')}
                                            value={ticket.valeurTicket} // Display ticket value
                                            disabled={classDisabledDes}
                                        />
                                        <ErrorMessage name={`ticketValues[${index}]`} render={msg => <div>{msg}</div>}/>
                                    </div>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    };

    const submitAdd = async (values, modeAside) => {
        if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getDemandById(selectedDemand.idDemande))
                .then(() => {
                    dispatch(clearTicketData());
                    dispatch(handleClose())
                    dispatch(clearForm())
                });
        }
    };


    const showModalAlert = (actionToDoOnClick) => {
        let message = "";

        // Set the message based on the action
        if (actionToDoOnClick === 'delete') {
            message = "Voulez-vous valider la demande ?";
        } else {
            message = "Voulez-vous refuser la demande ?";
        }
        const handleBtnConfirmerModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
            if (actionToDoOnClick === 'delete' ) {
                handleValidation(selectedDemand.idDemande, true)
                    .then(() => {
                        notify("Demande validé avec succés", 'success', notifyOptions.displayTime);
                        ListDemandAsideReducer.successCallback();
                        dispatch(clearTicketData());
                        dispatch(handleClose());
                        dispatch(clearForm());
                    });
            } else {
                handleValidation(selectedDemand.idDemande, false)
                    .then(() => {
                        notify("Demande refusé avec succés", 'error', notifyOptions.displayTime);
                        ListDemandAsideReducer.successCallback();
                        dispatch(clearTicketData());
                        dispatch(handleClose());
                        dispatch(clearForm());
                    });
            }
        }
        const handleBtnCancelModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
        }
        dispatch(handleOpenModalConfirmation(message, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation));

    };
    const handleSubmit = (values, modeAside) => {
        submitAdd(values, modeAside).then(() =>{} )
    };
    const closeAside = () => {
        if (modeAside === 'CONSULT' ) {
            dispatch(handleClose());
        } else{

            showModalAlert('close');
    }

    }

    return (
        <div>
            {isOpen && (<aside className={"openned"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ListDemandsSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        handleSubmit(values, modeAside);
                    }}
                    render={({ errors, touched, isSubmitting, setFieldValue, values, handleSubmit }) => (
                        <Form>
                            <div className="aside-dialog" style={(modeAside === 'DELETE' ? { width: '60%' } : { width: '60%' })}>
                                <div className="header-aside">
                                    <div className="right">
                                        <div>

                                            {(modeAside === 'DELETE' && <h3 id="titleAside">{"Validation"}</h3>)}

                                            {(modeAside === 'CONSULT' && <h3 id="titleAside">{messages.asideConsult}</h3>)}
                                        </div>
                                        <div>
                                            <div className="action-icons">
                                                {(modeAside === 'DELETE') && (
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
export default ListDemandsAside
