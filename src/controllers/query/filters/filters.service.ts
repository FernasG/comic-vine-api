import { DataSource } from "typeorm";
import { Response } from "../query.interface";
import { FiltersMap } from "./filters.constants";

export class FiltersService {
    static getFilterFunction(filterId: number): (((connection: DataSource) => Promise<Response>) | null) {
        if (!Object.keys(FiltersMap).includes(filterId.toString())) return null;

        return FiltersMap[filterId.toString()];
    }
}