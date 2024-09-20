// src/models/Ladder.ts

import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Ladder document
interface ILadder extends Document {
  fighter: string;
  wins: number;
  loses: number;
}

// Define the schema for Ladder
const LadderSchema: Schema = new Schema({
  fighter: { type: String, required: true, unique: true, index: true }, // Ensure each fighter is unique
  wins: { type: Number, required: true, default: 0, index: true },
  loses: { type: Number, required: true, default: 0 },
}, { collection: 'ladder' });

// Export the model
export default mongoose.model<ILadder>("Ladder", LadderSchema);
