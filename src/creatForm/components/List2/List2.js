import React, {useEffect} from "react";
import { Droppable} from "react-beautiful-dnd";
import {Item} from "../index";
import "./List2.css"
import {useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const List2 = ({ data ,handleDeleteItem ,handleUpdateItem }) => {
    const history = useHistory ();
    useEffect(() => {
        // Cleanup function to clear data when leaving the page
        return () => {
            // Clear the data here
            data.list2=[]
        };
    }, [history,data]);
    return (
        <Droppable droppableId="list2">
            {(provided) => (
                <div
                    className="card-form list2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {data.list2.length === 0 && <p className="drop-here">Drop here</p>}
                    {data.list2.map((item, index) => (
                        //<Item item={item} index={index} handleDeleteItem={handleDeleteItem}  handleUpdateItem={handleUpdateItem}/>
                        <Item
                            key={item.id} // Add the key prop with a unique value
                            item={item}
                            index={index}
                            handleDeleteItem={handleDeleteItem}
                            handleUpdateItem={handleUpdateItem}
                         />

                    ))}
                    {provided.placeholder}

                </div>
            )}
        </Droppable>
    );
};

List2.propTypes = {
    data: PropTypes.object.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired
};

export default List2;
