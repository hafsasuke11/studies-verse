const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const registerUser = require('./myFiles/register-user.js');
const loginUser = require('./myFiles/login-user.js');
const getProfile = require('./myFiles/get-profile.js');
const subjectRoutes = require('./myFiles/subject.js');

const verifyToken = require('./middleware/verifyToken');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.get('/api/profile', verifyToken, getProfile);
app.get('/api/subjects', verifyToken, subjectRoutes.getSubjects);
app.get('/api/notes', verifyToken, subjectRoutes.getNotes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Studies Verse API Server',
        status: 'running',
        endpoints: {
            health: '/api/health',
            register: 'POST /api/register',
            login: 'POST /api/login',
            profile: 'GET /api/profile',
            subjects: 'GET /api/subjects',
            notes: 'GET /api/notes'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.path}`,
        availableEndpoints: {
            root: 'GET /',
            health: 'GET /api/health',
            register: 'POST /api/register',
            login: 'POST /api/login',
            profile: 'GET /api/profile',
            subjects: 'GET /api/subjects',
            notes: 'GET /api/notes'
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});