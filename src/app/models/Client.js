import mongoose from 'mongoose';

const ClientSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    required: true
  },
  birth: {
    type: Date,
    required: false
  },
});

export default mongoose.model('Client', ClientSchema);

