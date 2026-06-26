"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
const sendResource = (res, resource, data) => {
    res.json({
        resource,
        baseUrl,
        data,
    });
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running', baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    try {
        await (0, database_1.connectToDatabase)();
        const users = await user_1.User.find({}).lean();
        sendResource(res, 'users', users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error });
    }
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    try {
        await (0, database_1.connectToDatabase)();
        const teams = await team_1.Team.find({}).lean();
        sendResource(res, 'teams', teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', details: error });
    }
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    try {
        await (0, database_1.connectToDatabase)();
        const activities = await activity_1.Activity.find({}).lean();
        sendResource(res, 'activities', activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities', details: error });
    }
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    try {
        await (0, database_1.connectToDatabase)();
        const leaderboardEntries = await leaderboard_1.Leaderboard.find({}).lean();
        sendResource(res, 'leaderboard', leaderboardEntries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard', details: error });
    }
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    try {
        await (0, database_1.connectToDatabase)();
        const workouts = await workout_1.Workout.find({}).lean();
        sendResource(res, 'workouts', workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts', details: error });
    }
});
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
