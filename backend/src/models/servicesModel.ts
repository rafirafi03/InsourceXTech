import mongoose, { Document } from 'mongoose';

export interface IServices extends Document {
  title: string;
  description: string;
}

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  }
});

const Service = mongoose.model<IServices>('Service', serviceSchema);

export default Service;