import express from 'express';
import { auth } from '../Middleware/Auth.js';
import { client } from '../index.js';

const router = express.Router();

router.get("/users", auth, async (req, res) => {
    try {

        const { page = 1, limit = 10, sort = 'username', order = 'asc' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const sortOrder = order === 'desc' ? -1 : 1;

        const sortOptions = { [sort]: sortOrder };

        const users = await client.db('RaftLabs').collection('Users')
            .find()
            .sort(sortOptions)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .toArray();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

export const UserPage = router;
