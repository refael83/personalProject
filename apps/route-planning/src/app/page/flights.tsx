import {
  trpc
} from '../connectToServer';
import Footer from '../components/Footer';
import { Coordinate } from "ol/coordinate";
import { Geometry, Point, Polygon } from "ol/geom";
import { Geolocation as OLGeoLoc } from "ol";
import { fromLonLat } from 'ol/proj';
import { useState } from 'react';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, RStyle, RGeolocation, useOL, } from "rlayers";
import locationIcon from "../svg/location.svg";
import InputComponent from '../components/input';
import React,{ ChangeEvent, FormEvent } from 'react';

function GeolocComp(): JSX.Element {
  const [pos, setPos] = useState(new Point(fromLonLat([0, 0])));
  const [accuracy, setAccuracy] = useState(
    undefined as Geometry | undefined
  );
  // Low-level access to the OpenLayers API
  const { map } = useOL();

  return (
    <>
      <RGeolocation
        tracking={true}
        trackingOptions={{ enableHighAccuracy: true }}
        onChange={React.useCallback(
          (e ) => {
            const geoloc = e.target as OLGeoLoc;
            setPos(new Point(geoloc.getPosition() as Coordinate));
            setAccuracy(geoloc.getAccuracyGeometry() as Geometry);

            map.getView().fit(geoloc.getAccuracyGeometry() as Polygon, {
              duration: 250,
              maxZoom: 15,
            });
          },
          [map]
        )}
      />
      <RLayerVector zIndex={10}>
        <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
          <RStyle.RStroke color={"#007bff"} width={3} />
        </RStyle.RStyle>
        <RFeature geometry={pos}></RFeature>
        <RFeature geometry={accuracy}></RFeature>
      </RLayerVector>
    </>
  );
}
export default  function Flights(): JSX.Element {
  const [source, setSource] = useState<string>('JFK');
  const [destination, setDestination] = useState<string>('LHR');
  const { error, data, refetch } = trpc.recommendFlights.useQuery([source, destination],{
    enabled: false,
  })
  if(error) {
    return <p>Error : {error.message}</p>
  }

  const handleSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch()
  };
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputComponent label="Source" value={source} onChange={handleSourceChange} />
        <InputComponent label="Destination" value={destination} onChange={handleDestinationChange} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </form>
      <RMap width={"100%"} height={"60vh"} initial={{ center: fromLonLat([0,0]), zoom: 5 }}>
      <ROSM />
      <GeolocComp/>
      <RLayerVector zIndex={10}>
      <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        {data?.map((airport) =>
        <RFeature
          key={airport.airportcode}
          geometry={new Point(fromLonLat([airport.longitude, airport.latitude]))}
        ></RFeature>
          )}
      </RLayerVector>
    </RMap>
      <Footer />
    </>
  );
}



