import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (userCoordinates, restaurantCoordinates) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(restaurantCoordinates.latitude, restaurantCoordinates.longitude),
      L.latLng(userCoordinates.latitude, userCoordinates.longitude),
    ],
    lineOptions: {
      styles: [{ color: "black", weight: 4 }],
    },
    createMarker: function () {
      return null;
    },
    hide: true,
    show: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
