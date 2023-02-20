"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var perfume_router_1 = __importDefault(require("./routers/perfume.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var pedido_router_1 = __importDefault(require("./routers/pedido.router"));
var tarjeta_router_1 = __importDefault(require("./routers/tarjeta.router"));
var direccion_router_1 = __importDefault(require("./routers/direccion.router"));
var config_1 = require("./configs/config");
(0, config_1.dbConnect)();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use("/api/perfumes", perfume_router_1["default"]);
app.use("/api/users", user_router_1["default"]);
app.use("/api/pedidos", pedido_router_1["default"]);
app.use("/api/tarjetas", tarjeta_router_1["default"]);
app.use("/api/direcciones", direccion_router_1["default"]);
var port = 5000;
app.listen(port, function () {
    console.log("listening on http://localhost:" + port);
});
