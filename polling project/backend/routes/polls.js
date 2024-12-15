const express = require('express');
const Poll = require('../models/Poll');

module.exports = (io) => {
    const router = express.Router();

    // Create Poll
    router.post('/', async (req, res) => {
        const { question, options } = req.body;
        const poll = new Poll({ question, options });
        await poll.save();
        res.status(201).json(poll);
    });

    // Vote
    router.post('/:pollId/vote', async (req, res) => {
        const { pollId } = req.params;
        const { optionIndex } = req.body;

        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        poll.options[optionIndex].votes += 1;
        await poll.save();

        // Emit the updated poll to all connected clients
        io.emit('pollUpdated', poll);
        res.json(poll);
    });

    // Get Polls
router.get('/', async (req, res) => {
    const polls = await Poll.find();
    res.json(polls);
});

// Get Poll by ID
router.get('/:pollId', async (req, res) => {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    res.json(poll);
});

return router;
};