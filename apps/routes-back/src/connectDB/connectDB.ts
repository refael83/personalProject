import { Sequelize } from "sequelize";
import  dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(process.env.DB_AIRPORTS, {
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
