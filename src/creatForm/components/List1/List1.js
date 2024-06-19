import "./List1.css"
import {Draggable, Droppable} from "react-beautiful-dnd";
import PropTypes from 'prop-types';
import React from 'react';
const List1 = ({ data }) => {
    return (
        <Droppable droppableId="list1">
            {(provided) => (
                <div
                    className="card-form list1"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >

                    {data.list1.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div
                                    className="item"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    {item.icons}{" "}
                                    {item.label}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    <div className="placeholder">
                        {provided.placeholder} {/* Display the label of the dragged item */}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
List1.propTypes = {
    data: PropTypes.shape({
        list1: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};

export default List1;
