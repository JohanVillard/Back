"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const blague_1 = __importDefault(require("./routes/v1/blague"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cors_1 = __importDefault(require("cors"));
// Chargement des variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
// Middleware pour parse le JSON
app.use(express_1.default.json());
// Configuration Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API de Blagues",
            version: "1.0.0",
            description: "Une API pour gérer les blagues",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
    },
    apis: ["./src/routes/**/*.ts"], // Chemin des fichiers contenant les routes
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
console.log(swaggerDocs);
// Middleware pour servir la documentation Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use("/api/v1", blague_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
