import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "../../api/restaurant";

export function useGetAllRestaurants() {
  return useQuery(["get-all-restaurant"], () => fetchAllRestaurants());
}
