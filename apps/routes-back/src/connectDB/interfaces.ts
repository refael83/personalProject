export default  interface airport {
    id: number,
    code: string,
    name: string,
    country: string,
    city: string,
    latitude: number,
    longitude: number,
    connections: {
      destination: number,
      distance:number,
    }[]
    key?:number
    value?:number
    privies?: airport
  }