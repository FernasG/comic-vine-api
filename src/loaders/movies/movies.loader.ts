import { Connection } from "@database";
import { ComicVineClient } from "src/libraries/comic_vine/comic_vine.client";


export const MoviesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'release_date', 'data_added', 'runtime', 'rating', 'budget', 'total_revenue']
    let offset = 0;
    let count = 1;

    while (true){
        const apiResponse = await comicVineClient.get<any>({ resource: 'movies', field_list: fieldList , offset});

        if (!apiResponse || apiResponse.error !== 'OK'){
            console.error({ method: 'MoviesLoader', message: 'ComicVine request failed', offset });
            break;
        }
    
        const { results: movies } = apiResponse;
    
        for (const movie of movies) {
            console.log(movie);
        }

        offset += 100;
        
        if (count === 100) break;

        count++;
    }

});