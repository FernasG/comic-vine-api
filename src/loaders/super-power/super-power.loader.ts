

import { Connection } from "@database";
import Powers from "@database/entities/powers.entity";

import { ComicVineClient } from "src/libraries";

export const SuperPowerLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'date_added']
    let offset = 0;

    while(true){
        const apiResponse = await comicVineClient.get<any>({ resource: 'powers', field_list: fieldList, offset});

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'SuperPowerLoader', message: 'ComicVine request failed', offset });
            break;
        }
    
        const { results: superPower } = apiResponse;

        for (const pow of superPower) {
            const power = await connection.getRepository(Powers).findOneBy({ id: pow.id });

            if (power) continue;

            const insertResult = await connection.getRepository(Powers).insert(pow);
        
            if (insertResult) console.info({ method: 'PowersLoader', message: 'Inserted Power', id: pow.id });
        }

        offset += 100;
        
    }


});

