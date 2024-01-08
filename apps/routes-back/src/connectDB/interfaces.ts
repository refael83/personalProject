export default  interface airport {
    id: number,
    airportcode: string,
    airportname: string,
    country: string,
    city: string,
    latitude: number,
    longitude: number,
    departures: {
      destination: string,
      distance:number,
    }[]
    incoming: {
      destination: string,
      distance:number,
    }[]
    key?:number
    value?:number
  }