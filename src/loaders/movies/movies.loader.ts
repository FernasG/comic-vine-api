import { Connection } from "@database";
import Movie from "@database/entities/movie.entity";
import { ComicVineClient } from "src/libraries";


export const MoviesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'release_date', 'date_added', 'runtime', 'rating', 'budget', 'total_revenue']
    let offset = 0;

    while (true) {
        const apiResponse = await comicVineClient.get<any>({ resource: 'movies', field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'MoviesLoader', message: 'ComicVine request failed', offset });
            continue;
        };

        const { results: movies } = apiResponse;

        for (const mov of movies) {
            const movie = await connection.getRepository(Movie).findOneBy({ id: mov.id });

            if (movie) continue;

            const insertResult = await connection.getRepository(Movie).insert(mov);
        
            if (insertResult) console.info({ method: 'MoviesLoader', message: 'Inserted Movie', id: mov.id });
        }

        offset += 100;
    }

});