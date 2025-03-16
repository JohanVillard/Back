import express from "express";
import dotenv from "dotenv";
import blaguesRoutes from "./routes/v1/blague";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware pour parse le JSON
app.use(express.json());

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

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);

// Middleware pour servir la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1", blaguesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
