import React from 'react';


const SelectEquipe = () => {


    //
    // useEffect(() => {
    //     if (!EquipeReducer.budgets)
    //         dispatch(getAllEquipes())
    // }, [])



    return (
        <div className="flex-row-start">
            <section className="flex-row-start">
                <label className="control-label">Equipe</label>
                <div className={'SelectCsys '} id="filtreByBudget" name="filtreByBudget">

                </div>
            </section>
        </div>
    );

}

export default SelectEquipe
