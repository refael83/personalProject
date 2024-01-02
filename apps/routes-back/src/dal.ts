import { Routes } from './connectDB/routes';
import { airports } from './connectDB/airports';

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
        where: { airport_code: airportCode },
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
};
