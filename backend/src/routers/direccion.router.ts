import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Direccion, DireccionModel } from "../models/direccion.model";

const router = Router();

//Metodo para registrar una dirección nueva
router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    //Recogemos los datos necesarios
    const { calle, numero, piso, letra, codigoPostal, localidad, user } =
      req.body;

    //Creamos el objeto Direccion para registarla
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

    //Comprobamos si la dirección recibida está ya registrada
    const direccion = await DireccionModel.findOne({
      calle,
      numero,
      piso,
      letra,
      codigoPostal,
      localidad,
      user,
    });

    //Si está registrada devolvemos error
    if (direccion) {
      res.status(400).send("Direccion ya registrada");
      return;
    }

    //Si no está registrada, la registramos y la devolvemos en la respuesta
    const dbDireccion = await DireccionModel.create(newDireccion);

    //Enviamos la dirección registrada en la respuesta
    res.send(dbDireccion);
  })
);

//Método para recoger las direcciones de un usuario
router.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;

    //Buscamos las direcciones filtrando por el id del usuario
    const direcciones = await DireccionModel.find({
      "user._id": userId,
    });

    //Devolvemos la lista de direcciones en la respuesta
    res.send(direcciones);
  })
);

export default router;
