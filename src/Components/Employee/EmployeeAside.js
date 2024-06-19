import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import MaskedTextInput from "react-text-mask";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'status-indicator/styles.css';
import {
    clearForm,
    handleClose,
    getAllTypeEmployee,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,

} from "../../Redux/Actions/Employee/EmployeeAside";
import {
    getEmployeeById,
    addNewEmployee,
    editeEmployee,
    deleteEmployee,

} from "../../Redux/Actions/Employee/Employee";
import Helper from '../../Helper/Helper';
import notify from "devextreme/ui/notify";
import { notifyOptions } from '../../Helper/Config';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";


const EmployeeSchema = Yup.object().shape({
    idEmploye: Yup.number()
        ,
    prenomEmploye: Yup.string()
        .required(' ')
        .matches(/^[a-zA-Z\s]*$/, 'Invalid characters')
        .max(200, 'To large')
        .trim(' '),
    nomEmploye: Yup.string()
        .required(' ')
        .matches(/^[a-zA-Z\s]*$/, 'Invalid characters')
        .max(200, 'To large')
        .trim(' '),
    tel: Yup.string()
        .required(' ')
        .min(8,'Invalid phone number')
        .max(8, 'Invalid phone number')
        .trim(' '),
    typeEmploye: Yup.object()
        .nullable(),
    dateNaissance: Yup.date()
        .required(' ')
        .nullable()
        .max(Yup.ref('dateNaissance'),
            ({ max }) => `Date needs to be after ${Helper.formatDate(max, 'dd-MM-yyyy')}!!`
        ),
    adresse: Yup.string()
        .required(' ')
        .max(200, 'To large')
        .trim(' '),
    username: Yup.string()
        .required(' ')
        .max(200, 'To large')
        .trim(' '),
    password: Yup.string()
        .required(' ')
        .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .matches(/^[a-zA-Z0-9]+$/, 'Password must consist of alphabetic and numeric characters only')
        .min(8, 'Password must be at least 8 characters long')
        .max(200, 'To large')
        .trim(' '),
    emailEmploye: Yup.string()
        .required(' ')
        .email('Invalid email format')
        .max(200, 'To large')
        .trim(' '),


});
const EmployeeSchema_supp = Yup.object().shape({
    idEmploye: Yup.number()
    ,
    prenomEmploye: Yup.string()
        .required(' ')
        .matches(/^[a-zA-Z\s]*$/, 'Invalid characters')
        .max(200, 'To large')
        .trim(' '),
    nomEmploye: Yup.string()
        .required(' ')
        .matches(/^[a-zA-Z\s]*$/, 'Invalid characters')
        .max(200, 'To large')
        .trim(' '),
    tel: Yup.string()
        .required(' ')
        .min(8,'Invalid phone number')
        .max(8, 'Invalid phone number')
        .trim(' '),
    typeEmploye: Yup.object()
        .nullable(),

    adresse: Yup.string()
        .required(' ')
        .max(200, 'To large')
        .trim(' '),
    username: Yup.string()
        .required(' ')
        .max(200, 'To large')
        .trim(' '),
    password: Yup.string()
        .required(' ')
        .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .matches(/^[a-zA-Z0-9]+$/, 'Password must consist of alphabetic and numeric characters only')
        .min(8, 'Password must be at least 8 characters long')
        .max(200, 'To large')
        .trim(' '),
    emailEmploye: Yup.string()
        .required(' ')
        .email('Invalid email format')
        .max(200, 'To large')
        .trim(' '),


});

const EmployeeAside = () => {
    let initialValues;
    const dispatch = useDispatch()
    const typeEmploye = useSelector(state => state.BudgetAsideReducer.allTypeEmployee)
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.BudgetAsideReducer.isOpen);
    const modeAside = useSelector(state => state.BudgetAsideReducer.modeAside);
    const selectedEmployee = useSelector(state => state.BudgetAsideReducer.selectedEmployee);
    const BudgetAsideReducer = useSelector(state => state.BudgetAsideReducer);


    useEffect(() => {
        if (typeEmploye.current !== null)
            dispatch(getAllTypeEmployee(typeEmploye.current))
    }, [typeEmploye.current, dispatch])


    if (modeAside !== "") {
        initialValues = {
            idEmploye: selectedEmployee ? selectedEmployee.idEmploye :'',
            typeEmploye: selectedEmployee ? {
                value: selectedEmployee.idTypeEmploye,
                label: selectedEmployee.typeEmploye
            } : null,
            nomEmploye: selectedEmployee ? selectedEmployee.nomEmploye : '',
            idTypeEmploye: selectedEmployee ? selectedEmployee.idTypeEmploye :'',
            prenomEmploye: selectedEmployee ? selectedEmployee.prenomEmploye : '',
            dateNaissance: selectedEmployee ? selectedEmployee.dateNaissance : '',
            adresse:  selectedEmployee ? selectedEmployee.adresse : '',
            username:  selectedEmployee ? selectedEmployee.username : '',
            password:  selectedEmployee ? selectedEmployee.password : '',
            tel: selectedEmployee ? selectedEmployee.tel : '',
            emailEmploye: selectedEmployee ? selectedEmployee.emailEmploye : '',

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
        return (
            <div className="flex-row-around">
                <div className="flex-12">
                    <fieldset>
                        <h3 className="header-csys">{"Employé Détails"}</h3>
                        <div className="flex-row-start">
                            {modeAside!=="ADD"?
                            <section className="flex-row-start flex-3">
                                <label className="control-label flex-3">{"Id Employé"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="idEmploye" disabled
                                               className={'form-control-csys input-xs' + (errors.idEmploye && touched.idEmploye ? ' erreur-validation' : '')}/>
                                    <ErrorMessage name="idEmploye"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>:null}
                            <section className="flex-row-start flex-4">
                                <label className="control-label flex-4">{"Type Employé"}</label>
                                <div
                                    className={'control-input flex-8 SelectCsys' + (errors.typeEmploye && touched.typeEmploye ? ' erreur-validation' : '')}>
                                    {typeEmploye && (
                                        <div>
                                            <FastField
                                                name="typeEmploye"
                                                render={() => {
                                                    return (
                                                        <Select
                                                            classNamePrefix={'SelectCsysStyle'}
                                                            isClearable={true}
                                                            isDisabled={modeAside === 'DELETE' || modeAside === 'CONSULT' ? disabled : false}
                                                            placeholder={messages.PleaseSelect}
                                                            defaultValue={values.typeEmploye}
                                                            options={typeEmploye.map((item) => ({
                                                                value: item.idTypeEmploye,
                                                                label: item.typeemploye,
                                                                typeEmploye: item
                                                            }))}
                                                            onChange={(option) => {
                                                                const idTypeEmploye = option ? option.value : null;
                                                                setFieldValue('typeEmploye', idTypeEmploye, true);
                                                            }}

                                                        />
                                                    );
                                                }}
                                            />
                                            <ErrorMessage name="typeEmploye"
                                                          render={msg => <div>{msg}</div>}/>
                                        </div>)}
                                </div>
                            </section>

                        </div>

                        <div className="flex-row-start">

                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Prénom Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="text" name="prenomEmploye"
                                               className={'form-control-csys input-xs' + (errors.prenomEmploye && touched.prenomEmploye ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="prenomEmploye"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Nom Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="text" name="nomEmploye"
                                               className={'form-control-csys input-xs' + (errors.nomEmploye && touched.nomEmploye ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="nomEmploye" render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>

                        </div>


                        <div className="flex-row-start">
                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Téléphone Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="tel" name="tel"
                                               className={'form-control-csys input-xs' + (errors.tel && touched.tel ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="tel"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>

                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Adresse Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="text" name="adresse"
                                               className={'form-control-csys input-xs' + (errors.adresse && touched.adresse ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="adresse"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                        </div>

                        <div className="flex-row-start">

                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Login Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="text" name="username"
                                               className={'form-control-csys input-xs' + (errors.username && touched.username ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="username"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>
                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Mot De passe"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="password" name="password"
                                               className={'form-control-csys input-xs' + (errors.password && touched.password ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="password" render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>

                        </div>
                        <div className="flex-row-start">

                            <section className="flex-row-space flex-6">
                                <label className="control-label flex-4">{"Email Employé"}</label>
                                <div className="control-input input flex-8">
                                    <FastField type="email" name="emailEmploye"
                                               className={'form-control-csys input-xs' + (errors.emailEmploye && touched.emailEmploye ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="emailEmploye"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>

                        </div>

                        <div className="flex-row-start">
                            <label className="control-label flex-2">{"Date De Naissance"}</label>
                            <section className="flex-row-start flex-5">
                                <DatePicker
                                    selected={modeAside === 'ADD' && values.dateNaissance}
                                    dateFormat='dd-MM-yyyy'
                                    className={"form-control-csys input-xs" + (errors.dateNaissance && touched.dateNaissance ? ' erreur-validation' : '')}
                                    name="dateNaissance"
                                    onChange={(option) => {
                                        setFieldValue('dateNaissance', option, true);

                                    }}
                                    customInput={
                                        <MaskedTextInput
                                            type="text"
                                            mask={[/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                                        />
                                    }
                                    value={(modeAside === 'EDIT' || modeAside === 'DELETE' || modeAside === 'CONSULT')
                                        && Helper.formatDate(values.dateNaissance, 'dd-MM-yyyy')}

                                    disabled={modeAside === 'DELETE' || modeAside === 'CONSULT' ? classDisabled : false}

                                />

                            </section>


                        </div>


                    </fieldset>
                </div>
            </div>
        )
    };

    const submitAdd = async (values, modeAside) => {
        let verif = true;
        let data = {};
        if (modeAside === 'ADD') {
            if (verif) {
                const [loginResponse, telResponse, emailResponse] = await Promise.all([
                    axios.get(`http://localhost:9011/workflow-core/api/employes/exists/login/${values.username}`),
                    axios.get(`http://localhost:9011/workflow-core/api/employes/exists/tel/${values.tel}`),
                    axios.get(`http://localhost:9011/workflow-core/api/employes/exists/email/${values.emailEmploye}`)
                ]);

                const errors = [];

                if (loginResponse.data) {
                    errors.push('Login is already used. please change it');
                }

                if (telResponse.data) {
                    errors.push('Tel is already used. please change it');
                }

                if (emailResponse.data) {
                    errors.push('Email is already used. please change it');
                }

                console.log(errors);

                if (errors.length > 0) {

                    errors.forEach(errorMessage => {
                        notify(errorMessage, 'error', notifyOptions.displayTime);
                    });

                    } else {
                    const formattedDate = Helper.formatDate(values.dateNaissance, 'yyyy-MM-dd');
                    console.log(formattedDate)

                        const data = {
                    idEmploye: null,
                    prenomEmploye: values.prenomEmploye,
                    nomEmploye: values.nomEmploye,
                    adresse: values.adresse,
                    typeEmploye: values.typeEmploye,
                    idTypeEmploye: values.typeEmploye.valueOf(),
                    username: values.username,
                    emailEmploye: values.emailEmploye,
                    password: values.password,
                    tel: values.tel,
                    dateNaissance: formattedDate
                };

                dispatch(addNewEmployee(data))
                    .then(() => {
                        BudgetAsideReducer.successCallback();
                        dispatch(handleClose());
                        dispatch(clearForm());
                    });
            }

        } else {
            notify(notifyOptions, 'error', notifyOptions.displayTime);
        }
    } else if (modeAside === 'EDIT') {

            data = {
                idEmploye: selectedEmployee.idEmploye,
                nomEmploye: values.nomEmploye,
                prenomEmploye: values.prenomEmploye,
                emailEmploye: values.emailEmploye,
                dateNaissance: Helper.formatDate(values.dateNaissance, 'yyyy-MM-dd'),
                adresse: values.adresse,
                tel: values.tel,
                username: values.username,
                password: values.password,
                idTypeEmploye: values.typeEmploye.value,
                typeEmploye: values.typeEmploye.label
            };
            console.log(data);
            dispatch(editeEmployee(data))
                .then(() => {
                    BudgetAsideReducer.successCallback();
                    dispatch(handleClose())
                    dispatch(clearForm())
                });


        } else if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getEmployeeById(selectedEmployee.idEmploye))
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
                dispatch(deleteEmployee(selectedEmployee.idEmploye))
                    .then(() => {
                        BudgetAsideReducer.successCallback();
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
        } else
            dispatch(handleClose());
    };
    let validation;
    {
        modeAside!=="ADD"?validation=EmployeeSchema_supp:validation=EmployeeSchema}
    return (
        <div>
            {isOpen && (<aside className={"openned"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
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
export default EmployeeAside
