import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from '../../Redux/Actions/ComponentTable/SelectEmployee';


const SelectEmployee = () => {

    const dispatch = useDispatch()
    const BudgetReducer = useSelector(state => state.BudgetReducer);

    useEffect(() => {
        if (!BudgetReducer.budgets)
        dispatch(getAllEmployees())
    }, [])

    return (
        <div className="flex-row-start">
            <section className="flex-row-start">
                <label className="control-label">Employé</label>
            </section>
        </div>
    );

}

export default SelectEmployee
