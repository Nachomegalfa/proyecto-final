import { Schema, model } from "mongoose";
import { User, UserSchema } from "./user.model";

export interface Tarjeta {
  id: string;
  numeroTarjeta: string;
  fechaCaducidad: string;
  cvv: number;
  user: User;
}

export const TarjetaSchema = new Schema<Tarjeta>(
  {
    numeroTarjeta: { type: String, required: true },
    fechaCaducidad: { type: String, required: true },
    cvv: { type: Number, required: true },
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

export const TarjetaModel = model<Tarjeta>("tarjeta", TarjetaSchema);
