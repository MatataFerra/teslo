export interface IApiPickupPoints {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface IPickupPoint {
  latitude: string;
  longitude: string;
  name: string;
}

export type PickupModalActions = "[Pickup] - Open modal" | "[Pickup] - Close modal";
