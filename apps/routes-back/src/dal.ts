import { Routes } from './connectDB/routes';
import { airports } from './connectDB/airports';
import airport from './connectDB/interfaces';

export const dal = {
  getAllRoutes: async () => {
    try {
      return await Routes.findAll({
        raw: true,
      });
    } catch (err) {
      console.error(err);
    }
  },
  getRouteById: async (id: number) => {
    try {
      return await Routes.findByPk(id);
    } catch (err) {
      console.error(err);
    }
  },
  getAllAirports: async () => {
    try {
      return await airports.findAll({
        raw: true,
      });
    } catch (err) {
      console.error(err);
    }
  },
  deleteAirportByCode: async (airportCode: string) => {
    try {
      const result = await airports.destroy({
        where: { airportcode: airportCode },
      });

      if (result === 1) {
        console.log(`Airport with code ${airportCode} deleted successfully.`);
      } else {
        console.log(
          `Airport with code ${airportCode} not found or not deleted.`
        );
      }
    } catch (error) {
      console.error('Error deleting airport:', error);
    }
  },
  getAirportByCode: async (airportCode:string) => {
    try {
      const result = await airports.findOne({
        where: { airportcode: airportCode },
      });
      return result.dataValues
    } catch (error) {
      console.error('Error get airport:', error);
    }
  },
  // addAirport: async (airport: airport) => {
  //   try{
  //     const result = aswit air
  //   }

  // }
};
