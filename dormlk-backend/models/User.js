import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  userType: { type: String, enum: ["REGULAR", "ADMIN"], default: "REGULAR" },
  password: { type: String, select: false },
  provider: { type: String, enum: ["LOCAL", "GOOGLE"], default: "LOCAL" },
  google: {
    id: String,
    refreshToken: String,
    accessToken: String,
    tokenExpiry: Number
  }
});

export default mongoose.model("User", UserSchema);