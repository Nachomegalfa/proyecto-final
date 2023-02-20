import { model, Schema } from "mongoose";

export interface Perfume {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imageUrl: string;
  masculina: boolean;
  stock: number;
}

export const PerfumeSchema = new Schema<Perfume>(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    masculina: { type: Boolean, default: true },
    stock: { type: Number, required: true },
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

export const PerfumeModel = model<Perfume>("perfume", PerfumeSchema);
