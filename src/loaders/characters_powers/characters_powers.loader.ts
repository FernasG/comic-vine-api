import { Characters, SuperPowers, Connection, CharactersPowers } from "@database";
import { ComicVineClient } from "@libraries";

export const CharactersPowersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['characters'];

    const powers = await connection.getRepository(SuperPowers)
        .createQueryBuilder('super_powers')
        .select(['id'])
        .stream();

    for await (const { id: powerId } of powers) {
        const apiResponse = await comicVineClient.get<any>({ resource: `power/4035-${powerId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'CharactersPowersLoader', message: 'ComicVine request failed', power_id: powerId });
            continue;
        };

        const { results: { characters } } = apiResponse;

        for (const { id: charId } of characters) {
            const character = await connection.getRepository(Characters).findOneBy({ id: charId });

            if (!character) continue;

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