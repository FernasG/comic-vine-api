import { Characters, SuperPowers, Connection, CharactersPowers } from "@database";
import { ComicVineClient } from "@libraries";

export const CharactersPowersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['powers'];

    const characters = await connection.getRepository(Characters)
        .createQueryBuilder('characters')
        .select(['id'])
        .stream();

    for await (const { id: charId } of characters) {
        const apiResponse = await comicVineClient.get<any>({ resource: `character/4005-${charId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'CharactersPowersLoader', message: 'ComicVine request failed', character_id: charId });
            continue;
        };

        const { results: { powers } } = apiResponse;

        for (const { id: powerId } of powers) {
            const power = await connection.getRepository(SuperPowers).findOneBy({ id: powerId });

            if (!power) continue;

            const params = { character_id: charId, power_id: powerId };

            const characterPower = await connection.getRepository(CharactersPowers).findOneBy(params);

            if (characterPower) continue;

            const insertResult = await connection.getRepository(CharactersPowers).insert(params);

            if (insertResult) {
                console.info({
                    method: 'CharactersPowersLoader', message: 'Inserted Character Power',
                    power_id: powerId, character_id: charId
                });
            }
        }
    }
});