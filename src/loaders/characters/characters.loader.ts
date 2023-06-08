import { Characters, Connection } from "@database";
import { ComicVineClient } from "@libraries";

export const CharactersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'real_name', 'birth', 'description', 'count_of_issue_appearances'];
    let offset = 0;

    while (true) {
        const apiResponse = await comicVineClient.get<any>({ resource: 'characters', field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'CharactersLoader', message: 'ComicVine request failed', offset });
            continue;
        };

        const { results: characters } = apiResponse;

        for (const char of characters) {
            const character = await connection.getRepository(Characters).findOneBy({ id: char.id });

            if (character) continue;

            const insertResult = await connection.getRepository(Characters).insert(char);
        
            if (insertResult) console.info({ method: 'CharactersLoader', message: 'Inserted Character', id: char.id });
        }

        offset += 100;

        if (offset > apiResponse.number_of_total_results) break;
    }
});