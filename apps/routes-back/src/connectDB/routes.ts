import { DataTypes } from 'sequelize';
import { sequelize } from './connectDB';

export const Routes = sequelize.define(
  'routes',
  {
    source_point: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);


