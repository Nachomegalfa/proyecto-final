import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Direccion, DireccionModel } from "../models/direccion.model";

const router = Router();

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { calle, numero, piso, letra, codigoPostal, localidad, user } =
      req.body;

    const newDireccion: Direccion = {
      id: "",
      calle,
      numero,
      piso,
      letra,
      codigoPostal,
      localidad,
      user,
    };
    const direccion = await DireccionModel.findOne({
      calle,
      numero,
      piso,
      letra,
      codigoPostal,
      localidad,
      user,
    });
    if (direccion) {
      res.status(400).send("Direccion ya registrada");
      return;
    }
    const dbDireccion = await DireccionModel.create(newDireccion);

    res.send(dbDireccion);
  })
);

router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const direcciones = await DireccionModel.find({
      "user._id": userId,
    });
    res.send(direcciones);
  })
);

export default router;
