import axios, { AxiosResponse, CanceledError } from "axios";

export default axios.create({
    baseURL: `${process.env.APP_URL}/api`,
});

export { CanceledError };
export type { AxiosResponse };
