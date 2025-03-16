"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Blague_1 = __importDefault(require("../../models/Blague"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /blagues:
 *   post:
 *     summary: Créer une nouvelle blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - response
 *             properties:
 *               question:
 *                 type: string
 *                 description: La devinette
 *                 example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *               response:
 *                 type: string
 *                 description: La réponse
 *                 example: "Parce que sinon ils tombent encore dans le bateau !"
 *     responses:
 *       201:
 *         description: Blague créée
 *       400:
 *         description: Mauvaise requête
 */
router.post("/blagues", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupération des données envoyées
        const { question, response } = req.body;
        // Construction de la blague à partir du modèle
        const blague = yield Blague_1.default.create({ question, response });
        res.status(201).json(blague);
    }
    catch (error) {
        console.error("Erreur en détail : ", error);
        res.status(500).json({ error: "Erreur lors de la création de la blague" });
    }
}));
/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     description: Récupérer une liste de toutes les blagues
 *     responses:
 *       200:
 *         description: Liste de blagues récupérées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   question:
 *                     type: string
 *                   response:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/blagues", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blaguesList = yield Blague_1.default.findAll();
        res.json({ blaguesList });
    }
    catch (error) {
        console.error("Erreur en détail : ", error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération de toutes blague" });
    }
}));
// Mettre cette route avant celle qui contient l'id évite un conflit
/**
 * @swagger
 * /api/v1/blagues/random:
 *   get:
 *     description: Récupérer une blague aléatoire
 *     responses:
 *       200:
 *         description: Blague aléatoire récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 question:
 *                   type: string
 *                 response:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
router.get("/blagues/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sélectionne une blague aléatoire.
        // Moins couteux que de les sélectionner toutes,
        // puis d'en choisir une au hasard
        const blague = yield Blague_1.default.findOne({
            order: sequelize_1.Sequelize.literal("RANDOM()"),
        });
        res.json(blague);
    }
    catch (error) {
        console.error("Erreur en détail : ", error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération de la blague aléatoire" });
    }
}));
/**
 * @swagger
 * /api/v1/blagues/{id}:
 *   get:
 *     description: Récupérer une blague spécifique par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la blague à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blague récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 question:
 *                   type: string
 *                 response:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Blague non trouvée
 */
router.get("/blagues/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blague = yield Blague_1.default.findByPk(id);
        if (!blague) {
            res.status(404).json({ error: "Blague non trouvée" });
        }
        else {
            res.json({ blague });
        }
    }
    catch (error) {
        console.error("Erreur en détail : ", error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération de la blague choisie" });
    }
}));
exports.default = router;
