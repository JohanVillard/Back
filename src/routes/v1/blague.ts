import { Request, Response, Router } from "express";
import Blague from "../../models/Blague";
import getRandomInt from "../../utils/getRandomInt";
import { Sequelize } from "sequelize";

const router = Router();

/**
 * @swagger
 * /api/v1/blagues:
 *   post:
 *     description: Créer une nouvelle blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               response:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée
 *       400:
 *         description: Mauvaise requête
 */
router.post("/blagues", async (req: Request, res: Response) => {
  try {
    // Récupération des données envoyées
    const { question, response } = req.body;

    // Construction de la blague à partir du modèle
    const blague = await Blague.create({ question, response });

    res.status(201).json(blague);
  } catch (error) {
    console.error("Erreur en détail : ", error);
    res.status(500).json({ error: "Erreur lors de la création de la blague" });
  }
});

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

router.get("/blagues", async (req: Request, res: Response) => {
  try {
    const blaguesList = await Blague.findAll();

    res.json({ blaguesList });
  } catch (error) {
    console.error("Erreur en détail : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de toutes blague" });
  }
});

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
router.get("/blagues/random", async (req: Request, res: Response) => {
  try {
    // Sélectionne une blague aléatoire.
    // Moins couteux que de les sélectionner toutes,
    // puis d'en choisir une au hasard
    const blague = await Blague.findOne({
      order: Sequelize.literal("RANDOM()"),
    });

    res.json(blague);
  } catch (error) {
    console.error("Erreur en détail : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la blague aléatoire" });
  }
});

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
router.get("/blagues/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blague = await Blague.findByPk(id);

    if (!blague) {
      res.status(404).json({ error: "Blague non trouvée" });
    } else {
      res.json({ blague });
    }
  } catch (error) {
    console.error("Erreur en détail : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la blague choisie" });
  }
});

export default router;
