import axios from 'axios';

const API_URL = 'http://localhost:8000/api'

export const registerUser  = async (username, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser  = async (username, password) => {
    return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const createPoll = async (token, pollData) => {
    return await axios.post(`${API_URL}/polls`, pollData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const votePoll = async (pollId, optionIndex) => {
    return await axios.post(`${API_URL}/polls/${pollId}/vote`, { optionIndex });
};

export const getPolls = async () => {
    return await axios.get(`${API_URL}/polls`);
};