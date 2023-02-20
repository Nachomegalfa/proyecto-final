"use strict";
exports.__esModule = true;
exports.PerfumePedidoModel = exports.PerfumePedidoSchema = void 0;
var mongoose_1 = require("mongoose");
var perfume_model_1 = require("./perfume.model");
exports.PerfumePedidoSchema = new mongoose_1.Schema({
    perfume: { type: perfume_model_1.PerfumeSchema, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.PerfumePedidoModel = (0, mongoose_1.model)("perfume_pedido", exports.PerfumePedidoSchema);
