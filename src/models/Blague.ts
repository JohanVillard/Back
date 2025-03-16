import { DataTypes } from "sequelize";
import sequelize from "../database";

const Blague = sequelize.define(
  "Blague",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: DataTypes.STRING,
    response: DataTypes.STRING,
  },
  {
    timestamps: true,
  },
);

export default Blague;
