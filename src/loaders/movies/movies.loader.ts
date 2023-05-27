import { Connection } from "@database";
import { ComicVineClient } from "src/libraries/comic_vine/comic_vine.client";


export const MoviesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'release_date', 'data_added', 'runtime', 'rating', 'budget', 'total_revenue']

    const apiResponse = await comicVineClient.get<any>({ resource: 'movies', field_list: fieldList });

    if (!apiResponse || apiResponse.error !== 'OK') return null;

    const { results: movies } = apiResponse;

    for (const movie of movies) {
    }
});