import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'Todo must have an owner'],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for the Todo!"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;