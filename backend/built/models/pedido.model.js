"use strict";
exports.__esModule = true;
exports.PedidoModel = exports.PedidoSchema = void 0;
var mongoose_1 = require("mongoose");
var direccion_model_1 = require("./direccion.model");
var perfume_pedido_model_1 = require("./perfume_pedido.model");
var tarjeta_model_1 = require("./tarjeta.model");
var user_model_1 = require("./user.model");
exports.PedidoSchema = new mongoose_1.Schema({
    fecha: { type: Date, "default": Date.now(), required: true },
    estado: { type: String, required: true },
    user: { type: user_model_1.UserSchema, required: true },
    tarjeta: { type: tarjeta_model_1.TarjetaSchema, required: true },
    direccion: { type: direccion_model_1.DireccionSchema, required: true },
    productos: [{ type: perfume_pedido_model_1.PerfumePedidoSchema, required: true }],
    precioTotal: { type: Number, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.PedidoModel = (0, mongoose_1.model)("pedido", exports.PedidoSchema);
