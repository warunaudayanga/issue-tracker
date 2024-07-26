import axios, { AxiosResponse, CanceledError } from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api",
});

export { CanceledError };
export type { AxiosResponse };
