import { Flights } from './connectDB/flights';
import { airportInstance } from './connectDB/airports';
import { airports } from './connectDB/airports';
import { Sequelize } from 'sequelize';

airports.hasMany(Flights);
Flights.belongsTo(airports);

export const dal = {
  getAllFlights: async () => {
    try {
      return await Flights.findAll({
        raw: true,
      });
    } catch (err) {
      console.error(err);
    }
  },
  getFlightById: async (id: number) => {
    try {
      return await Flights.findByPk(id);
    } catch (err) {
      console.error(err);
    }
  },
  getAllAirports: async (): Promise<airportInstance[]> => {
    try {
      const result = await airports.findAll({raw:true});
      console.log(result);
      
      return result
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
  getAllFlightsFromAirports: async () => {
    try{
      const result =  await airports.findAll({
        attributes: [ 'id'],
        include: [
          {
            model: Flights,
            attributes: ['source_code','distance','destination_code'],
          },
        ],
        order: [['id', 'ASC']],
      })
      return result
    } catch (error) {
      console.error('Error get airport:', error);
    }
  }
};
