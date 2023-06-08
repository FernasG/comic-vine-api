import { Characters, Editors, Connection, EditorsCharacters } from "@database";
import { ComicVineClient } from "src/libraries";

export const EditorsCharactersLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['created_characters'];

    const editors = await connection.getRepository(Editors)
        .createQueryBuilder('editors')
        .select(['id'])
        .stream();

    for await (const { id: editorId } of editors) {
        const apiResponse = await comicVineClient.get<any>({ resource: `person/4040-${editorId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'EditorsCharactersLoader', message: 'ComicVine request failed', editor_id: editorId });
            continue;
        };

        const { results: { created_characters } } = apiResponse;

        for (const { id: charId } of created_characters) {
            const character = await connection.getRepository(Characters).findOneBy({ id: charId });

            if (!character) continue;

            const params = { editor_id: editorId, character_id: charId };

            const editorCharacter = await connection.getRepository(EditorsCharacters).findOneBy(params);

            if (editorCharacter) continue;

            const insertResult = await connection.getRepository(EditorsCharacters).insert(params);

            if (insertResult) {
                console.info({
                    method: 'EditorsCharactersLoader', message: 'Inserted Editor Character',
                    editor_id: editorId, character_id: charId
                });
            }
        }
    }
});