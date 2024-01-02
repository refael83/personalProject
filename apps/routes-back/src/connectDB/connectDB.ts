import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize('postgres://refael:TsnsYeIeGjnc7K3kK3AG3dPIO0Et1JPu@dpg-cm3v0s8cmk4c73cg1hjg-a.oregon-postgres.render.com:5432/airports', {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  });

export const checkConnection = async () => {
    try {    
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL");
      } catch (error) {
        console.error("Error connecting to PostgreSQL:", (error as Error).message);
      }
}
