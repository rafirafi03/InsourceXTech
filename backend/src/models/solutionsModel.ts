import mongoose, { Document } from 'mongoose';

export interface ISolution extends Document {
  title: string;
  image: string;
}

const solutionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  }
});

const Solution = mongoose.model<ISolution>('Solution', solutionSchema);

export default Solution;