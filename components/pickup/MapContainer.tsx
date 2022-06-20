import { FC, useContext, useEffect, useMemo, useState } from "react";
import Map, { Marker, useMap, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PickupContext } from "../../context";
import { IPickupPoint } from "../../interfaces";
import useSWR from "swr";
import { ErrorComponent, FullScreenLoading } from "../ui";
import { Typography } from "@mui/material";
import Image from "next/image";

export const MapLeafletContainer: FC = () => {
  const { pickup } = useContext(PickupContext);
  const { data, error } = useSWR<IPickupPoint[]>("/api/pickups");
  const [openPopup, setOpenPopup] = useState(true);
  const map = useMap();
  const pickupMemo = useMemo(() => pickup.name, [pickup]);

  useEffect(() => {
    map.default?.flyTo({
      center: [Number(pickup.longitude), Number(pickup.latitude)],
      zoom: 12,
    });
    setOpenPopup(true);
  }, [map.default, pickup.latitude, pickup.longitude]);

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  return (
    <>
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

        {openPopup && (
          <Popup
            onClose={() => setOpenPopup(false)}
            longitude={Number(pickup.longitude)}
            latitude={Number(pickup.latitude)}>
            <Typography>{pickupMemo}</Typography>
          </Popup>
        )}
      </Map>
    </>
  );
};
