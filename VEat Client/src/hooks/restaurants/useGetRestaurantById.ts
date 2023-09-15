import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById } from "../../api/restaurant";

export function useGetRestaurantById(restaurantId: string) {
  return useQuery(["get-restaurant"], () => fetchRestaurantById(restaurantId));
}
