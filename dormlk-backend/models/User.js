// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true, index: true },
    userType: { type: String, enum: ["REGULAR", "ADMIN"], default: "REGULAR" },
    password: {
      type: String,
      select: false,
      required: function () {
        return this.provider === "LOCAL";
      },
    },
    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      default: "LOCAL",
    },
    google: {
      id: { type: String, index: true },
    },
    avatar: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
