
import { Connection, SuperPowers } from "@database";
import { ComicVineClient } from "@libraries";

export const SuperPowerLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'date_added'];
    let offset = 0;

    while (true) {
        const apiResponse = await comicVineClient.get<any>({ resource: 'powers', field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'SuperPowerLoader', message: 'ComicVine request failed', offset });
            break;
        }

        const { results: superPower } = apiResponse;

        for (const pow of superPower) {
            const power = await connection.getRepository(SuperPowers).findOneBy({ id: pow.id });

            if (power) continue;

            const insertResult = await connection.getRepository(SuperPowers).insert(pow);

            if (insertResult) console.info({ method: 'SuperPowerLoader', message: 'Inserted Power', id: pow.id });
        }

        offset += 100;

        if (offset > apiResponse.number_of_total_results) break;
    }
});

