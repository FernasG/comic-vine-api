import { Characters, SuperPowers, Connection, CharactersPowers, Movies, MoviesCharacters } from "@database";
import { ComicVineClient } from "src/libraries";

export const MoviesCharactersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['characters'];

    const movies = await connection.getRepository(Movies)
        .createQueryBuilder('movies')
        .select(['id'])
        .stream();

    for await (const { id: movieId } of movies) {
        const apiResponse = await comicVineClient.get<any>({ resource: `movie/4025-${movieId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'MoviesCharactersLoader', message: 'ComicVine request failed', movie_id: movieId });
            continue;
        };

        const { results: { characters } } = apiResponse;

        for (const { id: charId } of characters) {
            const character = await connection.getRepository(Characters).findOneBy({ id: charId });

            if (!character) continue;

            const params = { character_id: charId, movie_id: movieId };

            const movieCharacter = await connection.getRepository(MoviesCharacters).findOneBy(params);

            if (movieCharacter) continue;

            const insertResult = await connection.getRepository(MoviesCharacters).insert(params);

            if (insertResult) {
                console.info({
                    method: 'MoviesCharactersLoader', message: 'Inserted Character Power',
                    movie_id: movieId, character_id: charId
                });
            }
        }
    }
});