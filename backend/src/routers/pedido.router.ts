import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Pedido, PedidoModel } from "../models/pedido.model";
import { UserModel } from "../models/user.model";

const router = Router();

router.get(
  "/search/:id",
  expressAsyncHandler(async (req, res) => {
    const pedidoId = req.params.id;
    const pedidos = await PedidoModel.findById(pedidoId);
    res.send(pedidos);
  })
);

router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const pedidos = await PedidoModel.find({
      "user._id": userId,
    });

    res.send(pedidos);
  })
);

router.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const { fecha, estado, user, tarjeta, direccion, productos, precioTotal } =
      req.body;
    const newPedido: Pedido = {
      id: "",
      fecha: fecha,
      estado: estado,
      user: user,
      tarjeta: tarjeta,
      direccion: direccion,
      productos: productos,
      precioTotal: precioTotal,
    };
    const dbPedido = await PedidoModel.create(newPedido);
    res.send(dbPedido);
  })
);

router.delete(
  "/delete/:pedidoId",
  expressAsyncHandler(async (req, res) => {
    const pedidoId = req.params.pedidoId;
    const pedido = await PedidoModel.findByIdAndDelete(pedidoId);
    res.send(pedido);
  })
);

export default router;
