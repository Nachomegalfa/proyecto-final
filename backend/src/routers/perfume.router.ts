import { Router } from "express";
import { sample_perfumes } from "../data";
import expressAsyncHandler from "express-async-handler";
import { PerfumeModel } from "../models/perfume.model";
const router = Router();

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

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const perfumes = await PerfumeModel.find();
    res.send(perfumes);
  })
);

router.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    const searchTerm = new RegExp(req.params.searchTerm, "i");
    const perfumes = await PerfumeModel.find({
      nombre: { $regex: searchTerm },
    });
    res.send(perfumes);
  })
);

router.get(
  "/:perfumeId",
  expressAsyncHandler(async (req, res) => {
    const perfumeId = req.params.perfumeId;
    const perfumes = await PerfumeModel.findById(perfumeId);
    res.send(perfumes);
  })
);

router.post(
  "/update/:perfumeId",
  expressAsyncHandler(async (req, res) => {
    const perfumeUpdate = await PerfumeModel.findById(req.params.perfumeId);
    const nuevoStock = perfumeUpdate?.stock
      ? perfumeUpdate?.stock - req.body.cantidad
      : 10;
    const filter = { _id: req.params.perfumeId };
    const update = { stock: nuevoStock };

    let perfume = await PerfumeModel.findOneAndUpdate(filter, update);
    perfume = await PerfumeModel.findById(req.params.perfumeId);
    res.send(perfume);
  })
);

export default router;
