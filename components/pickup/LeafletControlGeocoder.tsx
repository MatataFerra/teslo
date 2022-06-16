import { FC, useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import { PickupContext } from "../../context";

interface Props {
  onResult: (result: any) => void;
  center: [number, number];
}

export const LeafletControlGeocoder: FC<Props> = ({ onResult, center }) => {
  const map = useMap();
  const { pickup } = useContext(PickupContext);
  useEffect(() => {
    map.setView([Number(pickup.latitude), Number(pickup.longitude)], 8);
  }, [map, pickup.latitude, pickup.longitude]);
  return <></>;
};
