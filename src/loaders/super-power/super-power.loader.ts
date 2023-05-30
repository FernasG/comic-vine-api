
import { Connection } from "@database";
import SuperPoder from "@database/entities/super-power.entity";
import { ComicVineClient } from "src/libraries/comic_vine/comic_vine.client";


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
            const power = await connection.getRepository(SuperPoder).findOneBy({ id: pow.id });

            if (power) continue;

            const insertResult = await connection.getRepository(SuperPoder).insert(pow);
        
            if (insertResult) console.info({ method: 'PowersLoader', message: 'Inserted Power', id: pow.id });
        }

        offset += 100;
        
    }


});

