import React, { useEffect, useState } from 'react';
import { getPolls, votePoll } from '../services/api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/api');

const PollList = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            const response = await getPolls();
            setPolls(response.data);
        };

        fetchPolls();

        socket.on('pollUpdated', (updatedPoll) => {
            setPolls((prevPolls) => {
                return prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll));
            });
        });

        return () => {
            socket.off('pollUpdated');
        };
    }, []);

    const handleVote = async (pollId, optionIndex) => {
        await votePoll(pollId, optionIndex);
    };

    return (
        <div>
            <h2>Polls</h2>
            {polls.map((poll) => (
                <div key={poll._id}>
                    <h3>{poll.question}</h3>
                    {poll.options.map((option, index) => (
                        <div key={index}>
                            <button onClick={() => handleVote(poll._id, index)}>{option.option}</button>
                            <span> Votes: {option.votes}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PollList;