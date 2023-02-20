import { model, Schema } from "mongoose";
import { PedidoSchema } from "./pedido.model";
import { Perfume, PerfumeSchema } from "./perfume.model";

export interface PerfumePedido {
  id: string;
  perfume: Perfume;
  cantidad: number;
  precio: number;
}

export const PerfumePedidoSchema = new Schema<PerfumePedido>(
  {
    perfume: { type: PerfumeSchema, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
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

export const PerfumePedidoModel = model<PerfumePedido>(
  "perfume_pedido",
  PerfumePedidoSchema
);
