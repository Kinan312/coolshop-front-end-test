
import React, { useState } from "react";
import EmptyTable from "../components/EmptyTable";
import RowInput from "../components/Row";
import { RowDataModel } from "../models/row-data.model";

const DataTable = () => {
    // state for store list of rows data that show on the screen 
    const [rowsData, setRowsData] = useState<RowDataModel[]>([]);

    // state for store the result that calculated 
    const [result, setResult] = useState<number>(0);


    // function that add new row to the screen
    const addNewRow = () => {
        const rowsInput : RowDataModel = {
            inputValue: '',
            calculationType: 'add',
            enabled: true
        }
        setRowsData([...rowsData, rowsInput]);
    };

    /* we need function to check result how become on every change on any of input parameters like (assignment, input value, enabled/disabled)
       - the result will be affected by only enabled inputs
       - after check all inputs we should refresh the result 
    */
    const calculationResult = (rows: RowDataModel[]) => {
        let result = 0;
        rows.map((item) => {
            if (item.enabled) {
                result = item.calculationType === 'add' ? result + Number(item.inputValue) : result - Number(item.inputValue);
            }
            return result;
        })
        setRowsData(rows);
        setResult(result);
    };

    // the function that deletes the inputs
    const deleteRow = (index: number) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        calculationResult(rows);
    };

    // the function which processes toggle state for inputs that will affect the result 
    const toggleRowState = (state: boolean, index: number) => {
        const rows = [...rowsData];
        rows[index].enabled = state;
        calculationResult(rows);
    };

    // the function processes the calculation type if the sign is (+) or (-) then call 'calculationResult' function
    const changeCalculationType = (ev: any, index: number) => {
        const rowsInput = [...rowsData];
        rowsInput[index].calculationType = ev.target.value;
        calculationResult(rowsData);

    }
    
    const handleChange = (ev: any, index: number) => {
        const { value } = ev.target;
        const rowsInput = [...rowsData];
        rowsInput[index].inputValue = value;
        calculationResult(rowsInput);

    };

    return (
        <div className="container">
            <button onClick={addNewRow} className="add btn">Add New Row</button>
            {rowsData.length > 0 ? <>
                <div className="row">
                    {rowsData?.map((element, index) => (
                        <RowInput key={index} rowData={element} handleChange={handleChange} index={index} deleteRow={deleteRow} toggleRowState={toggleRowState} changeCalculationType={changeCalculationType} />
                    ))}
                </div>
                <p className="result-text">The Result is : {result}</p>
            </> : <EmptyTable />}
        </div>

    );
}

export default React.memo(DataTable);