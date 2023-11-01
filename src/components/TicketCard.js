import React from 'react';
import '../styles/TicketCard.css';

const TicketCard = ({ ticket }) => {
    const priorityLabels = {
        0: 'No priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent',
    };

    return (
        <div className={`ticket-card `}>
            <div className="card-title">{ticket.title}</div>
            <div className="card-user">{ticket.userName}</div>
            <div className={`card-priority priority-${ticket.priority}`}>{priorityLabels[ticket.priority]}</div>
            <div className="card-status">... {ticket.tag}</div>

        </div>
    );
};

export default TicketCard;

