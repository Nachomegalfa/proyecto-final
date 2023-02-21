import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Tarjeta, TarjetaModel } from "../models/tarjeta.model";

const router = Router();

//Método para registrar nuevas tarjetas
router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    //Recogemos los datos necesarios
    const { numeroTarjeta, fechaCaducidad, cvv, user } = req.body;

    //Creamos el objeto Tarjeta para registrarla
    const newTarjeta: Tarjeta = {
      id: "",
      numeroTarjeta,
      fechaCaducidad,
      cvv,
      user,
    };

    //Buscamos la tarjeta para comprobar si el usuario tiene registrada esa tarjeta
    const tarjeta = await TarjetaModel.findOne({ numeroTarjeta, user });

    //Si existe la tarjeta, devolvemos un error en la respuesta
    if (tarjeta) {
      res.status(400).send("Tarjeta ya registrada");
      return;
    }

    //Registramos la tarjeta en la BBDD
    const dbTarjeta = await TarjetaModel.create(newTarjeta);

    //Devolvemos la tarjeta registrada en la respuesta
    res.send(dbTarjeta);
  })
);

//Método para buscar la tarjetas de un usuario
router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;

    //Buscamos las tarjetas filtrando por el id del usuario
    const tarjetas = await TarjetaModel.find({
      "user._id": userId,
    });

    //Devolvemos las tarjetas en la respuesta
    res.send(tarjetas);
  })
);

export default router;
