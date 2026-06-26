import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  members: string[];
  focus: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  captain: { type: String, required: true },
  members: [{ type: String, required: true }],
  focus: { type: String, required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
