// noinspection JSUnusedGlobalSymbols

import { createHttpService } from "./http.service";
import { APIEndpoint } from "../enums";
import { User } from "next-auth";

// export class GenreService extends HttpService<ListFetchResponse<Genre>> {
//     constructor() {
//         super(Endpoint.GENRES);
//     }
// }
//
// export const genreService = new GenreService();

export const userService = createHttpService<User>(APIEndpoint.USERS);
