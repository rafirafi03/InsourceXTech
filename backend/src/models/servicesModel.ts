import mongoose, { Document } from 'mongoose';

// Interface for Subservice
export interface ISubService {
  title: string;
  description: string;
  image?: string;
}

// Updated Service interface
export interface IServices extends Document {
  title: string;
  image: string;
  content: string;
  subservices?: ISubService[];
}

// Subservice schema
const subServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
}, { _id: true }); // Enable _id for subservices

// Updated service schema
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  subservices: {
    type: [subServiceSchema],
    default: []
  }
}, {
  timestamps: true // Add createdAt and updatedAt
});

const Service = mongoose.model<IServices>('Service', serviceSchema);

export default Service;