import {
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import restaurantMarker from "../assets/restaurant_marker.png";
import userMarker from "../assets/user_marker.png";
import { Coordinates } from "../api/user";
import { useEffect, useState } from "react";
import { Restaurant } from "../api/restaurant";
import { nanoid } from "nanoid";
import { useGetAllRestaurants } from "../hooks/restaurants/useGetAllRestaurants";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  userCoordinates: Coordinates | undefined;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
};

function ParseRestaurantMap(props: Props) {
  const { userCoordinates, setSelectedRestaurant } = props;

  const [defautPosition, setDefautPosition] = useState([
    44.839625588425776, -0.5819239088061622,
  ]);
  const { data: restaurantList, isLoading } = useGetAllRestaurants();

  useEffect(() => {
    if (userCoordinates) {
      setDefautPosition([userCoordinates.latitude, userCoordinates.longitude]);
    }
  }, [userCoordinates]);

  return (
    <>
      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
          className="text-[--orange]"
        />
      ) : (
        <MapContainer
          center={
            userCoordinates
              ? [userCoordinates.latitude, userCoordinates.longitude]
              : [defautPosition[0], defautPosition[1]]
          }
          zoom={15}
          minZoom={12}
          scrollWheelZoom
          zoomControl={false}
          className="flex h-full"
        >
          <ScaleControl position="topleft" />
          <ZoomControl position="bottomright" />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {restaurantList &&
            restaurantList.map((restaurant) => {
              return (
                <Marker
                  position={[
                    Number(restaurant.address.longitude),
                    Number(restaurant.address.latitude),
                  ]}
                  key={nanoid()}
                  eventHandlers={{
                    click: () => {
                      setSelectedRestaurant(restaurant);
                    },
                  }}
                  icon={L.icon({
                    iconUrl: restaurantMarker,
                    iconSize: [30, 45],
                    iconAnchor: [20, 30],
                  })}
                ></Marker>
              );
            })}
          {userCoordinates && (
            <Marker
              position={[userCoordinates.latitude, userCoordinates.longitude]}
              icon={L.icon({
                iconUrl: userMarker,
                iconSize: [30, 45],
                iconAnchor: [20, 30],
              })}
            ></Marker>
          )}
        </MapContainer>
      )}
    </>
  );
}

export default ParseRestaurantMap;
