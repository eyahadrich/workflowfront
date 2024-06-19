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


import {getInterfaceById} from "../../Redux/Actions/Interface/Interface";
import InterfaceReducer from "../../Redux/Reducers/ComponentTable/SelectInterface";
import {getAllInterfaces} from "../../Redux/Actions/ComponentTable/SelectInterface";
import {
    handleOpenAddMode,
    handleOpenConsultMode,
    handleOpenDeleteMode,
    handleOpenEditMode
} from "../../Redux/Actions/Interface/InterfaceAside";




loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const InterfaceGrid = () => {

    const dispatch = useDispatch();
    const InterfacesReducer= useSelector(state => state.InterfacesReducer);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);
    useEffect(() => {
        if (!InterfaceReducer.interfaces)
            dispatch(getAllInterfaces())
    }, [])
    console.log("text:",InterfacesReducer)




    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, InterfacesReducer);
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
            interface: {
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
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, InterfacesReducer)
    }
    const onClickBtnAdd = () => {
        dispatch(handleOpenAddMode(refreshDataGrid))
    }

    const onClickBtnEdit = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getInterfaceById(selectedRowKeys))
                .then((data) =>

                    dispatch(handleOpenEditMode(data, refreshDataGrid))


                )
        }
    }
    const onClickBtnConsult = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getInterfaceById(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenConsultMode(data, refreshDataGrid))

                )
        }
    }
    const onClickBtnDelete = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getInterfaceById(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenDeleteMode(data, refreshDataGrid))

                )
        }
    }
    const onClickBtnEditionList = () => {
        dispatch(handleOpenModal())
        let du = InterfacesReducer.dateDebut;
        let au = InterfacesReducer.dateFin;
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
            customStore={InterfacesReducer.allInterface}
            onToolbarPreparing={onToolbarPreparing}
            onSelectionChanged={onSelectionChanged}
            id={"idInterface"}
            onRowClick={onRowClick}
            fileName={messages.budgets}
            columns={[

                {
                    dataField: 'idInterface',
                    caption: "id"
                },
                {
                    dataField: 'nomInterface',
                    caption: "Nom Interface"
                },
                {
                    dataField: 'dateCreation',
                    customizeText: renderDateFormat,
                    caption: "Date de creation"
                },
                {
                    dataField: 'dateModification',
                    customizeText: renderDateFormat,
                    caption: "Date de modification"
                },


            ]
            }
        />
    )
}

export default InterfaceGrid
