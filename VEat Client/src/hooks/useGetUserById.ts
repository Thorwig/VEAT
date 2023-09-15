import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/user";

export function useGetUserById(userId: string) {
    return useQuery(["get-user"], () => getUserById(userId), { enabled: userId !== undefined });
}
