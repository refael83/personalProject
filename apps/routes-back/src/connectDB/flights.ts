import { DataTypes } from 'sequelize';
import { sequelize } from './connectDB';
import { flight } from './interfaces';
import { Model } from 'sequelize';
import { airports } from './airports';

export interface flightInstance
  extends Model<flight>,
    flight {
      createdAt?: Date;
      updatedAt?: Date;
    }

export const Flights = sequelize.define<flightInstance>(
  'flights',
  {
    source_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: airports,
        key:'source_code'
      }
    },
    destination_code: {
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


