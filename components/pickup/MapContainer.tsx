import { FC, useContext, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { LeafletControlGeocoder } from ".";
import { PickupContext } from "../../context";

const icon = L.icon({
  iconSize: [35, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: `https://res.cloudinary.com/docq8rbdu/image/upload/v1655356024/gaaensta9guiqtf3q6s2.png`,
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const searchIcon = L.icon({
  iconSize: [35, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: `https://res.cloudinary.com/docq8rbdu/image/upload/v1655356087/i0kmu4d6ervnvwfdgeg3.png`,
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const mockMarkers = [
  {
    name: "Sucursal 1",
    latitude: "-34.503722",
    longitude: "-57.381592",
  },

  {
    name: "Sucursal 2",
    latitude: "-34.803722",
    longitude: "-58.381592",
  },

  {
    name: "Sucursal 3",
    latitude: "-34.603722",
    longitude: "-59.381592",
  },
];

const MapLeafletContainer: FC = () => {
  const { pickup } = useContext(PickupContext);
  const position: [number, number] = [45.51, -122.68];

  return (
    <>
      <MapContainer zoom={8} style={{ height: "100%", width: "50vw" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mockMarkers.map((marker, index) => (
          <Marker key={index} position={[Number(marker.latitude), Number(marker.longitude)]} icon={icon} />
        ))}

        {pickup.latitude && pickup.longitude && (
          <Marker position={[Number(pickup.latitude), Number(pickup.longitude)]} icon={searchIcon} />
        )}

        <LeafletControlGeocoder
          center={[Number(pickup.latitude), Number(pickup.longitude)]}
          onResult={(result) => console.log(result)}
        />
      </MapContainer>
    </>
  );
};

export default MapLeafletContainer;
