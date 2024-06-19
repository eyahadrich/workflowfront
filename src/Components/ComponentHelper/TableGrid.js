import React from 'react';
import DataGrid, {
    Column,
    ColumnChooser,
    Export,
    FilterRow,
    Grouping,
    HeaderFilter,
    SearchPanel,
    Selection,
    Sorting,
    GroupPanel,
    Paging
} from 'devextreme-react/data-grid';
import store from '../../Redux/Store/Store';
import { Template } from 'devextreme-react/core/template';
import HelperGrid from '../../Helper/HelperGrid';
import FiltreDates from "../ComponentTable/FiltreDates";
import SelectEmployee from "../ComponentTable/SelectEmployee";
import SelectEquipe from "../ComponentTable/SelectEquipe";
import SelectInterface from "../ComponentTable/SelectInterface";
import SelectListDemands from "../ComponentTable/SelectListDemands";
import SelectWorkflow from "../ComponentTable/SelectWorkflow";
import SelectMyDemand from "../ComponentTable/SelectMyDemand";


const TableGrid = (obj) => {

    const messages = store.getState().intl.messages;
    const direction = store.getState().intl.direction;

    const toolbarFilterEmployee = () => (
        <SelectEmployee customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );
    const toolbarFilterEquipe = () => (
        <SelectEquipe customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );
    const toolbarFilterInterface = () => (
        <SelectInterface customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );
    const toolbarFilterDemand = () => (
        <SelectListDemands customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );
    const toolbarFilterWorkflow = () => (
        <SelectWorkflow customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );
    const toolbarFilterMyDemand = () => (
        <SelectMyDemand customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );

    const filtreDates = () => (
        <FiltreDates customStore={obj.customStore} dataGrid={obj.dataGrid} />
    );


    return (
        <DataGrid className='DataGrid'
            ref={obj.dataGrid}
            dataSource={obj.customStore}
            keyExpr={obj.id}
            onToolbarPreparing={obj.onToolbarPreparing}
            showColumnLines={true}
            showRowLines={true}
            showBorders={true}
            rowAlternationEnabled={true}
            rtlEnabled={direction === "RTL"}
            wordWrapEnabled={true}
            columnAutoWidth={true}
            onRowPrepared={obj.row}
            onSelectionChanged={obj.onSelectionChanged}
            onRowClick={obj.onRowClick}
            hoverStateEnabled={true}
            allowColumnReordering={true}
            onContentReady={HelperGrid.onContentReady}>
            <Selection mode={'single'} />
            <Export enabled={true} fileName={obj.fileName} allowExportSelectedData={true} />
            <FilterRow visible={true} applyFilter={true} />
            <HeaderFilter visible={true} />
            <Sorting mode={'single'} />
            <GroupPanel visible={true} />
            <SearchPanel visible={true} placeholder={messages.search} />
            <Grouping autoExpandAll={false} />
            <Paging defaultPageSize={13} />
            <ColumnChooser enabled={true} />
            {obj.columns.map((column, key) => {
                return (<Column key={key}
                    {...column}
                />)
            }
            )}

            {<Template name={'filtreEmploye'} render={toolbarFilterEmployee} />}
            {<Template name={'filtreEquipe'} render={toolbarFilterEquipe} />}
            {<Template name={'filtreInterface'} render={toolbarFilterInterface} />}
            {<Template name={'filtreDemand'} render={toolbarFilterDemand} />}
            {<Template name={'filtreWorkflow'} render={toolbarFilterWorkflow} />}
            {<Template name={'filtreMyDemand'} render={toolbarFilterMyDemand} />}
            {<Template name={'filtreDate'} render={filtreDates} />}

        </DataGrid>
    )

}
export default TableGrid