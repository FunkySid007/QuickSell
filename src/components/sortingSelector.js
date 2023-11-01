import React from 'react';

const SortingSelector = ({ ordering, onChangeSorting }) => {
    return (
        <label>
            Sort by:
            <select value={ordering} onChange={(e) => onChangeSorting(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </label>
    );
}

export default SortingSelector;
