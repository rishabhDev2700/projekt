
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    verificationCode: String,
    verified: { type: Boolean, default: false },
  },
);

export const User = models.User || model("User", UserSchema)