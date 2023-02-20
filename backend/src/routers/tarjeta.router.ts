import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Tarjeta, TarjetaModel } from "../models/tarjeta.model";

const router = Router();

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { numeroTarjeta, fechaCaducidad, cvv, user } = req.body;

    const newTarjeta: Tarjeta = {
      id: "",
      numeroTarjeta,
      fechaCaducidad,
      cvv,
      user,
    };

    const tarjeta = await TarjetaModel.findOne({ numeroTarjeta, user });
    if (tarjeta) {
      res.status(400).send("Tarjeta ya registrada");
      return;
    }

    const dbTarjeta = await TarjetaModel.create(newTarjeta);

    res.send(dbTarjeta);
  })
);

router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const tarjetas = await TarjetaModel.find({
      "user._id": userId,
    });
    res.send(tarjetas);
  })
);

export default router;
