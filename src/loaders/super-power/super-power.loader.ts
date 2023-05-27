import { Connection } from "@database";
import { ComicVineClient } from "src/libraries/comic_vine/comic_vine.client";


export const SuperPowerLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'date_added']
    let offset = 0;
    let count = 1;

    while(true){
        const apiResponse = await comicVineClient.get<any>({ resource: 'powers', field_list: fieldList, offset});

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'SuperPowerLoader', message: 'ComicVine request failed', offset });
            break;
        }
    
        const { results: superPower } = apiResponse;
    
        for (const power of superPower) {
            console.log(power.name);
        }

        offset += 100;
        
        if (count === 100) break;

        count++;
    }


});

