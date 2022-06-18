import { FC, Suspense, useContext, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { LeafletControlGeocoder } from ".";
import { PickupContext } from "../../context";
import { IPickupPoint } from "../../interfaces";
import { tesloApi } from "../../api";
import useSWR from "swr";
import { ErrorComponent, FullScreenLoading } from "../ui";

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

const MapLeafletContainer: FC = () => {
  const { pickup } = useContext(PickupContext);
  const { data, error } = useSWR<IPickupPoint[]>("/api/pickups");
  const pickupMemo = useMemo(() => pickup.name, [pickup]);

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <MapContainer zoom={8} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Suspense>
          {data?.map((marker, index) => (
            <Marker key={index} position={[Number(marker.latitude), Number(marker.longitude)]} icon={icon}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
        </Suspense>
        {pickup.latitude && pickup.longitude && (
          <Marker position={[Number(pickup.latitude), Number(pickup.longitude)]} icon={searchIcon}>
            <Popup>{pickupMemo}</Popup>
          </Marker>
        )}

        <LeafletControlGeocoder />
      </MapContainer>
    </>
  );
};

export default MapLeafletContainer;
