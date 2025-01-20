import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Work", "Personal"], required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
  selected: { type: Boolean, default: false },
  clerkUserId: { type: String, required: true }, 
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;