import express, { type Request, type Response } from 'express';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowOrigin = (origin: string | undefined) => {
  if (!origin) {
    return false;
  }

  return origin.startsWith('http://localhost:')
    || origin.startsWith('http://127.0.0.1:')
    || origin.includes('.app.github.dev');
};

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (typeof origin === 'string' && allowOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

const sendResource = (res: Response, resource: string, data: unknown[]) => {
  res.json({
    resource,
    baseUrl,
    data,
  });
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running', baseUrl });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const users = await User.find({}).lean();
    sendResource(res, 'users', users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const teams = await Team.find({}).lean();
    sendResource(res, 'teams', teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams', details: error });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const activities = await Activity.find({}).lean();
    sendResource(res, 'activities', activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: error });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const leaderboardEntries = await Leaderboard.find({}).lean();
    sendResource(res, 'leaderboard', leaderboardEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: error });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const workouts = await Workout.find({}).lean();
    sendResource(res, 'workouts', workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
