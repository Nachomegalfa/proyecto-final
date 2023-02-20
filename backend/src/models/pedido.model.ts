import { model, Schema } from "mongoose";
import { Direccion, DireccionSchema } from "./direccion.model";
import { PerfumePedido, PerfumePedidoSchema } from "./perfume_pedido.model";
import { Tarjeta, TarjetaSchema } from "./tarjeta.model";
import { User, UserSchema } from "./user.model";

export interface Pedido {
  id: string;
  fecha: Date;
  estado: string;
  user: User;
  tarjeta: Tarjeta;
  direccion: Direccion;
  productos: PerfumePedido[];
  precioTotal: number;
}

export const PedidoSchema = new Schema<Pedido>(
  {
    fecha: { type: Date, default: Date.now(), required: true },
    estado: { type: String, required: true },
    user: { type: UserSchema, required: true },
    tarjeta: { type: TarjetaSchema, required: true },
    direccion: { type: DireccionSchema, required: true },
    productos: [{ type: PerfumePedidoSchema, required: true }],
    precioTotal: { type: Number, required: true },
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

export const PedidoModel = model<Pedido>("pedido", PedidoSchema);
