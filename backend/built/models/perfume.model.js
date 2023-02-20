"use strict";
exports.__esModule = true;
exports.PerfumeModel = exports.PerfumeSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PerfumeSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    masculina: { type: Boolean, "default": true },
    stock: { type: Number, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.PerfumeModel = (0, mongoose_1.model)("perfume", exports.PerfumeSchema);
