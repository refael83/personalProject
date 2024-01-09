import { useState, useEffect } from 'react';
import { client } from '../connectToServer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Airport.css'

interface Airport {
  airport_code: string;
  airport_name: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  elevation?: number | null;
  airport_type?: string | null;
  runway_length?: number | null;
}

export default function Airports(): JSX.Element {
  const [airports, setAirports] = useState<Airport[]>([]);

  const fetchData = async () => {
    try {
      const data: Airport[] =
        (await client.getAllAirports.query()) 
      setAirports(data);
    } catch (err) {
      console.error('error')
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  return (
   <div>
    <Navbar/>
      {airports.map((airport, index) => (
        <div key={airport.airport_code}>
        <div className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="cuisine" />
          <h4 className="text-white text-2xl font-bold capitalize text-center">{airport.airport_name}</h4>
          <p className="text-white/50">{airport.country}</p>
          <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">{airport.city} <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
        </div>
        </div>
        ))}
        <Footer/>
    </div>
  );
}
