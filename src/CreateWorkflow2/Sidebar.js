import React from 'react';

 const Sidebar = () => {
  const onDragStart = (event, nodeType, label) => {
    const data = JSON.stringify({ nodeType, label });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  
  }

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default',"validation RRH")} draggable>
        validation RRH
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default',"Validation Chef")} draggable>
        validation Chef
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output',"end workflow")} draggable>
        end workflow
      </div>
    </aside>
  );
};
 export default Sidebar;
