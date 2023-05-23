import { Characters, Connection } from "@database";
import { ComicVineClient } from "src/libraries";

export const CharactersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'real_name', 'origin', 'birth', 'description', 'count_of_issue_appearances']

    const apiResponse = await comicVineClient.get<any>({ resource: 'characters', field_list: fieldList });

    if (!apiResponse || apiResponse.error !== 'OK') return null;

    const { results: characters } = apiResponse;

    for (const char of characters) {
        
    }
});