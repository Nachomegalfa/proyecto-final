import { Router } from "express";
import { sample_perfumes } from "../data";
import expressAsyncHandler from "express-async-handler";
import { PerfumeModel } from "../models/perfume.model";
const router = Router();

//Método para poblar la bbdd
router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const perfumesCount = await PerfumeModel.countDocuments();
    if (perfumesCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await PerfumeModel.create(sample_perfumes);
    res.send("Seed is Done!");
  })
);

//Método para devolver todos los perfumes
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    //Buscamos todos los perfumes de la BBDD
    const perfumes = await PerfumeModel.find();

    //Enviamos los perfumes en la respuesta
    res.send(perfumes);
  })
);

//Método para devolver los perfumes según la búsqueda del cliente
router.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    //Recogemos el término de búsqueda y lo pasamos a minúsculas
    const searchTerm = new RegExp(req.params.searchTerm, "i");

    //Buscamos los perfumes mediante el filtro
    const perfumes = await PerfumeModel.find({
      nombre: { $regex: searchTerm },
    });

    //Devolvemos los perfumes según el filtro en la respuesta
    res.send(perfumes);
  })
);

//Método para devolver los perfumes según su id
router.get(
  "/:perfumeId",
  expressAsyncHandler(async (req, res) => {
    const perfumeId = req.params.perfumeId;

    //Buscamos los perfumes por id de la BBDD
    const perfumes = await PerfumeModel.findById(perfumeId);

    //Devolvemos los perfumes según el id en la respuesta
    res.send(perfumes);
  })
);

//Método para actualizar el stock de los perfumes
router.post(
  "/update/:perfumeId",
  expressAsyncHandler(async (req, res) => {
    //Buscamos el perfume que queremos actualizar
    const perfumeUpdate = await PerfumeModel.findById(req.params.perfumeId);

    //Actualizamos el stock
    const nuevoStock = perfumeUpdate?.stock
      ? perfumeUpdate?.stock - req.body.cantidad
      : 10;
    const filter = { _id: req.params.perfumeId };
    const update = { stock: nuevoStock };

    //Actualizamos el perfume en la BBDD
    let perfume = await PerfumeModel.findOneAndUpdate(filter, update);
    perfume = await PerfumeModel.findById(req.params.perfumeId);

    //Devolvemos el perfume actualizado en la respuesta
    res.send(perfume);
  })
);

export default router;
