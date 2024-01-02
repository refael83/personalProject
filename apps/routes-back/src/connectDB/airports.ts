import { DataTypes } from 'sequelize';
import { sequelize } from './connectDB';

export const airports = sequelize.define(
    'airports',
    {
      airport_code: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      airport_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      elevation: {
        type: DataTypes.INTEGER,
      },
      airport_type: {
        type: DataTypes.STRING(50),
      },
      runway_length: {
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  