import { DataTypes } from 'sequelize';
import { sequelize } from './connectDB';
import airport from './interfaces';
import { Model } from 'sequelize';



export interface airportInstance
  extends Model<airport>,
    airport {
      createdAt?: Date;
      updatedAt?: Date;
    }

export const airports = sequelize.define<airportInstance>(
    'airports',
    {
      id: {
        type: DataTypes.NUMBER(),
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
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
      connections:{
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  