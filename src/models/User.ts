import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
