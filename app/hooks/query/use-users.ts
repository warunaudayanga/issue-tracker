import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CACHE_KEY_USERS } from "@/app/constants";
import { userService } from "@/app/services";
import { User } from "next-auth";
import ms from "ms";

const useUsers = (): Omit<UseQueryResult<User[]>, "data"> & {
    genres: User[] | undefined;
} => {
    const { data, ...rest } = useQuery<User[]>({
        queryKey: CACHE_KEY_USERS,
        queryFn: () => userService.getAll(),
        staleTime: ms("24h"),
        initialData: [],
    });
    return { genres: data, ...rest } as Omit<UseQueryResult<User[]>, "data"> & {
        genres: User[] | undefined;
    };
};

export default useUsers;
