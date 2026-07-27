import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IOtp extends Document {
  identifier: string;
  otpHash: string;
  deliveryType: 'email' | 'phone';
  metadata?: Record<string, unknown>;
  createdAt: Date;
  matchOtp(enteredOtp: string): Promise<boolean>;
}

const otpSchema: Schema<IOtp> = new Schema(
  {
    identifier: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ['email', 'phone'],
      default: 'email',
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // TTL index: document will automatically delete after 300 seconds (5 minutes)
    },
  },
  {
    timestamps: false,
  }
);

otpSchema.pre<IOtp>('save', async function () {
  if (!this.isModified('otpHash')) return;
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(this.otpHash, salt);
});

otpSchema.methods.matchOtp = async function (enteredOtp: string): Promise<boolean> {
  return await bcrypt.compare(enteredOtp, this.otpHash);
};

export const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', otpSchema);
