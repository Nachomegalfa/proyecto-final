import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import perfumeRouter from "./routers/perfume.router";
import userRouter from "./routers/user.router";
import pedidoRouter from "./routers/pedido.router";
import tarjetaRouter from "./routers/tarjeta.router";
import direccionRouter from "./routers/direccion.router";
import { dbConnect } from "./configs/config";
dbConnect();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/perfumes", perfumeRouter);
app.use("/api/users", userRouter);
app.use("/api/pedidos", pedidoRouter);
app.use("/api/tarjetas", tarjetaRouter);
app.use("/api/direcciones", direccionRouter);
const port = 5000;

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
