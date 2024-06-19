import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Item.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';

const Item = ({ item, handleDeleteItem, index, handleUpdateItem }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedItem, setEditedItem] = useState(item);
    const [selectOptions, setSelectOptions] = useState(item.options);


    useEffect(() => {
        setEditedItem(item);
    }, [item]);

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

    const addOption = () => {
        const newOption = { label: '', value: '' };
        setSelectOptions([...selectOptions, newOption]);
    };

    const removeOption = (index) => {
        const updatedOptions = [...selectOptions];
        updatedOptions.splice(index, 1);
        setSelectOptions(updatedOptions);
    };

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...selectOptions];
        updatedOptions[index][field] = value;
        setSelectOptions(updatedOptions);
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
                            <label>Placeholder:</label>
                            <input
                                type="text"
                                name="placeholder"
                                value={editedItem.placeholder}
                                onChange={handleInputChange}
                                className="form-control1"
                            />
                            {/*<label>Type:</label>*/}
                            {/*<select*/}
                            {/*    name="type"*/}
                            {/*    value={editedItem.type}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*    className="form-control1"*/}
                            {/*>*/}
                            {/*    {inputTypes.map(type => (*/}
                            {/*        <option key={type.idTypeTicket} value={type.idTypeTicket}>*/}
                            {/*            {type.typeTicket}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</select>*/}
                            <label>Min Length:</label>
                            <input
                                type="number"
                                name="minlength"
                                value={editedItem.minlength}
                                onChange={handleInputChange}
                                className="form-control1"
                            />
                            <label>Max Length:</label>
                            <input
                                type="number"
                                name="maxlength"
                                value={editedItem.maxlength}
                                onChange={handleInputChange}
                                className="form-control1"
                            />
                            {/*<label>Pattern:</label>*/}
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    name="pattern"*/}
                            {/*    value={editedItem.pattern}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*    className="form-control1"*/}
                            {/*/>*/}
                            <button className={"ni ni-check-bold apply"} onClick={handleSaveChanges}>Save</button>
                            <button className={"ni ni-fat-remove cancel"} onClick={handleCancelChanges}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <label>{editedItem.label} :</label>
                            {editedItem.type === "textarea" ? (
                                <textarea
                                    placeholder={editedItem.placeholder}
                                    className="form-control1"
                                    maxLength={editedItem.maxlength}
                                    minLength={editedItem.minlength}
                                    pattern={editedItem.pattern}
                                ></textarea>
                            ) : editedItem.type === "select" ? (
                                <>
                                    <select
                                        value={editedItem.label}
                                        className="form-control1"
                                    >
                                        {selectOptions.map((option, index) => (
                                            <option key={index} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={addOption}>Add Option</button>
                                    {selectOptions.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={option.label}
                                                onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                value={option.value}
                                                onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                                            />
                                            <button onClick={() => removeOption(index)}>Remove Option</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <input
                                    type={item.type}
                                    placeholder={editedItem.placeholder}
                                    value={""}
                                    className="form-control1"
                                    maxLength={editedItem.maxlength}
                                    minLength={editedItem.minlength}
                                    pattern={item.pattern}
                                    readOnly
                                />
                            )}
                            <button
                                className="delete-button "
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                <FaDeleteLeft />
                            </button>
                            <button className="edit-button"
                                    type="button"
                                    onClick={handleEditButtonClick}>
                                <FaEdit />
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

