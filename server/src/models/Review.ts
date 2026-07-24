import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IReview extends Document {
  patientName: string;
  date: string;
  rating: number;
  comment: string;
  googleReviewUrl: string;
}

const reviewSchema: Schema<IReview> = new Schema(
  {
    patientName: { type: String, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    comment: { type: String, required: true },
    googleReviewUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
