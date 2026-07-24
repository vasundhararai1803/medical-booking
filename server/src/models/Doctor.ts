import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IDoctor extends Document {
  userId: Types.ObjectId;
  specializations?: string[];
  qualifications?: string[];
  bio?: string;
  experience?: string;
  registration?: string;
  consultationFee?: number;
  rating?: number;
  clinicDetails?: {
    name: string;
    address: string;
    timings: string;
  };
  education?: string[];
  experienceHistory?: string[];
  memberships?: string[];
  workingHours?: {
    start: string;
    end: string;
    days: string[];
  };
}

const doctorSchema: Schema<IDoctor> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specializations: [
      {
        type: String,
      },
    ],
    qualifications: [
      {
        type: String,
      },
    ],
    bio: {
      type: String,
    },
    experience: {
      type: String,
    },
    registration: {
      type: String,
    },
    consultationFee: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    clinicDetails: {
      name: { type: String },
      address: { type: String },
      timings: { type: String },
    },
    education: [{ type: String }],
    experienceHistory: [{ type: String }],
    memberships: [{ type: String }],
    workingHours: {
      start: { type: String },
      end: { type: String },
      days: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', doctorSchema);
