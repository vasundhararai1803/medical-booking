import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITreatment extends Document {
  title: string;
  slug?: string;
  category: string;
  description?: string;
  benefits?: string[];
  durationMinutes?: number;
  costRange?: {
    min: number;
    max: number;
  };
  isActive: boolean;
}

const treatmentSchema: Schema<ITreatment> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true, // In case it's not always provided
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    benefits: [
      {
        type: String,
      },
    ],
    durationMinutes: {
      type: Number,
    },
    costRange: {
      min: { type: Number },
      max: { type: Number },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Treatment: Model<ITreatment> = mongoose.models.Treatment || mongoose.model<ITreatment>('Treatment', treatmentSchema);
