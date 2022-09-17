import React from "react";

const EmptyTable = () => (
        <div className="empty">
            <p className="empty-text">Your Table is Empty</p>
            <p className="empty-text">Add Rows To Your Table By Press On 'Add New Row' Button</p>
        </div>

    );

export default React.memo(EmptyTable);