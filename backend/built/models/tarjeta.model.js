"use strict";
exports.__esModule = true;
exports.TarjetaModel = exports.TarjetaSchema = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user.model");
exports.TarjetaSchema = new mongoose_1.Schema({
    numeroTarjeta: { type: String, required: true },
    fechaCaducidad: { type: String, required: true },
    cvv: { type: Number, required: true },
    user: { type: user_model_1.UserSchema, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.TarjetaModel = (0, mongoose_1.model)("tarjeta", exports.TarjetaSchema);
