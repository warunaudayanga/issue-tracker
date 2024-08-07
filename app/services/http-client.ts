import axios, { AxiosResponse, CanceledError } from "axios";

export default axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
});

export { CanceledError };
export type { AxiosResponse };
