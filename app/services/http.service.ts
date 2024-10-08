// noinspection JSUnusedGlobalSymbols,Annotator

import httpClient from "./http-client";
import { AxiosRequestConfig } from "axios";
import { GetAllResponse } from "@/app/interfaces";
import delay from "delay";

export class HttpService<Entity> {
    constructor(protected endpoint: string) {}

    getAllWithCancel<T>(requestConfig?: AxiosRequestConfig): GetAllResponse<T> {
        const controller = new AbortController();
        const request = httpClient.get<T>(this.endpoint, {
            signal: controller.signal,
            ...requestConfig,
        });
        return {
            request,
            cancel: (): void => {
                controller.abort();
            },
        };
    }

    async getAll(): Promise<Entity[]> {
        const res = await httpClient.get<Entity[]>(this.endpoint);
        return res.data;
    }

    async get(id: string): Promise<Entity> {
        const res = await httpClient.get<Entity>(`${this.endpoint}/${id}`);
        return res.data;
    }

    async create<T>(dto: T): Promise<Entity> {
        const res = await httpClient.post<Entity>(this.endpoint, dto);
        return res.data;
    }

    async update<T>(id: string, dto: T): Promise<Entity> {
        const res = await httpClient.patch<Entity>(`${this.endpoint}/${id}`, dto);
        await delay(2000);
        return res.data;
    }

    async delete(id: string): Promise<Entity> {
        const res = await httpClient.delete<Entity>(`${this.endpoint}/${id}`);
        return res.data;
    }
}

const createHttpService = <Entity>(endpoint: string): HttpService<Entity> => new HttpService<Entity>(endpoint);

export default createHttpService;
