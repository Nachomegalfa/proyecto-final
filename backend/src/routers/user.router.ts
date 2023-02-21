import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
const router = Router();

//Método para poblar la BBDD de usuarios
router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed is Done!");
  })
);

//Método para iniciar sesión
router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //Recogemos los datos necesarios
    const { email, password } = req.body;

    //Hasheamos la password para poder comprobarla en la BBDD
    const guess = await bcrypt.hash(password, 10);

    //Buscamos el usuario con ese email y password
    const user = await UserModel.findOne({ email, guess });

    if (user) {
      //Si existe, llamamos al método para generar un token de sesión
      res.send(generateTokenResponse(user));
    } else {
      //Si no existe, devolvermos un error en la respuesta
      res.status(400).send("Email o password incorrectos");
    }
  })
);

//Método para registrar un usuario
router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    //Recogemos los datos necesarios
    const { nombre, apellidos, email, password, fechaNacimiento } = req.body;

    //Comprobamos si el usuario ya está registrado
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send("Email ya registrado");
      return;
    }

    //Encriptamos la password introducida
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Creamos el objeto User para registrarlo
    const newUser: User = {
      id: "",
      nombre,
      apellidos,
      email: email.toLowerCase(),
      password: encryptedPassword,
      fechaNacimiento,
      token: "",
    };

    //Creamos el usuario dentro de la BBDD
    const dbUser = await UserModel.create(newUser);

    //Llamamos al método para generar un token de sesión
    res.send(generateTokenResponse(dbUser));
  })
);

//Método para generar un token de sesión
const generateTokenResponse = (user: any) => {
  //Pásamos el email al que está asignado el token y le damos 30 días para caducar
  const token = jwt.sign(
    {
      email: user.email,
    },
    "RandomText",
    {
      expiresIn: "30d",
    }
  );

  //Asignamos el token al usuario
  user.token = token;

  //Devolvemos el usuario con el token
  return user;
};

export default router;
