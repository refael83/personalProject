import { dal } from './dal';
import * as priorityQueues from './priorityQueues';

export const service = {
  getAllRoutes: async () => {
    try {
      const result = await dal.getAllRoutes();
      return result;
    } catch (err) {
      console.error(err);;
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
  recommendRoutes: async (start: any, distinction: any) => {
    try {
      const airports: object[] = (await dal.getAllAirports()) as object[];
      const routes: any[] = (await dal.getAllRoutes()) as any[];
      let exploredNode: Node[] = [];
      let onlyOneNode: boolean[] = [];
      let three: { airports: Node[]; routes: any[] };
      let i = 0;
      let insertNode = start;

      while (exploredNode.length != airports.length) {
        if (i != 0) insertNode = priorityQueues.findMin();
        if (onlyOneNode[insertNode.airportDetails.id] === true) {
          priorityQueues.deleteNode(insertNode, insertNode.position);
          continue;
        }
        exploredNode.push(insertNode.airportDetails);
        onlyOneNode[insertNode.airportDetails.id] = true;
        priorityQueues.deleteNode(insertNode, insertNode.position);
        while (i < routes.length) {
          if (routes[i].source_point === start) {
            priorityQueues.insert({
              airportDetails: routes[i].point_distinction,
              value: insertNode.value + routes[i].distance,
              key: 0,
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  getAllAirports: async () => {
    try {
      const result = await dal.getAllAirports();
      return result;
    } catch (err) {
      console.error(err);
    }
  },
  deleteAirportByCode: async ( airportCode: any ) => {
    try {
      const result = await dal.deleteAirportByCode(airportCode);
      return result
    }catch (err) {
      console.error(err);
    }
  }

};
