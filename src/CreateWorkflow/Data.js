import {FaDeleteLeft} from "react-icons/fa6";
import React from "react";
import {IoText} from "react-icons/io5";
import {FcApprove, FcDisapprove, FcHighPriority, FcLowPriority} from "react-icons/fc";

const Data = {
    list1: [
    {
        id: "text-1475765723950",
        label:  "Workflow Start",
        role:"Start",
        icons:<FcLowPriority />,

    },
    {
        id: "text-1475765724095",
        label: "Validation RRH",
        role:"Validation",
        icons:<FcApprove />,

    },
    {
        id: "text-1475765724231",
        label: "Validation Chef",
        role:"Validation",
        icons:<FcApprove />,

    },
        {
            id: "text-147576572423155",
            label: "Sans Validation",
            role:"Validation",
            icons:<FcDisapprove />,

        },
    {
        id: "text-14757657242366",
        label: "End workflow",
        role:"End",
        icons:<FcHighPriority />,

    },
    ],
    list2: []
};
export default Data;
