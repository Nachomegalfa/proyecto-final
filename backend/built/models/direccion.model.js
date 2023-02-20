"use strict";
exports.__esModule = true;
exports.DireccionModel = exports.DireccionSchema = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user.model");
exports.DireccionSchema = new mongoose_1.Schema({
    calle: { type: String, required: true },
    numero: { type: Number, required: true },
    piso: { type: Number, required: true },
    letra: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    localidad: { type: String, required: true },
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
exports.DireccionModel = (0, mongoose_1.model)("direccion", exports.DireccionSchema);
