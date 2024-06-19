import {BiText} from "react-icons/bi";
import {IoText} from "react-icons/io5";
import React from "react";
import {AiOutlineUpload, AiTwotoneMail, AiTwotonePhone} from "react-icons/ai";
import {Bs123, BsCalendar3, BsKey} from "react-icons/bs";

const Data = {
    list1: [
        {
            id: "text-1475765723950",
            label: "Short Text",
            type: "text",
            placeholder: "Enter text here",
            maxlength: 100,
            minlength: 3,
            icons:<IoText />,
            pattern: "^[a-zA-Z0-9\\s]*$"

        },
        {
            id: "text-1475765724095",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            maxlength: 50,
            minlength: 5,
            icons:<AiTwotoneMail />,
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        },
        {
            id: "text-1475765724231",
            label: "Phone",
            type: "tel",
            placeholder: "Enter your phone number",
            maxlength: 15,
            minlength: 10,
            icons:<AiTwotonePhone />,
            pattern: "^\\d{10,15}$"
        },
        {
            id: "number-1475765724231",
            label: "Number Area",
            type: "number",
            placeholder: "Enter a number",
            maxlength: 10,
            minlength: 1,
            icons:<Bs123 />,
            pattern: "^\\d+$"
        },
        {
            id: "text-1475765724236",
            label: "Date Field",
            type: "date",
            placeholder: "Select a date",
            maxlength: 20,
            minlength: 5,
            icons:<BsCalendar3 />,
            pattern: "^\\d{4}-\\d{2}-\\d{2}$"
        },
        // {
        //     id: "textarea-1475765724583",
        //     label: "Short Bio",
        //     type: "textarea",
        //     placeholder: "Enter a short bio",
        //     maxlength: 500,
        //     minlength: 10,
        //     icons:<BiText />,
        //     pattern: "^[a-zA-Z0-9\\s,.!?]*$"
        // },
        {
            id: "file-1475766594420",
            label: "Upload File",
            type: "file",
            placeholder: "Upload a screenshot",
            maxlength: 10,
            minlength: 1,
            icons:<AiOutlineUpload />,
            pattern: "^.*$"
        },
        // {
        //     id: "select-1475766623703",
        //     label: "select option",
        //     type: "select",
        //     placeholder: "Select developer",
        //     maxlength: 50,
        //     minlength: 1,
        //     icons:<BiText />,
        //     pattern: "^.*$",
        //     options: [
        //         { label: "option 1", value: "option1" },
        //         { label: "option 2", value: "option2" },
        //
        //     ]
        // },
        {
            id: "textarea-1475766579522",
            label: "Text Area",
            type: "textarea",
            placeholder: "Enter text here",
            maxlength: 500,
            minlength: 10,
            icons:<BiText />,
            pattern: "^[a-zA-Z0-9\\s,.!?]*$"
        },
        {
            id: "password-1475766579522",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            maxlength: 20,
            minlength: 8,
            icons:<BsKey />,
            pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        }
    ],
    list2: []
};
export default Data;
