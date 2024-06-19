import React, {  useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Item.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';

const Item = ({ item, handleDeleteItem, index, handleUpdateItem }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedItem, setEditedItem] = useState(item);





    const handleEditButtonClick = () => {
        setEditMode(!editMode);
    };

    const handleCancelChanges = () => {
        // Revert back to the original item state
        setEditedItem(item);
        setEditMode(false);
    };

    const handleSaveChanges = () => {
        // Handle saving changes locally or send the updated item to the parent component
        setEditMode(false);
        handleUpdateItem(editedItem); // Update the item in the parent component
        console.log("Edited Item:", editedItem);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type' && value === 'select') {
            // If the type is changed to select, initialize an empty options array
            setEditedItem((prevState) => ({
                ...prevState,
                [name]: value,
                options: []
            }));
        } else {
            // Otherwise, update the edited item as usual
            setEditedItem((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };




    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    className="item-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {editMode ? (
                        <div>
                            <label>Label:</label>
                            <input
                                type="text"
                                name="label"
                                value={editedItem.label}
                                onChange={handleInputChange}
                                className="form-control1"
                            />

                            <button className={"ni ni-check-bold apply"} onClick={handleSaveChanges}>Save</button>
                            <button className={"ni ni-fat-remove cancel"} onClick={handleCancelChanges}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <center>
                            <label>{editedItem.icons}{" "}{editedItem.label} </label>
                            </center>
                            <button
                                className="delete-button "
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                <FaDeleteLeft />
                            </button>

                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};
Item.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    handleUpdateItem: PropTypes.func.isRequired
};

export default Item;

