export interface flight {
    source_code: string,
    destination_code: string,
    distance: number,
    id_source?: number,
    id_destination?: number
  }

export const flightsState:{ flights: flight[] } = {
    flights: []
}