import mongoose, { Document } from 'mongoose';

export interface IWhyUs extends Document {
  title: string;
  description: string;
}

const whyUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  }
});

const WhyUs = mongoose.model<IWhyUs>('whyUs', whyUsSchema);

export default WhyUs;