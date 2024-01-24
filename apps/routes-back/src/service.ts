import { dal } from './dal';
import * as priorityQueues from './priorityQueues';
import { airport } from './sequelize/interfaces';
import { flight } from './sequelize/interfaces';
import { airportInstance } from './sequelize/airports';

export const service = {
  getAllFlights: async () => {
    try {
      const result = await dal.getAllFlights();
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  getRouteById: async (id: number) => {
    try {
      const result = await dal.getFlightById(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  recommendFlights: async (start: string, destination: string) => {
    try {
      const airports: airport[] = await dal.getAllAirports();
      const flights = await dal.getAllFlightsFromAirports()
      let result: airport[] = [];
      startNodes(airports, start);
      const destinationAirport = searchMinimumRoute(airports, flights, destination);
      result = getRoute(destinationAirport);
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  getAllAirports: async (): Promise<airportInstance[]> => {
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
  getAllFlightsFromAirports: async () => {
    try{
      const result =  await dal.getAllFlightsFromAirports();
      return result
    } catch (error) {
      console.error('Error get airport:', error);
    }
  }
};

const startNodes = (airports: airport[], start: string) => {
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
};

const getRoute = (destinationAirport: airport) => {
  const result: airport[] = [];
  console.log(destinationAirport);
  result.push(destinationAirport);
  while (destinationAirport.privies) {
    result.push(destinationAirport.privies);
    destinationAirport = destinationAirport.privies;
  }
  return result;
};

const searchMinimumRoute = (airports: airport[], flights: flight[] , destination: string) => {
  console.log(flights.length)
  let j = 0;
  let destinationAirport: airport;
  const exploredNodes: airport[] = [];
  const onlyOneNode: boolean[] = [];
  let exploredNode: airport;

  while (exploredNodes.length != airports.length) {
    
    exploredNode = priorityQueues.findMin();
    if(exploredNode.airportcode === destination) break
    if (onlyOneNode[exploredNode.id_source] === true) {
      priorityQueues.deleteNode(exploredNode.key);
      continue;
    }
    exploredNodes.push(exploredNode);
    onlyOneNode[exploredNode.id_source] = true;
    priorityQueues.deleteNode(exploredNode.key);
    j = exploredNode.id_source - 1
    console.log(j)
    if (flights[j] != undefined) {
      while (j < flights.length && flights[j].id_source === exploredNode.id_source) {
        const destinationOfEdge = flights[j].id_destination;
        const distance = flights[j].distance;
        const newAirport = airports[destinationOfEdge - 1];
        if (exploredNode.value + distance < newAirport.value) {
          newAirport.privies = exploredNode;
          priorityQueues.changeKey(newAirport, distance + exploredNode.value);
          console.log(newAirport.airportcode);
          if (newAirport.airportcode == destination) {
            destinationAirport = newAirport;
            break;
          }
        }
        j++;
      }
      j = 0;
    }
  }
  return destinationAirport;
};
