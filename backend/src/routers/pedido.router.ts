import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Pedido, PedidoModel } from "../models/pedido.model";

const router = Router();

//Método para buscar los pedidos por el id
router.get(
  "/search/:id",
  expressAsyncHandler(async (req, res) => {
    const pedidoId = req.params.id;

    //Buscamos el pedido por el id pasado por parámetro
    const pedido = await PedidoModel.findById(pedidoId);

    //Devolvemos el pedido en la respuesta
    res.send(pedido);
  })
);

//Método para buscar los pedidos por el id del usuario
router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;

    //Filtramos los pedidos por el id del usuario
    const pedidos = await PedidoModel.find({
      "user._id": userId,
    });

    //Devolvemos los pedidos en la respuesta
    res.send(pedidos);
  })
);

//Método para registrar un pedido
router.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    //Recogemos los datos necesarios
    const { fecha, estado, user, tarjeta, direccion, productos, precioTotal } =
      req.body;

    //Creeamos el objeto Pedido para registrarlo
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

    //Registramos el pedido en la BBDD
    const dbPedido = await PedidoModel.create(newPedido);

    //Enviamos el pedido registrado en la respuesta
    res.send(dbPedido);
  })
);

//Método para eliminar un pedido mediante el id
router.delete(
  "/delete/:pedidoId",
  expressAsyncHandler(async (req, res) => {
    const pedidoId = req.params.pedidoId;

    //Eliminamos el pedido de la BBDD
    const pedido = await PedidoModel.findByIdAndDelete(pedidoId);

    //Enviamos el pedido eliminado en la respuesta
    res.send(pedido);
  })
);

export default router;
