import { Flights } from './sequelize/flights';
import { flight } from './sequelize/interfaces';
import { airportInstance } from './sequelize/airports';
import { airports } from './sequelize/airports';
import { sequelize } from './sequelize/connectDB';

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
      const result =  await sequelize.query(`
      select 
      airports_2.id_source,
	    flights.id_destination,
      flights.source_code,
      flights.destination_code,
      flights.distance
      from airports_2
      join 
      flights on flights.source_code = airports_2.airportcode
      order by airports_2.id_source
      `) 
      return result[0] as unknown as flight []
    } catch (error) {
      console.error('Error get airport:', error);
    }
  }
};
