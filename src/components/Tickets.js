import React from 'react';
import '../styles/Tickets.css'

const Ticket = ({ ticket }) => {
    const priorityLabels = {
        0: 'No priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent',
    };
    return (
        <div className="ticket">
            <div className="title">{ticket.id}</div>
            <div className="user">{ticket.title}</div>
            <div className='user'>
                {ticket.tag}
            </div>
            <div className={`priority priority-${ticket.priority}`}>
                Priority: {priorityLabels[ticket.priority]}
            </div>
        </div>
    );
};

export default Ticket;
