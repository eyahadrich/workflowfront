import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Ressources from "../../Helper/Ressources";
import {
    handleOpenAddMode,
    handleOpenEditMode,
    handleOpenDeleteMode,
    handleOpenConsultMode
} from "../../Redux/Actions/Employee/EmployeeAside";
import {
    handleOpenModal
} from "../../Redux/Actions/ComponentTable/ModalImpression";
import { loadMessages } from "devextreme/localization";
import arMessages from "./../../i18n/datagrid_ar.json";
import enMessages from "devextreme/localization/messages/en";
import frMessages from "devextreme/localization/messages/fr";
import { getEmployeeById } from "../../Redux/Actions/Employee/Employee";
import Helper from '../../Helper/Helper';
import HelperGrid from '../../Helper/HelperGrid';
import TableGrid from '../ComponentHelper/TableGrid';
import {getAllEmployees} from "../../Redux/Actions/ComponentTable/SelectEmployee";
import BudgetReducer from "../../Redux/Reducers/ComponentTable/SelectEmployee";


loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const EmployeeGrid = () => {

    const dispatch = useDispatch();
    const BudgetsReducer = useSelector(state => state.EmployeesReducer);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);
    useEffect(() => {
        if (!BudgetReducer.budgets)
            dispatch(getAllEmployees())
    }, [])
    console.log("text:",BudgetsReducer)
    console.log(messages)


    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, BudgetsReducer);
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
            employe: {
                visible: true
            },
            // dates: {
            //     visible: true
            // },
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
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, BudgetsReducer)
    }
    const onClickBtnAdd = () => {
        dispatch(handleOpenAddMode(refreshDataGrid))
    }

    const onClickBtnEdit = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getEmployeeById(selectedRowKeys))
                .then((data) =>

                        dispatch(handleOpenEditMode(data, refreshDataGrid))


                )
        }
    }
    const onClickBtnConsult = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getEmployeeById(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenConsultMode(data, refreshDataGrid))

                )
        }
    }
    const onClickBtnDelete = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getEmployeeById(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenDeleteMode(data, refreshDataGrid))

                )
        }
    }
    const onClickBtnEditionList = () => {
        dispatch(handleOpenModal())
        let du = BudgetsReducer.dateDebut;
        let au = BudgetsReducer.dateFin;
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
        return Helper.formatDate(data.value);
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
            customStore={BudgetsReducer.allEmployee}
            onToolbarPreparing={onToolbarPreparing}
            onSelectionChanged={onSelectionChanged}
            id={"idEmploye"}
            onRowClick={onRowClick}
            fileName={messages.budgets}
            columns={[

                {
                    dataField: 'nomEmploye',
                    caption: "Last Name"
                },
                {
                    dataField: 'prenomEmploye',
                    caption: "First Name"
                },
                {
                    dataField: 'emailEmploye',
                    caption: "Email"
                },
                {
                    dataField: 'dateNaissance',
                    customizeText: renderDateFormat,
                    caption: "Date of Birth"
                },
                {
                    dataField: 'adresse',
                    caption: "Address"
                },
                {
                    dataField: 'tel',
                    caption: "Phone"
                },

            ]
            }
        />
    )
}

export default EmployeeGrid
