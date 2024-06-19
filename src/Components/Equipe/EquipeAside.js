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
    addNewEquipe,
    deleteEquipe,
    editeEquipe,
    getEquipeById,
    getEmployes,
    getRoles
} from "../../Redux/Actions/Equipe/Equipe";
import {
    clearForm,
    handleClose,
    handleCloseModalConfirmation,
    handleOpenModalConfirmation
} from "../../Redux/Actions/Equipe/EquipeAside";



const EquipeSchema = Yup.object().shape({
    idEquipe: Yup.number()
    ,
    nomEquipe: Yup.string()
        .required(' ')
        .matches(/^[a-zA-Z\s]*$/, 'Invalid characters')
        .max(200, 'To large')
        .trim(' '),



});

const EquipeAside = () => {
    let initialValues;
    const dispatch = useDispatch()
    const messages = useSelector(state => state.intl.messages);
    const isOpen = useSelector(state => state.EquipeAsideReducer.isOpen);
    const modeAside = useSelector(state => state.EquipeAsideReducer.modeAside);
    const selectedEquipe = useSelector(state => state.EquipeAsideReducer.selectedEquipe);
    const EquipeAsideReducer = useSelector(state => state.EquipeAsideReducer);
    const allEmploye = useSelector(state => state.EquipesReducer.allEmploye)
    const allRole = useSelector(state => state.EquipesReducer.allRole)
    const [rows, setRows] = useState([{ employe: '', role: '' }]);

    // Function to add a new row
    const addRow = () => {
        setRows([...rows, { employe: '', role: '' }]);
    };
    const resetRows = () => {
        setRows([{ employe: '', role: '' }]);
    };
    const handleRemove = (index) => {
        const newRows = rows.filter((row, rowIndex) => rowIndex !== index);
        setRows(newRows);
    };

    // Function to handle changes in the select elements
    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };
    console.log(rows)
    useEffect(() => {
        dispatch(getEmployes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);
    if (modeAside !== "") {
        initialValues = {
            idEquipe: selectedEquipe ? selectedEquipe.idEquipe :'',
            nomEquipe: selectedEquipe ? selectedEquipe.nomEquipe : '',
            roleEquipeList: selectedEquipe ? selectedEquipe.roleEquipeList : '',
           // dateCreation: selectedEquipe ? selectedEquipe.dateCreation : '',


        };
    }



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
            <div className="flex-row-around">
                <div className="flex-12">
                    <fieldset>
                        <h3 className="header-csys">{"Equipe Détails"}</h3>
                        <div className="flex-row-start">
                            {modeAside !== "ADD" ?
                                <section className="flex-row-start flex-3">
                                    <label className="control-label flex-4">{"Id Equipe"}</label>
                                    <div className="control-input input flex-9">
                                        <FastField type="text" name="idEquipe" disabled
                                                   className={'form-control-csys input-xs' + (errors.idEquipe && touched.idEquipe ? ' erreur-validation' : '')}/>
                                        <ErrorMessage name="idEquipe"
                                                      render={msg => <div>{msg}</div>}/>
                                    </div>
                                </section> :null}


                        </div>

                        <div className="flex-row-start">

                            <section className="flex-row-space flex-3">
                                <label className="control-label flex-4">{"Nom Equipe"}</label>
                                <div className="control-input input flex-9">
                                    <FastField type="text" name="nomEquipe"
                                               className={'form-control-csys input-xs' + (errors.nomEquipe && touched.nomEquipe ? ' erreur-validation' : '')}
                                               disabled={classDisabledDes}/>
                                    <ErrorMessage name="nomEquipe"
                                                  render={msg => <div>{msg}</div>}/>
                                </div>
                            </section>


                        </div>
                        <>

                            <h3 className="header-csys"
                                data-sider-select-id="72c1e70b-45a8-4b8d-87cc-a26121803a49">{"Les membres de l'équipe"}</h3>
                            {modeAside === "CONSULT" || modeAside === "DELETE" ?
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col" style={{width: '50%'}}>Employé</th>
                                        <th scope="col" style={{width: '50%'}}>Rôle</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedEquipe.roleEquipeList.map((roleEquipe, index) => (
                                        <tr key={index}>
                                            <td>{roleEquipe.nomEmploye} {roleEquipe.employe.prenomEmploye}</td>
                                            <td>{roleEquipe.designation}</td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table> :
                                <div>
                                    <div className="dx-item dx-toolbar-item dx-toolbar-button">
                                        <div className="dx-item-content dx-toolbar-item-content">
                                            <div
                                                className="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text"
                                                aria-label="Ajouter"
                                                tabIndex="0"
                                                role="button"
                                                onClick={addRow}>
                                                <div className="dx-button-content">
                                                    <i className="dx-icon fas fa-plus fa-3x green"></i>
                                                    <span className="dx-button-text">Ajouter</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{width: '50%'}}>Employé</th>
                                            <th scope="col" style={{width: '50%'}}>Rôle</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select
                                                        value={row.employe}
                                                        onChange={(e) => handleChange(index, 'employe', e.target.value)}
                                                    >
                                                        <option value="">Select Employé</option>
                                                        {allEmploye.map((employe) => (
                                                            <option key={employe.idEmploye} value={employe.idEmploye}>
                                                                {employe.prenomEmploye}{" "}{employe.nomEmploye}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        value={row.role}
                                                        onChange={(e) => handleChange(index, 'role', e.target.value)}
                                                    >
                                                        <option value="">Select Rôle</option>
                                                        {allRole.map((role) => (
                                                            <option key={role.idRole} value={role.idRole}>
                                                                {role.designation}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="action-icons">
                                                        <button
                                                            className="btn btn-default btn-cancel"
                                                            type="button"
                                                            onClick={() => handleRemove(index)}
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </>


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

                const data = {
                    idEquipe: null,
                    nomEquipe: values.nomEquipe,

                };

                dispatch(addNewEquipe(data, rows))
                    .then(() => {
                        EquipeAsideReducer.successCallback();
                        resetRows();
                        dispatch(handleClose());
                        dispatch(clearForm());
                    });


            } else {
                notify(notifyOptions, 'error', notifyOptions.displayTime);
            }
        } else if (modeAside === 'EDIT') {

            data = {
                idEquipe: selectedEquipe.idEquipe,
                nomEquipe: values.nomEquipe,

            };
            console.log(data);
            dispatch(editeEquipe(data))
                .then(() => {
                    EquipeAsideReducer.successCallback();
                    dispatch(handleClose())
                    dispatch(clearForm())
                });


        } else if (modeAside === 'DELETE') {
            showModalAlert('delete');
        } else if (modeAside === 'CONSULT') {
            dispatch(getEquipeById(selectedEquipe.idEquipe))
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
                dispatch(deleteEquipe(selectedEquipe.idEquipe))
                    .then(() => {
                        EquipeAsideReducer.successCallback();
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
            resetRows()
            dispatch(handleClose());
    };
    return (
        <div>
            {isOpen && (<aside className={"openned"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={EquipeSchema}
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
export default EquipeAside
