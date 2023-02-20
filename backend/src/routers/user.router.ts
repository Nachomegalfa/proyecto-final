import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
const router = Router();

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

router.post(
  "/update",
  expressAsyncHandler(async (req, res) => {
    console.log("entro aqui");
    const { id, direcciones, tarjetas } = req.body;
    let response = await UserModel.updateOne(
      { direcciones, tarjetas },
      {
        where: {
          id,
        },
      }
    );
    console.log(response);
    res.send(response);
  })
);

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const guess = await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({ email, guess });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(400).send("Email o password incorrectos");
    }
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { nombre, apellidos, email, password, fechaNacimiento } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send("Email ya registrado");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      nombre,
      apellidos,
      email: email.toLowerCase(),
      password: encryptedPassword,
      fechaNacimiento,
      token: "",
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    "RandomText",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;

  return user;
};

export default router;
