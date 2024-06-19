import React, {useEffect, useRef, useState} from 'react';
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
import notify from "devextreme/ui/notify";
import DemandReducer from "../../Redux/Reducers/ComponentTable/SelectListDemands";
import {getAllDemands} from "../../Redux/Actions/ComponentTable/SelectListDemands";
import {getDemandById} from "../../Redux/Actions/ListDemands/ListDemands";
import {handleOpenConsultMode, handleOpenDeleteMode} from "../../Redux/Actions/ListDemands/ListDemandAside";
import axios from "axios";
import {notifyOptions} from "../../Helper/Config";
loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const ListDemandsGrid = () => {

    const dispatch = useDispatch();
    const DemandsReducer= useSelector(state => state.DemandsReducer);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);
    const employeeData = useSelector(state => state.LoginReducer.employeeData);
    const [filteredDemand, setFilteredDemand] = useState([]);
    useEffect(() => {
        if (!DemandReducer.demands)
            dispatch(getAllDemands())
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
    const filterDemandsByValidationRole = async (demands) => {
        // Step 1: Filter demands by ids
        const filteredDemands = demands.filter(demand => demand.idEmploye !== employeeData.idEmploye);

        // Step 2: Fetch validation data for each demand and filter by role
        const filteredDemandsWithValidation = [];
        for (const demand of filteredDemands) {
            try {
                const validations = await getValidationByDemand(demand.idDemande);
                const hasValidationRRH = validations.some(validation => validation.nomEtape === "Validation RRH"||validation.nomEtape === "Sans Validation");
                if (hasValidationRRH) {
                    filteredDemandsWithValidation.push(demand);
                }
            } catch (error) {
                console.error(`Error fetching validations for demand ${demand.idDemande}:`, error);
            }
        }

        return filteredDemandsWithValidation;
    };

    useEffect(() => {
        const fetchAndFilterDemands = async () => {
            try {
                const result = await filterDemandsByValidationRole(DemandsReducer.allDemand);
                setFilteredDemand(result)
            } catch (error) {
                console.error('Error filtering demands:', error);
            }
        };

        fetchAndFilterDemands().then(() => {});
    }, [DemandsReducer.allDemand]);




    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, DemandsReducer);
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
            demand: {
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

            consult: {
                visible: true,
                action: onClickBtnConsult
            },
            validate: {
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
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, DemandsReducer)
    }



    const onClickBtnConsult = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getDemandById(selectedRowKeys))
                .then((data) =>

                    dispatch(handleOpenConsultMode(data, refreshDataGrid))
                )
        }
    }
    const onClickBtnDelete =  async () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            const validations = await getValidationByDemand(selectedRowKeys)
            const hasValidationRRH = validations.filter(validation => validation.nomEtape === "Validation RRH");
            dispatch(getDemandById(selectedRowKeys))
                .then((data) => {
                 const test=true
                        if (test) {
                            dispatch(handleOpenDeleteMode(data, refreshDataGrid))
                        } else {
                            notify("Demande déja validée par RRH", 'error', notifyOptions.displayTime);
                        }
                    }
                )
        }
    }
    const onClickBtnEditionList = () => {
        dispatch(handleOpenModal())
        let du = DemandsReducer.dateDebut;
        let au = DemandsReducer.dateFin;
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
            customStore={filteredDemand}
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
                    dataField: 'nomEmplye',
                    caption: "Nom Employe"
                },
                {
                    dataField: 'prenomEmploye',
                    caption: "Prenom Employe"
                },
                {
                    dataField: 'dateCreationDemande',
                    customizeText: renderDateFormat,
                    caption: "Date de creation"
                },

            ]
            }
        />
    )
}


export default ListDemandsGrid

