import React, { useState } from 'react';
import { createPoll } from '../services/api';

const CreatePoll = ({ token }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pollData = { question, options: options.map(option => ({ option, votes: 0 })) };
        await createPoll(token, pollData);
        alert('Poll created successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Poll Question" onChange={(e) => setQuestion(e.target.value)} />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                />
            ))}
            <button type="button" onClick={addOption}>Add Option</button>
            <button type="submit">Create Poll</button>
        </form>
    );
};

export default CreatePoll;