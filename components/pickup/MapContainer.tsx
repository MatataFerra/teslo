import { FC, memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Map, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import { LeafletControlGeocoder } from ".";
import { PickupContext } from "../../context";
import { IPickupPoint } from "../../interfaces";
import { tesloApi } from "../../api";
import useSWR from "swr";
import { ErrorComponent, FullScreenLoading } from "../ui";
import { Typography } from "@mui/material";
import Image from "next/image";

// const icon = L({
//   iconSize: [35, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: `https://res.cloudinary.com/docq8rbdu/image/upload/v1655356024/gaaensta9guiqtf3q6s2.png`,
//   shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
// });

// const searchIcon = L({
//   iconSize: [35, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: `https://res.cloudinary.com/docq8rbdu/image/upload/v1655356087/i0kmu4d6ervnvwfdgeg3.png`,
//   shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
// });

export const MapLeafletContainer: FC = () => {
  const { pickup } = useContext(PickupContext);
  const { data, error } = useSWR<IPickupPoint[]>("/api/pickups");
  const pickupMemo = useMemo(() => pickup.name, [pickup]);

  const isSSR = typeof window === "undefined";

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <Typography> 📢 Estamos trabajando para implementar los mapas 🛠 </Typography>
      <Map
        initialViewState={{
          longitude: Number(pickup.longitude),
          latitude: Number(pickup.latitude),
          zoom: 12,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle='mapbox://styles/mapbox/streets-v9'>
        {data?.map((marker, index) => (
          <Marker key={index} longitude={Number(marker.longitude)} latitude={Number(marker.latitude)}>
            <Image
              src='https://res.cloudinary.com/docq8rbdu/image/upload/v1655356024/gaaensta9guiqtf3q6s2.png'
              width={35}
              height={41}
              alt='ping image for maps'
            />
          </Marker>
        ))}

        {pickup.latitude && pickup.longitude && (
          <Marker longitude={Number(pickup.longitude)} latitude={Number(pickup.latitude)}>
            <Image
              src='https://res.cloudinary.com/docq8rbdu/image/upload/v1655356087/i0kmu4d6ervnvwfdgeg3.png'
              width={35}
              height={41}
              alt='ping image for maps'
            />
          </Marker>
        )}
      </Map>

      {/* {isSSR ? (
        <FullScreenLoading />
      ) : (
        // <Typography> 📢 Estamos trabajando para implementar los mapas 🛠 </Typography>
        <MapContainer zoom={8} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {data?.map((marker, index) => (
            <Marker key={index} position={[Number(marker.latitude), Number(marker.longitude)]}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}

          {pickup.latitude && pickup.longitude && (
            <Marker position={[Number(pickup.latitude), Number(pickup.longitude)]}>
              <Popup>{pickupMemo}</Popup>
            </Marker>
          )}

          <LeafletControlGeocoder />
        </MapContainer>
      )} */}
    </>
  );
};
