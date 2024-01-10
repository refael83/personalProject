import { dal } from './dal';
import * as priorityQueues from './priorityQueues';
import airport from './connectDB/interfaces';
import { airportInstance } from './connectDB/airports';

export const service = {
  getAllRoutes: async () => {
    try {
      const result = await dal.getAllRoutes();
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  getRouteById: async (id: number) => {
    try {
      const result = await dal.getRouteById(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  recommendRoutes: async ( start: string ) => {
    try {
      const airports = await dal.getAllAirports();
      airports[0].departures[1].distance = 150
      let i = 0;
      while (i < airports.length) {
        if (airports[i].airportcode === start) {
          airports[i].value = 0;
          priorityQueues.insert(airports[i]);
          i++;
          continue;
        }
        airports[i].value = Number.MAX_VALUE;
        priorityQueues.insert(airports[i]);
        i++;
      }
      i = 0;
      let j = 0;
      const exploredNodes: airport[] = [];
      const onlyOneNode: boolean[] = [];
      let exploredNode: airport;

      while (exploredNodes.length != airports.length) {
        exploredNode = priorityQueues.findMin();
        if (onlyOneNode[exploredNode.id] === true) {
          priorityQueues.deleteNode(exploredNode.key);
          continue;
        }
        exploredNodes.push(exploredNode);
        onlyOneNode[exploredNode.id] = true;
        priorityQueues.deleteNode(exploredNode.key);
        if (exploredNode.departures[j]) {
          while (j < exploredNode.departures.length) {
            const destination = exploredNode.departures[j].destination
            const distance = exploredNode.departures[j].distance
            const newAirport = airports.find(
              (airport) => airport.airportcode === destination
            );
            if(exploredNode.value + distance < newAirport.value ){
              priorityQueues.changeKey(newAirport, distance + exploredNode.value);
            }
            
            j++;
          }
          j = 0;

        }
      }
      return exploredNodes;
    } catch (err) {
      console.error(err);
    }
  },
  getAllAirports: async ():Promise<airportInstance[]> => {
    try {
      const result = await dal.getAllAirports();
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  deleteAirportByCode: async (airportCode: string) => {
    try {
      const result = await dal.deleteAirportByCode(airportCode);
      return result;
    } catch (err) {
      console.error(err);
    }
  },
};
