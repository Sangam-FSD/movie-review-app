import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const userModel = mongoose.model("user", userSchema);

const tokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "user" },
  token: { type: String, required: true },
  created_at: { type: Date, defult: Date.now },
});

export const tokenModel = mongoose.model("token", tokenSchema);
