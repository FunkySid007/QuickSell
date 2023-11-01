import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupingSelector from './GroupingSelector';
import SortingSelector from './sortingSelector';
import '../styles/KanbanBoard.css';

import '../styles/Tickets.css';
import TicketCard from './TicketCard';

const KanbanBoard = () => {
    const [ticket, setTicket] = useState([]);
    const [grouping, setGrouping] = useState('status');
    const [ordering, setOrdering] = useState('priority');

    useEffect(() => {
        axios
            .get('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then((response) => {
                setTicket(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const { tickets, users } = ticket;

    const [groupedTickets, setGroupedTickets] = useState({});

    useEffect(() => {
        if (tickets && users) {
            const grouped = tickets.reduce((groups, ticket) => {
                const { status, userId, priority } = ticket;

                if (grouping === 'status') {
                    if (!groups[status]) {
                        groups[status] = [];
                    }
                    groups[status].push(ticket);
                } else if (grouping === 'user') {
                    if (!groups[userId]) {
                        groups[userId] = [];
                    }
                    groups[userId].push(ticket);
                } else if (grouping === 'priority') {
                    if (!groups[priority]) {
                        groups[priority] = [];
                    }
                    groups[priority].push(ticket);
                }

                return groups;
            }, {});

            for (const key in grouped) {
                if (grouping === 'priority') {
                    grouped[key].sort((a, b) => {
                        if (ordering === 'priority') {
                            return a - b;
                        } else if (ordering === 'title') {
                            return a.title.localeCompare(b.title);
                        }
                    });
                } else {
                    grouped[key].sort((a, b) => {
                        if (ordering === 'priority') {
                            return b - a;
                        } else if (ordering === 'title') {
                            return a.title.localeCompare(b.title);
                        }
                    });
                }
            }

            setGroupedTickets(grouped);
        }
    }, [tickets, users, grouping, ordering]);

    const priorityLabels = {
        0: 'No priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent',
    };

    return (
        <div className="kanban-board">
            <div className="controls">
                <GroupingSelector grouping={grouping} onChangeGrouping={setGrouping} />
                <SortingSelector ordering={ordering} onChangeSorting={setOrdering} />
            </div>
            {Object.keys(groupedTickets).map((groupKey) => (
                <div key={groupKey} className={`status-column priority`}>
                    <h2>{grouping === 'priority' ? `${priorityLabels[groupKey]}` : groupKey}</h2>
                   {groupedTickets[groupKey].map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;
