export  interface airport {
    id_source: number,
    id_destination: number,
    airportcode: string,
    airportname: string,
    country: string,
    city: string,
    latitude: number,
    longitude: number,
    key?:number
    value?:number
    privies?: airport
  }

export interface flight {
  source_code: string,
  destination_code: string,
  distance: number,
  id_source?: number,
  id_destination?: number
}
