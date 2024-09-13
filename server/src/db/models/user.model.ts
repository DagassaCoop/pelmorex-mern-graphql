import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["free", "paid"], default: "free", require: true },
  createdAt: { type: Date }
});

export default model("User", userSchema);
