import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Ressources from "../../Helper/Ressources";

import {
    handleOpenModal
} from "../../Redux/Actions/ComponentTable/ModalImpression";
import { loadMessages } from "devextreme/localization";
import arMessages from "./../../i18n/datagrid_ar.json";
import enMessages from "devextreme/localization/messages/en";
import frMessages from "devextreme/localization/messages/fr";
import Helper from '../../Helper/Helper';
import HelperGrid from '../../Helper/HelperGrid';
import TableGrid from '../ComponentHelper/TableGrid';


import {
    handleOpenConsultMode,
    handleOpenDeleteMode,
    handleOpenEditMode,
    handleOpenAddMode
} from "../../Redux/Actions/MyDemand/MyDemandAside";
import MyDemandReducer from "../../Redux/Reducers/ComponentTable/SelectMyDemand";
import { getMyDemandByIdInterface} from "../../Redux/Actions/ComponentTable/SelectMyDemand";
import {editeMyDemand, getMyDemandById} from "../../Redux/Actions/MyDemand/MyDemand";
import axios from "axios";
import PropTypes from "prop-types";
import {notifyOptions} from "../../Helper/Config";
import notify from "devextreme/ui/notify";


loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const DemandGrid = ({id}) => {

    const dispatch = useDispatch();
    const MyDemandsReducer= useSelector(state => state.MyDemandsReducer);
    const employeeData = useSelector(state => state.LoginReducer.employeeData);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);
    useEffect(() => {
        if (!MyDemandReducer.mydemands_byInterface)
            dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))
    }, [])

    const getValidationByDemand = async (idDemande) => {
        try {
            const res = await axios.get(`http://localhost:9011/workflow-core/api/validations/demande/${idDemande}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching validation:", error);
            throw error; // Propagate the error
        }
    };

    useEffect(() => {
        const demandsToProcess = MyDemandsReducer.allMyDemandByInterface.filter(demand => demand.status === "En Attente de validation");
        demandsToProcess.forEach(async demand => {
            const responses = [];
            try {
                const validations = await getValidationByDemand(demand.idDemande);
                validations.forEach(validation => {
                    responses.push(validation.reponse);
                });
                if (validations.some(item => item.nomEtape === 'Sans Validation')) {
                    const data = {
                        idDemande: demand.idDemande,
                        status: "Demande Sans Validation",
                        dateCreationDemande: demand.dateCreationDemande,
                        idEmploye: demand.idEmploye,
                        nomEmplye: demand.nomEmplye,
                        prenomEmploye: demand.prenomEmploye,
                        idInterface: demand.idInterface,
                        idWorkflow: demand.idWorkflow,
                        nomInterface: demand.nomInterface
                    }
                    await dispatch(editeMyDemand(data)).then(()=>{
                        dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))
                    });
                }

                else if (responses.every(response => response === true)) {
                    const data = {
                        idDemande: demand.idDemande,
                        status: "Demande Validée",
                        dateCreationDemande: demand.dateCreationDemande,
                        idEmploye: demand.idEmploye,
                        nomEmplye: demand.nomEmplye,
                        prenomEmploye: demand.prenomEmploye,
                        idInterface: demand.idInterface,
                        idWorkflow: demand.idWorkflow,
                        nomInterface: demand.nomInterface
                    }
                    await dispatch(editeMyDemand(data)).then(()=>{
                        dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))
                    });
                } else if (responses.includes(false)) {
                    const data = {
                        idDemande: demand.idDemande,
                        status: "Demande Refusée",
                        dateCreationDemande: demand.dateCreationDemande,
                        idEmploye: demand.idEmploye,
                        nomEmplye: demand.nomEmplye,
                        prenomEmploye: demand.prenomEmploye,
                        idInterface: demand.idInterface,
                        idWorkflow: demand.idWorkflow,
                        nomInterface: demand.nomInterface
                    }
                    await dispatch(editeMyDemand(data)).then(()=>{
                        dispatch(getMyDemandByIdInterface(employeeData.idEmploye,id))
                    });
                } else if (responses.includes(true)&&responses.includes(true)&&!responses.includes(false)) {
                    const data = {
                        idDemande: demand.idDemande,
                        status: "Demande en cours de traitement",
                        dateCreationDemande: demand.dateCreationDemande,
                        idEmploye: demand.idEmploye,
                        nomEmplye: demand.nomEmplye,
                        prenomEmploye: demand.prenomEmploye,
                        idInterface: demand.idInterface,
                        idWorkflow: demand.idWorkflow,
                        nomInterface: demand.nomInterface
                    }
                    await dispatch(editeMyDemand(data)).then(() => {
                        dispatch(getMyDemandByIdInterface(employeeData.idEmploye, id))
                    });
                }


            } catch (error) {
                console.error("Error fetching validation:", error);
            }
        });
    }, [MyDemandsReducer.allMyDemandByInterface]);



    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, MyDemandsReducer);
    };
    const onRowClick = e => {
        if (!selectionChangedRaised) {
            let dataGrid = e.component;
            let keys = dataGrid.getSelectedRowKeys();
            if (dataGrid.getSelectedRowKeys().length > 0)
                dataGrid.deselectRows(keys);
        }
        selectionChangedRaised = false;
    };
    const onToolbarPreparing = (e) => {
        let filtres = {
            mydemand: {
                visible: true
            },
            filterRemove: {
                visible: true
            }
        }
        let buttons = {
            columnChooserButton: {
                visible: true,
            },
            refresh: {
                visible: true,
            },
            add: {
                visible: true,
                action: onClickBtnAdd
            },

            edit: {
                visible: true,
                action: onClickBtnEdit
            },
            consult: {
                visible: true,
                action: onClickBtnConsult
            },
            delete: {
                visible: true,
                action: onClickBtnDelete
            },
            editionList: {
                visible: true,
                action: onClickBtnEditionList
            },
            edition: {
                visible: true,
                action: onClickBtnEdition
            },
            export_excel: {
                visible: true
            }
        }
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, MyDemandsReducer)
    }

    const onClickBtnAdd = () => {
        dispatch(handleOpenAddMode(refreshDataGrid))
    }
    const onClickBtnEdit = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getMyDemandById(selectedRowKeys))
                .then((data) =>{
                    if(data.status==="En Attente de validation") {
                        dispatch(handleOpenEditMode(data, refreshDataGrid))
                    }else if(data.status=== "Demande Validée"){
                        notify("Demande déja validée", 'error', notifyOptions.displayTime);
                    }else if(data.status=== "Demande Refusée"){
                        notify("Demande déja refusée", 'error', notifyOptions.displayTime);
                    }else if(data.status=== "Demande en cours de traitement"){
                        notify("Demande en cours de traitement", 'error', notifyOptions.displayTime);
                    }
                    }



                )
        }
    }
    const onClickBtnConsult = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getMyDemandById(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenConsultMode(data, refreshDataGrid))

                )
        }
    }
    const onClickBtnDelete = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getMyDemandById(selectedRowKeys))
                .then((data) =>{
                        if(data.status==="En Attente de validation"||data.status==="Demande en cours de traitement"||data.status==="Demande Sans Validation") {
                            dispatch(handleOpenDeleteMode(data, refreshDataGrid))
                        }else if(data.status=== "Demande Validée"){
                            notify("Demande déja validée", 'error', notifyOptions.displayTime);
                        }else if(data.status=== "Demande Refusée"){
                            notify("Demande déja refusée", 'error', notifyOptions.displayTime);
                        }
                    })

        }
    }
    const onClickBtnEditionList = () => {
        dispatch(handleOpenModal())
        let du = MyDemandsReducer.dateDebut;
        let au = MyDemandsReducer.dateFin;
        let url = `${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}/edition/listeBudgets?du=${du}&au=${au}`;
        impression(url);
    }
    const onClickBtnEdition = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(handleOpenModal())
            let url = `${Ressources.CoreUrlC}/${Ressources.Employee.api}/${Ressources.Employee.Employees}/edition/${selectedRowKeys}`;
            impression(url);
        }
    }
    const refreshDataGrid = () => {
        if (dataGrid.current !== null)
            dataGrid.current.instance.refresh();
    }
    const renderDateFormat = (data) => {
        if(data.value!==null){

            const date = new Date(data.value);
            const formattedDate = Helper.formatDate(date, 'dd-MM-yyyy');
            const formattedTime = Helper.formatHeur(date, 'hh-mm');

            return `${formattedDate} ${formattedTime}`;
        }else{
            return "interface unedited"
        }
    };
    const renderStatus = (data) => {
        if(data.value==="En Attente de validation") {
            return `${data.value}`
                ;
        }else{
            return data.value
        }


    }

    async function impression(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        componentImpression(blob);

    }
    const componentImpression = (blob) => {
        let url = URL.createObjectURL(blob);
        document.getElementById('iframe_content').src = url;
    }
    return (
        <TableGrid
            dataGrid={dataGrid}
            customStore={MyDemandsReducer.allMyDemandByInterface}
            onToolbarPreparing={onToolbarPreparing}
            onSelectionChanged={onSelectionChanged}
            id={"idDemande"}
            onRowClick={onRowClick}
            fileName={messages.budgets}
            columns={[

                {
                    dataField: 'nomInterface',
                    caption: "Type demande"
                },

                {
                    dataField: 'dateCreationDemande',
                    customizeText: renderDateFormat,
                    caption: "Date de creation"
                },
                {
                    dataField: "status",
                    customizeText: renderStatus,
                    caption: "status"
                },


            ]
            }
        />
    )
}
DemandGrid.propTypes = {
    id: PropTypes.number.isRequired,
};

export default DemandGrid
