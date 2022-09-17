import React, { useState } from "react";
import { RowDataModel } from "../models/row-data.model";

type Props = {
    rowData: RowDataModel,
    index: number,
    deleteRow: any,
    handleChange: any,
    toggleRowState: any,
    changeCalculationType: any,
  }


function RowInput({ rowData, index, deleteRow, handleChange, toggleRowState, changeCalculationType } : Props) {
    const [rowState, setRowState] = useState(true);

    const toggleState = () => {
        setRowState(!rowState);
        toggleRowState(!rowState, index)
    }

    return (
        <div className="flex-view">
            <select className="input" disabled={!rowData.enabled} value={rowData.calculationType} onChange={(ev) => changeCalculationType(ev, index)}>
                <option value="add">+</option>
                <option value="subtract">-</option>
            </select>

            <input className="input text-input" autoFocus value={rowData.inputValue} type="number" disabled={!rowData.enabled} name="name" placeholder="0" onChange={(ev) => handleChange(ev, index)} />

            <button onClick={() => deleteRow(index)} className="btn delete">Delete</button>

            <button onClick={toggleState} className={`btn ${rowData.enabled ? 'enabled' : 'disabled'}`}>{rowState === true ? 'Disable' : 'Enable'}</button>
        </div>

    );

}

export default React.memo(RowInput);