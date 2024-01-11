import React from 'react';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { RMap, ROSM } from 'rlayers';
import { z } from 'zod'



const center = fromLonLat([2.364, 48.82]);
export default function Simple(): JSX.Element {

  const fetchData = async () => {
    try {
        const inputSchema = z.tuple([z.string(), z.string()])
      const data = await client.recommendRoutes(inputSchema).query({
        input: ['JFK','LAx']
      });
      setAirports(data);
    } catch (err) {
      console.error('error');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <RMap
        width={'100%'}
        height={'90vh'}
        initial={{ center: center, zoom: 11 }}
      >
        <ROSM />
      </RMap>
      <Footer />
    </>
  );
}
