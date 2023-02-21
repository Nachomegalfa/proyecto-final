import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import perfumeRouter from "./routers/perfume.router";
import userRouter from "./routers/user.router";
import pedidoRouter from "./routers/pedido.router";
import tarjetaRouter from "./routers/tarjeta.router";
import direccionRouter from "./routers/direccion.router";
import { dbConnect } from "./configs/config";
import path from "path";
dotenv.config();
dbConnect();

//Creamos la app de Express
const app = express();

//Asignamos el protocolo JSON al server
app.use(express.json());

//Restringimos el acceso al servidor con CORS
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

//Aquí declaramos todos los controllers que usa la app
app.use("/api/perfumes", perfumeRouter);
app.use("/api/users", userRouter);
app.use("/api/pedidos", pedidoRouter);
app.use("/api/tarjetas", tarjetaRouter);
app.use("/api/direcciones", direccionRouter);

//Hacemos que redirija al index cuando se accede sin ruta
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Asignamos el puerto a utilizar
const port = 5000;
app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
