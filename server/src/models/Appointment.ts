import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  treatmentId: Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  type: 'in-person' | 'video';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  transactionId?: string;
  medicalReportUrl?: string;
  videoConsultUrl?: string;
  notes?: string;
  createdAt: Date;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Treatment',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['in-person', 'video'],
      default: 'in-person',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    medicalReportUrl: {
      type: String,
    },
    videoConsultUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);
