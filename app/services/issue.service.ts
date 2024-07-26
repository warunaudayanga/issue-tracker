// noinspection JSUnusedGlobalSymbols

import createHttpService from "./http.service";
import { APIEndpoint } from "../enums";
import { Issue } from "@prisma/client";

const issueService = createHttpService<Issue>(APIEndpoint.ISSUES);

export default issueService;
