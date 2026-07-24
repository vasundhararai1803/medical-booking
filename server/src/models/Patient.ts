import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalHistory?: {
    allergies: string[];
    chronicConditions: string[];
    pastSurgeries: string[];
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
}

const patientSchema: Schema<IPatient> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      relation: { type: String, trim: true },
    },
    medicalHistory: {
      allergies: { type: [String], default: [] },
      chronicConditions: { type: [String], default: [] },
      pastSurgeries: { type: [String], default: [] },
    },
    insuranceInfo: {
      provider: { type: String, trim: true },
      policyNumber: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Patient: Model<IPatient> = mongoose.models.Patient || mongoose.model<IPatient>('Patient', patientSchema);
