import {
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import L from "leaflet";
import restaurantMarker from "../assets/restaurant_marker.png";
import userMarker from "../assets/user_marker.png";
import { Coordinates } from "../api/user";
import { Restaurant } from "../api/restaurant";

type Props = {
  userCoordinates: Coordinates;
  selectedRestaurant: Restaurant;
};

function TrackOrderMap(props: Props) {
  const { userCoordinates, selectedRestaurant } = props;

  return (
    <MapContainer
      center={[userCoordinates.latitude, userCoordinates.longitude]}
      zoom={15}
      minZoom={12}
      scrollWheelZoom
      zoomControl={false}
      className="flex h-full"
    >
      <ScaleControl position="topleft" />
      <ZoomControl position="bottomright" />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RoutingMachine userCoordinates={userCoordinates} />
      <Marker
        position={[
          Number(selectedRestaurant.address.latitude),
          Number(selectedRestaurant.address.longitude),
        ]}
        icon={L.icon({
          iconUrl: restaurantMarker,
          iconSize: [30, 45],
          iconAnchor: [20, 30],
        })}
      ></Marker>
      <Marker
        position={[userCoordinates.latitude, userCoordinates.longitude]}
        icon={L.icon({
          iconUrl: userMarker,
          iconSize: [30, 45],
          iconAnchor: [20, 30],
        })}
      ></Marker>
    </MapContainer>
  );
}

export default TrackOrderMap;
