import axios, { AxiosResponse, CanceledError } from "axios";

export default axios.create({
    baseURL: "/api",
});

export { CanceledError };
export type { AxiosResponse };
