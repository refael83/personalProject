import { DataTypes } from 'sequelize';
import { sequelize } from './connectDB';
import airport from './interfaces';
import { Model } from 'sequelize';



interface airportInstance
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
      airportcode: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      airportname: {
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
      departures: {
        type: DataTypes.JSON,
        allowNull: true
      },
      incoming:{
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  