import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addTab, changeTab } from '../../Redux/Actions/MenuTabs/MenuTabs';
import './MenuAr.css';
import EmployeePage from "../Employee/EmployeePage";
import * as menusTabs from "underscore";
import EquipePage from "../Equipe/EquipePage";
import InterfacePage from "../Interface/InterfacePage";
import {getAllInterfaces} from "../../Redux/Actions/ComponentTable/SelectInterface";
import InterfaceReducer from "../../Redux/Reducers/ComponentTable/SelectInterface";
import ListDemandsPage from "../ListDemands/ListDemandsPage";
import WorkflowPage from "../Workflow/WorkflowPage";
import DemandPage from "../Demand/DemandPage";
import ListDemandsPageChef from "../ListDemandChef/ListDemandsPageChef";


const Menu_Hooks = () => {
  const dispatch = useDispatch();
  const interfaces= useSelector(state => state.InterfacesReducer.allInterface);
  const employeeData = useSelector(state => state.LoginReducer.employeeData);
  console.log(employeeData)
  useEffect(() => {
    if (!InterfaceReducer.interfaces)
      dispatch(getAllInterfaces())
  }, [])
  console.log(interfaces)
  let menus = [];
  if(employeeData&&employeeData.typeEmploye==="RRH"){
   menus = [
    {
      codMnP: 1,
      desMenuP: 'Employee Management',
      logo: 'fas fa-address-card',
      mnName: 'AllEmployees',
      boutonSubMenu: []
    },
    {
      codMnP: 2,
      desMenuP: 'Equipe Management',
      logo: 'fas fa-users',
      mnName: 'AllEquipes',
      boutonSubMenu: []
    },


    {
      codMnP: 3,
      desMenuP: 'Demandes ',
      logo: 'fas fa-envelope',
      mnName: 'AllDemands',
      boutonSubMenu: interfaces.map((interfaceItem) => ({
        codMnP: interfaceItem.idInterface,
        desMenuP: interfaceItem.nomInterface,
        logo: 'fas fa-envelope',
        mnName: interfaceItem.nomInterface,
      }))
    },
    {
      codMnP: 4,
      desMenuP: 'Interface Management',
      logo: 'fas fa-newspaper',
      mnName: 'AllInterfaces',
      boutonSubMenu: []
    },

    {
      codMnP: 5,
      desMenuP: 'Liste Des Demandes',
      logo: 'fas fa-list-alt',
      mnName: 'ListDemandes',
      boutonSubMenu: []
    },
    {
      codMnP: 6,
      desMenuP: 'Workflow Management',
      logo: 'fas fa-tasks',
      mnName: 'AllWorkflow',
      boutonSubMenu: []
    },

  ];
   }else   if(employeeData&&employeeData.typeEmploye==="USER"){
    menus = [



      {
        codMnP: 3,
        desMenuP: 'Demandes ',
        logo: 'fas fa-envelope',
        mnName: 'AllDemands',
        boutonSubMenu: interfaces.map((interfaceItem) => ({
          codMnP: interfaceItem.idInterface,
          desMenuP: interfaceItem.nomInterface,
          logo: 'fas fa-envelope',
          mnName: interfaceItem.nomInterface,
        }))
      },


    ];
  } else if(employeeData&&employeeData.typeEmploye==="CHEF"){
    menus = [




      {
        codMnP: 3,
        desMenuP: 'Demandes ',
        logo: 'fas fa-envelope',
        mnName: 'AllDemands',
        boutonSubMenu: interfaces.map((interfaceItem) => ({
          codMnP: interfaceItem.idInterface,
          desMenuP: interfaceItem.nomInterface,
          logo: 'fas fa-envelope',
          mnName: interfaceItem.nomInterface,
        }))
      },

      {
        codMnP: 5,
        desMenuP: 'Liste Des Demandes',
        logo: 'fas fa-list-alt',
        mnName: 'ListDemandesChef',
        boutonSubMenu: []
      },

    ];
  }

  function goToPage(e, menu) {
    e.stopPropagation();
    let title = menu.desMenuP;
    if (menu.descSecParent) title = `${menu.descSecParent}/${menu.desMenuP}`;
    if (menusTabs && menusTabs.filter(tab => tab.key === menu.codMnP).length === 0) {
      if (menu.boutonSubMenu && menu.boutonSubMenu.length === 0) {
        // If no submenu items, add the menu item itself as a tab
        switch (menu.mnName) {
          case 'AllEmployees':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <EmployeePage />,
            }));
            break;
          case 'AllInterfaces':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <InterfacePage />,
            }));
            break;
          case 'AllEquipes':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <EquipePage />,
            }));
            break;
          case 'ListDemandes':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <ListDemandsPage />,
            }));
            break;
          case 'ListDemandesChef':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <ListDemandsPageChef />,
            }));
            break;
          case 'AllWorkflow':
            dispatch(addTab({
              key: `${menu.codMnP}`,
              title: title,
              icon: <i className={menu.logo} />,
              component: <WorkflowPage />,
            }));
            break;


          default:
            break;
        }
      } else {
        // Add dynamic cases for each submenu item
        interfaces.forEach((interfaceItem) => {
          switch (interfaceItem.nomInterface) {
            case menu.mnName:
              dispatch(addTab({
                key: `${menu.codMnP}`,
                title: title,
                icon: <i className={menu.logo} />,
                component: <DemandPage id={interfaceItem.idInterface}  type={interfaceItem.nomInterface}/>,
              }));
              break;
            default:
              break;
          }
        });
      }
    } else {
      dispatch(changeTab(menu.codMnP));
    }
  }



  return (
      <section id="listModules">
        <div className="module">
          <i className="fas fa-cog fa-2x" />
          <p>Menu</p>
        </div>
        <div id="listModules" className="modulesContainer">
          <ul>
            {menus.map((menu) => (
                <li key={menu.codMnP} className="tile purple w2 h1 subMenu">
                  <a className="link" breadcrumb={menu.desMenuP} onClick={(event) => goToPage(event, menu)}>
                    <i className={`${menu.logo} icon`} />
                    <p className="title">{menu.desMenuP}</p>

                    {menu.boutonSubMenu.length > 0 && (
                        <i className="fas fa-ellipsis-v ellipsis" aria-hidden="true" />
                    )}

                    {menu.boutonSubMenu.length > 0 && (
                        <ul className="sous-menus">
                          {menu.boutonSubMenu.map((submenu) => (
                              <li key={submenu.codMnP} adresse={submenu.mnName} className="link" onClick={(event) => goToPage(event, submenu)} breadcrumb={`${menu.desMenuP}/${submenu.desMenuP}`}>
                                <i className={submenu.logo} />
                                <p>{submenu.desMenuP}</p>
                              </li>
                          ))}
                        </ul>
                    )}
                  </a>
                </li>
            ))}
          </ul>
        </div>
      </section>
  );
}

export default Menu_Hooks;
