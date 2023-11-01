import React from 'react';

const GroupingSelector = ({ grouping, onChangeGrouping }) => {
    return (
        <label>
            Group by:
            <select value={grouping} onChange={(e) => onChangeGrouping(e.target.value)}>
                <option value="user">User</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
            </select>
        </label>
    );
}

export default GroupingSelector;
