
import store from '../Redux/Store/Store';
import filterRemove from '../assests/css/images/filter-remove.png';
import CustomStore from 'devextreme/data/custom_store';
import Ressources from "./Ressources";
import Helper from './Helper';
import notify from "devextreme/ui/notify";
import { notifyOptions } from './Config';

import DropDownButton from 'devextreme-react/drop-down-button';

const HelperGrid = {
    /**
     * 
     * @param {*} e 
     * @param dataGrid is a reference of DataGrid 
     * @param {*} buttons is a object of enum ADD, EDIT, VALIDATE, CONSULT, EXPORT_EXCEL
     *  et affiche que les btn envoyer avec leur actions
     * 
     */


    handleToolbarPreparing: function (e, dataGrid, buttons, filtres, Reducer) {

        const messages = store.getState().intl.messages;
        let disableButtons = true;
        let toolbarItems = e.toolbarOptions.items;
        let listSearchPanel = toolbarItems.filter(item => item.name === "searchPanel");
        let searchPanel;
        if (listSearchPanel.length > 0) {
            searchPanel = listSearchPanel[0];
            searchPanel.location = "before";
        }

        let listColumnChooserButton = toolbarItems.filter(item => item.name === "columnChooserButton");
        let columnChooserButton;
        if (listColumnChooserButton.length > 0) {
            columnChooserButton = listColumnChooserButton[0];
            columnChooserButton.location = "before";
            columnChooserButton.options.elementAttr = { "class": "toolbar-button" };
            columnChooserButton.visible = buttons !== undefined && buttons.columnChooserButton !== undefined;
        }
        e.toolbarOptions.items = [];
        e.toolbarOptions.items.push(
            searchPanel !== undefined ? searchPanel : '',
            {
                location: 'center',
                template: 'filtreEmploye',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.employe !== undefined
            },
            {
                location: 'center',
                template: 'filtreInterface',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.interface !== undefined
            },
            {
                location: 'center',
                template: 'filtreEquipe',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.equipe !== undefined
            },
            {
                location: 'center',
                template: 'filtreDemand',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.demand !== undefined
            },
            {
                location: 'center',
                template: 'filtreMyDemand',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.mydemand !== undefined
            },
            {
                location: 'center',
                template: 'filtreWorkflow',
                widget: 'dxSelectBox',
                visible: filtres !== undefined && filtres.workflow !== undefined
            },
            {
                location: 'center',
                template: 'filtreDate',
                visible: filtres !== undefined && filtres.dates !== undefined
            },
            {
                widget: 'dxButton',
                location: "before",
                visible: buttons !== undefined && buttons.refresh !== undefined,
                options: {
                    icon: 'refresh',
                    elementAttr: {
                        "class": "toolbar-button"
                    },
                    onClick: () => {
                        if (dataGrid.current !== null) dataGrid.current.instance.refresh()
                    }
                }
            },
            {
                widget: 'dxButton',
                location: "before",
                visible: filtres !== undefined && filtres.filterRemove !== undefined,
                options: {
                    icon: filterRemove,
                    elementAttr: {
                        "class": "toolbar-button"
                    },
                    onClick: () => {
                        if (dataGrid.current !== null) dataGrid.current.instance.clearFilter()
                    }
                }
            },
            columnChooserButton,
            {
                widget: 'dxButton',
                location: "after",
                visible: buttons.add !== undefined && buttons.add.visible,
                options: {
                    icon: 'fas fa-plus fa-3x green',
                    text: messages.add,
                    onClick: () => {
                        buttons.add.action()
                    }
                }
            },
            {
                widget: 'dxButton',
                location: "after",
                visible: buttons.edit !== undefined && buttons.edit.visible,
                options: {
                    icon: 'edit',
                    text: messages.edit,
                    disabled: disableButtons,
                    onInitialized: (args) => {
                        if (Reducer !== undefined) Reducer.btnEditInstance = args.component;
                    },
                    onClick: () => {
                        buttons.edit.action()
                    }
                }
            },
            {
                widget: 'dxButton',
                location: "after",
                visible: buttons.validate !== undefined && buttons.validate.visible,
                options: {
                    icon: 'save',
                    text: messages.validate,
                    disabled: disableButtons,
                    onInitialized: (args) => {
                        if (Reducer !== undefined) Reducer.btnValidateInstance = args.component;
                    },
                    onClick: () => {
                        buttons.validate.action()
                    }
                }
            },
            {
                widget: 'dxButton',
                location: "after",
                visible: buttons.consult !== undefined && buttons.consult.visible,
                options: {
                    icon: 'fas fa-eye greenLight',
                    text: messages.consult,
                    disabled: disableButtons,
                    onInitialized: (args) => {
                        if (Reducer !== undefined) Reducer.btnConsultInstance = args.component;
                    },
                    onClick: () => {
                        buttons.consult.action()
                    }
                }
            },
            {
                widget: 'dxButton',
                location: "after",
                visible: buttons.delete !== undefined && buttons.delete.visible,
                options: {
                    icon: 'trash',
                    text: messages.delete,
                    disabled: disableButtons,
                    onInitialized: (args) => {
                        if (Reducer !== undefined) Reducer.btnDeleteInstance = args.component;
                    },
                    onClick: () => {
                        buttons.delete.action()
                    }
                }
            },


            {
                location: "after",
                widget: 'dxDropDownButton',
                options: {
                    displayExpr: 'name',
                    keyExpr: 'value',
                    icon:'print',
                    selectedItemKey: this.mode,
                    stylingMode: 'outlined',
                    useSelectMode: false,
                    splitButton: true,
                    disabled: false,
                    onInitialized: (args) => {
                        if (Reducer !== undefined) Reducer.btnEditionInstance = args.component;
                    },
                    onSelectionChanged: (e) => {
                        this.mode = e.item.value;
                    },
                    items: [{
                        value: buttons.editionList,
                        name: messages.printList,
                        icon: 'print',
                        visible: buttons.editionList !== undefined && buttons.editionList.visible,
                        disabled: false,
                        onClick: function () {
                            buttons.editionList.action()
                        }
                    },
                    {
                        value: buttons.edition,
                        name: messages.Budget,
                       icon: 'print',
                        visible: buttons.edition !== undefined && buttons.edition.visible,
                        disabled: false,
                        onClick: () => {
                            buttons.edition.action()
                        }
                    },
                    {
                        value: buttons.edition,
                        name: messages.Excel,
                        icon: 'exportxlsx',
                        elementAttr: {
                            "class": "dx-datagrid-export-button"
                        },
                        onClick: function () {
                            buttons.export_excel.action ?
                                buttons.export_excel.action :
                                e.component.exportToExcel(false);
                        },
                        visible: buttons.export_excel !== undefined && buttons.export_excel.visible,
                        disabled: false
                    }]
                }
            }
        )
    },
    
    onContentReady: () => {
        let listNodata = document.getElementsByClassName('dx-datagrid-nodata');
        for(const element of listNodata){
            element.innerText = 'Aucun donnée disponible';
        }
    },
    refreshDataGrid: (dataGrid) => {
        if (dataGrid.current !== null)
            dataGrid.current.instance.refresh();
    },
    clearDataGrid: function (dataGrid) {
        if (dataGrid.current !== null)
            dataGrid.current.instance.clearFilter()
    },
    handleSelectionChanged: function (selectedRowsData, Reducer) {
        const disableButtons = true;
        if (selectedRowsData.length === 0) {
            Reducer.btnConsultInstance.option('disabled', disableButtons);
            Reducer.btnEditInstance.option('disabled', disableButtons);
            Reducer.btnValidateInstance.option('disabled', disableButtons);
            if (Reducer.btnDeleteInstance !== undefined)
                Reducer.btnDeleteInstance.option('disabled', disableButtons);
            if (Reducer.btnEditionInstance !== undefined)
                Reducer.btnEditionInstance.option('disabled', disableButtons);
        } else {
            Reducer.btnConsultInstance.option('disabled', !disableButtons);
            Reducer.btnEditInstance.option('disabled', !disableButtons);
            Reducer.btnValidateInstance.option('disabled', !disableButtons);
            if (Reducer.btnDeleteInstance !== undefined)
                Reducer.btnDeleteInstance.option('disabled', !disableButtons);
            if (Reducer.btnEditionInstance !== undefined)
                Reducer.btnEditionInstance.option('disabled', !disableButtons);
        }
    },
    constructCustomStore: function (ressource, dateDebut, dateFin, budget, Reducer) {

        const messages = store.getState().intl.messages;
        return new CustomStore({
            key: 'code',
            load: async (loadOptions) => {

                if (loadOptions.userData.budget !== null && loadOptions.userData.budget !== undefined) {
                    budget = loadOptions.userData.budget
                }
                if (loadOptions.userData.dateDebut !== null && loadOptions.userData.dateDebut !== undefined) {
                    dateDebut = loadOptions.userData.dateDebut;
                }

                if (loadOptions.userData.dateFin !== null && loadOptions.userData.dateFin !== undefined) {
                    dateFin = loadOptions.userData.dateFin;

                }
                if (!(!isNaN(dateFin) && (dateFin > 0) && !isNaN(dateDebut) && (dateDebut > 0) && dateDebut <= dateFin)) {
                    notifyOptions.message = messages.DateFailed;
                    notify(notifyOptions, 'error', notifyOptions.displayTime);
                } else {
                    try {
                        let du = Helper.formatDate(dateDebut, 'yyyy-MM-dd');
                        let au = Helper.formatDate(dateFin, 'yyyy-MM-dd');
                        if(Reducer && Reducer.dateDebut !== undefined) Reducer.dateDebut=du;
                        if(Reducer && Reducer.dateFin !== undefined) Reducer.dateFin=au;

                        const response = await fetch(`${Ressources.CoreUrl}/${Ressources.Budget.api}/${ressource}?codeBudget=${budget}&du=${du}&au=${au}`);
                        const data = await response.json();
                        return {
                            data: data
                        };
                    } catch (e) {
                        throw 'Data Loading Error';
                    }
                }
            }
        })
    }

}
export default HelperGrid;
