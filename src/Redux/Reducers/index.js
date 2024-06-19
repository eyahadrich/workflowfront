import {combineReducers} from 'redux';
import BudgetAsideReducer from './Employee/EmployeeAside';
import MenuTabsReducer from './MenuTabs/MenuTabs';
import MenuReducer from './Menu/Menu';
import HeaderReducer from './Header/Header';
import {intlReducer} from 'react-intl-redux';
import BudgetReducer from './ComponentTable/SelectEmployee';
import ModalReducerImpression from './ComponentTable/ModalImpression';
import loginExistenceReducer from "./Employee/CheckLogin";
import EquipeReducer from "./ComponentTable/SelectEquipe";
import EquipesReducer from "./Equipe/Equipe";
import EquipeAsideReducer from "./Equipe/EquipeAside";
import EmployeesReducer from "./Employee/Employee";
import InterfaceReducer from "./ComponentTable/SelectInterface";
import InterfacesReducer from "./Interface/Interface";
import InterfaceAsideReducer from "./Interface/InterfaceAside";
import DemandsReducer from "./ListDemands/ListDemands";
import DemandReducer from "./ComponentTable/SelectListDemands";
import ListDemandAsideReducer from "./ListDemands/ListDemandsAside";
import WorkflowReducer from "./ComponentTable/SelectWorkflow";
import WorkflowsReducer from "./Workflow/Workflow";
import WorkflowAsideReducer from "./Workflow/WorkflowAside";
import MyDemandReducer from "./ComponentTable/SelectMyDemand";
import MyDemandsReducer from "./MyDemand/MyDemand";
import MyDemandAsideReducer from "./MyDemand/MyDemandAside";
import TicketsReducer from "./Ticket/Ticket";
import LoginReducer from "./Login/Login";

export default combineReducers({ 
    MenuTabsReducer, MenuReducer, HeaderReducer, intl: intlReducer,
    BudgetReducer ,ModalReducerImpression,EquipeReducer,EquipesReducer,EquipeAsideReducer,
    EmployeesReducer,BudgetAsideReducer,InterfaceReducer,InterfacesReducer,
     loginExistenceReducer,InterfaceAsideReducer,DemandsReducer,DemandReducer,
    ListDemandAsideReducer,WorkflowReducer,WorkflowsReducer,WorkflowAsideReducer,MyDemandReducer,MyDemandsReducer,MyDemandAsideReducer,
    TicketsReducer,LoginReducer
});