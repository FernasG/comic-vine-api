import { Connection } from "@database";
import { ComicVineClient } from "src/libraries/comic_vine/comic_vine.client";


export const SuperPowerLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'date_added']

    const apiResponse = await comicVineClient.get<any>({ resource: 'powers', field_list: fieldList });

    if (!apiResponse || apiResponse.error !== 'OK') return null;

    const { results: superPower } = apiResponse;

    for (const power of superPower) {
    }
});

