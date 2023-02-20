import { Schema, model } from "mongoose";
import { User, UserSchema } from "./user.model";

export interface Direccion {
  id: string;
  calle: string;
  numero: number;
  piso: number;
  letra: string;
  codigoPostal: string;
  localidad: string;
  user: User;
}

export const DireccionSchema = new Schema<Direccion>(
  {
    calle: { type: String, required: true },
    numero: { type: Number, required: true },
    piso: { type: Number, required: true },
    letra: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    localidad: { type: String, required: true },
    user: { type: UserSchema, required: true },
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

export const DireccionModel = model<Direccion>("direccion", DireccionSchema);
