
import { Connection, Movies } from "@database";
import { ComicVineClient } from "@libraries";

export const MoviesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'description', 'rating', 'runtime', 'total_revenue', 'budget', 'release_date', 'date_added'];
    let offset = 0;

    while (true) {
        const apiResponse = await comicVineClient.get<any>({ resource: 'movies', field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'MoviesLoader', message: 'ComicVine request failed', offset });
            break;
        }

        const { results: movies } = apiResponse;

        for (const mov of movies) {
            const movie = await connection.getRepository(Movies).findOneBy({ id: mov.id });

            if (movie) continue;

            const insertResult = await connection.getRepository(Movies).insert(mov);

            if (insertResult) console.info({ method: 'MoviesLoader', message: 'Inserted Movie', movie_id: mov.id });
        }

        offset += 100;

        if (offset > apiResponse.number_of_total_results) break;
    }
});

