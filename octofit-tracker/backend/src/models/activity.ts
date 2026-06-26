import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  durationMinutes: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
