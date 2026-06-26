"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const database_1 = require("../database");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_1.connectToDatabase)();
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava.chen@example.com', fitnessGoal: 'Marathon prep', level: 'Intermediate' },
        { name: 'Noah Patel', email: 'noah.patel@example.com', fitnessGoal: 'Strength gain', level: 'Advanced' },
        { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', fitnessGoal: 'Weight loss', level: 'Beginner' },
    ]);
    await team_1.Team.insertMany([
        {
            name: 'Rocket Runners',
            captain: users[0].name,
            members: users.slice(0, 2).map((user) => user.name),
            focus: 'Endurance',
        },
        {
            name: 'Peak Performers',
            captain: users[2].name,
            members: [users[1].name, users[2].name],
            focus: 'Strength',
        },
    ]);
    await activity_1.Activity.insertMany([
        { user: users[0].name, type: 'Run', durationMinutes: 35, date: new Date('2026-06-20') },
        { user: users[1].name, type: 'Cycling', durationMinutes: 45, date: new Date('2026-06-21') },
        { user: users[2].name, type: 'Yoga', durationMinutes: 30, date: new Date('2026-06-22') },
    ]);
    await leaderboard_1.Leaderboard.insertMany([
        { user: users[0].name, points: 1250, streak: 8 },
        { user: users[1].name, points: 1180, streak: 6 },
        { user: users[2].name, points: 980, streak: 4 },
    ]);
    await workout_1.Workout.insertMany([
        { title: 'HIIT Cardio', category: 'Cardio', durationMinutes: 25, difficulty: 'Intermediate' },
        { title: 'Strength Builder', category: 'Strength', durationMinutes: 40, difficulty: 'Beginner' },
        { title: 'Core Flow', category: 'Mobility', durationMinutes: 20, difficulty: 'Easy' },
    ]);
    console.log('Seeded octofit_db with realistic sample data');
    await mongoose_1.default.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
