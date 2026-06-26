"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
app.get(['/api/users', '/api/users/'], (_req, res) => {
    sendResource(res, 'users', [
        { id: 1, name: 'Ava', email: 'ava@example.com' },
        { id: 2, name: 'Noah', email: 'noah@example.com' },
    ]);
});
app.get(['/api/teams', '/api/teams/'], (_req, res) => {
    sendResource(res, 'teams', [
        { id: 1, name: 'Rocket Runners', members: 5 },
        { id: 2, name: 'Peak Performers', members: 4 },
    ]);
});
app.get(['/api/activities', '/api/activities/'], (_req, res) => {
    sendResource(res, 'activities', [
        { id: 1, type: 'Run', duration: '30m' },
        { id: 2, type: 'Cycling', duration: '45m' },
    ]);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
    sendResource(res, 'leaderboard', [
        { rank: 1, name: 'Ava', points: 1200 },
        { rank: 2, name: 'Noah', points: 1100 },
    ]);
});
app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
    sendResource(res, 'workouts', [
        { id: 1, title: 'HIIT Cardio', difficulty: 'Intermediate' },
        { id: 2, title: 'Strength Builder', difficulty: 'Beginner' },
    ]);
});
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
