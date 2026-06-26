import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: string;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
