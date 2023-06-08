import { Characters, SuperPowers, Connection, CharactersPowers } from "@database";
import { ComicVineClient } from "src/libraries";

export const CharactersPowersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['powers'];
    let offset = 0;

    const characters = await connection.getRepository(Characters)
        .createQueryBuilder('characters')
        .select(['id'])
        .stream();

    for await (const { id: charId } of characters) {
        const apiResponse = await comicVineClient.get<any>({ resource: `character/4005-${charId}`, field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'CharactersPowersLoader', message: 'ComicVine request failed', offset });
            continue;
        };

        const { results: powers } = apiResponse;

        for (const { id: powerId } of powers) {
            const power = await connection.getRepository(SuperPowers).findOneBy({ id: powerId });

            if (!power) continue;

            const insertResult = await connection.getRepository(CharactersPowers).insert({ character_id: charId, power_id: powerId });

            if (insertResult) {
                console.info({
                    method: 'CharactersPowersLoader', message: 'Inserted Character',
                    power_id: powerId, character_id: charId
                });
            }
        }

        offset += 100;

        if (offset > apiResponse.number_of_total_results) break;
    }
});