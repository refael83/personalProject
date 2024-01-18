import { dal } from './dal';
//import * as priorityQueues from './priorityQueues';
//import { airport } from './connectDB/interfaces';
import { airportInstance } from './connectDB/airports';

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
  // recommendFlights: async (start: string, destination: string) => {
  //   try {
  //     const airports: airport[] = await dal.getAllAirports();
  //     let result: airport[] = [];
  //     startNodes(airports, start);
  //     const destinationAirport = searchMinimumRoute(airports, destination);
  //     result = getRoute(destinationAirport);
  //     return result;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
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

// const startNodes = (airports: airport[], start: string) => {
//   let i = 0;
//   while (i < airports.length) {
//     if (airports[i].airportcode === start) {
//       airports[i].value = 0;
//       priorityQueues.insert(airports[i]);
//       i++;
//       continue;
//     }
//     airports[i].value = Number.MAX_VALUE;
//     priorityQueues.insert(airports[i]);
//     i++;
//   }
// };

// const getRoute = (destinationAirport: airport) => {
//   const result: airport[] = [];
//   result.push(destinationAirport);
//   while (destinationAirport.privies) {
//     result.push(destinationAirport.privies);
//     destinationAirport = destinationAirport.privies;
//   }
//   return result;
// };

// const searchMinimumRoute = (airports: airport[], destination: string) => {
//   let j = 0;
//   let destinationAirport: airport;
//   const exploredNodes: airport[] = [];
//   const onlyOneNode: boolean[] = [];
//   let exploredNode: airport;

//   while (exploredNodes.length != airports.length) {
//     exploredNode = priorityQueues.findMin();
//     if (onlyOneNode[exploredNode.id] === true) {
//       priorityQueues.deleteNode(exploredNode.key);
//       continue;
//     }
//     exploredNodes.push(exploredNode);
//     onlyOneNode[exploredNode.id] = true;
//     priorityQueues.deleteNode(exploredNode.key);
//     if (exploredNode.connections[j]) {
//       while (j < exploredNode.connections.length) {
//         const destinationOfEdge = exploredNode.connections[j].destination;
//         const distance = exploredNode.connections[j].distance;
//         const newAirport = airports[destinationOfEdge - 1];
//         if (exploredNode.value + distance < newAirport.value) {
//           newAirport.privies = exploredNode;
//           priorityQueues.changeKey(newAirport, distance + exploredNode.value);
//           if (newAirport.code === destination) {
//             destinationAirport = newAirport;
//             break;
//           }
//         }
//         j++;
//       }
//       j = 0;
//     }
//   }
//   return destinationAirport;
// };
