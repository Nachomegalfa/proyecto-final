import { Schema, model } from "mongoose";

export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: string;
  token: string;
}

export const UserSchema = new Schema<User>(
  {
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    token: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const UserModel = model<User>("user", UserSchema);
