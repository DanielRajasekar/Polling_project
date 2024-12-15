import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <h1>Real-Time Polling Application</h1>
                    <Routes>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/create-poll" component={CreatePoll} />
                        <Route path="/" component={PollList} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;